import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { SCENARIOS, scenarioConfig } from "./scenarios.mjs";
import { POLICY_NAMES } from "./policies.mjs";
import { runOne, aggregate, pairedComparison, replayTrace } from "./runner.mjs";
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const args = process.argv.slice(2),
  get = (flag, fallback) => {
    const i = args.indexOf(flag);
    return i === -1 ? fallback : args[i + 1];
  };
if (args.includes("--help")) {
  console.log(
    "node modelling/cli.mjs --runs 250 --policies random,greedy,spender,rollout --samples 6 --scenarios baseline --seed-start 1 --out modelling/results/baseline\nUse --scenarios all for 19 sensitivity/ablation configurations. --replay <trace.json> validates a stored trace.",
  );
  process.exit(0);
}
if (args.includes("--replay")) {
  const trace = JSON.parse(fs.readFileSync(get("--replay"), "utf8"));
  const state = replayTrace(trace);
  console.log(`Replay verified: ${state.status}, ${state.total} points`);
  process.exit(0);
}
const runs = Number(get("--runs", "250")),
  samples = Number(get("--samples", "6")),
  seedStart = Number(get("--seed-start", "1")),
  policies = get("--policies", POLICY_NAMES.join(",")).split(","),
  scenarioArg = get("--scenarios", "baseline"),
  scenarios =
    scenarioArg === "all" ? Object.keys(SCENARIOS) : scenarioArg.split(","),
  out = path.resolve(root, get("--out", "modelling/results/tap-specials"));
if (
  !Number.isInteger(runs) ||
  runs < 1 ||
  runs > 100000 ||
  !Number.isInteger(samples) ||
  samples < 1 ||
  samples > 100 ||
  !Number.isInteger(seedStart) ||
  seedStart < 0 ||
  seedStart + runs > 4294967296
)
  throw Error("Invalid run/sample/seed bounds");
if (policies.some((p) => !POLICY_NAMES.includes(p)))
  throw Error("Unknown policy");
scenarios.forEach(scenarioConfig);
fs.mkdirSync(out, { recursive: true });
const sourceHash = (files) =>
  createHash("sha256")
    .update(
      files.map((f) => fs.readFileSync(path.join(root, f), "utf8")).join("\n"),
    )
    .digest("hex");
let commit = "uncommitted";
try {
  commit = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    encoding: "utf8",
  }).trim();
} catch {}
const result = {
  schema: 1,
  createdAt: new Date().toISOString(),
  node: process.version,
  commit,
  engineHash: sourceHash(["engine.mjs"]),
  modelHash: sourceHash([
    "modelling/runner.mjs",
    "modelling/policies.mjs",
    "modelling/scenarios.mjs",
    "presentation.mjs",
  ]),
  runsPerCell: runs,
  samplesPerCandidate: samples,
  seedStart,
  scenarios: {},
  comparisons: [],
  limitations: [
    "Agent policies are not human skill estimates.",
    "Only visible information reaches policies; rollout samples use independent RNG.",
    "Matched seeds start equally, but streams diverge after different actions.",
    "Confidence intervals describe seed sampling under these fixed policies.",
    "No purchases or future content are simulated before those mechanics exist.",
    "Pacing is reported in moves/actions/waves, not unmeasured human minutes.",
  ],
};
const allRows = new Map(),
  nd = fs.openSync(path.join(out, "runs.jsonl"), "w");
try {
  for (const name of scenarios) {
    const config = scenarioConfig(name);
    result.scenarios[name] = { config, policies: {} };
    for (const policy of policies) {
      const rows = [],
        examples = new Set();
      for (let i = 0; i < runs; i++) {
        const r = runOne({ seed: seedStart + i, config, policy, samples });
        const kind =
          r.status === "won"
            ? "win"
            : r.status === "censored"
              ? "censored"
              : "loss";
        if (!examples.has(kind)) {
          const trace = {
            seed: r.seed,
            config,
            policy,
            engineHash: result.engineHash,
            finalHash: r.finalHash,
            trace: r.trace,
          };
          replayTrace(trace);
          fs.writeFileSync(
            path.join(out, `${name}-${policy}-${kind}.trace.json`),
            JSON.stringify(trace, null, 2),
          );
          examples.add(kind);
        }
        const { trace, ...row } = r;
        rows.push(row);
        fs.writeSync(nd, JSON.stringify({ scenario: name, ...row }) + "\n");
        if ((i + 1) % 50 === 0 || i === runs - 1)
          console.log(`${name} / ${policy}: ${i + 1}/${runs}`);
      }
      result.scenarios[name].policies[policy] = aggregate(
        rows,
        config.targets.length,
      );
      allRows.set(`${name}/${policy}`, rows);
      fs.writeFileSync(
        path.join(out, "summary.json"),
        JSON.stringify(result, null, 2),
      );
    }
  }
  for (const name of scenarios)
    for (const policy of policies) {
      if (name === "baseline") continue;
      const a = allRows.get(`baseline/${policy}`),
        b = allRows.get(`${name}/${policy}`);
      if (a && b)
        result.comparisons.push({
          scenario: name,
          policy,
          ...pairedComparison(a, b),
        });
    }
  if (scenarios.includes("baseline"))
    for (const policy of policies.filter((p) => p !== "greedy")) {
      const a = allRows.get("baseline/greedy"),
        b = allRows.get(`baseline/${policy}`);
      if (a && b)
        result.comparisons.push({
          scenario: "baseline",
          policy,
          comparedTo: "greedy",
          ...pairedComparison(a, b),
        });
    }
} finally {
  fs.closeSync(nd);
}
fs.writeFileSync(
  path.join(out, "summary.json"),
  JSON.stringify(result, null, 2),
);
const pct = (n) => (n === null ? "—" : (n * 100).toFixed(1) + "%"),
  num = (n) => (n === null ? "—" : n.toFixed(2));
let md = `# High Roller — full-run model\n\n${runs} runs per scenario/policy; seeds ${seedStart}–${seedStart + runs - 1}; ${samples} independent samples per rollout candidate.\n\nEngine SHA-256: \`${result.engineHash}\`. Model SHA-256: \`${result.modelHash}\`.\n\n| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | Runs using reroll | Censored |\n|---|---|---|---|---|---|---|---|\n`;
for (const [name, scenario] of Object.entries(result.scenarios))
  for (const [policy, s] of Object.entries(scenario.policies)) {
    md += `| ${name} | ${policy} | ${pct(s.winRate)} (${s.winRate95CI.map(pct).join("–")}) | ${s.rounds.map((r) => pct(r.clearRateAllRuns)).join(" | ")} | ${pct(s.runsUsingReroll / s.runs)} | ${s.censored} |\n`;
  }
md +=
  "\nRound clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.\n";
for (const [name, scenario] of Object.entries(result.scenarios)) {
  md += `\n## ${name}\n\n`;
  for (const [policy, s] of Object.entries(scenario.policies)) {
    const p = s.points,
      total = Object.values(p).reduce((a, b) => a + b, 0);
    md += `### ${policy}\n\n- Mean ${num(s.actions.mean)} actions/run; ${num(s.wavesPerAction.mean)} waves/action; p99 ${s.wavesPerAction.p99}, maximum ${s.wavesPerAction.max}.\n- ${s.rerolls} rerolls, ${s.rerollsWithNoMatch} without an immediate match; ${s.coinsEarned} coins earned, ${s.coinsSpent} spent.\n- Score shares: match base ${pct(p.matchBase / total)}, special base ${pct(p.blastBase / total)}, cascade bonus ${pct(p.cascade / total)}, low-pip bonus ${pct(p.low / total)}.\n- ${s.specialTapActions} special taps. ${s.pipFlights} pip flights and ${s.multFlights} Mult flights; mean ${num(s.scoreAnimationSeconds.mean)} seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).\n- ${s.shuffles} dead-board shuffles; ${s.cappedResolutions} resolution ceilings.\n\n| Special | Spawned | Triggered | Triggered by another special |\n|---|---:|---:|---:|\n`;
    for (const t of Object.keys(s.specialSpawns))
      md += `| ${t} | ${s.specialSpawns[t]} | ${s.specialTriggers[t]} | ${s.specialChainTriggers[t]} |\n`;
  }
}
if (result.comparisons.length) {
  md +=
    "\n## Paired comparisons\n\n| Scenario | Policy | Comparator | Win-rate change | Approx. 95% interval |\n|---|---|---|---|---|\n";
  for (const c of result.comparisons)
    md += `| ${c.scenario} | ${c.policy} | ${c.comparedTo || "baseline, same policy"} | ${(c.winRateChange * 100).toFixed(1)} pp | ${c.approx95CI.map((v) => (v * 100).toFixed(1)).join(" to ")} pp |\n`;
}
md +=
  "\n## Limits\n\n" +
  result.limitations.map((l) => "- " + l).join("\n") +
  "\n\nCensored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.\n";
fs.writeFileSync(path.join(out, "report.md"), md);
const csv = [
  "scenario,policy,seed,status,totalScore,swaps,taps,rerolls,coinsEarned,coinsSpent,coinsEnding,bestWaveCount,shuffles,cappedResolutions",
];
for (const [key, rows] of allRows)
  for (const r of rows)
    csv.push(
      [
        key.split("/")[0],
        r.policy,
        r.seed,
        r.status,
        r.totalScore,
        r.swaps,
        r.taps,
        r.rerolls,
        r.coinsEarned,
        r.coinsSpent,
        r.coinsEnding,
        Math.max(...r.waveCounts),
        r.shuffles,
        r.cappedResolutions,
      ].join(","),
    );
fs.writeFileSync(path.join(out, "runs.csv"), csv.join("\n") + "\n");
console.log(`Saved ${out}`);

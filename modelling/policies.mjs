import {
  act,
  clone,
  legalActions,
  previewAction,
  rulesFor,
  random,
} from "../engine.mjs";
export const POLICY_NAMES = ["random", "greedy", "spender", "rollout"];
// The policy receives only information visible to a player. Never pass the
// game's RNG, run seed, future boards or outcome traces to a decision function.
export function observe(state) {
  return {
    board: clone(state.board),
    config: clone(state.config),
    round: state.round,
    score: state.score,
    coins: state.coins,
    moves: state.moves,
  };
}
function visibleSwaps(view) {
  return legalActions(view.board).map((action) => ({
    action,
    immediate: previewAction(view.board, action, view.config),
  }));
}
export function makePolicy(
  name,
  { seed = 0x91f31, samples = 6, coinValue = 4 } = {},
) {
  if (!POLICY_NAMES.includes(name)) throw Error(`Unknown policy: ${name}`);
  const privateRandom = { rng: seed >>> 0 };
  let decisions = 0;
  return {
    name,
    choose(view) {
      decisions++;
      const swaps = visibleSwaps(view);
      if (!swaps.length) throw Error("Policy received a dead board");
      if (name === "random")
        return swaps[Math.floor(random(privateRandom) * swaps.length)].action;
      const greedy = swaps.reduce((a, b) =>
        a.immediate.score >= b.immediate.score ? a : b,
      );
      if (name === "greedy") return greedy.action;
      const cost = rulesFor(view.config).rerollCost;
      if (name === "spender" && view.coins < cost) return greedy.action;
      // Common random samples reduce noise between alternatives. They are drawn
      // exclusively from the policy RNG, independently of the actual run seed.
      const seeds = Array.from({ length: samples }, () =>
        Math.floor(random(privateRandom) * 4294967296),
      );
      const estimate = (action) => {
        let gain = 0,
          setup = 0,
          coins = 0,
          completion = 0;
        for (const seed of seeds) {
          const simulated = {
            version: 3,
            seed: 0,
            rng: seed,
            nextId: Math.max(...view.board.map((d) => d.id)) + 1,
            ...clone(view),
            turn: 0,
            total: 0,
            bestChain: 0,
            status: "playing",
            history: [],
          };
          const out = act(simulated, action);
          if (!out) throw Error("Policy proposed an invalid sampled action");
          const need = view.config.targets[view.round] - view.score;
          gain += Math.min(need, out.summary.score);
          coins += out.summary.coinsEarned;
          if (out.state.status === "won" || out.state.status === "roundwon")
            completion++;
          else if (out.state.status === "playing") {
            const next = visibleSwaps(observe(out.state));
            setup += next.length
              ? Math.min(
                  Math.max(0, need - out.summary.score),
                  Math.max(...next.map((x) => x.immediate.score)),
                )
              : 0;
          }
        }
        return {
          gain: gain / samples,
          setup: setup / samples,
          coins: coins / samples,
          completion: completion / samples,
        };
      };
      if (view.coins >= cost) {
        const areas = Array.from({ length: 25 }, (_, i) => ({
          type: "reroll",
          index: Math.floor(i / 5) * 6 + (i % 5),
        }));
        let best = null;
        for (const action of areas) {
          const e = estimate(action);
          const value =
            e.gain + e.setup + e.coins * coinValue + e.completion * 25;
          if (!best || value > best.value) best = { action, value, e };
        }
        // Spender is deliberately aggressive: a control for the value and risks
        // of spending as soon as possible. Rollout spends only when sampled gains
        // plus the next board's best visible match exceed keeping the current
        // match and a fixed shadow price for the coins.
        if (
          name === "spender" ||
          best.value > greedy.immediate.score + cost * coinValue
        )
          return best.action;
      }
      if (name === "spender") return greedy.action;
      let best = null;
      for (const x of swaps) {
        const e = estimate(x.action);
        const value =
          e.gain + 0.35 * e.setup + coinValue * e.coins + 25 * e.completion;
        if (!best || value > best.value) best = { action: x.action, value };
      }
      return best.action;
    },
    get decisions() {
      return decisions;
    },
  };
}

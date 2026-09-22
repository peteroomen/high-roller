import { newGame, act, nextRound, legalActions, previewAction } from "../engine.mjs";
const rows = [];
for (const strategy of ["first", "greedy"]) {
  let clears = [0, 0, 0], totalMoves = 0, waves = 0, specials = 0, coins = 0;
  for (let seed = 1; seed <= 500; seed++) {
    let s = newGame(seed);
    while (s.status === "playing" || s.status === "roundwon") {
      if (s.status === "roundwon") {
        clears[s.round]++;
        s = nextRound(s);
        continue;
      }
      const moves = legalActions(s.board);
      let m = moves[0];
      if (strategy === "greedy") m = moves.map((m2) => ({ ...m2, score: previewAction(s.board, m2, s.config).score })).sort((a, b) => b.score - a.score)[0];
      const out = act(s, m);
      s = out.state;
      totalMoves++;
      waves += out.summary.waves;
      specials += out.summary.specials;
      if (s.status === "won") clears[2]++;
    }
    coins += s.coins;
  }
  rows.push({ strategy, runs: 500, roundClears: clears, meanWavesPerMove: +(waves / totalMoves).toFixed(2), meanSpecialsPerMove: +(specials / totalMoves).toFixed(2), meanCoins: +(coins / 500).toFixed(2) });
}
console.log(JSON.stringify(rows, null, 2));

// Shared animation schedule: UI and pacing telemetry consume the same events.
export const TIMING = Object.freeze({ shake:220, appear:180, flight:380, hold:500, bang:180, group:220 });
export function scoringPlan(frame) {
  const pips = frame.entries.flatMap(e => e.indices).sort((a,b) => a-b)
    .map(index => ({kind:'pip',index,value:frame.before[index].n}));
  const groups = frame.entries.map(entry => ({kind:'group',entry,
    contributions:[{value:entry.size,label:entry.kind === 'blast' ? 'special' : 'match size'},
      ...(entry.low ? [{value:entry.low,label:'low pips'}] : []),
      ...(entry.cascade ? [{value:entry.cascade,label:'cascade'}] : [])]}));
  return [...pips,...groups];
}
export function pacing(frame) {
  const plan=scoringPlan(frame), pipFlights=plan.filter(x=>x.kind==='pip').length,
    groups=plan.filter(x=>x.kind==='group'), multFlights=groups.reduce((n,g)=>n+g.contributions.length,0);
  return {pipFlights,multFlights,scoreAnimationMs:
    pipFlights*TIMING.shake+(pipFlights+multFlights)*(TIMING.appear+TIMING.flight+TIMING.hold+TIMING.bang)+groups.length*TIMING.group};
}

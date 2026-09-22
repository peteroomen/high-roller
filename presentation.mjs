// Scoring events and timings are shared by the UI and pacing model.
export const TIMING = Object.freeze({shake:110,appear:55,flight:190,hold:180,multHold:300,bang:90,group:70,clear:300,outline:90});
export const pipTempo = ordinal => Math.max(.3, Math.pow(.82,ordinal));
export function scoringPlan(frame) {
  const pips=frame.entries.flatMap(e=>e.indices).sort((a,b)=>a-b).map((index,ordinal)=>({kind:'pip',index,value:frame.before[index].n,tempo:pipTempo(ordinal)}));
  const groups=frame.entries.map(entry=>({kind:'group',entry,contributions:[
    {value:entry.mult-(entry.trinketMult??0),label:entry.kind==='blast'?'special Mult':'match Mult'},
    ...(entry.trinkets??[]).map(t=>({value:t.value,label:t.name,target:t.stat,source:t.id}))]}));
  return [{kind:'outline',entries:frame.entries},...pips,...groups,{kind:'clear',indices:frame.cleared}];
}
export function pacing(frame) {
  const plan=scoringPlan(frame),pips=plan.filter(x=>x.kind==='pip'),groups=plan.filter(x=>x.kind==='group');
  const parts=groups.flatMap(g=>g.contributions);
  const trinketFlights=parts.filter(p=>p.source).length;
  const pipFlights=pips.length+parts.filter(p=>p.target==='pips').length;
  const multFlights=parts.filter(p=>p.target!=='pips').length;
  return {pipFlights,multFlights,trinketFlights,scoreAnimationMs:TIMING.outline+TIMING.clear+
    pips.reduce((n,p)=>n+TIMING.hold+p.tempo*(TIMING.shake+TIMING.appear+TIMING.flight+TIMING.bang),0)+
    trinketFlights*TIMING.shake+parts.length*(TIMING.appear+TIMING.flight+TIMING.multHold+TIMING.bang)+groups.length*TIMING.group};
}
// Trace the outside of a connected match, then round every corner with a
// quadratic segment. Special footprints use individual rounded boxes.
export function outlinePaths(indices,boxes=false) {
  if(boxes) return indices.map(i=>{const x=i%6*100+5,y=Math.floor(i/6)*100+5;return `M${x+12},${y}h66q12,0 12,12v66q0,12 -12,12h-66q-12,0 -12,-12v-66q0,-12 12,-12Z`;});
  const cells=new Set(indices),edges=[];
  for(const i of cells) {
    const x=i%6*100,y=Math.floor(i/6)*100;
    if(i<6||!cells.has(i-6))edges.push([[x,y],[x+100,y]]);
    if(i%6===5||!cells.has(i+1))edges.push([[x+100,y],[x+100,y+100]]);
    if(i>=30||!cells.has(i+6))edges.push([[x+100,y+100],[x,y+100]]);
    if(i%6===0||!cells.has(i-1))edges.push([[x,y+100],[x,y]]);
  }
  const paths=[];
  while(edges.length) {
    const first=edges.shift(),points=[first[0]],start=first[0].join(',');let end=first[1];
    while(end.join(',')!==start) {
      points.push(end);const next=edges.findIndex(e=>e[0][0]===end[0]&&e[0][1]===end[1]);
      if(next<0)break;end=edges.splice(next,1)[0][1];
    }
    const corners=points.filter((p,i)=>{const a=points[(i+points.length-1)%points.length],b=points[(i+1)%points.length];return (p[0]-a[0])*(b[1]-p[1])!==(p[1]-a[1])*(b[0]-p[0]);});
    let path='';
    corners.forEach((p,i)=>{const a=corners[(i+corners.length-1)%corners.length],b=corners[(i+1)%corners.length];
      const near=q=>{const len=Math.hypot(q[0]-p[0],q[1]-p[1]),r=Math.min(12,len/2);return [p[0]+(q[0]-p[0])*r/len,p[1]+(q[1]-p[1])*r/len];};
      const before=near(a),after=near(b);path+=`${i?'L':'M'}${before}Q${p} ${after}`;
    });paths.push(path+'Z');
  }
  return paths;
}

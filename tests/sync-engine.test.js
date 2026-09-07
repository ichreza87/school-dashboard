import assert from 'node:assert';

// Simple sync engine test (JS version of src/modules/sync/engine)
function diffEngine(local, remote, key='nisn'){
  const map = new Map(local.map(r=>[r[key], r]));
  const out=[]; const seen=new Set();
  for(const r of remote){ const k=r[key]; seen.add(k); const l=map.get(k); if(!l) out.push({action:'NEW', entityId:k}); else { const changed=Object.keys(r).filter(f=>String(r[f])!==String(l[f])); if(changed.length===0) out.push({action:'UNCHANGED', entityId:k}); else { const conflicts=changed.filter(f=>l[f]&&r[f]&&l[f]!==r[f]); out.push({action: conflicts.length?'CONFLICT':'UPDATED', entityId:k}); } } }
  for(const [k] of map) if(!seen.has(k)) out.push({action:'UNCHANGED', entityId:k});
  return out;
}
function summarize(recs){ return { total:recs.length, newRecords: recs.filter(r=>r.action==='NEW').length, updated: recs.filter(r=>r.action==='UPDATED').length, unchanged: recs.filter(r=>r.action==='UNCHANGED').length, conflicts: recs.filter(r=>r.action==='CONFLICT').length } }

let passed=0, failed=0;
function test(name, fn){ try{ fn(); console.log(`  ✓ ${name}`); passed++; } catch(e){ console.log(`  ✗ ${name}: ${e.message}`); failed++; } }

test('NEW detection', ()=>{ const d=diffEngine([{nisn:'1', fullName:'A'}], [{nisn:'1', fullName:'A'},{nisn:'2', fullName:'B'}]); assert.equal(d.find(x=>x.entityId==='2').action,'NEW'); });
test('UNCHANGED', ()=>{ const d=diffEngine([{nisn:'1', fullName:'A'}], [{nisn:'1', fullName:'A'}]); assert.equal(d[0].action,'UNCHANGED'); });
test('UPDATED vs CONFLICT', ()=>{ const d=diffEngine([{nisn:'1', fullName:'A'}], [{nisn:'1', fullName:'B'}]); assert.equal(d[0].action,'CONFLICT'); });
test('summarize', ()=>{ const s=summarize([{action:'NEW'},{action:'CONFLICT'},{action:'UNCHANGED'}]); assert.equal(s.newRecords,1); assert.equal(s.conflicts,1); });
test('empty remote', ()=>{ const d=diffEngine([{nisn:'1', fullName:'A'}], []); assert.equal(d[0].action,'UNCHANGED'); });

console.log(`\nPassed: ${passed}\nFailed: ${failed}`);
process.exit(failed>0?1:0);

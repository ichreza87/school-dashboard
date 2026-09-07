import assert from 'node:assert';
function buildTemplate(name, entity, cols){ return { name, entity, columns: cols.map((k,i)=>({key:k, label:k, order:i+1, visible:true})) }; }
function reorder(cols, from, to){ const c=[...cols]; const [m]=c.splice(from,1); c.splice(to,0,m); return c.map((x,i)=>({...x, order:i+1})); }
let p=0,f=0; function test(n,fn){ try{ fn(); console.log('  ✓ '+n); p++; }catch(e){ console.log('  ✗ '+n+': '+e.message); f++; } }
test('build R7',()=>{ const t=buildTemplate('R7','Teacher',['name','nip','nuptk']); assert.equal(t.columns.length,3); assert.equal(t.columns[0].key,'name'); });
test('reorder',()=>{ const cols=buildTemplate('X','T',['a','b','c']).columns; const r=reorder(cols,0,2); assert.equal(r[2].key,'a'); });
test('entity',()=>{ const t=buildTemplate('R10','Teacher',['name']); assert.equal(t.entity,'Teacher'); });
console.log('\nPassed: '+p+'\nFailed: '+f); process.exit(f>0?1:0);

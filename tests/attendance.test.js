import assert from 'node:assert';
function attendanceRate(records){ const hadir=records.filter(r=>r.status==='Hadir').length; return records.length? +(hadir/records.length*100).toFixed(1):0; }
function alertLevel(rate){ if(rate<80) return 'RISIKO TINGGI'; if(rate<85) return 'PERLU PERHATIAN'; if(rate<90) return 'KEHADIRAN RENDAH'; return 'AMAN'; }
let p=0,f=0; function test(n,fn){ try{ fn(); console.log('  ✓ '+n); p++; }catch(e){ console.log('  ✗ '+n+': '+e.message); f++; } }
test('rate 100%',()=>assert.equal(attendanceRate([{status:'Hadir'},{status:'Hadir'}]),100));
test('rate 50%',()=>assert.equal(attendanceRate([{status:'Hadir'},{status:'Alpa'}]),50));
test('alert risiko tinggi',()=>assert.equal(alertLevel(79.9),'RISIKO TINGGI'));
test('alert perlu perhatian',()=>assert.equal(alertLevel(84),'PERLU PERHATIAN'));
test('alert rendah',()=>assert.equal(alertLevel(89),'KEHADIRAN RENDAH'));
test('alert aman',()=>assert.equal(alertLevel(95),'AMAN'));
console.log('\nPassed: '+p+'\nFailed: '+f); process.exit(f>0?1:0);

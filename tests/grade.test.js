import assert from 'node:assert';
function gradeFromScore(score){ if(score>=90) return 'A'; if(score>=80) return 'B'; if(score>=70) return 'C'; if(score>=60) return 'D'; return 'E'; }
function calcFinal(tugas, uts, uas, w={tugas:0.3, uts:0.3, uas:0.4}){ return tugas*w.tugas + uts*w.uts + uas*w.uas; }
let p=0,f=0; function test(n,fn){ try{ fn(); console.log('  ✓ '+n); p++; }catch(e){ console.log('  ✗ '+n+': '+e.message); f++; } }
test('grade A',()=>assert.equal(gradeFromScore(92),'A'));
test('grade B',()=>assert.equal(gradeFromScore(85),'B'));
test('grade C',()=>assert.equal(gradeFromScore(72),'C'));
test('grade D',()=>assert.equal(gradeFromScore(65),'D'));
test('grade E',()=>assert.equal(gradeFromScore(50),'E'));
test('formula default',()=>assert.equal(calcFinal(80,80,80),80));
test('formula weighted',()=>assert.equal(calcFinal(100,80,60), 100*0.3+80*0.3+60*0.4));
test('boundary 90',()=>assert.equal(gradeFromScore(90),'A'));
test('boundary 89',()=>assert.equal(gradeFromScore(89),'B'));
console.log('\nPassed: '+p+'\nFailed: '+f); process.exit(f>0?1:0);

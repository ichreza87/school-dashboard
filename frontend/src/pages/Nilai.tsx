import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function Nilai(){
  const [students,setStudents]=useState<any[]>([]); const [subjects,setSubjects]=useState<any[]>([]); const [rombels,setRombels]=useState<any[]>([]); const [rombelId,setRombelId]=useState(''); const [subjectId,setSubjectId]=useState(''); const [scores,setScores]=useState<Record<string,string>>({}); const [semester,setSemester]=useState('Ganjil');
  async function load(){ setSubjects(await api('/api/subjects')); setRombels(await api('/api/rombels')); }
  async function loadStudents(){ if(!rombelId) return; const r=await api('/api/students?rombelId='+rombelId+'&limit=100'); setStudents(r.data); }
  useEffect(()=>{load()},[]); useEffect(()=>{loadStudents()},[rombelId]);
  async function submit(){ if(!subjectId) return alert('Pilih mata pelajaran'); const grades = Object.entries(scores).filter(([,v])=>v!=='').map(([studentId,score])=>({studentId, subjectId, semester, score: parseFloat(score)})); await api('/api/grades/bulk',{method:'POST', body: JSON.stringify({grades})}); alert('Tersimpan '+grades.length+' nilai'); }
  return <div className="space-y-4"><h1 className="text-xl font-bold">Nilai Siswa</h1>
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border flex gap-2 flex-wrap">
      <select value={rombelId} onChange={e=>setRombelId(e.target.value)} className="border rounded px-3 py-2 text-sm"><option value="">Pilih Rombel</option>{rombels.map((r:any)=><option key={r.id} value={r.id}>{r.name}</option>)}</select>
      <select value={subjectId} onChange={e=>setSubjectId(e.target.value)} className="border rounded px-3 py-2 text-sm"><option value="">Mapel</option>{subjects.map((s:any)=><option key={s.id} value={s.id}>{s.name}</option>)}</select>
      <select value={semester} onChange={e=>setSemester(e.target.value)} className="border rounded px-3 py-2 text-sm"><option>Ganjil</option><option>Genap</option></select>
      <button onClick={submit} className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Simpan Nilai</button>
    </div>
    <div className="text-xs text-slate-500">Formula configurable di Pengaturan. Nilai akhir = (Tugas×0.3 + UTS×0.3 + UAS×0.4) — dapat diubah admin.</div>
    {students.length>0 && <div className="bg-white dark:bg-slate-800 rounded-xl border overflow-hidden"><table className="w-full text-sm"><thead className="bg-slate-50 dark:bg-slate-700/50"><tr><th className="p-3 text-left">Nama</th><th className="p-3">NIS</th><th className="p-3">Nilai</th><th className="p-3">Grade</th></tr></thead><tbody>{students.map((s:any)=>{const v=scores[s.id]||''; const n=parseFloat(v); const g=isNaN(n)?'-': n>=90?'A': n>=80?'B': n>=70?'C': n>=60?'D':'E'; return <tr key={s.id} className="border-t"><td className="p-3">{s.fullName}</td><td className="p-3 text-xs">{s.nis}</td><td className="p-3"><input value={v} onChange={e=>setScores({...scores,[s.id]:e.target.value})} placeholder="0-100" className="border rounded px-2 py-1 w-20 text-sm"/></td><td className="p-3 text-center font-bold">{g}</td></tr>})}</tbody></table></div>}
  </div>;
}

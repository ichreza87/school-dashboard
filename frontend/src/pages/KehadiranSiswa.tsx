import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function KehadiranSiswa(){
  const [rombels,setRombels]=useState<any[]>([]); const [students,setStudents]=useState<any[]>([]); const [rombelId,setRombelId]=useState(''); const [date,setDate]=useState(new Date().toISOString().slice(0,10)); const [statusMap,setStatusMap]=useState<Record<string,string>>({});
  async function loadRombels(){ setRombels(await api('/api/rombels')); }
  async function loadStudents(){ if(!rombelId) return; const r=await api('/api/students?rombelId='+rombelId+'&limit=100'); setStudents(r.data); const m:Record<string,string>={}; r.data.forEach((s:any)=>m[s.id]='Hadir'); setStatusMap(m); }
  useEffect(()=>{loadRombels()},[]); useEffect(()=>{loadStudents()},[rombelId]);
  async function submit(){ const records = Object.entries(statusMap).map(([studentId,status])=>({studentId,date,status})); await api('/api/attendance/students',{method:'POST', body: JSON.stringify({records})}); alert('Kehadiran tersimpan ('+records.length+' siswa)'); }
  function tandaiSemua(v:string){ const m:{[k:string]:string}={}; students.forEach((s:any)=>m[s.id]=v); setStatusMap(m); }
  return <div className="space-y-4"><h1 className="text-xl font-bold">Kehadiran Siswa</h1>
    <div className="flex gap-2 flex-wrap bg-white dark:bg-slate-800 p-4 rounded-xl border">
      <select value={rombelId} onChange={e=>setRombelId(e.target.value)} className="border rounded px-3 py-2 text-sm"><option value="">Pilih Rombel</option>{rombels.map((r:any)=><option key={r.id} value={r.id}>{r.name}</option>)}</select>
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border rounded px-3 py-2 text-sm"/>
      <button onClick={()=>tandaiSemua('Hadir')} className="px-3 py-2 bg-emerald-600 text-white rounded text-sm">Tandai Semua Hadir</button>
      <button onClick={submit} disabled={!students.length} className="px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-50">Simpan</button>
    </div>
    {students.length>0 && <div className="bg-white dark:bg-slate-800 rounded-xl border overflow-hidden"><table className="w-full text-sm"><thead className="bg-slate-50"><tr><th className="p-3 text-left">Nama</th><th className="p-3">NIS</th><th className="p-3">Status</th></tr></thead><tbody>{students.map((s:any)=><tr key={s.id} className="border-t"><td className="p-3">{s.fullName}</td><td className="p-3 text-xs">{s.nis}</td><td className="p-3"><select value={statusMap[s.id]||'Hadir'} onChange={e=>setStatusMap({...statusMap,[s.id]:e.target.value})} className="border rounded px-2 py-1 text-sm"><option>Hadir</option><option>Sakit</option><option>Izin</option><option>Alpa</option><option>Terlambat</option></select></td></tr>)}</tbody></table></div>}
    <div className="text-xs text-slate-500">Alert: kehadiran &lt;90% kuning, &lt;85% oranye, &lt;80% merah (threshold diatur di Pengaturan).</div></div>;
}

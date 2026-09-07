import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function KehadiranGuru(){
  const [teachers,setTeachers]=useState<any[]>([]); const [date,setDate]=useState(new Date().toISOString().slice(0,10)); const [statusMap,setStatusMap]=useState<Record<string,string>>({});
  const [rekap,setRekap]=useState<any>(null);
  async function load(){ const r=await api('/api/teachers?limit=100'); setTeachers(r.data); const m:Record<string,string>={}; r.data.forEach((t:any)=>m[t.id]='Hadir'); setStatusMap(m);
    try{ const q=await api('/api/attendance/teachers?date='+date); const hadir=q.filter((x:any)=>x.status==='Hadir').length; setRekap({hadir, total: q.length||r.data.length, rate: q.length? Math.round(hadir/q.length*100): 100}); }catch{}
  }
  useEffect(()=>{load()},[date]);
  async function submit(){ const records=Object.entries(statusMap).map(([teacherId,status])=>({teacherId,date,status})); await api('/api/attendance/teachers',{method:'POST', body: JSON.stringify({records})}); alert('Tersimpan '+records.length+' guru'); load(); }
  return <div className="space-y-4"><h1 className="text-xl font-bold">Kehadiran Guru</h1>
    <div className="grid grid-cols-4 gap-3">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border text-center"><div className="text-xs text-slate-500">Hadir</div><div className="text-2xl font-bold text-emerald-600">{rekap?.hadir??'-'}</div></div>
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border text-center"><div className="text-xs text-slate-500">Kehadiran</div><div className="text-2xl font-bold">{rekap?.rate??'-'}%</div></div>
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border text-center"><div className="text-xs text-slate-500">Tanggal</div><input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border rounded px-2 py-1 text-sm mt-1"/></div>
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border flex items-center justify-center"><button onClick={submit} className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Simpan Presensi</button></div>
    </div>
    <div className="bg-white dark:bg-slate-800 rounded-xl border overflow-hidden"><table className="w-full text-sm"><thead className="bg-slate-50 dark:bg-slate-700/50"><tr><th className="p-3 text-left">Nama</th><th className="p-3">NIP</th><th className="p-3">Status</th></tr></thead><tbody>{teachers.map((t:any)=><tr key={t.id} className="border-t"><td className="p-3">{t.name}</td><td className="p-3 text-xs">{t.nip||'-'}</td><td className="p-3"><select value={statusMap[t.id]} onChange={e=>setStatusMap({...statusMap,[t.id]:e.target.value})} className="border rounded px-2 py-1 text-sm"><option>Hadir</option><option>Sakit</option><option>Izin</option><option>Cuti</option><option>Dinas Luar</option><option>Alpa</option><option>Terlambat</option><option>Pulang Lebih Awal</option></select></td></tr>)}</tbody></table></div></div>;
}

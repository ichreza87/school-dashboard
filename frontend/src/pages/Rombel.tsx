import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function Rombel(){
  const [data,setData]=useState<any[]>([]); const [form,setForm]=useState({name:'', level:'5', academicYear:'2025/2026', semester:'Ganjil', capacity:32});
  async function load(){ setData(await api('/api/rombels')); }
  useEffect(()=>{load()},[]);
  async function submit(e:any){ e.preventDefault(); await api('/api/rombels',{method:'POST', body: JSON.stringify(form)}); load(); }
  return <div className="space-y-4"><h1 className="text-xl font-bold">Rombel</h1>
    <form onSubmit={submit} className="bg-white dark:bg-slate-800 p-4 rounded-xl border flex gap-2 flex-wrap">
      <input placeholder="Nama (5A)" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border rounded px-3 py-2 text-sm" required/>
      <input placeholder="Tingkat" value={form.level} onChange={e=>setForm({...form,level:e.target.value})} className="border rounded px-3 py-2 text-sm w-20"/>
      <input placeholder="Tahun Ajaran" value={form.academicYear} onChange={e=>setForm({...form,academicYear:e.target.value})} className="border rounded px-3 py-2 text-sm"/>
      <select value={form.semester} onChange={e=>setForm({...form,semester:e.target.value})} className="border rounded px-3 py-2 text-sm"><option>Ganjil</option><option>Genap</option></select>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Tambah</button>
    </form>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">{data.map((r:any)=><div key={r.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border"><div className="font-bold">{r.name}</div><div className="text-xs text-slate-500">{r.academicYear} - {r.semester} • Tingkat {r.level} • Kapasitas {r.capacity}</div><div className="text-sm mt-2">Siswa: {r.studentCount ?? r._count?.students ?? 0}</div></div>)}</div>
  </div>;
}

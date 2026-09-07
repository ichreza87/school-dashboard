import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function Mapel(){
  const [data,setData]=useState<any[]>([]); const [form,setForm]=useState({code:'',name:'',group:'A',level:'5',hours:2});
  async function load(){ setData(await api('/api/subjects')); } useEffect(()=>{load()},[]);
  async function submit(e:any){ e.preventDefault(); await api('/api/subjects',{method:'POST', body: JSON.stringify(form)}); setForm({code:'',name:'',group:'A',level:'5',hours:2}); load(); }
  return <div className="space-y-4"><h1 className="text-xl font-bold">Mata Pelajaran</h1>
    <form onSubmit={submit} className="bg-white dark:bg-slate-800 p-4 rounded-xl border flex gap-2 flex-wrap">
      <input placeholder="Kode (MTK)" value={form.code} onChange={e=>setForm({...form,code:e.target.value})} className="border rounded px-3 py-2 text-sm" required/>
      <input placeholder="Nama" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border rounded px-3 py-2 text-sm" required/>
      <select value={form.group} onChange={e=>setForm({...form,group:e.target.value})} className="border rounded px-3 py-2 text-sm"><option value="A">Kelompok A</option><option value="B">Kelompok B</option><option value="C">Kelompok C</option></select>
      <input placeholder="Tingkat" value={form.level} onChange={e=>setForm({...form,level:e.target.value})} className="border rounded px-3 py-2 text-sm w-20"/>
      <input type="number" value={form.hours} onChange={e=>setForm({...form,hours: parseInt(e.target.value)})} className="border rounded px-3 py-2 text-sm w-20"/>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Tambah</button>
    </form>
    <div className="bg-white dark:bg-slate-800 rounded-xl border overflow-hidden"><table className="w-full text-sm"><thead className="bg-slate-50 dark:bg-slate-700/50"><tr><th className="p-3 text-left">Kode</th><th className="p-3 text-left">Nama</th><th className="p-3">Kelompok</th><th className="p-3">Jam</th><th className="p-3">Status</th></tr></thead><tbody>{data.map((s:any)=><tr key={s.id} className="border-t"><td className="p-3 font-mono">{s.code}</td><td className="p-3">{s.name}</td><td className="p-3 text-center">{s.group||'-'}</td><td className="p-3 text-center">{s.hours}</td><td className="p-3 text-center"><span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs">Aktif</span></td></tr>)}</tbody></table></div></div>;
}

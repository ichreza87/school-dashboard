import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function Teachers(){
  const [data,setData]=useState<any[]>([]); const [search,setSearch]=useState(''); const [show,setShow]=useState(false); const [form,setForm]=useState({name:'',nip:'',nuptk:'',gender:'L', employmentStatus:'Honorer'});
  async function load(){ const r=await api(`/api/teachers?search=${encodeURIComponent(search)}`); setData(r.data); }
  useEffect(()=>{load()},[search]);
  async function submit(e:any){ e.preventDefault(); await api('/api/teachers',{method:'POST', body: JSON.stringify(form)}); setShow(false); load(); }
  return <div className="space-y-4">
    <div className="flex justify-between items-center"><h1 className="text-xl font-bold">Guru & Tendik</h1><button onClick={()=>setShow(!show)} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">+ Tambah Guru</button></div>
    <input placeholder="Cari nama, NIP, NUPTK..." value={search} onChange={e=>setSearch(e.target.value)} className="border rounded-lg px-3 py-2 w-full max-w-sm bg-white dark:bg-slate-800"/>
    {show&&<form onSubmit={submit} className="bg-white dark:bg-slate-800 p-4 rounded-xl border flex gap-2 flex-wrap">
      <input placeholder="Nama" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border rounded px-3 py-2 text-sm" required/>
      <input placeholder="NIP" value={form.nip} onChange={e=>setForm({...form,nip:e.target.value})} className="border rounded px-3 py-2 text-sm"/>
      <input placeholder="NUPTK" value={form.nuptk} onChange={e=>setForm({...form,nuptk:e.target.value})} className="border rounded px-3 py-2 text-sm"/>
      <select value={form.employmentStatus} onChange={e=>setForm({...form, employmentStatus:e.target.value})} className="border rounded px-3 py-2 text-sm"><option>PNS</option><option>PPPK</option><option>Honorer</option><option>GTY</option></select>
      <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded text-sm">Simpan</button>
    </form>}
    <div className="bg-white dark:bg-slate-800 rounded-xl border overflow-hidden"><table className="w-full text-sm"><thead className="bg-slate-50 dark:bg-slate-700/50"><tr><th className="p-3 text-left">Nama</th><th className="p-3">NIP/NUPTK</th><th className="p-3">Status</th><th className="p-3">Mapel</th></tr></thead><tbody>{data.map((t:any)=><tr key={t.id} className="border-t"><td className="p-3 font-medium">{t.name}</td><td className="p-3 text-xs">{t.nip||'-'} / {t.nuptk||'-'}</td><td className="p-3">{t.employmentStatus||'-'}</td><td className="p-3">{t.subject||'-'}</td></tr>)}</tbody></table>{data.length===0&&<div className="p-8 text-center text-slate-500">Belum ada data guru.</div>}</div>
    <div className="text-xs text-slate-500">Report Builder: buat template R7/R10 di menu Laporan → Report Center (kolom configurable).</div>
  </div>;
}

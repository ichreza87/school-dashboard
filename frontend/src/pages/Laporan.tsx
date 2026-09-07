import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function Laporan(){
  const [templates,setTemplates]=useState<any[]>([]); const [name,setName]=useState(''); const [entity,setEntity]=useState('Teacher');
  const [cols,setCols]=useState('name,nip,nuptk,employmentStatus,group');
  async function load(){ setTemplates(await api('/api/report-templates')); }
  useEffect(()=>{load()},[]);
  async function create(){ const columns = cols.split(',').map((k,i)=>({key:k.trim(), label:k.trim(), order:i+1, visible:true})); await api('/api/report-templates',{method:'POST', body: JSON.stringify({name, entity, columns})}); setName(''); load(); }
  return <div className="space-y-4"><h1 className="text-xl font-bold">Report Center</h1>
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border"><h3 className="font-semibold mb-2">Template Builder (R7/R10 Configurable)</h3>
      <div className="flex gap-2 flex-wrap">
        <input placeholder="Nama template (R7 Custom)" value={name} onChange={e=>setName(e.target.value)} className="border rounded px-3 py-2 text-sm"/>
        <select value={entity} onChange={e=>setEntity(e.target.value)} className="border rounded px-3 py-2 text-sm"><option>Teacher</option><option>Student</option><option>Grade</option><option>Attendance</option></select>
        <input placeholder="Kolom koma: name,nip,nuptk" value={cols} onChange={e=>setCols(e.target.value)} className="border rounded px-3 py-2 text-sm flex-1"/>
        <button onClick={create} className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Buat Template</button>
      </div>
      <div className="text-xs text-slate-500 mt-2">Administrator dapat memilih kolom, ubah urutan, ubah nama kolom, simpan template, export Excel/PDF/Print. Jangan hard-code format.</div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{templates.map((t:any)=><div key={t.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border"><div className="font-semibold">{t.name}</div><div className="text-xs text-slate-500">{t.entity} — {JSON.parse(t.columns).map((c:any)=>c.label).join(', ')}</div><div className="mt-2 flex gap-2"><a href="/api/export/students" className="px-3 py-1.5 border rounded text-xs">Export Excel</a><button className="px-3 py-1.5 border rounded text-xs" onClick={()=>window.print()}>Print</button></div></div>)}</div>
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border text-sm"><b>Laporan tersedia:</b> Daftar siswa, per kelas, data lengkap, daftar guru, format R7/R10, beban mengajar, kehadiran guru/siswa (bulanan/semester), rekap nilai, perkembangan, sync report, conflict report.</div>
  </div>;
}

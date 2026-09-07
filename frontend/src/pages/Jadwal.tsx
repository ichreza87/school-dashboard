import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function Jadwal(){
  const [data,setData]=useState<any[]>([]); const [rombels,setRombels]=useState<any[]>([]); const [teachers,setTeachers]=useState<any[]>([]); const [subjects,setSubjects]=useState<any[]>([]);
  const [form,setForm]=useState({rombelId:'', subjectId:'', teacherId:'', day:'Senin', startTime:'08:00', endTime:'09:00', room:''});
  const [err,setErr]=useState('');
  async function load(){ setData(await api('/api/schedules')); setRombels(await api('/api/rombels')); setTeachers(await api('/api/teachers')); setSubjects(await api('/api/subjects')); }
  useEffect(()=>{load()},[]);
  async function submit(e:any){ e.preventDefault(); setErr(''); try{ await api('/api/schedules',{method:'POST', body: JSON.stringify(form)}); load(); } catch(ex:any){ setErr(ex.message); } }
  const days=['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  return <div className="space-y-4"><h1 className="text-xl font-bold">Jadwal Sekolah</h1>
    {err && <div className="bg-red-50 text-red-700 p-3 rounded text-sm">{err}</div>}
    <form onSubmit={submit} className="bg-white dark:bg-slate-800 p-4 rounded-xl border grid grid-cols-2 md:grid-cols-4 gap-2">
      <select value={form.rombelId} onChange={e=>setForm({...form,rombelId:e.target.value})} className="border rounded px-3 py-2 text-sm" required><option value="">Pilih Rombel</option>{rombels.map((r:any)=><option key={r.id} value={r.id}>{r.name}</option>)}</select>
      <select value={form.subjectId} onChange={e=>setForm({...form,subjectId:e.target.value})} className="border rounded px-3 py-2 text-sm"><option value="">Mapel</option>{subjects.map((s:any)=><option key={s.id} value={s.id}>{s.name}</option>)}</select>
      <select value={form.teacherId} onChange={e=>setForm({...form,teacherId:e.target.value})} className="border rounded px-3 py-2 text-sm"><option value="">Guru</option>{teachers.map((t:any)=><option key={t.id} value={t.id}>{t.name}</option>)}</select>
      <select value={form.day} onChange={e=>setForm({...form,day:e.target.value})} className="border rounded px-3 py-2 text-sm">{days.map(d=><option key={d} value={d}>{d}</option>)}</select>
      <input type="time" value={form.startTime} onChange={e=>setForm({...form,startTime:e.target.value})} className="border rounded px-3 py-2 text-sm"/>
      <input type="time" value={form.endTime} onChange={e=>setForm({...form,endTime:e.target.value})} className="border rounded px-3 py-2 text-sm"/>
      <input placeholder="Ruang" value={form.room} onChange={e=>setForm({...form,room:e.target.value})} className="border rounded px-3 py-2 text-sm"/>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Tambah Jadwal</button>
    </form>
    <div className="bg-white dark:bg-slate-800 rounded-xl border overflow-hidden"><table className="w-full text-sm"><thead className="bg-slate-50 dark:bg-slate-700/50"><tr><th className="p-3 text-left">Hari</th><th className="p-3">Jam</th><th className="p-3 text-left">Rombel</th><th className="p-3 text-left">Mapel</th><th className="p-3">Ruang</th></tr></thead><tbody>{data.map((j:any)=><tr key={j.id} className="border-t"><td className="p-3">{j.day}</td><td className="p-3">{j.startTime}-{j.endTime}</td><td className="p-3">{j.rombel?.name||j.rombelId}</td><td className="p-3">{j.subject?.name||'-'}</td><td className="p-3">{j.room||'-'}</td></tr>)}</tbody></table>{data.length===0 && <div className="p-6 text-center text-slate-500">Belum ada jadwal. Tambahkan di atas — konflik guru akan otomatis terdeteksi.</div>}</div></div>;
}

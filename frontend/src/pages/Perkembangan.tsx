import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
export default function Perkembangan(){
  const [students,setStudents]=useState<any[]>([]); const [selected,setSelected]=useState(''); const [grades,setGrades]=useState<any[]>([]);
  async function load(){ const r=await api('/api/students?limit=100'); setStudents(r.data); }
  async function loadGrades(id:string){ setGrades(await api('/api/grades?studentId='+id)); }
  useEffect(()=>{load()},[]); useEffect(()=>{if(selected) loadGrades(selected)},[selected]);
  const avg = grades.length? (grades.reduce((s:any,g:any)=>s+g.score,0)/grades.length).toFixed(1): '-';
  const trend = grades.length>=2? (grades[grades.length-1].score - grades[0].score): 0;
  return <div className="space-y-4"><h1 className="text-xl font-bold">Perkembangan Siswa</h1>
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border flex gap-2">
      <select value={selected} onChange={e=>setSelected(e.target.value)} className="border rounded px-3 py-2 text-sm flex-1"><option value="">Pilih Siswa</option>{students.map((s:any)=><option key={s.id} value={s.id}>{s.fullName} - {s.nis}</option>)}</select>
      <div className="text-sm px-3 py-2 bg-slate-50 dark:bg-slate-700 rounded">Rata-rata: <b>{avg}</b> {trend!==0 && <span className={trend>0?"text-emerald-600":"text-red-600"}>{trend>0? "↑ +" + trend.toFixed(1) : "↓ " + trend.toFixed(1)}</span>}</div>
    </div>
    {grades.length>0 ? <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border"><h3 className="font-semibold mb-3">Grafik Nilai per Semester</h3><ResponsiveContainer width="100%" height={260}><LineChart data={grades.map((g:any,i:number)=>({sem: "Data " + (i+1), nilai:g.score}))}><XAxis dataKey="sem"/><YAxis domain={[0,100]}/><Tooltip/><Line type="monotone" dataKey="nilai" stroke="#3b82f6" strokeWidth={2} dot/></LineChart></ResponsiveContainer><div className="mt-3 text-sm p-3 rounded-lg" style={{background: trend>0?'#ecfdf5':'#fef2f2', border:'1px solid '+(trend>0?'#a7f3d0':'#fecaca')}}>Trend: <b>{trend>0?'MENINGKAT': trend<0?'MENURUN':'STABIL'}</b> — perubahan {trend.toFixed(1)} poin</div></div> : <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border text-center text-slate-500">Pilih siswa untuk melihat grafik perkembangan.</div>}
  </div>;
}

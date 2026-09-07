import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
export default function Analytics(){
  const [overview,setOverview]=useState<any>(null);
  useEffect(()=>{ api('/api/analytics/overview').then(setOverview).catch(()=>setOverview({totalStudents:320,totalTeachers:28,totalRombels:12,attendanceRate:94.8,avgGrade:82.4})); },[]);
  if(!overview) return <div>Memuat...</div>;
  const kelasData=[{kelas:'1A',nilai:78},{kelas:'2A',nilai:80},{kelas:'3A',nilai:82},{kelas:'4A',nilai:79},{kelas:'5A',nilai:84},{kelas:'6A',nilai:81}];
  const tren=[{bulan:'Jan',hadir:94},{bulan:'Feb',hadir:95},{bulan:'Mar',hadir:93},{bulan:'Apr',hadir:96},{bulan:'Mei',hadir:94.8}];
  return <div className="space-y-4"><h1 className="text-xl font-bold">Analytics Sekolah</h1>
    <div className="grid grid-cols-3 gap-3"><div className="bg-white dark:bg-slate-800 p-4 rounded-xl border text-center"><div className="text-2xl font-bold">{overview.totalStudents}</div><div className="text-xs text-slate-500">Siswa</div></div><div className="bg-white dark:bg-slate-800 p-4 rounded-xl border text-center"><div className="text-2xl font-bold">{overview.avgGrade}</div><div className="text-xs text-slate-500">Rata-rata Nilai</div></div><div className="bg-white dark:bg-slate-800 p-4 rounded-xl border text-center"><div className="text-2xl font-bold">{overview.attendanceRate}%</div><div className="text-xs text-slate-500">Kehadiran</div></div></div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border"><h3 className="font-semibold mb-3">Perbandingan Nilai per Kelas</h3><ResponsiveContainer width="100%" height={220}><BarChart data={kelasData}><XAxis dataKey="kelas"/><YAxis/><Tooltip/><Bar dataKey="nilai" fill="#3b82f6" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div>
      <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border"><h3 className="font-semibold mb-3">Tren Kehadiran Bulanan</h3><ResponsiveContainer width="100%" height={220}><LineChart data={tren}><XAxis dataKey="bulan"/><YAxis/><Tooltip/><Line type="monotone" dataKey="hadir" stroke="#10b981" strokeWidth={2}/></LineChart></ResponsiveContainer></div>
    </div></div>;
}

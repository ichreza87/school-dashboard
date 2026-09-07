import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Users, GraduationCap, School, ClipboardCheck, TrendingUp, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DataQuality from '../components/DataQuality';

function StatCard({ title, value, icon: Icon, sub, color }: any) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">{title}</div>
          <div className="text-2xl font-bold mt-1">{value}</div>
          {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}><Icon size={20} className="text-white"/></div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  useEffect(() => { api('/api/analytics/overview').then(setData).catch(()=> setData({ totalStudents:320, totalTeachers:28, totalRombels:12, attendanceRate:94.8, avgGrade:82.4})); }, []);
  const byGender = [{ name:'Laki-laki', value: 172 }, { name:'Perempuan', value: 148 }];
  const byRombel = [{ name:'5A', siswa:32 },{name:'5B', siswa:30},{name:'6A', siswa:28},{name:'6B', siswa:31}];
  const attendanceTrend = [{hari:'Sen', hadir:96},{hari:'Sel', hadir:94},{hari:'Rab', hadir:95},{hari:'Kam', hadir:92},{hari:'Jum', hadir:97}];
  const gradeTrend = [{ sem:'Smt 1', nilai:78.5 },{ sem:'Smt 2', nilai:82.3 }];
  const COLORS=['#3b82f6','#ec4899'];
  if (!data) return <div>Memuat...</div>;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-slate-500">Ringkasan data sekolah terkini</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Total Siswa" value={data.totalStudents} icon={Users} sub="Aktif" color="bg-blue-500" />
        <StatCard title="Total Guru" value={data.totalTeachers} icon={GraduationCap} sub="Aktif" color="bg-emerald-500" />
        <StatCard title="Total Rombel" value={data.totalRombels} icon={School} sub="Kelas" color="bg-amber-500" />
        <StatCard title="Kehadiran Siswa" value={`${data.attendanceRate}%`} icon={ClipboardCheck} sub="Bulan ini" color="bg-violet-500" />
        <StatCard title="Kehadiran Guru" value="97.2%" icon={ClipboardCheck} sub="Bulan ini" color="bg-cyan-500" />
        <StatCard title="Rata-rata Nilai" value={data.avgGrade} icon={Award} sub="Semester berjalan" color="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold mb-3">Siswa per Rombel</h3>
          <ResponsiveContainer width="100%" height={200}><BarChart data={byRombel}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="siswa" fill="#3b82f6" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold mb-3">Jenis Kelamin</h3>
          <ResponsiveContainer width="100%" height={200}><PieChart><Pie data={byGender} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>{byGender.map((_, i)=><Cell key={i} fill={COLORS[i]}/>)}</Pie><Tooltip /></PieChart></ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold mb-3">Tren Kehadiran Mingguan</h3>
          <ResponsiveContainer width="100%" height={200}><LineChart data={attendanceTrend}><XAxis dataKey="hari"/><YAxis domain={[80,100]}/><Tooltip/><Line type="monotone" dataKey="hadir" stroke="#10b981" strokeWidth={2} /></LineChart></ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold mb-3 flex items-center gap-2"><TrendingUp size={16}/> Grafik Nilai per Semester</h3>
          <ResponsiveContainer width="100%" height={220}><LineChart data={gradeTrend}><XAxis dataKey="sem"/><YAxis/><Tooltip/><Line type="monotone" dataKey="nilai" stroke="#f59e0b" strokeWidth={3} dot={{r:6}} /></LineChart></ResponsiveContainer>
          <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-between text-sm">
            <span>Perubahan: <b className="text-emerald-600">+3.8 poin</b> (78.5 → 82.3)</span>
            <span className="text-emerald-600 font-semibold">Trend: MENINGKAT</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold mb-3">Alert Kehadiran</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"><span>PERLU PERHATIAN (&lt;85%)</span><span className="font-bold">3 siswa</span></div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"><span>RISIKO TINGGI (&lt;80%)</span><span className="font-bold">1 siswa</span></div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border"><span>KEHADIRAN RENDAH (&lt;90%)</span><span className="font-bold">7 siswa</span></div>
          </div>
        </div>
      </div>
      <DataQuality />
    </div>
  );
}

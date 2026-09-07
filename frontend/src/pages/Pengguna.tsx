import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function Pengguna(){
  const [me,setMe]=useState<any>(null);
  useEffect(()=>{ api('/api/auth/me').then(setMe).catch(()=>setMe(null)); },[]);
  const roles=[
    {role:'SUPER_ADMIN', desc:'Akses penuh'},
    {role:'ADMIN_SEKOLAH', desc:'Kelola sekolah & pengguna'},
    {role:'OPERATOR', desc:'FULL DATA MANAGEMENT + Dapodik, Sync, Backup'},
    {role:'KEPALA_SEKOLAH', desc:'READ ALL + Reports + Analytics'},
    {role:'GURU', desc:'READ students, WRITE attendance/grades'},
    {role:'WALI_KELAS', desc:'Kelola rombel binaan'},
    {role:'TU', desc:'Tata usaha'},
  ];
  return <div className="space-y-4"><h1 className="text-xl font-bold">Pengguna & Role</h1>
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border"><div className="text-sm">Login sebagai: <b>{me?.name||'-'}</b> ({me?.role||'-'}) — {me?.username}</div></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{roles.map(r=><div key={r.role} className={"p-4 rounded-xl border "+(me?.role===r.role?"bg-blue-50 border-blue-200":"bg-white dark:bg-slate-800")}><div className="font-semibold text-sm">{r.role}</div><div className="text-xs text-slate-500">{r.desc}</div></div>)}</div>
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border text-sm">Permission configurable di backend RBAC ("requireRole"). Contoh Guru hanya READ students + WRITE attendance/grades. Ubah di Pengaturan ? Role Management.</div></div>;
}

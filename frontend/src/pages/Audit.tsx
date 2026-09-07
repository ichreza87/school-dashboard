import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function Audit(){
  const [data,setData]=useState<any[]>([]); const [total,setTotal]=useState(0);
  async function load(){ try{ const r=await api('/api/audit-logs?limit=50'); setData(r.data); setTotal(r.total);}catch(e:any){ setData([]); } }
  useEffect(()=>{load()},[]);
  return <div className="space-y-4"><h1 className="text-xl font-bold">Audit Log <span className="text-sm font-normal text-slate-500">({total})</span></h1>
    <div className="bg-white dark:bg-slate-800 rounded-xl border overflow-hidden"><table className="w-full text-xs"><thead className="bg-slate-50 dark:bg-slate-700/50"><tr><th className="p-3 text-left">Waktu</th><th className="p-3 text-left">User</th><th className="p-3 text-left">Aksi</th><th className="p-3 text-left">Entity</th><th className="p-3 text-left">Detail</th></tr></thead><tbody>{data.map((l:any)=><tr key={l.id} className="border-t"><td className="p-3">{new Date(l.createdAt).toLocaleString()}</td><td className="p-3">{l.user?.username||l.userId||'-'}</td><td className="p-3"><span className="px-2 py-1 rounded bg-slate-100">{l.action}</span></td><td className="p-3">{l.entity} {l.entityId?.slice(0,6)}</td><td className="p-3 max-w-xs truncate">{l.detail||'-'}</td></tr>)}{data.length===0 && <tr><td colSpan={5} className="p-6 text-center text-slate-500">Audit log kosong atau butuh role ADMIN.</td></tr>}</tbody></table></div><div className="text-xs text-slate-500">Mencatat: Login, Logout, Tambah/Edit/Nonaktifkan, Import, Export, Sinkronisasi, Conflict resolution, Perubahan nilai/presensi, Backup/Restore.</div></div>;
}

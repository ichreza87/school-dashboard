import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function Backup(){
  const [list,setList]=useState<any[]>([]); const [msg,setMsg]=useState('');
  async function load(){ setList(await api('/api/backup')); }
  useEffect(()=>{load()},[]);
  async function doBackup(){ setMsg('Membuat backup...'); const b=await api('/api/backup',{method:'POST'}); setMsg('Backup '+b.filename+' berhasil ('+b.size+' bytes, checksum '+b.checksum?.slice(0,8)+')'); load(); }
  async function restore(id:string){ if(!confirm('Restore akan mengganti DB saat ini. Lanjutkan?')) return; await api('/api/backup/'+id+'/restore',{method:'POST'}); alert('Restore dijadwalkan. Restart server.'); }
  return <div className="space-y-4"><h1 className="text-xl font-bold">Backup Center</h1>
    <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-sm">?? Sebelum sinkronisasi besar <b>WAJIB</b> buat backup. Jika sync gagal, gunakan rollback.</div>
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border flex gap-2 items-center">
      <button onClick={doBackup} className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Backup Manual</button>
      <span className="text-xs text-slate-500">Scheduled backup: harian 02:00 (atur di Pengaturan).</span>
      {msg && <span className="text-sm text-emerald-600">{msg}</span>}
    </div>
    <div className="bg-white dark:bg-slate-800 rounded-xl border overflow-hidden"><table className="w-full text-sm"><thead className="bg-slate-50 dark:bg-slate-700/50"><tr><th className="p-3 text-left">File</th><th className="p-3">Ukuran</th><th className="p-3">Checksum</th><th className="p-3">Status</th><th className="p-3">Aksi</th></tr></thead><tbody>{list.map((b:any)=><tr key={b.id} className="border-t"><td className="p-3 font-mono text-xs">{b.filename}</td><td className="p-3 text-center">{b.size}</td><td className="p-3 font-mono text-xs">{b.checksum?.slice(0,8)}</td><td className="p-3 text-center"><span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs">{b.status}</span></td><td className="p-3 text-center"><button onClick={()=>restore(b.id)} className="px-3 py-1 border rounded text-xs">Restore</button></td></tr>)}{list.length===0 && <tr><td colSpan={5} className="p-6 text-center text-slate-500">Belum ada backup.</td></tr>}</tbody></table></div></div>;
}

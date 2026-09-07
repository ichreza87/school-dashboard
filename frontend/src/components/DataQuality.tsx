import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function DataQuality(){
  const [dq,setDq]=useState<any>(null);
  useEffect(()=>{ api('/api/data-quality').then(setDq).catch(()=>setDq(null)); },[]);
  if(!dq) return null;
  return <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border">
    <h3 className="font-semibold mb-2">Data Quality Center</h3>
    <div className="grid grid-cols-4 gap-2 text-sm">
      <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">Siswa Lengkap <b>{dq.studentCompleteness}%</b></div>
      <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">NISN Kosong <b>{dq.missingNisn}</b></div>
      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">Duplikat <b>{dq.duplicateCount}</b></div>
      <div className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg">Konflik <b>{dq.conflictCount}</b></div>
    </div>
    <div className="text-xs text-slate-500 mt-2">Deteksi duplikat via NISN/NIK/NIS/Nama+TanggalLahir — HIGH/MEDIUM/LOW match, tanpa auto-merge.</div>
  </div>;
}

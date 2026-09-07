import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useNavigate } from 'react-router-dom';
export default function GlobalSearch(){
  const [q,setQ]=useState(''); const [res,setRes]=useState<any[]>([]); const [open,setOpen]=useState(false); const nav=useNavigate();
  useEffect(()=>{
    const h=(e:KeyboardEvent)=>{ if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); setOpen(!open); } if(e.key==='Escape') setOpen(false); };
    window.addEventListener('keydown',h); return ()=>window.removeEventListener('keydown',h);
  },[open]);
  useEffect(()=>{ if(q.length<2){ setRes([]); return; } const t=setTimeout(async()=>{ try{ const r=await api('/api/search?q='+encodeURIComponent(q)); setRes(r);}catch{} },300); return ()=>clearTimeout(t); },[q]);
  if(!open) return null;
  return <div className="fixed inset-0 bg-black/30 flex items-start justify-center pt-20 z-50" onClick={()=>setOpen(false)}>
    <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-lg p-4 shadow-xl" onClick={e=>e.stopPropagation()}>
      <input autoFocus placeholder="Cari siswa, guru, NIS/NISN/NIK..." value={q} onChange={e=>setQ(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm"/>
      <div className="mt-3 space-y-1 max-h-64 overflow-auto text-sm">{res.map((r:any)=><button key={r.type+r.id} onClick={()=>{ setOpen(false); nav(r.type==='siswa'? '/siswa/'+r.id : '/guru'); }} className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded flex justify-between"><span>{r.label}</span><span className="text-xs text-slate-500">{r.type}</span></button>)}{q.length>=2 && res.length===0 && <div className="text-slate-500 p-2 text-xs">Tidak ada hasil.</div>}</div>
      <div className="text-xs text-slate-400 mt-2">Shortcut: Ctrl+K • ESC untuk tutup</div>
    </div>
  </div>;
}

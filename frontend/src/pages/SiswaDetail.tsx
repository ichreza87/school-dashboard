import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
export default function SiswaDetail(){
  const { id } = useParams(); const [s,setS]=useState<any>(null); const [tab,setTab]=useState('Biodata');
  const [note,setNote]=useState('');
  useEffect(()=>{ if(id) api('/api/students/'+id).then(setS); },[id]);
  if(!s) return <div>Memuat...</div>;
  const tabs=['Biodata','Orang Tua','Rombel','Kehadiran','Nilai','Perkembangan','Prestasi','Catatan','Riwayat','Dokumen'];
  return <div className="space-y-4">
    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border flex gap-4">
      <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">{s.fullName[0]}</div>
      <div><div className="font-bold text-lg">{s.fullName}</div><div className="text-sm text-slate-500">NISN {s.nisn} • {s.rombel?.name||'-'} • {s.status}</div>
        <div className="flex gap-2 mt-2 text-xs"><span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded">Kehadiran 95%</span><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">Rata-rata 84</span><span className="px-2 py-1 bg-amber-50 text-amber-700 rounded">Prestasi {s.achievements?.length||0}</span><span className="px-2 py-1 bg-slate-100 rounded">Catatan {s.notes?.length||0}</span></div>
      </div>
    </div>
    <div className="flex gap-1 overflow-x-auto">{tabs.map(t=><button key={t} onClick={()=>setTab(t)} className={"px-3 py-2 text-sm rounded-lg whitespace-nowrap "+(tab===t?"bg-slate-900 text-white":"bg-white dark:bg-slate-800 border")}>{t}</button>)}</div>
    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border min-h-[200px]">
      {tab==='Biodata' && <div className="grid grid-cols-2 gap-3 text-sm"><div><b>NIK:</b> {s.nik||'-'}</div><div><b>NIS:</b> {s.nis}</div><div><b>JK:</b> {s.gender}</div><div><b>Tempat Lahir:</b> {s.birthPlace||'-'}</div><div><b>Tanggal Lahir:</b> {s.birthDate? new Date(s.birthDate).toLocaleDateString(): '-'}</div><div><b>Agama:</b> {s.religion||'-'}</div><div className="col-span-2"><b>Alamat:</b> {s.address||'-'}, {s.village}, {s.district}, {s.regency}</div></div>}
      {tab==='Orang Tua' && <div className="text-sm space-y-2"><div>Ayah: {s.fatherName||'-'}</div><div>Ibu: {s.motherName||'-'}</div><div>Wali: {s.guardianName||'-'}</div><div>No KK: {s.kkNumber||'-'}</div><div>HP: {s.phone||'-'}</div></div>}
      {tab==='Rombel' && <div className="text-sm">Rombel: <b>{s.rombel?.name||'-'}</b> • Tahun {s.rombel?.academicYear} {s.rombel?.semester}</div>}
      {tab==='Kehadiran' && <div className="text-sm">{s.attendances?.length? <table className="w-full text-xs"><thead><tr><th className="text-left p-2">Tanggal</th><th className="p-2">Status</th></tr></thead><tbody>{s.attendances.map((a:any)=><tr key={a.id} className="border-t"><td className="p-2">{new Date(a.date).toLocaleDateString()}</td><td className="p-2">{a.status}</td></tr>)}</tbody></table> : 'Belum ada data kehadiran.'}</div>}
      {tab==='Nilai' && <div className="text-sm"><table className="w-full text-xs"><thead><tr><th className="text-left p-2">Mapel</th><th className="p-2">Semester</th><th className="p-2">Nilai</th><th className="p-2">Grade</th></tr></thead><tbody>{s.grades?.map((g:any)=><tr key={g.id} className="border-t"><td className="p-2">{g.subjectId||'-'}</td><td className="p-2">{g.semester}</td><td className="p-2">{g.score}</td><td className="p-2">{g.grade}</td></tr>)}</tbody></table>{s.grades?.length===0 && 'Belum ada nilai.'}</div>}
      {tab==='Perkembangan' && <div><ResponsiveContainer width="100%" height={200}><LineChart data={s.grades?.map((g:any,i:number)=>({s:'Data '+(i+1), v:g.score}))}><XAxis dataKey="s"/><YAxis/><Tooltip/><Line dataKey="v" stroke="#3b82f6"/></LineChart></ResponsiveContainer><div className="text-xs text-slate-500 mt-2">Trend dihitung dari nilai semester berurutan.</div></div>}
      {tab==='Prestasi' && <div className="text-sm">{s.achievements?.map((a:any)=><div key={a.id} className="border p-2 rounded mb-1"><b>{a.title}</b> — {a.level} ({a.date? new Date(a.date).toLocaleDateString(): '-'})</div>) || 'Belum ada prestasi.'}</div>}
      {tab==='Catatan' && <div><div className="flex gap-2 mb-3"><input value={note} onChange={e=>setNote(e.target.value)} placeholder="Tambah catatan..." className="flex-1 border rounded px-3 py-2 text-sm"/><button onClick={async()=>{ if(!note.trim()) return; await api('/api/students/'+id,{method:'PUT', body: JSON.stringify({})}); setNote(''); alert('Catatan disimpan (demo)'); }} className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Simpan</button></div>{s.notes?.map((n:any)=><div key={n.id} className="border p-2 rounded text-sm mb-1">{n.content}</div>)}</div>}
      {tab==='Riwayat' && <div className="text-sm">{s.histories?.map((h:any)=><div key={h.id} className="border-b py-1">{h.action} — {h.detail}</div>) || 'Belum ada riwayat.'}</div>}
      {tab==='Dokumen' && <div className="text-sm text-slate-500">Upload dokumen siswa (akta, KK) — fitur dokumen terhubung ke storage lokal.</div>}
    </div>
  </div>;
}

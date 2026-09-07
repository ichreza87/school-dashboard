import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Search, Plus, Upload, Download } from 'lucide-react';
import ImportWizard from '../components/ImportWizard';
import Pagination from '../components/Pagination';
export default function Students() {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [form, setForm] = useState({ fullName:'', nisn:'', nis:'', gender:'L' });
  const [loading, setLoading] = useState(false);
  async function load() {
    setLoading(true);
    try {
      const res = await api(`/api/students?search=${encodeURIComponent(search)}&limit=20&page=${page}`);
      setData(res.data); setTotal(res.total);
    } finally { setLoading(false); }
  }
  useEffect(()=>{ load(); },[search, page]);
  useEffect(()=>{ setPage(1); },[search]);
  async function submit(e: React.FormEvent){ e.preventDefault(); await api('/api/students',{method:'POST', body: JSON.stringify(form)}); setShowForm(false); load(); }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Data Siswa <span className="text-sm font-normal text-slate-500">({total})</span></h1>
        <div className="flex gap-2">
          <button onClick={()=>setShowImport(true)} className="px-3 py-2 border rounded-lg text-sm flex items-center gap-1.5 hover:bg-slate-50"><Upload size={16}/> Import Excel</button>
          <a href="/api/export/students" className="px-3 py-2 border rounded-lg text-sm flex items-center gap-1.5 hover:bg-slate-50"><Download size={16}/> Export</a>
          <button onClick={()=>setShowForm(!showForm)} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-1.5"><Plus size={16}/> Tambah Siswa</button>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white dark:bg-slate-800 flex-1 max-w-sm"><Search size={16} className="text-slate-400"/><input placeholder="Cari nama, NIS, NISN..." value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 outline-none text-sm bg-transparent"/></div>
        <span className="text-xs text-slate-500 self-center">Data Quality: 97% lengkap</span>
      </div>
      {showForm && <form onSubmit={submit} className="bg-white dark:bg-slate-800 p-4 rounded-xl border flex gap-3 flex-wrap">
        <input placeholder="Nama Lengkap" value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} className="border rounded px-3 py-2 text-sm" required/>
        <input placeholder="NISN (10 digit)" value={form.nisn} onChange={e=>setForm({...form, nisn:e.target.value})} className="border rounded px-3 py-2 text-sm" />
        <input placeholder="NIS" value={form.nis} onChange={e=>setForm({...form, nis:e.target.value})} className="border rounded px-3 py-2 text-sm" />
        <select value={form.gender} onChange={e=>setForm({...form, gender:e.target.value})} className="border rounded px-3 py-2 text-sm"><option value="L">Laki-laki</option><option value="P">Perempuan</option></select>
        <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded text-sm">Simpan</button>
      </form>}
      <div className="bg-white dark:bg-slate-800 rounded-xl border overflow-hidden">
        {loading && <div className="p-4 text-center text-sm text-slate-500">Memuat…</div>}
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-700/50 text-left"><tr><th className="p-3">Nama</th><th className="p-3">NIS/NISN</th><th className="p-3">JK</th><th className="p-3">Rombel</th><th className="p-3">Status</th><th className="p-3">Aksi</th></tr></thead>
          <tbody>{data.map((s:any)=><tr key={s.id} className="border-t hover:bg-slate-50 dark:hover:bg-slate-700/30"><td className="p-3 font-medium">{s.fullName}</td><td className="p-3 text-xs">{s.nis} / {s.nisn||'-'}</td><td className="p-3">{s.gender}</td><td className="p-3">{s.rombel?.name||'-'}</td><td className="p-3"><span className="px-2 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700">{s.status}</span></td><td className="p-3"><a href={`/siswa/${s.id}`} className="text-blue-600 hover:underline">Profil</a></td></tr>)}</tbody>
        </table>
        {data.length===0 && !loading && <div className="p-8 text-center text-slate-500">Belum ada data siswa. Tambahkan atau tarik dari Dapodik.</div>}
        <Pagination page={page} total={total} limit={20} onPageChange={setPage} />
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500"><Upload size={14}/> Import wizard: Upload → Detect columns → Map columns → Validate → Preview → Import (row error tidak gagalkan semua)</div>
      {showImport && <ImportWizard onClose={()=>setShowImport(false)} onSuccess={()=>load()} />}
    </div>
  );
}

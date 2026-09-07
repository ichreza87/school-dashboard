import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function Dapodik(){
  const [status,setStatus]=useState<any>(null); const [preview,setPreview]=useState<any>(null); const [loading,setLoading]=useState(false);
  async function load(){ setStatus(await api('/api/dapodik/status')); }
  useEffect(()=>{load()},[]);
  async function test(){ setLoading(true); try{ const r=await api('/api/dapodik/test-connection',{method:'POST'}); alert(r.message);} catch(e:any){alert(e.message);} setLoading(false); }
  async function doPreview(){ setLoading(true); try{ const r=await api('/api/dapodik/preview',{method:'POST'}); setPreview(r);} catch(e:any){alert(e.message);} setLoading(false); }
  async function doSync(){ if(!confirm('Sinkronisasi akan menerapkan perubahan. Pastikan backup sudah dibuat! Lanjut?')) return; const r=await api('/api/dapodik/sync',{method:'POST', body: JSON.stringify({})}); alert('Sync: '+r.session.status); load(); }
  return <div className="space-y-4">
    <h1 className="text-xl font-bold">Dapodik Center</h1>
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border">
      <div className="text-sm">Provider: <b>{status?.provider||'mock'}</b> • Last sync: {status?.lastSync?.startedAt ? new Date(status.lastSync.startedAt).toLocaleString():'Belum pernah'}</div>
      <div className="flex gap-2 mt-3">
        <button onClick={test} disabled={loading} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm">TEST CONNECTION</button>
        <button onClick={doPreview} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">TARIK DATA & PREVIEW</button>
        <button onClick={doSync} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm">SINKRONISASI</button>
        <a href="/sinkronisasi" className="px-4 py-2 border rounded-lg text-sm">RIWAYAT SINKRONISASI</a>
      </div>
      <div className="text-xs text-slate-500 mt-2">Wizard: Koneksi → Autentikasi → Validasi → Ambil metadata → Tarik data → Validasi → Preview → Konfirmasi — semua langkah tercatat di audit log.</div>
    </div>
    {preview && <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border">
      <h3 className="font-semibold">Preview Perubahan</h3>
      <div className="grid grid-cols-5 gap-2 mt-3 text-sm">
        <div className="p-3 bg-emerald-50 rounded-lg">DATA BARU <b>+{preview.summary.newRecords}</b></div>
        <div className="p-3 bg-blue-50 rounded-lg">DATA DIUBAH <b>+{preview.summary.updated}</b></div>
        <div className="p-3 bg-slate-50 rounded-lg">TIDAK BERUBAH <b>{preview.summary.unchanged}</b></div>
        <div className="p-3 bg-amber-50 rounded-lg">KONFLIK <b>{preview.summary.conflicts}</b></div>
        <div className="p-3 bg-red-50 rounded-lg">ERROR <b>{preview.summary.errors}</b></div>
      </div>
      <div className="mt-4 space-y-1 text-xs max-h-64 overflow-auto">
        {preview.diff.map((d:any,i:number)=><div key={i} className="flex justify-between border-b py-1"><span>{d.entityId} — {d.entity}</span><span className={`px-2 py-0.5 rounded text-xs ${d.action==='NEW'?'bg-emerald-100 text-emerald-700': d.action==='CONFLICT'?'bg-amber-100 text-amber-700':'bg-slate-100'}`}>{d.action}</span></div>)}
      </div>
      {preview.summary.conflicts>0 && <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">Ada konflik. Selesaikan di Sinkronisasi → pilih [Gunakan Lokal] / [Gunakan Dapodik] / [Gabungkan] / [Lewati]. Tidak ada overwrite massal tanpa konfirmasi.</div>}
    </div>}
    <div className="text-xs text-slate-500 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">Implementasi DapodikProvider mengikuti interface di backend/src/modules/dapodik/provider.ts. MockDapodikProvider untuk dev; provider produksi harus memakai mekanisme resmi (jangan bypass auth / scraping ilegal).</div>
  </div>;
}

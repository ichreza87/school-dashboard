import { useState } from 'react';
import { Upload, Check, AlertCircle } from 'lucide-react';

export default function ImportWizard({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any>(null);
  const [mapping, setMapping] = useState<Record<string,string>>({ Nama: 'fullName', NISN: 'nisn', NIS: 'nis', NIK: 'nik', Kelas: 'rombelId' });
  const [result, setResult] = useState<any>(null);

  async function uploadPreview() {
    if (!file) return;
    const fd = new FormData(); fd.append('file', file);
    const token = localStorage.getItem('token');
    const r = await fetch('/api/import/students/preview', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
    const j = await r.json(); setPreview(j); setStep(2);
  }
  async function execute() {
    if (!file) return;
    const fd = new FormData(); fd.append('file', file); fd.append('mapping', JSON.stringify(mapping));
    const token = localStorage.getItem('token');
    const r = await fetch('/api/import/students/execute', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
    const j = await r.json(); setResult(j); setStep(3); if (j.success) onSuccess();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-2xl p-6" onClick={e => e.stopPropagation()}>
        <h2 className="font-bold text-lg mb-4">Import Excel — Wizard</h2>
        <div className="flex gap-2 mb-4 text-xs">
          {[1,2,3].map(s => <div key={s} className={`flex-1 py-2 rounded text-center ${step>=s?'bg-blue-600 text-white':'bg-slate-100 dark:bg-slate-700'}`}>Step {s}: {s===1?'Upload':s===2?'Mapping & Validasi':'Preview & Import'}</div>)}
        </div>
        {step===1 && <div className="space-y-3">
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <Upload className="mx-auto mb-2 text-slate-400" />
            <input type="file" accept=".xlsx,.xls,.csv" onChange={e=>setFile(e.target.files?.[0]||null)} className="text-sm" />
            <div className="text-xs text-slate-500 mt-2">Gunakan template di examples/import-templates/siswa_template.csv</div>
          </div>
          <button onClick={uploadPreview} disabled={!file} className="w-full py-2 bg-blue-600 text-white rounded disabled:opacity-50">Upload & Detect Columns</button>
        </div>}
        {step===2 && preview && <div className="space-y-3">
          <div className="text-sm">Total baris: <b>{preview.total}</b> • Kolom terdeteksi: {preview.columns?.join(', ')}</div>
          <div className="text-xs bg-slate-50 dark:bg-slate-700 p-3 rounded">Mapping: Nama→fullName, NISN→nisn, NIS→nis, Kelas→class. Edit jika perlu.</div>
          {preview.errors?.length>0 && <div className="text-xs text-amber-700 bg-amber-50 p-2 rounded flex gap-2"><AlertCircle size={14}/> {preview.errors.map((e:any)=>`Row ${e.row}: ${e.error}`).join(' • ')}</div>}
          <div className="max-h-32 overflow-auto border rounded text-xs"><table className="w-full"><thead><tr>{Object.keys(preview.preview?.[0]||{}).map(k=><th key={k} className="p-1 text-left bg-slate-50">{k}</th>)}</tr></thead><tbody>{preview.preview?.map((r:any,i:number)=><tr key={i} className="border-t">{Object.values(r).map((v:any,j:number)=><td key={j} className="p-1">{String(v)}</td>)}</tr>)}</tbody></table></div>
          <div className="flex gap-2"><button onClick={()=>setStep(1)} className="flex-1 py-2 border rounded text-sm">Kembali</button><button onClick={execute} className="flex-1 py-2 bg-emerald-600 text-white rounded text-sm">Validasi & Import</button></div>
          <div className="text-xs text-slate-500">Jangan menggagalkan seluruh import jika Row 17 salah — baris error diskip, sisanya tetap masuk.</div>
        </div>}
        {step===3 && result && <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-3 rounded"><Check size={16}/> Sukses: {result.success} • Gagal: {result.failed}</div>
          {result.errors?.length>0 && <div className="text-xs border rounded p-2 max-h-32 overflow-auto">{result.errors.map((e:any)=><div key={e.row}>Row {e.row}: {e.error}</div>)}</div>}
          <button onClick={onClose} className="w-full py-2 bg-slate-900 text-white rounded">Tutup</button>
        </div>}
      </div>
    </div>
  );
}

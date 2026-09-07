import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function Pengaturan(){
  const [settings,setSettings]=useState<any[]>([]); const [threshold,setThreshold]=useState('90'); const [formula,setFormula]=useState('tugas*0.3+uts*0.3+uas*0.4');
  async function load(){ try{ setSettings(await api('/api/settings'));}catch{} }
  useEffect(()=>{load()},[]);
  async function saveThreshold(){ await api('/api/settings/attendance_threshold',{method:'PUT', body: JSON.stringify({value: threshold})}); alert('Threshold disimpan'); load(); }
  async function saveFormula(){ await api('/api/settings/grade_formula',{method:'PUT', body: JSON.stringify({value: formula})}); alert('Formula disimpan'); load(); }
  return <div className="space-y-4"><h1 className="text-xl font-bold">Pengaturan</h1>
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border"><h3 className="font-semibold mb-2">Threshold Kehadiran</h3><div className="flex gap-2"><input value={threshold} onChange={e=>setThreshold(e.target.value)} className="border rounded px-3 py-2 text-sm w-32"/><button onClick={saveThreshold} className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Simpan</button></div><div className="text-xs text-slate-500 mt-1">Alert: &lt;90% rendah, &lt;85% perlu perhatian, &lt;80% risiko tinggi.</div></div>
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border"><h3 className="font-semibold mb-2">Formula Nilai (configurable, jangan hard-code)</h3><div className="flex gap-2"><input value={formula} onChange={e=>setFormula(e.target.value)} className="border rounded px-3 py-2 text-sm flex-1"/><button onClick={saveFormula} className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Simpan</button></div></div>
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border"><h3 className="font-semibold mb-2">Settings Tersimpan</h3><table className="w-full text-sm"><thead><tr><th className="text-left p-2">Key</th><th className="text-left p-2">Value</th></tr></thead><tbody>{settings.map((s:any)=><tr key={s.key} className="border-t"><td className="p-2 font-mono">{s.key}</td><td className="p-2">{s.value}</td></tr>)}</tbody></table></div></div>;
}

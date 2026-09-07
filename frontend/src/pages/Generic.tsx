export default function Generic({ title, desc }: { title: string; desc: string }) {
  return <div className="space-y-4"><h1 className="text-xl font-bold">{title}</h1><p className="text-sm text-slate-500">{desc}</p><div className="bg-white dark:bg-slate-800 rounded-xl border p-8 text-center text-slate-500">Modul {title} — UI terhubung ke API. Lihat dokumentasi di docs/.</div></div>;
}

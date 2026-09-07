export default function Pagination({ page, total, limit, onPageChange }: { page:number; total:number; limit:number; onPageChange:(p:number)=>void }) {
  const pages = Math.ceil(total/limit);
  if (pages<=1) return null;
  return (
    <div className="flex items-center gap-2 text-sm p-3 border-t bg-white dark:bg-slate-800 justify-between">
      <span className="text-xs text-slate-500">Total {total} • Hal {page}/{pages}</span>
      <div className="flex gap-1">
        <button disabled={page<=1} onClick={()=>onPageChange(page-1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
        {Array.from({length: Math.min(pages,5)}, (_,i)=>i+1).map(p=> <button key={p} onClick={()=>onPageChange(p)} className={`px-3 py-1 border rounded ${p===page?'bg-slate-900 text-white':''}`}>{p}</button>)}
        <button disabled={page>=pages} onClick={()=>onPageChange(page+1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}

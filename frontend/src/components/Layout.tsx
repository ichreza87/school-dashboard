import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../lib/cn';
import { LayoutDashboard, Users, GraduationCap, School, BookOpen, Calendar, ClipboardList, BarChart3, FileText, Database, GitCompare, Shield, Settings, LogOut, Menu, X, Search, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

const nav = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'DATA', heading: true },
  { label: 'Siswa', icon: Users, path: '/siswa' },
  { label: 'Guru & Tendik', icon: GraduationCap, path: '/guru' },
  { label: 'Rombel', icon: School, path: '/rombel' },
  { label: 'Mata Pelajaran', icon: BookOpen, path: '/mapel' },
  { label: 'Jadwal', icon: Calendar, path: '/jadwal' },
  { label: 'AKADEMIK', heading: true },
  { label: 'Kehadiran Siswa', icon: ClipboardList, path: '/kehadiran-siswa' },
  { label: 'Kehadiran Guru', icon: ClipboardList, path: '/kehadiran-guru' },
  { label: 'Nilai', icon: FileText, path: '/nilai' },
  { label: 'Perkembangan', icon: BarChart3, path: '/perkembangan' },
  { label: 'ANALYTICS', heading: true },
  { label: 'Statistik', icon: BarChart3, path: '/analytics' },
  { label: 'LAPORAN', heading: true },
  { label: 'Report Center', icon: FileText, path: '/laporan' },
  { label: 'INTEGRASI', heading: true },
  { label: 'Dapodik', icon: Database, path: '/dapodik' },
  { label: 'Sinkronisasi', icon: GitCompare, path: '/sinkronisasi' },
  { label: 'SISTEM', heading: true },
  { label: 'Backup', icon: Shield, path: '/backup' },
  { label: 'Pengguna', icon: Users, path: '/pengguna' },
  { label: 'Pengaturan', icon: Settings, path: '/pengaturan' },
  { label: 'Audit Log', icon: Shield, path: '/audit' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const loc = useLocation();
  const nav2 = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark]);
  const role = JSON.parse(localStorage.getItem('user') || '{}')?.role;
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <aside className={cn('bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transition-all', collapsed ? 'w-16' : 'w-64')}>
        <div className="h-14 flex items-center px-3 gap-2 border-b border-slate-200 dark:border-slate-700">
          {!collapsed && <span className="font-bold text-primary-600">School Dashboard</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="ml-auto p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700">{collapsed ? <Menu size={18}/> : <X size={18}/>}</button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {nav.map((item: any, i) => item.heading ? (
            !collapsed && <div key={i} className="px-3 pt-4 pb-1 text-xs font-semibold text-slate-400 tracking-wider">{item.label}</div>
          ) : (
            <Link key={i} to={item.path} className={cn('flex items-center gap-3 px-3 py-2 mx-2 rounded-lg text-sm', loc.pathname===item.path ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300')}>
              <item.icon size={18} /> {!collapsed && item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-200 dark:border-slate-700">
          {!collapsed && <div className="text-xs text-slate-500 mb-2">{role || 'GUEST'}</div>}
          <button onClick={() => { localStorage.clear(); nav2('/login'); }} className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg w-full"><LogOut size={16}/> {!collapsed && 'Keluar'}</button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-3">
          <div className="flex-1 flex items-center gap-2 max-w-md">
            <Search size={18} className="text-slate-400" />
            <input placeholder="Cari siswa, guru, NISN... (Ctrl+K)" className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400" onKeyDown={(e) => { if (e.key==='k' && (e.ctrlKey||e.metaKey)) e.preventDefault(); }} />
          </div>
          <button onClick={() => setDark(!dark)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
          <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold">A</div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

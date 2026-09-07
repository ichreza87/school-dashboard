import { useState } from 'react';
import { api, setToken } from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [err, setErr] = useState('');
  const nav = useNavigate();
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    try {
      const res = await api('/api/auth/login', { method:'POST', body: JSON.stringify({ username, password }) });
      setToken(res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      nav('/');
    } catch (e:any) { setErr(e.message); }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-violet-600 p-4">
      <form onSubmit={submit} className="bg-white dark:bg-slate-800 rounded-2xl p-8 w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold text-center">School Dashboard</h1>
        <p className="text-center text-sm text-slate-500 mb-6">Dashboard Sekolah yang Sederhana, Terbuka, dan Mudah Dipelajari Guru.</p>
        {err && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{err}</div>}
        <label className="block text-sm font-medium mb-1">Username</label>
        <input value={username} onChange={e=>setUsername(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-3 dark:bg-slate-700 dark:border-slate-600" />
        <label className="block text-sm font-medium mb-1">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-4 dark:bg-slate-700 dark:border-slate-600" />
        <button type="submit" className="w-full bg-blue-600 text-white rounded-lg py-2.5 font-semibold hover:bg-blue-700">Masuk</button>
        <div className="mt-4 text-xs text-slate-500 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
          <b>Demo login:</b><br/>admin / admin123 (Super Admin)<br/>operator / admin123<br/>kepsek / admin123<br/>guru / admin123
        </div>
      </form>
    </div>
  );
}

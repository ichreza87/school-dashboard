const BASE = import.meta.env.VITE_API_URL || '';
export function getToken() { return localStorage.getItem('token'); }
export function setToken(t: string) { localStorage.setItem('token', t); }
export function clearToken() { localStorage.removeItem('token'); }

export async function api(path: string, opts: RequestInit = {}) {
  const headers: any = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { ...opts, headers });
  if (res.status === 401) { clearToken(); if (location.pathname !== '/login') location.href = '/login'; throw new Error('Unauthorized'); }
  const text = await res.text();
  let data: any;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) throw new Error(data?.error || res.statusText);
  return data;
}

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-org-id': 'demo-org',
      'x-user-id': 'demo-user',
      'x-user-role': 'ADMIN',
      ...(options.headers || {})
    },
    ...options
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }
  return res.json();
}

export const apiClient = {
  get: (path: string) => request(path),
  post: (path: string, body: unknown) => request(path, { method: 'POST', body: JSON.stringify(body) })
};


const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

function makeHeaders(token) {
  const h = { 'Content-Type': 'application/json' }
  if (token) h['Authorization'] = `Bearer ${token}`
  return h
}

export async function register({ name, email, password }) {
  const r = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: makeHeaders(),
    body: JSON.stringify({ name, email, password })
  })
  const data = await r.json()
  if (!r.ok) throw new Error(data?.error || 'Failed to register')
  return data
}

export async function login({ email, password }) {
  const r = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: makeHeaders(),
    body: JSON.stringify({ email, password })
  })
  const data = await r.json()
  if (!r.ok) throw new Error(data?.error || 'Failed to login')
  return data
}

export async function getMe(token) {
  const r = await fetch(`${API_BASE}/api/auth/me`, { headers: makeHeaders(token) })
  const data = await r.json()
  if (!r.ok) throw new Error(data?.error || 'Not authenticated')
  return data
}

export async function fetchMessages(token, limit = 20) {
  const r = await fetch(`${API_BASE}/api/messages?limit=${limit}`, { headers: makeHeaders(token) })
  const data = await r.json()
  if (!r.ok) throw new Error(data?.error || 'Failed to load messages')
  return data
}

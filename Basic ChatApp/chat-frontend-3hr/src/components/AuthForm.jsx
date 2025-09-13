
import React, { useState } from 'react'
import { login, register as registerApi } from '../lib/api.js'

export default function AuthForm({ onAuthed }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError(''); setSuccess('')
    try {
      if (mode === 'register') {
        const user = await registerApi({ name, email, password })
        setSuccess('Registered! You can login now.')
        setMode('login')
      } else {
        const { token, user } = await login({ email, password })
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        onAuthed({ token, user })
      }
    } catch (e) {
      setError(e?.message || 'Failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row" style={{ marginBottom: 8 }}>
        <button type="button" onClick={() => setMode('login')} className={mode==='login'?'primary':''}>Login</button>
        <button type="button" onClick={() => setMode('register')} className={mode==='register'?'primary':''}>Register</button>
      </div>

      {mode === 'register' && (
        <div className="row" style={{ marginBottom: 8 }}>
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        </div>
      )}
      <div className="row" style={{ marginBottom: 8 }}>
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="row" style={{ marginBottom: 8 }}>
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>

      <div className="row">
        <button type="submit" className="primary">{mode === 'login' ? 'Login' : 'Create account'}</button>
      </div>

      {error && <p className="error" style={{ marginTop: 8 }}>{error}</p>}
      {success && <p className="success" style={{ marginTop: 8 }}>{success}</p>}
    </form>
  )
}

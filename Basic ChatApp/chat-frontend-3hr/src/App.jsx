
import React, { useEffect, useState } from 'react'
import AuthForm from './components/AuthForm.jsx'
import Chat from './components/Chat.jsx'
import { getMe } from './lib/api.js'

export default function App() {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // optimistic: if token exists, assume logged in and let socket verify too
    (async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setChecking(false); return
        }
        await getMe(token) // not strictly needed for demo; backend returns info message
        const u = JSON.parse(localStorage.getItem('user') || 'null')
        setUser(u)
      } catch (e) {
        // token invalid; ignore
      } finally {
        setChecking(false)
      }
    })()
  }, [])

  if (checking) {
    return (
      <div className="container">
        <div className="card"><p className="muted">Loading…</p></div>
      </div>
    )
  }

  return (
    <div className="container">
      {!user ? (
        <div className="card">
          <h2>Welcome 👋</h2>
          <p className="muted">Register or login to start chatting in the global room.</p>
          <div className="spacer"></div>
          <AuthForm onAuthed={(payload) => setUser(payload.user)} />
        </div>
      ) : (
        <div className="card">
          <div className="header">
            <div className="row">
              <h2 style={{ margin: 0 }}>Global Chat</h2>
              <span className="pill">{user?.name}</span>
            </div>
            <div className="row">
              <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); location.reload() }}>Logout</button>
            </div>
          </div>
          <Chat user={user} />
        </div>
      )}
    </div>
  )
}

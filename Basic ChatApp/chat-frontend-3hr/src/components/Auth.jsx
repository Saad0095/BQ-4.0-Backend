
import React, { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:3000/api';

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'register') {
        await axios.post(`${API}/auth/register`, form);
      }
      const res = await axios.post(`${API}/auth/login`, {
        email: form.email,
        password: form.password
      });
      onLogin(res.data.token);
    } catch (e) {
      setError(e.response?.data?.error || 'Error');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
      </form>
      <p style={{ color: 'red' }}>{error}</p>
      <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
        Switch to {mode === 'login' ? 'Register' : 'Login'}
      </button>
    </div>
  );
}

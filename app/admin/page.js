'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [messages, setMessages] = useState([]);
  const [rsvps, setRsvps] = useState([]);
  const [tab, setTab] = useState('messages');

  async function loadData() {
    const [msgRes, rsvpRes] = await Promise.all([
      fetch('/api/admin/messages'),
      fetch('/api/admin/rsvps'),
    ]);
    if (msgRes.status === 401) {
      setAuthed(false);
      setChecking(false);
      return;
    }
    const msgData = await msgRes.json();
    const rsvpData = await rsvpRes.json();
    setMessages(msgData.messages || []);
    setRsvps(rsvpData.rsvps || []);
    setAuthed(true);
    setChecking(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setChecking(true);
      loadData();
    } else {
      const data = await res.json();
      setLoginError(data.error || 'Login failed.');
    }
  }

  async function updateStatus(id, status) {
    await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    loadData();
  }

  async function deleteMessage(id) {
    await fetch('/api/admin/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    loadData();
  }

  if (checking) {
    return <div style={s.page}>Loading…</div>;
  }

  if (!authed) {
    return (
      <div style={s.page}>
        <form onSubmit={handleLogin} style={s.loginForm}>
          <h1 style={s.h1}>Admin</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={s.input}
            autoFocus
          />
          <button type="submit" style={s.button}>Enter</button>
          {loginError && <p style={s.error}>{loginError}</p>}
        </form>
      </div>
    );
  }

  const pending = messages.filter((m) => m.status === 'pending');
  const approved = messages.filter((m) => m.status === 'approved');
  const rejected = messages.filter((m) => m.status === 'rejected');
  const attendingYes = rsvps.filter((r) => r.attending === 'yes').length;
  const attendingNo = rsvps.filter((r) => r.attending === 'no').length;

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <h1 style={s.h1}>Tira &amp; Lydu — Admin</h1>

        <div style={s.tabs}>
          <button
            onClick={() => setTab('messages')}
            style={tab === 'messages' ? s.tabActive : s.tab}
          >
            Messages {pending.length > 0 && `(${pending.length} pending)`}
          </button>
          <button
            onClick={() => setTab('rsvps')}
            style={tab === 'rsvps' ? s.tabActive : s.tab}
          >
            RSVPs ({rsvps.length})
          </button>
        </div>

        {tab === 'messages' && (
          <div>
            <h2 style={s.h2}>Pending ({pending.length})</h2>
            {pending.length === 0 && <p style={s.muted}>No pending messages.</p>}
            {pending.map((m) => (
              <div key={m.id} style={s.card}>
                <p style={s.msgText}>&ldquo;{m.message}&rdquo;</p>
                <p style={s.msgFrom}>— {m.name}</p>
                <div style={s.actions}>
                  <button onClick={() => updateStatus(m.id, 'approved')} style={s.approve}>Approve</button>
                  <button onClick={() => updateStatus(m.id, 'rejected')} style={s.reject}>Reject</button>
                  <button onClick={() => deleteMessage(m.id)} style={s.delete}>Delete</button>
                </div>
              </div>
            ))}

            <h2 style={s.h2}>Approved ({approved.length})</h2>
            {approved.length === 0 && <p style={s.muted}>None yet.</p>}
            {approved.map((m) => (
              <div key={m.id} style={s.card}>
                <p style={s.msgText}>&ldquo;{m.message}&rdquo;</p>
                <p style={s.msgFrom}>— {m.name}</p>
                <div style={s.actions}>
                  <button onClick={() => updateStatus(m.id, 'pending')} style={s.reject}>Unapprove</button>
                  <button onClick={() => deleteMessage(m.id)} style={s.delete}>Delete</button>
                </div>
              </div>
            ))}

            {rejected.length > 0 && (
              <>
                <h2 style={s.h2}>Rejected ({rejected.length})</h2>
                {rejected.map((m) => (
                  <div key={m.id} style={s.card}>
                    <p style={s.msgText}>&ldquo;{m.message}&rdquo;</p>
                    <p style={s.msgFrom}>— {m.name}</p>
                    <div style={s.actions}>
                      <button onClick={() => updateStatus(m.id, 'approved')} style={s.approve}>Approve</button>
                      <button onClick={() => deleteMessage(m.id)} style={s.delete}>Delete</button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {tab === 'rsvps' && (
          <div>
            <h2 style={s.h2}>{attendingYes} attending · {attendingNo} declined</h2>
            {rsvps.length === 0 ? (
              <p style={s.muted}>No RSVPs yet.</p>
            ) : (
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>Name</th>
                    <th style={s.th}>Attending</th>
                    <th style={s.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((r) => (
                    <tr key={r.id}>
                      <td style={s.td}>{r.name}</td>
                      <td style={s.td}>{r.attending === 'yes' ? 'Yes' : 'No'}</td>
                      <td style={s.td}>{new Date(r.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    background: '#F5F1E8',
    color: '#15130F',
    fontFamily: '-apple-system, sans-serif',
    padding: '40px 20px',
  },
  wrap: { maxWidth: 720, margin: '0 auto' },
  h1: { fontSize: 24, marginBottom: 24 },
  h2: { fontSize: 15, marginTop: 32, marginBottom: 12, color: '#4a4640' },
  tabs: { display: 'flex', gap: 8, marginBottom: 24 },
  tab: {
    padding: '8px 16px',
    borderRadius: 999,
    border: '1px solid rgba(21,19,15,0.2)',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: 13,
  },
  tabActive: {
    padding: '8px 16px',
    borderRadius: 999,
    border: '1px solid #A65F48',
    background: '#A65F48',
    color: '#F5F1E8',
    cursor: 'pointer',
    fontSize: 13,
  },
  card: {
    background: '#fff',
    border: '1px solid rgba(21,19,15,0.1)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  msgText: { fontStyle: 'italic', fontSize: 14, marginBottom: 6 },
  msgFrom: { fontSize: 12, color: '#8a8377', marginBottom: 10 },
  actions: { display: 'flex', gap: 8 },
  approve: { padding: '6px 12px', borderRadius: 6, border: 'none', background: '#4B5040', color: '#fff', cursor: 'pointer', fontSize: 12 },
  reject: { padding: '6px 12px', borderRadius: 6, border: 'none', background: '#B99A63', color: '#fff', cursor: 'pointer', fontSize: 12 },
  delete: { padding: '6px 12px', borderRadius: 6, border: '1px solid rgba(21,19,15,0.2)', background: 'transparent', cursor: 'pointer', fontSize: 12 },
  muted: { fontSize: 13, color: '#8a8377' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { textAlign: 'left', padding: '8px 10px', borderBottom: '1px solid rgba(21,19,15,0.2)', color: '#4a4640' },
  td: { padding: '8px 10px', borderBottom: '1px solid rgba(21,19,15,0.08)' },
  loginForm: {
    maxWidth: 300,
    margin: '80px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  input: {
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid rgba(21,19,15,0.25)',
    fontSize: 14,
  },
  button: {
    padding: '10px 12px',
    borderRadius: 8,
    border: 'none',
    background: '#A65F48',
    color: '#fff',
    cursor: 'pointer',
    fontSize: 14,
  },
  error: { color: '#A65F48', fontSize: 13 },
};

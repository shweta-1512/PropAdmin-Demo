import React, { useState } from 'react';
import axios from 'axios';
import { Building2, LayoutDashboard, ClipboardCheck, Users, FileText, LogOut, ShieldCheck, AlertTriangle, CheckCircle2, Clock3 } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://10.61.9.218:8000';

const roleNames = {
  admin: 'Administrator',
  manager: 'Project Manager',
  backend: 'Back-End Support',
  client: 'Client / Committee'
};

function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@propadmin.local');
  const [password, setPassword] = useState('Demo@123');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);

    try {
      const { data } = await axios.post(
        `${API}/api/auth/login`,
        { email, password }
      );

      sessionStorage.setItem('propadmin_token', data.access_token);
      onLogin(data.user);
    } catch (err) {
      const detail = err.response?.data?.detail;

      setError(
        typeof detail === 'string'
          ? detail
          : Array.isArray(detail)
            ? detail.map(item => item.msg || JSON.stringify(item)).join(', ')
            : detail
              ? JSON.stringify(detail)
              : 'API connection failed. Check that FastAPI is running.'
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="login-shell">
      <section className="login-brand">
        <div className="brand-mark"><Building2 size={28}/></div>
        <p className="eyebrow">PROPERTY OPERATIONS PLATFORM</p>
        <h1>One place to manage<br/><span>every property.</span></h1>
        <p className="brand-copy">A working starter for the PropAdmin platform — beginning with secure sign-in and role-aware access.</p>
        <div className="brand-foot"><ShieldCheck size={16}/> Demo environment · React + FastAPI + MySQL</div>
      </section>
      <section className="login-panel">
        <form className="login-card" onSubmit={submit}>
          <p className="eyebrow">WELCOME BACK</p>
          <h2>Sign in to PropAdmin</h2>
          <p className="muted">Use one of the demo accounts to explore the dashboard shell.</p>
          <label>Email address</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" required/>
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
          {error && <div className="error">{error}</div>}
          <button className="primary-btn" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'} <span>→</span></button>
          <div className="demo-box"><strong>Demo access</strong><br/>Password for all accounts: <code>Demo@123</code><br/><span>admin · manager · backend · client</span></div>
        </form>
      </section>
    </main>
  );
}

function Dashboard({ user, onLogout }) {
  const [active, setActive] = useState('Overview');
  const nav = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Tasks & Approvals', icon: ClipboardCheck },
    { name: 'Projects', icon: Building2 },
    { name: 'People', icon: Users },
    { name: 'Reports', icon: FileText }
  ];
  const cards = [
    { label: 'Open tasks', value: '24', note: 'Across demo projects', icon: ClipboardCheck, color: 'blue' },
    { label: 'Pending approvals', value: '07', note: 'Quotation / payment', icon: Clock3, color: 'amber' },
    { label: 'Compliance alerts', value: '03', note: 'Review required', icon: AlertTriangle, color: 'red' },
    { label: 'Reports submitted', value: '92%', note: 'This month', icon: CheckCircle2, color: 'green' }
  ];

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="side-brand"><div className="brand-mark small"><Building2 size={20}/></div><span>PropAdmin<small>PROPERTY OPERATIONS</small></span></div>
      <div className="nav-label">WORKSPACE</div>
      {nav.map(item => <button key={item.name} className={`nav-item ${active===item.name?'selected':''}`} onClick={()=>setActive(item.name)}><item.icon size={18}/>{item.name}</button>)}
      <div className="sidebar-bottom"><div className="avatar">{user.full_name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div><div className="user-mini"><strong>{user.full_name}</strong><small>{roleNames[user.role] || user.role}</small></div><button className="logout-icon" title="Sign out" onClick={onLogout}><LogOut size={17}/></button></div>
    </aside>
    <main className="dashboard-main">
      <header className="topbar"><div><span className="muted">Workspace / </span>{active}</div><div className="top-user"><span className="status-dot"></span>{roleNames[user.role] || user.role}</div></header>
      <section className="welcome-row"><div><p className="eyebrow">FRIDAY · DEMO WORKSPACE</p><h1>{active === 'Overview' ? `Good to see you, ${user.full_name.split(' ')[1] || user.full_name}` : active}</h1><p className="muted">{active === 'Overview' ? 'Here is a quick view of what needs attention today.' : `Starter view for ${active.toLowerCase()}. Module screens will be added in the next iteration.`}</p></div><div className="date-chip">PROPADMIN · V1 DEMO</div></section>
      <section className="stats-grid">{cards.map(c=><article className="stat-card" key={c.label}><div className={`stat-icon ${c.color}`}><c.icon size={19}/></div><p>{c.label}</p><h2>{c.value}</h2><small>{c.note}</small></article>)}</section>
      <section className="content-grid">
        <article className="panel task-panel"><div className="panel-head"><div><h3>Items requiring attention</h3><p className="muted">Illustrative demo data — not live records</p></div><span className="pill">Today</span></div>
          {[['Vendor quotation approval','Client / Committee','Waiting approval','amber'],['DG fuel below 50 LTR','Project Manager','Auto-task generated','red'],['Compliance evidence review','Back-End Support','Evidence pending','blue'],['Petty cash correction request','Back-End Support','Awaiting review','amber']].map(x=><div className="attention-row" key={x[0]}><div className="task-bullet"></div><div className="task-text"><strong>{x[0]}</strong><small>{x[1]}</small></div><span className={`tag ${x[3]}`}>{x[2]}</span></div>)}
        </article>
        <article className="panel health-panel"><div className="panel-head"><div><h3>Operational health</h3><p className="muted">Sample indicators</p></div></div><div className="health-score"><div className="score-ring"><strong>92</strong><small>/100</small></div><div><strong>Good standing</strong><p className="muted">Illustrative score only</p></div></div><div className="health-line"><span>Daily reports</span><strong>92%</strong></div><div className="progress"><span style={{width:'92%'}}/></div><div className="health-line"><span>Compliance evidence</span><strong>84%</strong></div><div className="progress amber-progress"><span style={{width:'84%'}}/></div><div className="notice"><AlertTriangle size={17}/><span>Critical compliance issues should remain visible until resolved.</span></div></article>
      </section>
      <footer className="footer-note">PropAdmin demo · Authentication is connected to the FastAPI backend. Dashboard figures are placeholders.</footer>
    </main>
  </div>;
}

export default function App() {
  const [user, setUser] = useState(null);
  function logout() {
    sessionStorage.removeItem('propadmin_token');
    setUser(null);
  }
  return user ? <Dashboard user={user} onLogout={logout}/> : <Login onLogin={setUser}/>;
}

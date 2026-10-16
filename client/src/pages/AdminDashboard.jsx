import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiLogout, HiMail, HiMailOpen, HiPencil, HiPlus, HiStar, HiTrash } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import ProjectForm from '../components/ProjectForm';

function Messages({ token, messages, reload, onUnauthorized }) {
  const run = async (fn) => {
    try {
      await fn();
      reload();
    } catch (err) {
      if (err.status === 401) onUnauthorized();
      else alert(err.message);
    }
  };

  if (!messages.length) return <p className="text-slate-500">No messages yet.</p>;

  return (
    <ul className="space-y-4">
      {messages.map((m) => (
        <li key={m._id} className={`card p-5 ${m.read ? 'opacity-70' : 'border-indigo-400/40'}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-white">
                {m.name}{' '}
                <a href={`mailto:${m.email}`} className="text-sm font-normal text-cyan-400 hover:underline">
                  &lt;{m.email}&gt;
                </a>
              </p>
              {m.subject && <p className="text-sm text-slate-300">{m.subject}</p>}
              <p className="text-xs text-slate-500">{new Date(m.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-ghost !px-3 !py-1.5"
                title={m.read ? 'Mark unread' : 'Mark read'}
                onClick={() => run(() => api(`/messages/${m._id}/read`, { method: 'PATCH', token, body: { read: !m.read } }))}
              >
                {m.read ? <HiMail /> : <HiMailOpen />}
              </button>
              <button
                className="btn btn-ghost !px-3 !py-1.5 hover:!text-rose-400"
                title="Delete"
                onClick={() => confirm('Delete this message?') && run(() => api(`/messages/${m._id}`, { method: 'DELETE', token }))}
              >
                <HiTrash />
              </button>
            </div>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm text-slate-400">{m.message}</p>
        </li>
      ))}
    </ul>
  );
}

function Projects({ token, projects, reload, onUnauthorized }) {
  const [editing, setEditing] = useState(null); // null | {} (new) | project

  const handleError = (err) => {
    if (err.status === 401) onUnauthorized();
    throw err;
  };

  const save = async (data) => {
    const req = editing._id
      ? api(`/projects/${editing._id}`, { method: 'PUT', token, body: data })
      : api('/projects', { method: 'POST', token, body: data });
    await req.catch(handleError);
    setEditing(null);
    reload();
  };

  const remove = async (p) => {
    if (!confirm(`Delete "${p.title}"?`)) return;
    try {
      await api(`/projects/${p._id}`, { method: 'DELETE', token });
      reload();
    } catch (err) {
      if (err.status === 401) onUnauthorized();
      else alert(err.message);
    }
  };

  return (
    <>
      <button onClick={() => setEditing({})} className="btn btn-primary mb-6">
        <HiPlus /> Add project
      </button>
      <ul className="space-y-3">
        {projects.map((p) => (
          <li key={p._id} className="card flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-semibold text-white">
                <span className="font-mono text-xs text-slate-500">#{p.order}</span>
                {p.title}
                {p.featured && <HiStar className="text-amber-300" title="Featured" />}
              </p>
              <p className="truncate text-sm text-slate-500">{p.tech.join(' · ')}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button className="btn btn-ghost !px-3 !py-1.5" title="Edit" onClick={() => setEditing(p)}>
                <HiPencil />
              </button>
              <button className="btn btn-ghost !px-3 !py-1.5 hover:!text-rose-400" title="Delete" onClick={() => remove(p)}>
                <HiTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editing && <ProjectForm project={editing} onSave={save} onCancel={() => setEditing(null)} />}
    </>
  );
}

export default function AdminDashboard() {
  const { token, admin, logout } = useAuth();
  const [tab, setTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const [m, p] = await Promise.all([api('/messages', { token }), api('/projects')]);
      setMessages(m);
      setProjects(p);
      setError('');
    } catch (err) {
      if (err.status === 401) logout();
      else setError(err.message);
    }
  }, [token, logout]);

  useEffect(() => {
    load();
  }, [load]);

  const unread = messages.filter((m) => !m.read).length;
  const tabs = [
    { id: 'messages', label: `Messages${unread ? ` (${unread} new)` : ''}` },
    { id: 'projects', label: `Projects (${projects.length})` },
  ];

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-slate-500">Signed in as {admin?.email}</p>
        </div>
        <div className="flex gap-2">
          <Link to="/" className="btn btn-ghost">
            View site
          </Link>
          <button onClick={logout} className="btn btn-ghost">
            <HiLogout /> Logout
          </button>
        </div>
      </header>

      <div className="mb-6 flex gap-2 border-b border-white/10">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition ${
              tab === t.id ? 'border-indigo-400 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && <p className="mb-4 text-sm text-rose-400">{error}</p>}

      {tab === 'messages' ? (
        <Messages token={token} messages={messages} reload={load} onUnauthorized={logout} />
      ) : (
        <Projects token={token} projects={projects} reload={load} onUnauthorized={logout} />
      )}
    </div>
  );
}

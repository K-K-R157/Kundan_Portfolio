import { useState } from 'react';

const toForm = (p = {}) => ({
  title: p.title || '',
  subtitle: p.subtitle || '',
  description: p.description || '',
  highlights: (p.highlights || []).join('\n'),
  tech: (p.tech || []).join(', '),
  github: p.github || '',
  live: p.live || '',
  date: p.date || '',
  featured: Boolean(p.featured),
  order: p.order ?? 0,
});

const fromForm = (f) => ({
  ...f,
  highlights: f.highlights.split('\n').map((s) => s.trim()).filter(Boolean),
  tech: f.tech.split(',').map((s) => s.trim()).filter(Boolean),
  order: Number(f.order) || 0,
});

export default function ProjectForm({ project, onSave, onCancel }) {
  const [form, setForm] = useState(() => toForm(project));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const set = (key) => (e) =>
    setForm({ ...form, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSave(fromForm(form));
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
      <form onSubmit={submit} className="card my-8 w-full max-w-2xl space-y-4 bg-slate-950 p-6">
        <h2 className="text-lg font-semibold text-white">{project?._id ? 'Edit project' : 'New project'}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <input className="input" placeholder="Title *" value={form.title} onChange={set('title')} required />
          <input className="input" placeholder="Subtitle" value={form.subtitle} onChange={set('subtitle')} />
        </div>
        <textarea className="input min-h-24" placeholder="Description *" value={form.description} onChange={set('description')} required />
        <textarea className="input min-h-28" placeholder="Highlights (one per line)" value={form.highlights} onChange={set('highlights')} />
        <input className="input" placeholder="Tech (comma separated)" value={form.tech} onChange={set('tech')} />
        <div className="grid gap-4 sm:grid-cols-2">
          <input className="input" placeholder="GitHub URL" value={form.github} onChange={set('github')} />
          <input className="input" placeholder="Live URL" value={form.live} onChange={set('live')} />
        </div>
        <div className="grid items-center gap-4 sm:grid-cols-3">
          <input className="input" placeholder="Date (e.g. Nov 2025)" value={form.date} onChange={set('date')} />
          <input className="input" type="number" placeholder="Order" value={form.order} onChange={set('order')} />
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={form.featured} onChange={set('featured')} className="h-4 w-4 accent-indigo-500" />
            Featured
          </label>
        </div>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="btn btn-ghost">
            Cancel
          </button>
          <button className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

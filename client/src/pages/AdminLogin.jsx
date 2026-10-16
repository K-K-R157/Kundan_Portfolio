import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { HiLockClosed } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { admin, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (admin) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-5">
      <form onSubmit={submit} className="card w-full max-w-sm space-y-4 p-8">
        <div className="mb-2 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-indigo-500/15 text-xl text-indigo-300">
            <HiLockClosed />
          </span>
          <h1 className="mt-4 text-xl font-bold text-white">Admin Login</h1>
          <p className="text-sm text-slate-500">Manage projects and messages</p>
        </div>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          autoComplete="username"
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          autoComplete="current-password"
        />
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
        <Link to="/" className="block text-center text-sm text-slate-500 hover:text-slate-300">
          ← Back to portfolio
        </Link>
      </form>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { profile } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with MongoDB, Express, React, Node & Tailwind CSS.
        </p>
        <Link to="/admin" className="hover:text-slate-300">
          Admin
        </Link>
      </div>
    </footer>
  );
}

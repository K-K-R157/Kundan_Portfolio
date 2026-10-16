import { useState } from 'react';
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi';
import { api } from '../lib/api';
import { profile } from '../data/portfolio';
import Section from './Section';
import SocialLinks from './SocialLinks';

const empty = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ state: 'idle', text: '' });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', text: '' });
    try {
      const res = await api('/messages', { method: 'POST', body: form });
      setStatus({ state: 'success', text: res.message });
      setForm(empty);
    } catch (err) {
      setStatus({ state: 'error', text: err.message || 'Something went wrong. Please email me directly.' });
    }
  };

  const info = [
    { icon: HiMail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: HiPhone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: HiLocationMarker, label: profile.location },
  ];

  return (
    <Section id="contact" eyebrow="06. contact" title="Let's work together">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-slate-400 sm:text-lg">
            I&apos;m currently looking for SDE internship and full-time opportunities. Whether you have a role in mind,
            a project idea or just want to say hi, my inbox is open.
          </p>
          <ul className="mt-8 space-y-4">
            {info.map(({ icon: Icon, label, href }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/15 text-indigo-300">
                  <Icon />
                </span>
                {href ? (
                  <a href={href} className="text-slate-300 hover:text-white">
                    {label}
                  </a>
                ) : (
                  <span className="text-slate-300">{label}</span>
                )}
              </li>
            ))}
          </ul>
          <SocialLinks className="mt-8" />
        </div>

        <form onSubmit={submit} className="card space-y-4 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="input" name="name" placeholder="Your name" value={form.name} onChange={update} required maxLength={100} />
            <input className="input" type="email" name="email" placeholder="Your email" value={form.email} onChange={update} required maxLength={200} />
          </div>
          <input className="input" name="subject" placeholder="Subject" value={form.subject} onChange={update} maxLength={200} />
          <textarea
            className="input min-h-36 resize-y"
            name="message"
            placeholder="Your message"
            value={form.message}
            onChange={update}
            required
            maxLength={5000}
          />
          <button type="submit" className="btn btn-primary w-full" disabled={status.state === 'loading'}>
            {status.state === 'loading' ? 'Sending...' : (
              <>
                Send message <HiPaperAirplane className="rotate-90" />
              </>
            )}
          </button>
          {status.text && (
            <p className={`text-sm ${status.state === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>{status.text}</p>
          )}
        </form>
      </div>
    </Section>
  );
}

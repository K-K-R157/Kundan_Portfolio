import { HiExternalLink, HiStar, HiUserGroup } from 'react-icons/hi';
import { achievements, leadership } from '../data/portfolio';
import Section from './Section';

export default function Achievements() {
  return (
    <Section id="achievements" eyebrow="05. achievements" title="Achievements & leadership">
      <div className="grid gap-6 md:grid-cols-3">
        {achievements.map((a) => (
          <div key={a.title} className="card p-6 transition hover:border-indigo-400/40">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400/15 text-lg text-amber-300">
                <HiStar />
              </span>
              {a.date && <span className="font-mono text-xs text-slate-500">{a.date}</span>}
            </div>
            <h3 className="mt-4 font-semibold text-white">{a.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{a.detail}</p>
            {a.link && (
              <a
                href={a.link}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm text-cyan-400 hover:underline"
              >
                View profile <HiExternalLink />
              </a>
            )}
          </div>
        ))}
      </div>

      {leadership.map((l) => (
        <div key={l.title} className="card mt-6 flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-indigo-500/15 text-xl text-indigo-300">
            <HiUserGroup />
          </span>
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold text-white">{l.title}</h3>
              <span className="font-mono text-xs text-slate-500">{l.date}</span>
            </div>
            <p className="mt-1 text-sm text-slate-400">{l.detail}</p>
          </div>
        </div>
      ))}
    </Section>
  );
}

import { HiBriefcase } from 'react-icons/hi';
import { experience } from '../data/portfolio';
import Section from './Section';

export default function Experience() {
  return (
    <Section id="experience" eyebrow="02. experience" title="Where I've worked">
      <ol className="relative space-y-10 border-l border-white/10 pl-8">
        {experience.map((job) => (
          <li key={job.org} className="relative">
            <span className="absolute top-1 -left-[2.85rem] grid h-9 w-9 place-items-center rounded-full border border-indigo-400/40 bg-slate-950 text-indigo-300">
              <HiBriefcase />
            </span>
            <div className="card p-6 transition hover:border-indigo-400/40">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                  <p className="text-cyan-400">{job.org}</p>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-slate-400">{job.period}</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-400 sm:text-base">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {job.stack.map((t) => (
                  <span key={t} className="rounded-md bg-indigo-500/10 px-2.5 py-1 font-mono text-xs text-indigo-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

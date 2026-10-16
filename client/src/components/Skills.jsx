import { skills } from '../data/portfolio';
import Section from './Section';

export default function Skills() {
  return (
    <Section id="skills" eyebrow="04. skills" title="Tech I work with">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map(({ title, icon: GroupIcon, items }) => (
          <div
            key={title}
            className={`card p-6 transition hover:border-indigo-400/40 ${title === 'Tools & APIs' ? 'lg:row-span-2' : ''}`}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/15 text-lg text-indigo-300">
                <GroupIcon />
              </span>
              <h3 className="font-semibold text-white">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map(({ name, icon: Icon }) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-1.5 text-sm text-slate-300 transition hover:border-cyan-400/50 hover:text-white"
                >
                  {Icon && <Icon className="text-cyan-400" />}
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

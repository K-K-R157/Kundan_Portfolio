import { HiAcademicCap, HiLocationMarker } from 'react-icons/hi';
import { education, profile, stats } from '../data/portfolio';
import Section from './Section';

export default function About() {
  return (
    <Section id="about" eyebrow="01. about me" title="Who I am">
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5 text-base leading-relaxed text-slate-400 sm:text-lg">
          <p>{profile.summary}</p>
          <p>
            Outside of building products I sharpen my problem-solving on LeetCode and GeeksforGeeks, and I was a{' '}
            <span className="text-white">national semi-finalist at Flipkart GRID 7.0</span>.
          </p>
          <p className="flex items-center gap-2 text-sm text-slate-500">
            <HiLocationMarker className="text-cyan-400" /> {profile.location}
          </p>
        </div>

        <div className="space-y-5">
          <div className="card p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/15 text-xl text-indigo-300">
                <HiAcademicCap />
              </span>
              <p className="text-sm font-medium text-cyan-400">Education</p>
            </div>
            <h3 className="font-semibold text-white">{education.school}</h3>
            <p className="mt-1 text-sm text-slate-400">{education.degree}</p>
            <div className="mt-3 flex justify-between text-sm">
              <span className="text-slate-500">{education.period}</span>
              <span className="font-mono text-slate-300">{education.score}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="card p-4 text-center">
                <p className="gradient-text text-2xl font-bold">{s.value}</p>
                <p className="mt-1 text-xs text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

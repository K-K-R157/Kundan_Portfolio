import { useEffect, useState } from 'react';
import { HiArrowDown, HiDownload } from 'react-icons/hi';
import { profile } from '../data/portfolio';
import SocialLinks from './SocialLinks';

// Typewriter effect cycling through profile.roles
function useTypewriter(words, { type = 70, erase = 35, hold = 1600 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let delay = deleting ? erase : type;
    if (!deleting && text === word) delay = hold;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words, type, erase, hold]);

  return text;
}

export default function Hero() {
  const role = useTypewriter(profile.roles);

  return (
    <header id="top" className="relative overflow-hidden">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute top-40 -right-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="mx-auto grid min-h-[min(100svh,960px)] max-w-6xl items-center gap-12 px-5 pt-24 pb-16 sm:px-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Open to SDE internships & full-time roles
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
          </h1>
          <p className="mt-4 h-8 font-mono text-lg text-slate-300 sm:text-xl">
            {role}
            <span className="blink text-cyan-400">|</span>
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">{profile.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary">
              View Projects <HiArrowDown />
            </a>
            <a href={profile.resume} download className="btn btn-ghost">
              <HiDownload /> Download Resume
            </a>
          </div>

          <SocialLinks className="mt-8" />
        </div>

        <div className="relative order-first mx-auto w-52 sm:w-72 md:order-none md:w-full md:max-w-sm">
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 opacity-60 blur-xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="aspect-square w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="card absolute -bottom-5 -left-5 hidden px-4 py-3 sm:block">
            <p className="text-xs text-slate-400">Currently</p>
            <p className="text-sm font-semibold text-white">B.Tech CSE @ IIIT Guwahati</p>
          </div>
        </div>
      </div>
    </header>
  );
}

import { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink, HiFolder } from 'react-icons/hi';
import { api } from '../lib/api';
import { fallbackProjects, profile } from '../data/portfolio';
import Section from './Section';

function TechTags({ tech }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <span key={t} className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-300">
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectLinks({ project }) {
  return (
    <div className="flex items-center gap-3 text-lg text-slate-400">
      {project.github && (
        <a href={project.github} target="_blank" rel="noreferrer" aria-label="Source code" className="hover:text-white">
          <FaGithub />
        </a>
      )}
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer" aria-label="Live demo" className="hover:text-white">
          <HiExternalLink />
        </a>
      )}
    </div>
  );
}

function FeaturedCard({ project, index }) {
  return (
    <article className="card group relative overflow-hidden p-7 transition hover:-translate-y-1 hover:border-indigo-400/40">
      <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl transition group-hover:bg-cyan-500/15" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-cyan-400">
            Featured #{index + 1}
            {project.date && ` · ${project.date}`}
          </p>
          <h3 className="mt-2 text-xl font-bold text-white">{project.title}</h3>
          {project.subtitle && <p className="text-sm text-slate-400">{project.subtitle}</p>}
        </div>
        <ProjectLinks project={project} />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-400">{project.description}</p>
      {project.highlights?.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm text-slate-400">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-cyan-400">▹</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <TechTags tech={project.tech} />
      </div>
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-primary mt-6 !py-2">
          Live Demo <HiExternalLink />
        </a>
      )}
    </article>
  );
}

function SmallCard({ project }) {
  return (
    <article className="card flex flex-col p-6 transition hover:-translate-y-1 hover:border-indigo-400/40">
      <div className="flex items-center justify-between">
        <HiFolder className="text-3xl text-indigo-400" />
        <ProjectLinks project={project} />
      </div>
      <h3 className="mt-4 font-semibold text-white">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{project.description}</p>
      <div className="mt-4">
        <TechTags tech={project.tech} />
      </div>
    </article>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    api('/projects')
      .then((data) => Array.isArray(data) && data.length && setProjects(data))
      .catch(() => {}); // keep fallback data if API is unavailable
  }, []);

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const visibleOthers = showAll ? others : others.slice(0, 3);

  return (
    <Section id="projects" eyebrow="03. projects" title="Things I've built">
      <div className="grid gap-6 lg:grid-cols-2">
        {featured.map((p, i) => (
          <FeaturedCard key={p._id || p.title} project={p} index={i} />
        ))}
      </div>

      {others.length > 0 && (
        <>
          <h3 className="mt-20 mb-8 text-center text-2xl font-bold text-white">Other noteworthy projects</h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleOthers.map((p) => (
              <SmallCard key={p._id || p.title} project={p} />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {others.length > 3 && (
              <button onClick={() => setShowAll((s) => !s)} className="btn btn-ghost">
                {showAll ? 'Show less' : `Show all (${others.length})`}
              </button>
            )}
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <FaGithub /> More on GitHub
            </a>
          </div>
        </>
      )}
    </Section>
  );
}

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { HiMail } from 'react-icons/hi';
import { profile } from '../data/portfolio';

const links = [
  { href: profile.socials.github, icon: FaGithub, label: 'GitHub' },
  { href: profile.socials.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
  { href: profile.socials.leetcode, icon: SiLeetcode, label: 'LeetCode' },
  { href: `mailto:${profile.email}`, icon: HiMail, label: 'Email' },
];

export default function SocialLinks({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel="noreferrer"
          aria-label={label}
          title={label}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-lg text-slate-300 transition hover:-translate-y-0.5 hover:border-indigo-400/60 hover:text-white"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

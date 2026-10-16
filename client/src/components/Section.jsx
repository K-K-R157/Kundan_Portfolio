import { useReveal } from '../hooks/useReveal';

export default function Section({ id, eyebrow, title, children, className = '' }) {
  const ref = useReveal();
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28 ${className}`}>
      <div ref={ref} className="reveal">
        {title && (
          <header className="mb-12">
            {eyebrow && <p className="mb-2 font-mono text-sm text-cyan-400">{eyebrow}</p>}
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

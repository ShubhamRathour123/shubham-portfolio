"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";

export default function ProjectsSection() {
  const { content } = usePortfolioContent();

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 gradient">Projects</h2>

        <div className="grid gap-8 md:grid-cols-2">
          {content.projects.map((project) => (
            <article
              key={project.title}
              className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm shadow-slate-900/5 transition hover:border-cyan-400 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:shadow-none"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {project.title}
              </h3>

              <p className="mb-6 leading-relaxed text-slate-600 dark:text-gray-400">
                {project.description}
              </p>

              <ul className="mb-6 space-y-2 text-sm leading-relaxed text-slate-700 dark:text-gray-300">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span aria-hidden="true" className="text-cyan-300">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>

              <ul className="mb-6 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                {project.tech.map((technology) => (
                  <li key={technology} className="rounded-full border border-cyan-500/20 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-100">
                    {technology}
                  </li>
                ))}
              </ul>

              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400"
              >
                Live Demo <ExternalLink size={16} aria-hidden="true" />
              </a>

              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-5 inline-flex items-center gap-2 text-cyan-400"
                >
                  Source Code <ExternalLink size={16} aria-hidden="true" />
                </a>
              )}
              {project.title === "TrueRemittance" && <ArchitectureSnapshot />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureSnapshot() {
  return (
    <details className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-black/20">
      <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900 dark:text-white">
        Architecture &amp; Code Snapshot
        <ChevronDown size={18} aria-hidden="true" className="text-cyan-300" />
      </summary>

      <div className="mt-5 space-y-5">
        <pre className="overflow-x-auto rounded-md border border-slate-200 bg-slate-900 p-4 font-mono text-xs leading-6 text-cyan-100 dark:border-white/10 dark:bg-[#070b1c]">{`[Client Request]
        -> [Next.js API Route]
        -> [Prisma ORM / PostgreSQL]
        -> [Rate & Fee Engine]
        -> [Ranked Payout Response]`}</pre>

        <pre className="overflow-x-auto rounded-md border border-slate-200 bg-slate-900 p-4 text-left text-xs leading-6 text-slate-200 dark:border-white/10 dark:bg-[#070b1c]"><code>{`type RateSnapshot = {
  feeAed: number;
  exchangeRate: number;
};

export function calculatePayout(
  amountAed: number,
  snapshot: RateSnapshot,
): number {
  return (amountAed - snapshot.feeAed) * snapshot.exchangeRate;
}`}</code></pre>
      </div>
    </details>
  );
}

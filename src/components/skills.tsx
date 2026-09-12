"use client";

import { usePortfolioContent } from "@/hooks/use-portfolio-content";

export default function Skills() {
  const { content } = usePortfolioContent();

  return (
    <section className="bg-slate-50 px-6 py-24 text-slate-900 dark:bg-[#050816] dark:text-slate-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 gradient">Skills</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {content.skillCategories.map((category) => (
            <section
              key={category.name}
              className="rounded-lg border border-slate-200 bg-white p-6 text-slate-900 shadow-sm shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:shadow-none"
            >
              <h3 className="mb-4 text-xl font-semibold text-cyan-800 dark:text-cyan-300">{category.name}</h3>
              <ul className="flex flex-wrap gap-2" aria-label={`${category.name} skills`}>
                {category.skills.map((skill) => (
                  <li key={skill} className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

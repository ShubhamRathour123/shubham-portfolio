"use client";

import { usePortfolioContent } from "@/hooks/use-portfolio-content";

export default function Skills() {
  const { content } = usePortfolioContent();

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 gradient">Skills</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {content.skillCategories.map((category) => (
            <section
              key={category.name}
              className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <h3 className="mb-4 text-xl font-semibold text-cyan-300">{category.name}</h3>
              <ul className="flex flex-wrap gap-2" aria-label={`${category.name} skills`}>
                {category.skills.map((skill) => (
                  <li key={skill} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-gray-200">
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

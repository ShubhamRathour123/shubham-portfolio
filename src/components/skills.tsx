"use client";

import { usePortfolioContent } from "@/hooks/use-portfolio-content";

export default function Skills() {
  const { content } = usePortfolioContent();

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 gradient">Skills</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {content.skills.map((skill) => (
            <div
              key={skill}
              className="border border-white/10 rounded-lg p-6 bg-white/5 backdrop-blur-xl hover:border-cyan-400 transition"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

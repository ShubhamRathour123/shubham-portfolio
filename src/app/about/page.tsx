"use client";

import { usePortfolioContent } from "@/hooks/use-portfolio-content";

export default function AboutPage() {
  const { content } = usePortfolioContent();

  return (
    <section className="min-h-screen px-6 py-32">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-10 gradient">About Me</h1>

        <div className="space-y-6 text-lg leading-relaxed text-slate-700 dark:text-gray-300">
          {content.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

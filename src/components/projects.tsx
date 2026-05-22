"use client";

import { ExternalLink } from "lucide-react";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";

export default function ProjectsSection() {
  const { content } = usePortfolioContent();

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 gradient">Projects</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {content.projects.map((project) => (
            <div
              key={project.title}
              className="p-8 rounded-lg border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-400 transition"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {project.title}
              </h3>

              <p className="text-gray-400 mb-6 leading-relaxed">
                {project.description}
              </p>

              <a
                href={project.link}
                target="_blank"
                className="inline-flex items-center gap-2 text-cyan-400"
              >
                Live Demo <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

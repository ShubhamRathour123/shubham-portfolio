"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";

export default function Hero() {
  const { content } = usePortfolioContent();
  const { hero } = content;

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-cyan-400">
            {hero.heading} <span className="gradient">{hero.highlightedName}</span>
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            {hero.role}
          </h1>

          <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-gray-400">
            {hero.summary}
          </p>

          <p className="mb-8 inline-flex rounded-full border border-cyan-500/30 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-800 dark:border-cyan-400/40 dark:bg-cyan-400/10 dark:text-cyan-100">
            {hero.availability}
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="/projects"
              className="px-6 py-3 rounded-lg bg-cyan-500 text-black font-semibold hover:scale-105 transition"
            >
              View Projects
            </a>

            <a
              href={hero.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-cyan-500 px-6 py-3 font-medium transition hover:bg-cyan-50 dark:border-cyan-400 dark:hover:bg-cyan-400/10"
            >
              GitHub
            </a>

            <a
              href={hero.linkedInUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-cyan-500 px-6 py-3 font-medium transition hover:bg-cyan-50 dark:border-cyan-400 dark:hover:bg-cyan-400/10"
            >
              LinkedIn
            </a>

            <a
              href={hero.resumeUrl}
              download
              className="rounded-lg border border-cyan-500 px-6 py-3 font-medium transition hover:bg-cyan-50 dark:border-cyan-400 dark:hover:bg-cyan-400/10"
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-30 rounded-full"></div>

            <Image
              src="/shubham.png"
              alt="Shubham"
              width={380}
              height={380}
              className="relative rounded-3xl border border-cyan-400 glow"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

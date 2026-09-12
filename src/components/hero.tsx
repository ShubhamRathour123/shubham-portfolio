"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";

export default function Hero() {
  const { content } = usePortfolioContent();
  const { hero } = content;

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-900 dark:bg-transparent dark:text-slate-100">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 font-medium text-cyan-700 dark:text-cyan-300">
            {hero.heading} <span className="gradient">{hero.highlightedName}</span>
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-900 md:text-6xl dark:text-slate-100">
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
              className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:scale-105 hover:bg-cyan-700 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
            >
              View Projects
            </a>

            <a
              href={hero.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-900 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              GitHub
            </a>

            <a
              href={hero.linkedInUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-900 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              LinkedIn
            </a>

            <a
              href={hero.resumeUrl}
              download
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-900 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
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

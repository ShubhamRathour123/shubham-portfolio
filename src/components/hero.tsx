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
          <p className="text-cyan-400 mb-4">{hero.role}</p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            {hero.heading}{" "}
            <span className="gradient">{hero.highlightedName}</span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            {hero.summary}
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
              className="px-6 py-3 rounded-lg border border-cyan-400 hover:bg-cyan-400/10"
            >
              GitHub
            </a>

            <a
              href={hero.resumeUrl}
              download
              className="px-6 py-3 rounded-lg border border-cyan-400 hover:bg-cyan-400/10 transition"
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

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-cyan-400 mb-4">
            Full Stack Developer
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Hi, I’m <span className="gradient">Shubham</span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            MCA graduate and passionate Next.js developer focused on building scalable modern web applications using React, Next.js, MongoDB, and TypeScript.
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="/projects"
              className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:scale-105 transition"
            >
              View Projects
            </a>

            <a
              href="https://github.com/ShubhamRathour123"
              target="_blank"
              className="px-6 py-3 rounded-xl border border-cyan-400 hover:bg-cyan-400/10"
            >
              GitHub
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
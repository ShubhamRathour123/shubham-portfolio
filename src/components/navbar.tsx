"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 z-50 w-full border-b border-slate-300 bg-white/95 text-slate-900 shadow-sm shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700 dark:bg-[#050816]/95 dark:text-slate-100 dark:shadow-none"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold gradient">
          Shubham.dev
        </h1>

        <div className="flex items-center gap-4 text-sm font-medium sm:gap-6">
          <Link className="text-slate-900 transition-colors hover:text-cyan-700 dark:text-slate-100 dark:hover:text-cyan-300" href="/">Home</Link>
          <Link className="text-slate-900 transition-colors hover:text-cyan-700 dark:text-slate-100 dark:hover:text-cyan-300" href="/about">About</Link>
          <Link className="text-slate-900 transition-colors hover:text-cyan-700 dark:text-slate-100 dark:hover:text-cyan-300" href="/projects">Projects</Link>
          <Link className="text-slate-900 transition-colors hover:text-cyan-700 dark:text-slate-100 dark:hover:text-cyan-300" href="/contact">Contact</Link>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}

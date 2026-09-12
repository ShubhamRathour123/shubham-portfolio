"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 z-50 w-full border-b border-slate-200/80 bg-white/75 text-slate-900 backdrop-blur-xl dark:border-white/10 dark:bg-black/30 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold gradient">
          Shubham.dev
        </h1>

        <div className="flex items-center gap-4 text-sm sm:gap-6">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}

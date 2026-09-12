"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  if (!mounted) {
    return <span aria-hidden="true" className="h-9 w-9" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300/80 bg-white/80 text-slate-800 shadow-sm transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileTap={{ scale: 0.9 }}
    >
      <motion.span
        initial={false}
        animate={{ opacity: isDark ? 1 : 0, rotate: isDark ? 0 : -90, scale: isDark ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Moon size={17} aria-hidden="true" />
      </motion.span>
      <motion.span
        initial={false}
        animate={{ opacity: isDark ? 0 : 1, rotate: isDark ? 90 : 0, scale: isDark ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Sun size={18} aria-hidden="true" />
      </motion.span>
    </motion.button>
  );
}

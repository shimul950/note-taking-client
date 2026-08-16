"use client";

import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-24 text-center gap-8">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-semibold max-w-2xl leading-tight"
      >
        Everything you're thinking, kept in one place.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="max-w-md text-ink/70 dark:text-bone/70"
      >
        Quick to capture, easy to find again. No folders to manage, no friction to fight.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        whileHover={{ rotate: 2, scale: 1.03 }}
        className="relative h-56 w-64 mt-8 cursor-default"
      >
        <motion.div
          initial={{ rotate: -8 }}
          className="absolute inset-0 rounded-md bg-marker/80 shadow-md"
        />
        <motion.div
          initial={{ rotate: 4 }}
          className="absolute inset-0 rounded-md bg-pine/10 border border-pine/30 shadow-md"
        />
        <div className="absolute inset-0 rounded-md bg-paper dark:bg-graphite border border-ink/10 dark:border-bone/10 shadow-lg p-4 text-left font-[family-name:var(--font-mono)] text-xs text-ink/60 dark:text-bone/60">
          <div className="absolute -top-2 left-6 h-4 w-10 bg-marker/60 rotate-[-3deg]" />
          grocery list
          <br />— oat milk
          <br />— basil
          <br />— that book Sam mentioned
        </div>
      </motion.div>

      <motion.a
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
        href="/register"
        className="mt-4 rounded-full bg-pine text-bone px-6 py-3 font-medium hover:opacity-90 transition-opacity"
      >
        Start writing
      </motion.a>
    </main>
  );
}
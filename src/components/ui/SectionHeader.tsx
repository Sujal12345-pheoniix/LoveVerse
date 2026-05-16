"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  dark?: boolean;
}

export default function SectionHeader({ title, subtitle, dark = false }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`text-4xl md:text-6xl font-serif mb-4 ${dark ? 'text-white' : 'text-deep-purple'}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`font-serif italic text-xl ${dark ? 'text-lavender/60' : 'text-rose-gold'}`}
        >
          "{subtitle}"
        </motion.p>
      )}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "80px" }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="h-1 bg-primary mx-auto mt-6 rounded-full"
      />
    </div>
  );
}

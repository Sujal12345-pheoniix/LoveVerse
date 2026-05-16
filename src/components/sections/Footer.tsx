"use client";

import { motion } from "framer-motion";
import { NICKNAMES } from "@/constants/content";

export default function Footer() {
  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-24 bg-deep-purple relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-8xl font-serif text-white mb-8">
            I Love You, <span className="text-primary italic">Phuchku</span>
          </h2>
          <div className="flex justify-center gap-4 text-rose-gold text-2xl font-serif italic opacity-60">
            <span>{NICKNAMES.kuchu}</span>
            <span>•</span>
            <span>{NICKNAMES.madamji}</span>
            <span>•</span>
            <span>{NICKNAMES.maalikn}</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-lavender/40 font-sans tracking-[0.5em] uppercase text-xs mb-12"
        >
          Forever & Always
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReplay}
          className="glass px-10 py-4 rounded-full text-white font-bold tracking-widest uppercase text-sm hover:bg-white/20 transition-all shadow-[0_0_30px_rgba(255,77,109,0.3)]"
        >
          Replay Our Story
        </motion.button>

        <div className="mt-24 pt-8 border-t border-white/5 text-white/20 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 • Made with all my heart for you</p>
          <div className="flex items-center gap-2">
            <span>Built by Your Maalik</span>
            <span className="text-primary">❤</span>
          </div>
        </div>
      </div>

      {/* Final Star Explosion Effect Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[200px]" />
      </div>
    </footer>
  );
}

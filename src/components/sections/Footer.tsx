"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface FooterProps {
  partnerA?: string;
  partnerB?: string;
  isCustomStory?: boolean;
}

export default function Footer({
  partnerA = "Sujal",
  partnerB = "Ananya",
  isCustomStory = false
}: FooterProps) {
  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-24 bg-background text-foreground relative overflow-hidden text-center transition-colors duration-500">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-serif text-foreground mb-8">
            Always & Forever, <span className="text-primary italic">{partnerB}</span>
          </h2>
          <div className="flex justify-center gap-4 text-primary text-xl font-serif italic opacity-60">
            <span>{partnerA}</span>
            <span>•</span>
            <span>{partnerB}</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-foreground/40 font-sans tracking-[0.5em] uppercase text-xs mb-12"
        >
          In every universe, it's you
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReplay}
          className="glass px-10 py-4 rounded-full text-foreground font-bold tracking-widest uppercase text-sm hover:bg-foreground/10 transition-all shadow-[0_0_30px_rgba(255,77,109,0.2)]"
        >
          Replay Our Story
        </motion.button>

        <div className="mt-24 pt-8 border-t border-foreground/5 text-foreground/40 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} • Created with love</p>
          
          {isCustomStory && (
            <div className="px-4 py-1.5 rounded-full glass hover:bg-primary/20 transition-colors duration-300">
              <Link href="/" className="font-serif italic tracking-wide text-primary text-xs font-semibold flex items-center gap-1.5">
                <span>Made with</span>
                <span className="text-red-500 scale-110">❤</span>
                <span className="font-sans uppercase font-bold tracking-wider hover:underline text-foreground">LoveVerse</span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span>Built for {partnerB}</span>
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

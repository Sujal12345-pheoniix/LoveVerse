"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { TIMELINE_MOMENTS } from "@/constants/content";

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="py-24 bg-deep-purple relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-serif text-white mb-4"
          >
            Our Story Timeline
          </motion.h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Progress Line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-rose-gold origin-top rounded-full hidden md:block"
          />

          <div className="space-y-24">
            {TIMELINE_MOMENTS.map((moment, index) => (
              <TimelineItem key={index} moment={moment} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ moment, index }: { moment: any; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
      <div className="hidden md:block w-[45%]" />
      
      {/* Circle Marker */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-10 h-10 rounded-full bg-white border-4 border-primary z-20 flex items-center justify-center shadow-[0_0_20px_rgba(255,77,109,0.5)]"
      >
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-[45%] mt-8 md:mt-0"
      >
        <div className="glass p-8 rounded-3xl relative overflow-hidden group hover:bg-white/10 transition-colors duration-500">
          <span className="text-rose-gold text-sm font-bold tracking-widest uppercase mb-2 block">{moment.date}</span>
          <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-primary transition-colors">{moment.title}</h3>
          <p className="text-lavender/70 leading-relaxed font-sans">{moment.description}</p>
          
          {/* Subtle heart icon bottom right */}
          <div className="absolute bottom-4 right-4 text-primary/20 group-hover:text-primary/40 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

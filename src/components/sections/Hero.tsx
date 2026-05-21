"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { HERO_QUOTES } from "@/constants/content";
import { ChevronDown } from "lucide-react";

import Scene3D from "@/components/3d/Scene3D";
import { gsap } from "@/lib/gsap";

interface HeroProps {
  partnerA?: string;
  partnerB?: string;
  relationshipTitle?: string;
  quotes?: string[];
}

export default function Hero({
  partnerA = "Kuchu",
  partnerB = "Madamji",
  relationshipTitle = "Welcome to Our Story",
  quotes = HERO_QUOTES
}: HeroProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);

    // GSAP Cinematic Entrance
    const ctx = gsap.context(() => {
      gsap.from(".hero-title span", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      });
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1,
        ease: "power2.out",
      });
    }, containerRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, [quotes]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background text-foreground transition-colors duration-500">
      <Scene3D />
      {/* Background Animated Particles/Stars could go here */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="hero-subtitle">
          <span className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4 block">
            {relationshipTitle}
          </span>
        </div>
        <h1 className="hero-title text-5xl md:text-8xl font-serif text-foreground mb-8 leading-tight">
          <span className="inline-block">{partnerA} </span>{" "}
          <span className="text-primary italic inline-block">& {partnerB}</span>
        </h1>

        <motion.div
          key={quoteIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="min-h-[80px]"
        >
          <p className="text-xl md:text-3xl font-serif text-foreground/80 italic">
            "{quotes[quoteIndex]}"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-12"
        >
          <button 
            onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
            className="glass px-8 py-3 rounded-full text-foreground hover:bg-foreground/10 transition-all duration-300 tracking-widest uppercase text-xs font-bold"
          >
            Explore Memories
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-foreground/50"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}

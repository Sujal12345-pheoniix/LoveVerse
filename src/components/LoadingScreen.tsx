"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const quotes = [
  "Preparing some magic...",
  "Gathering all my love for you, Kuchu...",
  "Counting the stars, Madamji...",
  "Almost there, Maalikn...",
  "Setting the stage, Phuchku...",
];

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    const quoteTimer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(quoteTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1a0b1a]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
            className="relative w-40 h-40"
          >
            {/* Using the generated heart image if possible, or a fallback icon */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-full h-full text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                fill="currentColor"
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            key={quoteIndex}
            className="mt-8 text-rose-gold font-serif text-xl italic"
          >
            {quotes[quoteIndex]}
          </motion.div>

          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "linear" }}
              className="h-full bg-gradient-to-r from-primary to-secondary"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

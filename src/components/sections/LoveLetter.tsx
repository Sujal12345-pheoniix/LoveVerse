"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-24 bg-[#fff5f5] flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-deep-purple mb-4">A Secret Message</h2>
          <p className="text-rose-gold italic">Click the envelope to reveal what's inside</p>
        </motion.div>

        <div className="relative w-full max-w-2xl h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="envelope"
                initial={{ rotate: -5 }}
                animate={{ rotate: 0 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                onClick={() => setIsOpen(true)}
                className="w-80 h-56 bg-[#f4e4bc] rounded-sm shadow-2xl relative cursor-pointer group"
              >
                {/* Envelope Flap */}
                <div className="absolute top-0 left-0 w-full h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-t-[110px] border-t-[#e5d4a7] z-10" />
                <div className="absolute inset-0 border-2 border-[#d4c396] m-2 flex items-center justify-center">
                  <span className="text-rose-gold font-serif italic text-lg opacity-60 group-hover:opacity-100 transition-opacity">To: My Kuchu</span>
                </div>
                {/* Wax Seal */}
                <div className="absolute top-[90px] left-1/2 -translate-x-1/2 w-12 h-12 bg-primary rounded-full shadow-lg z-20 flex items-center justify-center">
                  <span className="text-white text-xl">❤</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="w-full h-full bg-[#fdfcf0] p-8 md:p-12 shadow-2xl rounded-sm border border-[#e5e5e5] relative overflow-y-auto custom-scrollbar"
              >
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-rose-gold hover:text-primary transition-colors"
                >
                  ✕
                </button>
                <div className="font-serif text-deep-purple leading-loose text-lg md:text-xl italic space-y-6">
                  <p>My dearest Madamji,</p>
                  <p>
                    I spent so many nights thinking about how to show you how much you mean to me. 
                    This little corner of the internet is just a small reflection of the universe of love I have for you.
                  </p>
                  <p>
                    From the first time we talked to our latest laugh, every second with you feels like a beautiful dream 
                    I never want to wake up from. You are my Maalikn, my best friend, and my greatest adventure.
                  </p>
                  <p>
                    I call you Kuchu, Phuchku, and everything in between, but most of all, I call you mine. 
                    Thank you for being you, for your kindness, and for choosing me every single day.
                  </p>
                  <p>I love you more than words can ever say.</p>
                  <p className="pt-8">Always yours,<br/>Your biggest admirer</p>
                </div>
                
                {/* Animated petals falling inside letter? Or just background */}
                <div className="absolute -bottom-10 -right-10 opacity-10">
                  <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

import { AnimatePresence } from "framer-motion";

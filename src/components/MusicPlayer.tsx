"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX, Play, Pause } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className="fixed bottom-6 left-6 z-50 flex items-center gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio
        ref={audioRef}
        loop
        src="/Saawal.mp3" // Fallback romantic instrumental
      />

      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="glass w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <Pause size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <Play size={24} className="ml-1" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Visualizer when playing */}
        {isPlaying && (
          <div className="absolute bottom-2 flex gap-0.5 items-end h-3">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 12, 4] }}
                transition={{ duration: 0.5 + i * 0.1, repeat: Infinity }}
                className="w-1 bg-primary rounded-full"
              />
            ))}
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass px-4 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase"
          >
            {isPlaying ? "Romantic Instrumental" : "Play Music"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

interface MusicPlayerProps {
  musicUrl?: string;
  musicMood?: string;
}

export default function MusicPlayer({
  musicUrl = "/Saawal.mp3",
  musicMood = "Romantic Instrumental"
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.warn("Audio play blocked by browser. User interaction required:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Reset play state if musicUrl changes
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [musicUrl]);

  return (
    <div
      className="fixed bottom-6 left-6 z-50 flex items-center gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio
        ref={audioRef}
        loop
        src={musicUrl}
      />

      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="glass w-14 h-14 rounded-full flex items-center justify-center text-foreground shadow-xl relative overflow-hidden"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <Pause size={24} className="text-primary" />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <Play size={24} className="ml-1 text-primary animate-pulse" />
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
            className="glass px-4 py-2 rounded-full text-foreground text-xs font-bold tracking-widest uppercase border border-foreground/5"
          >
            {isPlaying ? musicMood : "Play Music"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

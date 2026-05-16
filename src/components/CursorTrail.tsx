"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CursorTrail() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const newHeart = { id: Date.now(), x: e.clientX, y: e.clientY };
      setTrail((prev) => [...prev, newHeart].slice(-15));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <AnimatePresence>
        {trail.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{ opacity: 0, scale: 1.5, y: -50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ 
              left: heart.x, 
              top: heart.y,
              position: "absolute" 
            }}
            className="text-primary text-xl"
          >
            ❤
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Main Cursor Dot */}
      <motion.div
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
        className="w-2 h-2 bg-primary rounded-full fixed"
      />
    </div>
  );
}

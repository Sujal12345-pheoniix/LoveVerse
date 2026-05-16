"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Sparkles() {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSparkle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
      };
      setSparkles((prev) => [...prev, newSparkle].slice(-20));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 2 }}
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
          }}
          className="absolute bg-white rounded-full shadow-[0_0_10px_white]"
        />
      ))}
    </div>
  );
}

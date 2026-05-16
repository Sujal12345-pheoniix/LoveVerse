"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const images = [
  { id: 1, src: "/images/memory1.jpg", caption: "Every moment with you is a gift, Kuchu" },
  { id: 2, src: "/images/memory2.jpg", caption: "Your smile is my favorite view, Madamji" },
  { id: 3, src: "/images/memory3.jpg", caption: "Holding your hand, always and forever" },
  { id: 4, src: "/images/memory1.jpg", caption: "Thinking of you, my Phuchku" },
  { id: 5, src: "/images/memory2.jpg", caption: "Our forever story begins here" },
  { id: 6, src: "/images/memory3.jpg", caption: "Captured memories of us" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-[#fff5f5] overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-deep-purple mb-4">Captured Moments</h2>
          <p className="text-rose-gold font-serif italic text-xl">"A picture is worth a thousand words, but ours tell a whole story."</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 relative h-[600px] md:h-[800px] mt-10">
          {images.map((img, index) => (
            <PhotoCard key={img.id} img={img} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhotoCard({ img, index }: { img: any; index: number }) {
  const rotation = (index % 3 === 0 ? -5 : index % 3 === 1 ? 5 : 2) * (index + 1);
  
  return (
    <motion.div
      drag
      dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
      initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1, 
        rotate: rotation,
        x: (index % 3 - 1) * 100,
        y: (Math.floor(index / 3) - 0.5) * 100
      }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
      viewport={{ once: true }}
      className="absolute bg-white p-4 pb-12 shadow-2xl cursor-grab active:cursor-grabbing w-64 md:w-80 group"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4">
        <Image
          src={img.src}
          alt={img.caption}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={index < 2}
        />
      </div>
      <p className="font-serif text-deep-purple italic text-center text-lg">{img.caption}</p>
      
      {/* Decorative tape effect */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm -rotate-2" />
    </motion.div>
  );
}

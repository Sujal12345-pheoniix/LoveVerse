"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { WHY_I_LOVE_YOU } from "@/constants/content";
import * as LucideIcons from "lucide-react";

interface WhyILoveYouProps {
  reasons?: Array<{ title: string; description: string; icon: string }>;
}

export default function WhyILoveYou({ reasons = [] }: WhyILoveYouProps) {
  const displayReasons = reasons.length > 0 ? reasons : WHY_I_LOVE_YOU;

  return (
    <section className="py-24 bg-background text-foreground relative overflow-hidden transition-colors duration-500">
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              opacity: Math.random(),
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: ["-10%", "110%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute text-primary"
          >
            ❤
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-foreground mb-4"
          >
            Why I Love You
          </motion.h2>
          <p className="text-primary tracking-widest uppercase text-sm font-semibold">Just a few of the million reasons</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayReasons.map((reason, index) => (
            <ReasonCard key={index} reason={reason} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonCard({ reason }: { reason: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const IconComponent = (LucideIcons as any)[reason.icon] || LucideIcons.Heart;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative h-64 glass rounded-3xl p-8 cursor-pointer group"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="flex flex-col items-center text-center h-full justify-center"
      >
        <div className="mb-4 p-4 rounded-full bg-foreground/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
          <IconComponent size={32} />
        </div>
        <h3 className="text-xl font-serif text-foreground mb-2">{reason.title}</h3>
        <p className="text-foreground/75 text-sm leading-relaxed">{reason.description}</p>
      </div>
    </motion.div>
  );
}

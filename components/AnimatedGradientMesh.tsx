"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AnimatedGradientMesh() {
  const meshRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!meshRef.current) return;
      const rect = meshRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={meshRef} className="absolute inset-0 overflow-hidden opacity-40">
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full bg-gradient-to-br from-moss-400 via-moss-300 to-transparent blur-3xl"
        style={{
          left: "20%",
          top: "20%",
          x: useSpring(x, { ...springConfig, stiffness: 100 }),
          y: useSpring(y, { ...springConfig, stiffness: 100 }),
        }}
      />
      
      <motion.div
        className="absolute h-[500px] w-[500px] rounded-full bg-gradient-to-br from-sage-400 via-sage-300 to-transparent blur-3xl"
        style={{
          right: "20%",
          top: "40%",
          x: useSpring(x, { ...springConfig, stiffness: 80 }),
          y: useSpring(y, { ...springConfig, stiffness: 80 }),
        }}
      />
      
      <motion.div
        className="absolute h-[450px] w-[450px] rounded-full bg-gradient-to-br from-moss-500 via-moss-200 to-transparent blur-3xl"
        style={{
          left: "50%",
          bottom: "20%",
          x: useSpring(x, { ...springConfig, stiffness: 120 }),
          y: useSpring(y, { ...springConfig, stiffness: 120 }),
        }}
      />

      {/* Mesh overlay for more depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10" />
    </div>
  );
}

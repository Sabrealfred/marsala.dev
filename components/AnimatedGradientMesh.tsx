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
        className="absolute h-[600px] w-[600px] rounded-full bg-gradient-to-br from-moss-400 via-moss-300 to-transparent blur-3xl dark:from-moss-700 dark:via-moss-600 dark:to-transparent"
        style={{
          left: "20%",
          top: "20%",
          x: useSpring(mouseX, { ...springConfig, stiffness: 100 }),
          y: useSpring(mouseY, { ...springConfig, stiffness: 100 }),
          rotate: useSpring(mouseX, { ...springConfig, stiffness: 50 }),
        }}
      />
      
      <motion.div
        className="absolute h-[500px] w-[500px] rounded-full bg-gradient-to-br from-sage-400 via-sage-300 to-transparent blur-3xl dark:from-sage-700 dark:via-sage-600 dark:to-transparent"
        style={{
          right: "20%",
          top: "40%",
          x: useSpring(mouseX, { ...springConfig, stiffness: 80 }),
          y: useSpring(mouseY, { ...springConfig, stiffness: 80 }),
          rotate: useSpring(mouseY, { ...springConfig, stiffness: 40 }),
        }}
      />
      
      <motion.div
        className="absolute h-[450px] w-[450px] rounded-full bg-gradient-to-br from-moss-500 via-moss-200 to-transparent blur-3xl dark:from-moss-800 dark:via-moss-500 dark:to-transparent"
        style={{
          left: "50%",
          bottom: "20%",
          x: useSpring(mouseX, { ...springConfig, stiffness: 120 }),
          y: useSpring(mouseY, { ...springConfig, stiffness: 120 }),
          rotate: useSpring(mouseX, { ...springConfig, stiffness: 60 }),
        }}
      />

      {/* Mesh overlay for more depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10 dark:via-black/5 dark:to-black/10" />
    </div>
  );
}

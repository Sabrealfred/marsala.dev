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
    <div ref={meshRef} className="absolute inset-0 overflow-hidden opacity-50">
      {/* Animated gradient blobs with autonomous motion */}
      <motion.div
        className="absolute h-[700px] w-[700px] rounded-sm bg-gradient-to-br from-moss-400 via-moss-300 to-transparent blur-3xl dark:from-moss-700 dark:via-moss-600 dark:to-transparent"
        style={{
          left: "15%",
          top: "15%",
          x: useSpring(mouseX, { ...springConfig, stiffness: 100 }),
          y: useSpring(mouseY, { ...springConfig, stiffness: 100 }),
          rotate: useSpring(mouseX, { ...springConfig, stiffness: 50 }),
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute h-[550px] w-[550px] rounded-sm bg-gradient-to-br from-sage-400 via-sage-300 to-transparent blur-3xl dark:from-sage-700 dark:via-sage-600 dark:to-transparent"
        style={{
          right: "15%",
          top: "35%",
          x: useSpring(mouseX, { ...springConfig, stiffness: 80 }),
          y: useSpring(mouseY, { ...springConfig, stiffness: 80 }),
          rotate: useSpring(mouseY, { ...springConfig, stiffness: 40 }),
        }}
        animate={{
          x: [0, -40, 35, 0],
          y: [0, 50, -25, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute h-[500px] w-[500px] rounded-sm bg-gradient-to-br from-moss-500 via-moss-200 to-transparent blur-3xl dark:from-moss-800 dark:via-moss-500 dark:to-transparent"
        style={{
          left: "45%",
          bottom: "15%",
          x: useSpring(mouseX, { ...springConfig, stiffness: 120 }),
          y: useSpring(mouseY, { ...springConfig, stiffness: 120 }),
          rotate: useSpring(mouseX, { ...springConfig, stiffness: 60 }),
        }}
        animate={{
          x: [0, 45, -20, 0],
          y: [0, -35, 40, 0],
          scale: [1, 0.95, 1.12, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Mesh overlay for more depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10 dark:via-black/5 dark:to-black/10" />
    </div>
  );
}

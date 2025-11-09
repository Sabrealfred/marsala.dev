"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const previousX = useRef(0);

  // Motion values for smooth cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animation for smooth following with more bounce
  const springConfig = { damping: 20, stiffness: 180, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let lastMoveTime = Date.now();
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Show penguin on first mouse move
      if (!isVisible) setIsVisible(true);

      const now = Date.now();
      const timeDiff = now - lastMoveTime;
      lastMoveTime = now;

      // Calculate speed
      const deltaX = e.clientX - previousX.current;
      const speed = Math.abs(deltaX) / timeDiff;

      // Set running state based on speed
      setIsRunning(speed > 0.5);

      previousX.current = e.clientX;

      // Update cursor position with offset
      cursorX.set(e.clientX - 30);
      cursorY.set(e.clientY - 30);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsRunning(false);
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] mix-blend-normal"
      style={{
        left: 0,
        top: 0,
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      {/* Penguin Character */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Running dust clouds when moving fast */}
        {isRunning && (
          <>
            <motion.div
              className="absolute -left-6 top-4 text-lg opacity-60"
              initial={{ x: 0, opacity: 0.6 }}
              animate={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              💨
            </motion.div>
            <motion.div
              className="absolute -left-4 top-6 text-sm opacity-40"
              initial={{ x: 0, opacity: 0.4 }}
              animate={{ x: -8, opacity: 0 }}
              transition={{ duration: 0.4, repeat: Infinity, delay: 0.1 }}
            >
              💨
            </motion.div>
          </>
        )}

        {/* Penguin Body */}
        <div className="relative">
          {/* Dynamic shadow - larger when running */}
          <motion.div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-black/20 blur-sm"
            animate={{
              width: isRunning ? 40 : 32,
              height: isRunning ? 8 : 6,
            }}
            transition={{ duration: 0.2 }}
          />

          {/* Penguin with running animation */}
          <motion.div
            className="relative text-5xl"
            animate={
              isRunning
                ? {
                    rotate: [0, -8, 8, -8, 0],
                    y: [0, -2, 0, -2, 0],
                  }
                : {
                    rotate: [0, -3, 3, -3, 0],
                    y: 0,
                  }
            }
            transition={{
              duration: isRunning ? 0.4 : 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🐧
          </motion.div>

          {/* Trail Effect - more intense when running */}
          <motion.div
            className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-moss-400/30 blur-xl"
            animate={{
              width: isRunning ? 60 : 48,
              height: isRunning ? 60 : 48,
              scale: [1, 1.1, 1],
              opacity: isRunning ? [0.4, 0.6, 0.4] : [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: isRunning ? 0.6 : 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Extra sparkles when running */}
          {isRunning && (
            <motion.div
              className="absolute left-1/2 top-0 text-xs"
              initial={{ y: 0, opacity: 1, scale: 1 }}
              animate={{ y: -20, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              ✨
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

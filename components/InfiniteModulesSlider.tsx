"use client";

import { motion } from "framer-motion";
import {
  IconRocket,
  IconBolt,
  IconTrendingUp,
  IconBrain,
  IconTarget,
  IconShieldCheck,
} from "@tabler/icons-react";
import { useLanguage } from "./LanguageProvider";

const modules = [
  {
    icon: IconRocket,
    titleKey: "features.ai.title",
    gradient: "from-moss-600 to-moss-700",
  },
  {
    icon: IconBolt,
    titleKey: "features.crm.title",
    gradient: "from-sage-600 to-sage-700",
  },
  {
    icon: IconTrendingUp,
    titleKey: "features.data.title",
    gradient: "from-moss-700 to-moss-800",
  },
  {
    icon: IconBrain,
    titleKey: "features.automation.title",
    gradient: "from-sage-700 to-moss-700",
  },
  {
    icon: IconTarget,
    titleKey: "features.analytics.title",
    gradient: "from-moss-600 to-sage-600",
  },
  {
    icon: IconShieldCheck,
    titleKey: "features.security.title",
    gradient: "from-sage-600 to-moss-600",
  },
];

export function InfiniteModulesSlider() {
  const { t } = useLanguage();

  // Duplicate modules for seamless loop
  const duplicatedModules = [...modules, ...modules, ...modules];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Progressive blur masks on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-moss-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-moss-950 to-transparent z-10" />

      {/* Top slider - moving right */}
      <motion.div
        className="absolute top-[20%] flex gap-6"
        animate={{
          x: [0, -1600],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
      >
        {duplicatedModules.map((module, idx) => (
          <div
            key={`top-${idx}`}
            className="flex items-center gap-3 rounded-2xl border border-moss-700/30 bg-moss-900/20 px-6 py-3 backdrop-blur-sm"
            style={{ minWidth: "200px" }}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${module.gradient}`}>
              <module.icon className="h-5 w-5 text-white" stroke={1.5} />
            </div>
            <span className="text-sm font-medium text-moss-100">{t(module.titleKey)}</span>
          </div>
        ))}
      </motion.div>

      {/* Middle slider - moving left */}
      <motion.div
        className="absolute top-[50%] flex gap-6"
        animate={{
          x: [-1600, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          },
        }}
      >
        {duplicatedModules.map((module, idx) => (
          <div
            key={`middle-${idx}`}
            className="flex items-center gap-3 rounded-2xl border border-moss-700/30 bg-moss-900/20 px-6 py-3 backdrop-blur-sm"
            style={{ minWidth: "200px" }}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${module.gradient}`}>
              <module.icon className="h-5 w-5 text-white" stroke={1.5} />
            </div>
            <span className="text-sm font-medium text-moss-100">{t(module.titleKey)}</span>
          </div>
        ))}
      </motion.div>

      {/* Bottom slider - moving right */}
      <motion.div
        className="absolute top-[80%] flex gap-6"
        animate={{
          x: [0, -1600],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 45,
            ease: "linear",
          },
        }}
      >
        {duplicatedModules.map((module, idx) => (
          <div
            key={`bottom-${idx}`}
            className="flex items-center gap-3 rounded-2xl border border-moss-700/30 bg-moss-900/20 px-6 py-3 backdrop-blur-sm"
            style={{ minWidth: "200px" }}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${module.gradient}`}>
              <module.icon className="h-5 w-5 text-white" stroke={1.5} />
            </div>
            <span className="text-sm font-medium text-moss-100">{t(module.titleKey)}</span>
          </div>
        ))}
      </motion.div>

      {/* Vertical gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-moss-950/80 via-transparent to-moss-950/80 pointer-events-none" />
    </div>
  );
}

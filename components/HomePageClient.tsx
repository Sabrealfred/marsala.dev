"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  SwatchIcon,
  ComputerDesktopIcon,
  SparklesIcon,
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

type Module = {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  impact: { metric: string; value: string };
  color: string;
  darkColor: string;
};

const modules: Module[] = [
  {
    id: "brand",
    name: "Brand",
    icon: SwatchIcon,
    description: "Visual identity, guidelines, and brand strategy",
    impact: { metric: "Brand Recognition", value: "+65%" },
    color: "from-moss-500 to-moss-600",
    darkColor: "dark:from-moss-800 dark:to-moss-900",
  },
  {
    id: "web",
    name: "Web",
    icon: ComputerDesktopIcon,
    description: "High-performance websites and web applications",
    impact: { metric: "Page Speed", value: "10× faster" },
    color: "from-sage-500 to-sage-600",
    darkColor: "dark:from-sage-800 dark:to-sage-900",
  },
  {
    id: "ai",
    name: "AI",
    icon: SparklesIcon,
    description: "Intelligent automation and AI-powered features",
    impact: { metric: "Efficiency Gain", value: "+85%" },
    color: "from-blue-500 to-indigo-600",
    darkColor: "dark:from-blue-800 dark:to-indigo-900",
  },
  {
    id: "crm",
    name: "CRM",
    icon: UserGroupIcon,
    description: "Customer relationship management and sales tools",
    impact: { metric: "Sales Cycle", value: "-40%" },
    color: "from-purple-500 to-fuchsia-600",
    darkColor: "dark:from-purple-800 dark:to-fuchsia-900",
  },
  {
    id: "data",
    name: "Data",
    icon: ChartBarIcon,
    description: "Analytics, dashboards, and data infrastructure",
    impact: { metric: "Decision Speed", value: "5× faster" },
    color: "from-orange-500 to-amber-600",
    darkColor: "dark:from-orange-800 dark:to-amber-900",
  },
  {
    id: "automation",
    name: "Automation",
    icon: CogIcon,
    description: "Workflow automation and integration systems",
    impact: { metric: "Time Saved", value: "+47%" },
    color: "from-teal-500 to-emerald-600",
    darkColor: "dark:from-teal-800 dark:to-emerald-900",
  },
];

export function HomePageClient() {
  const [selected, setSelected] = useState<string[]>(["web", "ai", "crm"]);

  const toggleModule = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const selectedModules = modules.filter((m) => selected.includes(m.id));
  const totalImpact = selected.length * 15;
  const estimatedWeeks = Math.max(4, 12 - selected.length);

  return (
    <section className="bg-white py-12 lg:py-20 dark:bg-moss-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header - Left Aligned */}
        <div className="mb-12">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-moss-950 lg:text-5xl dark:text-moss-50">
              Build Your Perfect Growth Stack
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-sage-700 dark:text-sage-300">
              Select the modules you need. See the impact in real-time.
            </p>
          </div>
        </div>

        {/* 70/30 Layout - Content/Sidebar */}
        <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
          {/* Left: Module Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {modules.map((module, index) => {
              const isSelected = selected.includes(module.id);
              return (
                <button
                  key={module.id}
                  onClick={() => toggleModule(module.id)}
                  className={`group relative overflow-hidden rounded-3xl border-2 p-6 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-moss-500 bg-gradient-to-br from-white to-moss-50 shadow-2xl dark:border-moss-700 dark:from-moss-900 dark:to-moss-800"
                      : "border-moss-200 bg-white hover:border-moss-400 hover:shadow-lg dark:border-moss-700 dark:bg-moss-900 dark:hover:border-moss-500"
                  }`}
                >
                  <div className="absolute right-4 top-4">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isSelected ? 1 : 0,
                        rotate: isSelected ? 0 : -180,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-moss-gradient text-white shadow-lg"
                    >
                      ✓
                    </motion.div>
                  </div>

                  <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${module.color} ${module.darkColor} p-3 shadow-lg`}>
                    <module.icon className="h-12 w-12 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-moss-950 dark:text-moss-50">{module.name}</h3>
                  <p className="mt-2 text-sm text-sage-700 dark:text-sage-300">{module.description}</p>

                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-moss-300 bg-white px-3 py-1.5 text-xs font-semibold text-moss-800 dark:border-moss-700 dark:bg-moss-900 dark:text-moss-200"
                    >
                      <span className="text-green-600 dark:text-green-400">↗</span>
                      {module.impact.metric}: {module.impact.value}
                    </motion.div>
                  )}

                  <div className={`absolute inset-0 bg-gradient-to-br ${module.color} ${module.darkColor} opacity-0 transition-opacity duration-300 ${isSelected ? "opacity-10" : "group-hover:opacity-5"}`} />
                </button>
              );
            })}
          </div>

          {/* Right: Sticky Sidebar Dashboard */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <AnimatePresence mode="wait">
              {selected.length > 0 ? (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="overflow-hidden rounded-4xl border-2 border-moss-300 bg-gradient-to-br from-white to-moss-50 p-8 shadow-2xl dark:border-moss-700 dark:from-moss-900 dark:to-moss-800"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-moss-gradient text-2xl shadow-lg">
                      📊
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-moss-950 dark:text-moss-50">Your Custom Stack</h3>
                      <p className="text-sm text-sage-600 dark:text-sage-300">{selected.length} module{selected.length !== 1 ? 's' : ''} selected</p>
                    </div>
                  </div>

                  <div className="mb-8 flex flex-wrap gap-2">
                    {selectedModules.map((module) => (
                      <motion.div
                        key={module.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className={`flex items-center gap-2 rounded-full bg-gradient-to-r ${module.color} ${module.darkColor} px-3 py-1.5 text-xs font-bold text-white shadow-lg`}
                      >
                        <span>{module.name}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-moss-200 bg-white p-6 dark:border-moss-700 dark:bg-moss-900">
                      <p className="text-xs font-semibold uppercase tracking-wider text-sage-600 dark:text-sage-300">Estimated Impact</p>
                      <motion.p
                        key={totalImpact}
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mt-2 text-4xl font-bold text-moss-700 dark:text-moss-200"
                      >
                        +{totalImpact}%
                      </motion.p>
                      <p className="mt-1 text-xs text-sage-600 dark:text-sage-300">Efficiency Gain</p>
                    </div>

                    <div className="rounded-2xl border border-moss-200 bg-white p-6 dark:border-moss-700 dark:bg-moss-900">
                      <p className="text-xs font-semibold uppercase tracking-wider text-sage-600 dark:text-sage-300">Time to Launch</p>
                      <motion.p
                        key={estimatedWeeks}
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mt-2 text-4xl font-bold text-moss-700 dark:text-moss-200"
                      >
                        {estimatedWeeks}w
                      </motion.p>
                      <p className="mt-1 text-xs text-sage-600 dark:text-sage-300">Estimated Delivery</p>
                    </div>

                    <div className="rounded-2xl border border-moss-200 bg-white p-6 dark:border-moss-700 dark:bg-moss-900">
                      <p className="text-xs font-semibold uppercase tracking-wider text-sage-600 dark:text-sage-300">Modules</p>
                      <motion.p
                        key={selected.length}
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mt-2 text-4xl font-bold text-moss-700 dark:text-moss-200"
                      >
                        {selected.length}/{modules.length}
                      </motion.p>
                      <p className="mt-1 text-xs text-sage-600 dark:text-sage-300">Selected</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <motion.a
                      href="/contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-moss-gradient px-8 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300"
                    >
                      Get Your Custom Proposal
                      <span>→</span>
                    </motion.a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="overflow-hidden rounded-4xl border-2 border-dashed border-moss-300 bg-white p-8 text-center dark:border-moss-700 dark:bg-moss-900"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-moss-50 dark:bg-moss-800">
                    <span className="text-3xl">👆</span>
                  </div>
                  <h3 className="text-xl font-bold text-moss-950 dark:text-moss-50">Build Your Stack</h3>
                  <p className="mt-2 text-sm text-sage-600 dark:text-sage-300">
                    Select modules to see real-time impact estimates and delivery timelines
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

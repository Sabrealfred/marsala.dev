"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Module = {
  id: string;
  name: string;
  icon: string;
  description: string;
  impact: { metric: string; value: string };
  color: string;
};

const modules: Module[] = [
  {
    id: "brand",
    name: "Brand",
    icon: "/icon-arc.svg",
    description: "Visual identity, guidelines, and brand strategy",
    impact: { metric: "Brand Recognition", value: "+65%" },
    color: "from-moss-500 to-moss-600",
  },
  {
    id: "web",
    name: "Web",
    icon: "/icon-path.svg",
    description: "High-performance websites and web applications",
    impact: { metric: "Page Speed", value: "10× faster" },
    color: "from-sage-500 to-sage-600",
  },
  {
    id: "ai",
    name: "AI",
    icon: "/icon-arc.svg",
    description: "Intelligent automation and AI-powered features",
    impact: { metric: "Efficiency Gain", value: "+85%" },
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "crm",
    name: "CRM",
    icon: "/icon-path.svg",
    description: "Customer relationship management and sales tools",
    impact: { metric: "Sales Cycle", value: "-40%" },
    color: "from-purple-500 to-fuchsia-600",
  },
  {
    id: "data",
    name: "Data",
    icon: "/icon-arc.svg",
    description: "Analytics, dashboards, and data infrastructure",
    impact: { metric: "Decision Speed", value: "5× faster" },
    color: "from-orange-500 to-amber-600",
  },
  {
    id: "automation",
    name: "Automation",
    icon: "/icon-path.svg",
    description: "Workflow automation and integration systems",
    impact: { metric: "Time Saved", value: "+47%" },
    color: "from-teal-500 to-emerald-600",
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
    <section className="bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold tracking-tight text-moss-950 lg:text-5xl">
              Build Your Perfect Growth Stack
            </h2>
            <p className="mt-4 text-lg text-sage-700">
              Select the modules you need. See the impact in real-time.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto max-w-6xl">
          {/* Module Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {modules.map((module, index) => {
              const isSelected = selected.includes(module.id);
              return (
                <motion.button
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => toggleModule(module.id)}
                  className={`group relative overflow-hidden rounded-3xl border-2 p-6 text-left transition-all duration-500 ${
                    isSelected
                      ? "border-moss-500 bg-gradient-to-br from-white to-moss-50 shadow-2xl scale-105"
                      : "border-moss-200 bg-white hover:border-moss-400 hover:shadow-lg"
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

                  <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${module.color} p-3 shadow-lg`}>
                    <Image src={module.icon} alt={module.name} width={48} height={48} className="h-12 w-12 invert" />
                  </div>

                  <h3 className="text-2xl font-bold text-moss-950">{module.name}</h3>
                  <p className="mt-2 text-sm text-sage-700">{module.description}</p>

                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-moss-300 bg-white px-3 py-1.5 text-xs font-semibold text-moss-800"
                    >
                      <span className="text-green-600">↗</span>
                      {module.impact.metric}: {module.impact.value}
                    </motion.div>
                  )}

                  <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 transition-opacity duration-500 ${isSelected ? "opacity-10" : "group-hover:opacity-5"}`} />
                </motion.button>
              );
            })}
          </div>

          {/* Impact Dashboard */}
          <AnimatePresence>
            {selected.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="mt-12 overflow-hidden rounded-4xl border-2 border-moss-300 bg-gradient-to-br from-white to-moss-50 p-8 shadow-2xl lg:p-12"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-moss-gradient text-2xl shadow-lg">
                    📊
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-moss-950">Your Custom Stack</h3>
                    <p className="text-sm text-sage-600">{selected.length} module{selected.length !== 1 ? 's' : ''} selected</p>
                  </div>
                </div>

                <div className="mb-8 flex flex-wrap gap-3">
                  {selectedModules.map((module) => (
                    <motion.div
                      key={module.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className={`flex items-center gap-2 rounded-full bg-gradient-to-r ${module.color} px-4 py-2 text-sm font-bold text-white shadow-lg`}
                    >
                      <span>{module.name}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="rounded-2xl border border-moss-200 bg-white p-6 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-sage-600">Estimated Impact</p>
                    <motion.p
                      key={totalImpact}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mt-2 text-4xl font-bold text-moss-700"
                    >
                      +{totalImpact}%
                    </motion.p>
                    <p className="mt-1 text-xs text-sage-600">Efficiency Gain</p>
                  </div>

                  <div className="rounded-2xl border border-moss-200 bg-white p-6 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-sage-600">Time to Launch</p>
                    <motion.p
                      key={estimatedWeeks}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mt-2 text-4xl font-bold text-moss-700"
                    >
                      {estimatedWeeks}w
                    </motion.p>
                    <p className="mt-1 text-xs text-sage-600">Estimated Delivery</p>
                  </div>

                  <div className="rounded-2xl border border-moss-200 bg-white p-6 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-sage-600">Modules</p>
                    <motion.p
                      key={selected.length}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mt-2 text-4xl font-bold text-moss-700"
                    >
                      {selected.length}/{modules.length}
                    </motion.p>
                    <p className="mt-1 text-xs text-sage-600">Selected</p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 rounded-full bg-moss-gradient px-8 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300"
                  >
                    Get Your Custom Proposal
                    <span>→</span>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

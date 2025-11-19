"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModuleCard } from "./ModuleCard";
import type { Module } from "@/data/modules";
import {
  BoltIcon,
  PaintBrushIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  CpuChipIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

type Category = "all" | "brand" | "tech" | "growth" | "ai" | "commerce";

const categoryFilters: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All Modules", icon: BoltIcon },
  { id: "brand", label: "Brand & Design", icon: PaintBrushIcon },
  { id: "tech", label: "Tech & Infra", icon: WrenchScrewdriverIcon },
  { id: "growth", label: "Growth & Data", icon: ChartBarIcon },
  { id: "ai", label: "AI & Automation", icon: CpuChipIcon },
  { id: "commerce", label: "Commerce & Content", icon: ShoppingCartIcon },
];

const categoryMap: Record<string, Category> = {
  "brand-os": "brand",
  "web-os": "tech",
  "devops-os": "tech",
  "integrations-os": "tech",
  "crm-os": "growth",
  "ads-os": "growth",
  "data-os": "growth",
  "ai-os": "ai",
  "commerce-os": "commerce",
  "content-os": "commerce",
};

type ModulesPageClientProps = {
  modules: Module[];
};

export function ModulesPageClient({ modules }: ModulesPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredModules = modules.filter((module) => {
    if (activeCategory === "all") return true;
    return categoryMap[module.slug] === activeCategory;
  });

  return (
    <>
      {/* Filters */}
      <div className="border-b border-moss-200 bg-white dark:border-moss-800 dark:bg-moss-900">
        <div className="mx-auto w-full max-w-6xl px-6 py-6 md:px-10">
          <div className="flex flex-wrap gap-3">
            {categoryFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveCategory(filter.id)}
                className={`group flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  activeCategory === filter.id
                    ? "border-moss-500 bg-moss-gradient text-white shadow-lg scale-105 dark:border-moss-600 dark:bg-moss-gradient-dark"
                    : "border-moss-200 bg-white text-moss-700 hover:border-moss-400 hover:shadow-md dark:border-moss-700 dark:bg-moss-900 dark:text-moss-300 dark:hover:border-moss-500"
                }`}
              >
                <filter.icon className={`h-5 w-5 transition-transform duration-300 ${activeCategory === filter.id ? "scale-110" : "group-hover:scale-110"}`} />
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <section className="bg-white py-16 dark:bg-moss-950">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-sage-600 dark:text-sage-300">
              Showing {filteredModules.length} of {modules.length} modules
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredModules.map((module, index) => (
                <motion.div
                  key={module.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ModuleCard module={module} className="h-full" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredModules.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-sage-600 dark:text-sage-300">No modules found in this category</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";

const modules = [
  { id: 1, name: "Brand", color: "bg-moss-500", icon: "/icon-arc.svg" },
  { id: 2, name: "Web", color: "bg-moss-600", icon: "/icon-path.svg" },
  { id: 3, name: "CRM", color: "bg-sage-500", icon: "/icon-arc.svg" },
  { id: 4, name: "AI", color: "bg-moss-700", icon: "/icon-path.svg" },
  { id: 5, name: "Ads", color: "bg-sage-600", icon: "/icon-arc.svg" },
  { id: 6, name: "Data", color: "bg-moss-500", icon: "/icon-path.svg" },
];

export function HomePageClient() {
  const [activeModules, setActiveModules] = useState<number[]>([]);

  const toggleModule = (id: number) => {
    setActiveModules(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-moss-950 lg:text-5xl">
            Build Your Stack
          </h2>
          <p className="mt-4 text-lg text-sage-700">
            Click modules to activate them and see your system grow
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          {/* Module Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
            {modules.map((module) => {
              const isActive = activeModules.includes(module.id);
              return (
                <button
                  key={module.id}
                  onClick={() => toggleModule(module.id)}
                  className={`group relative overflow-hidden rounded-4xl border-2 p-8 text-center transition-all duration-500 ${
                    isActive
                      ? "border-moss-500 bg-moss-gradient shadow-glow"
                      : "border-moss-200 bg-cream-50 hover:border-moss-400"
                  }`}
                >
                  <div className="relative">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-moss-200 bg-white/60 p-2 transition-all duration-500 group-hover:border-moss-400">
                      <Image
                        src={module.icon}
                        alt={`${module.name} module`}
                        width={48}
                        height={48}
                        className="h-12 w-12"
                      />
                    </div>
                    <h3
                      className={`text-2xl font-bold transition-colors duration-300 ${
                        isActive ? "text-white" : "text-moss-800"
                      }`}
                    >
                      {module.name}
                    </h3>
                    <p
                      className={`mt-2 text-sm transition-colors duration-300 ${
                        isActive ? "text-moss-100" : "text-sage-600"
                      }`}
                    >
                      {isActive ? "Active" : "Click to activate"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Count */}
          {activeModules.length > 0 && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 rounded-full border-2 border-moss-500 bg-moss-gradient px-6 py-3 shadow-glow">
                <div className="flex -space-x-2">
                  {activeModules.map((id) => (
                    <div
                      key={id}
                      className="h-8 w-8 rounded-full border-2 border-white bg-moss-700"
                    />
                  ))}
                </div>
                <span className="text-base font-semibold text-white">
                  {activeModules.length} module{activeModules.length !== 1 ? "s" : ""} active
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

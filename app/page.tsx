'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const modules = [
  { id: 1, name: "Brand", color: "bg-moss-500", icon: "/icon-arc.svg" },
  { id: 2, name: "Web", color: "bg-moss-600", icon: "/icon-path.svg" },
  { id: 3, name: "CRM", color: "bg-sage-500", icon: "/icon-arc.svg" },
  { id: 4, name: "AI", color: "bg-moss-700", icon: "/icon-path.svg" },
  { id: 5, name: "Ads", color: "bg-sage-600", icon: "/icon-arc.svg" },
  { id: 6, name: "Data", color: "bg-moss-500", icon: "/icon-path.svg" },
];

const metrics = [
  { value: "10×", label: "Faster Launch", icon: "/icon-arc.svg" },
  { value: "+47%", label: "Efficiency", icon: "/icon-path.svg" },
  { value: "3×", label: "Engagement", icon: "/icon-arc.svg" },
];

export default function HomePage() {
  const [activeModules, setActiveModules] = useState<number[]>([]);

  const toggleModule = (id: number) => {
    setActiveModules(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-moss-50 to-sage-50 py-12 lg:py-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-moss-400 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sage-400 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-moss-300 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-moss-500" />
              <span className="text-xs font-medium uppercase tracking-wider text-moss-700">
                Intelligent Growth Studio
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-moss-950 sm:text-6xl lg:text-7xl">
              Grow with
              <span className="mt-2 block bg-moss-gradient bg-clip-text text-transparent">
                modular intelligence
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sage-700">
              Build your digital ecosystem with plug-and-play modules for brand, web, AI, and automation
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/modules"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-moss-gradient px-8 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-hover"
              >
                Explore Modules
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-moss-600 bg-white/50 px-8 py-4 text-base font-semibold text-moss-700 backdrop-blur-sm transition-all duration-300 hover:bg-moss-600 hover:text-white"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Metrics */}
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-3 gap-4 lg:gap-6">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="group relative overflow-hidden rounded-3xl border border-moss-200 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-hover"
              >
                <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-moss-100 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative text-center">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center">
                    <Image
                      src={metric.icon}
                      alt=""
                      width={64}
                      height={64}
                      className="h-16 w-16"
                    />
                  </div>
                  <p className="text-3xl font-bold text-moss-700">{metric.value}</p>
                  <p className="mt-1 text-sm font-medium text-sage-600">{metric.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Module Builder */}
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

      {/* Features */}
      <section className="bg-moss-950 py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-moss-700">
                <div className="h-10 w-10 rounded-full bg-moss-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Modular by Design</h3>
              <p className="mt-3 text-sage-300">
                Add only what you need, when you need it
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-moss-700">
                <div className="h-10 w-10 rounded-full bg-sage-400" />
              </div>
              <h3 className="text-xl font-bold text-white">AI-Powered</h3>
              <p className="mt-3 text-sage-300">
                Intelligent automation that scales with you
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-moss-700">
                <div className="h-10 w-10 rounded-full bg-moss-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Always Growing</h3>
              <p className="mt-3 text-sage-300">
                Continuous improvement and optimization
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-base font-semibold text-moss-400 transition-colors hover:text-moss-300"
            >
              Read our research
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-moss-100 via-sage-100 to-cream-100 py-12 lg:py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-0 top-0 h-full w-1/3 bg-moss-gradient blur-3xl" />
          <div className="absolute right-0 bottom-0 h-full w-1/3 bg-sage-gradient blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
          <Image src="/logo.png" alt="Marsala" width={80} height={80} className="mx-auto mb-6 h-20 w-20" />

          <h2 className="text-4xl font-bold tracking-tight text-moss-950 lg:text-5xl">
            Ready to grow?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-700">
            Schedule a call to design your ideal modular system
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-moss-gradient px-10 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105"
            >
              Get in Touch
            </Link>
            <Link
              href="/modules"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-moss-600 bg-white px-10 py-4 text-base font-semibold text-moss-700 transition-all duration-300 hover:bg-moss-600 hover:text-white"
            >
              View All Modules
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

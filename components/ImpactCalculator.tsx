"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";

type Maturity = "startup" | "growth" | "enterprise";

const maturityLabels: Record<Maturity, string> = {
  startup: "Early Stage",
  growth: "Growth Stage",
  enterprise: "Enterprise",
};

const maturityMultipliers: Record<Maturity, number> = {
  startup: 1.5,
  growth: 1.2,
  enterprise: 1.0,
};

export function ImpactCalculator() {
  const [visitors, setVisitors] = useState(50);
  const [conversionRate, setConversionRate] = useState(2.3);
  const [maturity, setMaturity] = useState<Maturity>("growth");

  // Calculations
  const multiplier = maturityMultipliers[maturity];
  const efficiencyGain = Math.round((visitors / 10 + conversionRate * 20) * multiplier);
  const costSavings = Math.round((visitors * 0.8 + conversionRate * 5000) * multiplier);
  const weeksToLaunch = Math.max(
    4,
    Math.round(12 - visitors / 20 - (maturity === "enterprise" ? 2 : 0)),
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-moss-50 via-sage-50 to-cream-50 py-20 lg:py-28 dark:from-moss-950 dark:via-moss-900 dark:to-moss-950">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 h-full w-1/2 bg-moss-gradient blur-3xl" />
        <div className="absolute right-0 bottom-0 h-full w-1/2 bg-sage-gradient blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header - Left Aligned */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-moss-300 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm dark:border-moss-700 dark:bg-moss-900/80">
              <div className="h-2 w-2 rounded-full bg-moss-500 animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-wider text-moss-700 dark:text-moss-300">
                Impact Calculator
              </span>
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-moss-950 lg:text-5xl dark:text-moss-50">
              See Your Potential Impact
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-sage-700 dark:text-sage-300">
              Adjust the sliders to estimate how Marsala OS could transform your growth metrics
            </p>
          </motion.div>
        </div>

        {/* 60/40 Layout - Controls/Results */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr]">
          {/* Left: Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-hidden rounded-4xl border-2 border-moss-300 bg-gradient-to-br from-white to-moss-50 p-8 shadow-2xl lg:p-12 dark:border-moss-700 dark:from-moss-900 dark:to-moss-800"
          >
            <div className="space-y-8">
              {/* Monthly Visitors */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-semibold text-moss-950 dark:text-moss-50">
                    Monthly Visitors
                  </label>
                  <motion.span
                    key={visitors}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-moss-700 dark:text-moss-200"
                  >
                    {visitors}K
                  </motion.span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={visitors}
                  onChange={(e) => setVisitors(Number(e.target.value))}
                  className="h-3 w-full cursor-pointer appearance-none rounded-full bg-moss-200 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-moss-gradient [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-moss-gradient [&::-moz-range-thumb]:shadow-lg dark:bg-moss-700 dark:[&::-webkit-slider-thumb]:bg-moss-gradient-dark dark:[&::-moz-range-thumb]:bg-moss-gradient-dark"
                />
              </div>

              {/* Conversion Rate */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-semibold text-moss-950 dark:text-moss-50">
                    Conversion Rate
                  </label>
                  <motion.span
                    key={conversionRate}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-moss-700 dark:text-moss-200"
                  >
                    {conversionRate.toFixed(1)}%
                  </motion.span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.1"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="h-3 w-full cursor-pointer appearance-none rounded-full bg-moss-200 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-moss-gradient [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-moss-gradient [&::-moz-range-thumb]:shadow-lg dark:bg-moss-700 dark:[&::-webkit-slider-thumb]:bg-moss-gradient-dark dark:[&::-moz-range-thumb]:bg-moss-gradient-dark"
                />
              </div>

              {/* Maturity Level */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-moss-950 dark:text-moss-50">
                  Current Stack Maturity
                </label>
                <div className="flex gap-3">
                  {(Object.keys(maturityLabels) as Maturity[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => setMaturity(level)}
                      className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                        maturity === level
                          ? "border-moss-500 bg-moss-gradient text-white shadow-lg scale-105 dark:border-moss-600 dark:bg-moss-gradient-dark"
                          : "border-moss-200 bg-white text-moss-700 hover:border-moss-400 dark:border-moss-700 dark:bg-moss-900 dark:text-moss-300 dark:hover:border-moss-500"
                      }`}
                    >
                      {maturityLabels[level]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Sticky Results Dashboard */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <motion.div
              key={`${visitors}-${conversionRate}-${maturity}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-4xl border-2 border-moss-400 bg-gradient-to-br from-moss-50 to-white p-8 shadow-xl dark:border-moss-600 dark:from-moss-900 dark:to-moss-800"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-moss-gradient text-2xl shadow-lg">
                  📊
                </div>
                <div>
                  <h3 className="text-xl font-bold text-moss-950 dark:text-moss-50">With Marsala OS</h3>
                  <p className="text-sm text-sage-600 dark:text-sage-300">Estimated improvements</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-moss-200 bg-white p-6 dark:border-moss-700 dark:bg-moss-900">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sage-600 dark:text-sage-300">
                    Efficiency Gain
                  </p>
                  <motion.p
                    key={efficiencyGain}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-2 text-4xl font-bold text-moss-700 dark:text-moss-200"
                  >
                    +{efficiencyGain}%
                  </motion.p>
                </div>

                <div className="rounded-2xl border border-moss-200 bg-white p-6 dark:border-moss-700 dark:bg-moss-900">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sage-600 dark:text-sage-300">
                    Annual Savings
                  </p>
                  <motion.p
                    key={costSavings}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-2 text-4xl font-bold text-moss-700 dark:text-moss-200"
                  >
                    ${costSavings}K
                  </motion.p>
                </div>

                <div className="rounded-2xl border border-moss-200 bg-white p-6 dark:border-moss-700 dark:bg-moss-900">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sage-600 dark:text-sage-300">
                    Time to Launch
                  </p>
                  <motion.p
                    key={weeksToLaunch}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-2 text-4xl font-bold text-moss-700 dark:text-moss-200"
                  >
                    {weeksToLaunch}w
                  </motion.p>
                </div>
              </div>

              <div className="mt-8">
                <MagneticButton href="/contact" strength={0.5}>
                  <span className="flex w-full items-center justify-center gap-2 rounded-full bg-moss-gradient px-10 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300 dark:bg-moss-gradient-dark">
                    Get Your Custom Proposal
                    <span>→</span>
                  </span>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

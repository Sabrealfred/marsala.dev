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
    <section className="relative overflow-hidden bg-white dark:bg-navy-950 py-20 lg:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header - Left Aligned */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 shadow-sm">
              <div className="h-2 w-2 rounded-sm bg-[#051c2c] dark:bg-white animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-wider text-[#051c2c] dark:text-white">
                Impact Calculator
              </span>
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-[#051c2c] lg:text-5xl dark:text-white">
              See Your Potential Impact
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
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
            className="overflow-hidden rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 shadow-lg lg:p-12"
          >
            <div className="space-y-8">
              {/* Monthly Visitors */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-semibold text-[#051c2c] dark:text-white">
                    Monthly Visitors
                  </label>
                  <motion.span
                    key={visitors}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-[#051c2c] dark:text-white"
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
                  className="h-3 w-full cursor-pointer appearance-none rounded-sm bg-slate-200 dark:bg-slate-700 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-[#051c2c] dark:[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-sm [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#051c2c] dark:[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-lg"
                />
              </div>

              {/* Conversion Rate */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-semibold text-[#051c2c] dark:text-white">
                    Conversion Rate
                  </label>
                  <motion.span
                    key={conversionRate}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-[#051c2c] dark:text-white"
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
                  className="h-3 w-full cursor-pointer appearance-none rounded-sm bg-slate-200 dark:bg-slate-700 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-[#051c2c] dark:[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-sm [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#051c2c] dark:[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-lg"
                />
              </div>

              {/* Maturity Level */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-[#051c2c] dark:text-white">
                  Current Stack Maturity
                </label>
                <div className="flex gap-3">
                  {(Object.keys(maturityLabels) as Maturity[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => setMaturity(level)}
                      className={`flex-1 rounded-sm border-2 px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                        maturity === level
                          ? "border-[#051c2c] dark:border-white bg-[#051c2c] dark:bg-white text-white dark:text-[#051c2c] shadow-lg scale-105"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[#051c2c] dark:text-white hover:border-[#051c2c] dark:hover:border-white"
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
              className="overflow-hidden rounded-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-8 shadow-lg"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-[#051c2c] dark:bg-white text-2xl shadow-lg">
                  📊
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#051c2c] dark:text-white">With Marsala OS</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Estimated improvements</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Efficiency Gain
                  </p>
                  <motion.p
                    key={efficiencyGain}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-2 text-4xl font-bold text-[#051c2c] dark:text-white"
                  >
                    +{efficiencyGain}%
                  </motion.p>
                </div>

                <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Annual Savings
                  </p>
                  <motion.p
                    key={costSavings}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-2 text-4xl font-bold text-[#051c2c] dark:text-white"
                  >
                    ${costSavings}K
                  </motion.p>
                </div>

                <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Time to Launch
                  </p>
                  <motion.p
                    key={weeksToLaunch}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-2 text-4xl font-bold text-[#051c2c] dark:text-white"
                  >
                    {weeksToLaunch}w
                  </motion.p>
                </div>
              </div>

              <div className="mt-8">
                <MagneticButton href="/contact" strength={0.5}>
                  <span className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#051c2c] dark:bg-white px-10 py-4 text-base font-semibold text-white dark:text-[#051c2c] shadow-lg transition-all duration-300 hover:bg-[#083952] dark:hover:bg-slate-100">
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

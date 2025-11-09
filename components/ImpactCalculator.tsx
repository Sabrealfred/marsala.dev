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
  const weeksToLaunch = Math.max(4, Math.round(12 - visitors / 20 - maturity === "enterprise" ? 2 : 0));

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-moss-50 via-sage-50 to-cream-50 py-20 lg:py-28">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 h-full w-1/2 bg-moss-gradient blur-3xl" />
        <div className="absolute right-0 bottom-0 h-full w-1/2 bg-sage-gradient blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-moss-300 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-moss-500 animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-wider text-moss-700">
                Impact Calculator
              </span>
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-moss-950 lg:text-5xl">
              See Your Potential Impact
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-700">
              Adjust the sliders to estimate how Marsala OS could transform your growth metrics
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 overflow-hidden rounded-4xl border-2 border-moss-300 bg-gradient-to-br from-white to-moss-50 p-8 shadow-2xl lg:p-12"
        >
          {/* Inputs */}
          <div className="space-y-8">
            {/* Monthly Visitors */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-semibold text-moss-950">
                  Monthly Visitors
                </label>
                <motion.span
                  key={visitors}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl font-bold text-moss-700"
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
                className="h-3 w-full cursor-pointer appearance-none rounded-full bg-moss-200 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-moss-gradient [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-moss-gradient [&::-moz-range-thumb]:shadow-lg"
              />
            </div>

            {/* Conversion Rate */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-semibold text-moss-950">
                  Conversion Rate
                </label>
                <motion.span
                  key={conversionRate}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl font-bold text-moss-700"
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
                className="h-3 w-full cursor-pointer appearance-none rounded-full bg-moss-200 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-moss-gradient [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-moss-gradient [&::-moz-range-thumb]:shadow-lg"
              />
            </div>

            {/* Maturity Level */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-moss-950">
                Current Stack Maturity
              </label>
              <div className="flex gap-3">
                {(Object.keys(maturityLabels) as Maturity[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setMaturity(level)}
                    className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                      maturity === level
                        ? "border-moss-500 bg-moss-gradient text-white shadow-lg scale-105"
                        : "border-moss-200 bg-white text-moss-700 hover:border-moss-400"
                    }`}
                  >
                    {maturityLabels[level]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Dashboard */}
          <motion.div
            key={`${visitors}-${conversionRate}-${maturity}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-10 rounded-3xl border-2 border-moss-400 bg-gradient-to-br from-moss-50 to-white p-8 shadow-xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-moss-gradient text-2xl shadow-lg">
                📊
              </div>
              <div>
                <h3 className="text-xl font-bold text-moss-950">With Marsala OS</h3>
                <p className="text-sm text-sage-600">Estimated improvements</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-moss-200 bg-white p-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-sage-600">
                  Efficiency Gain
                </p>
                <motion.p
                  key={efficiencyGain}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-2 text-4xl font-bold text-moss-700"
                >
                  +{efficiencyGain}%
                </motion.p>
              </div>

              <div className="rounded-2xl border border-moss-200 bg-white p-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-sage-600">
                  Annual Savings
                </p>
                <motion.p
                  key={costSavings}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-2 text-4xl font-bold text-moss-700"
                >
                  ${costSavings}K
                </motion.p>
              </div>

              <div className="rounded-2xl border border-moss-200 bg-white p-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-sage-600">
                  Time to Launch
                </p>
                <motion.p
                  key={weeksToLaunch}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-2 text-4xl font-bold text-moss-700"
                >
                  {weeksToLaunch}w
                </motion.p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <MagneticButton href="/contact" strength={0.5}>
                <span className="inline-flex items-center justify-center gap-2 rounded-full bg-moss-gradient px-10 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300">
                  Get Your Custom Proposal
                  <span>→</span>
                </span>
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

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

const features = [
  {
    icon: IconRocket,
    titleKey: "features.ai.title",
    descriptionKey: "features.ai.description",
    gradient: "from-slate-600 to-slate-700",
    hoverGradient: "from-slate-500 to-slate-600",
  },
  {
    icon: IconBolt,
    titleKey: "features.crm.title",
    descriptionKey: "features.crm.description",
    gradient: "from-slate-600 to-slate-700",
    hoverGradient: "from-slate-500 to-slate-600",
  },
  {
    icon: IconTrendingUp,
    titleKey: "features.data.title",
    descriptionKey: "features.data.description",
    gradient: "from-slate-700 to-slate-800",
    hoverGradient: "from-slate-600 to-slate-700",
  },
  {
    icon: IconBrain,
    titleKey: "features.automation.title",
    descriptionKey: "features.automation.description",
    gradient: "from-slate-700 to-slate-700",
    hoverGradient: "from-slate-600 to-slate-600",
  },
  {
    icon: IconTarget,
    titleKey: "features.analytics.title",
    descriptionKey: "features.analytics.description",
    gradient: "from-slate-600 to-slate-600",
    hoverGradient: "from-slate-500 to-slate-500",
  },
  {
    icon: IconShieldCheck,
    titleKey: "features.security.title",
    descriptionKey: "features.security.description",
    gradient: "from-slate-600 to-slate-600",
    hoverGradient: "from-slate-500 to-slate-500",
  },
];

export function FeaturesSectionWithHoverEffects() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#051c2c] py-24 lg:py-32">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-10" />

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/30 dark:to-slate-900/20" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-[#051c2c] dark:text-white sm:text-5xl lg:text-6xl">
            {t("features.title")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="relative h-full overflow-hidden rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 transition-all duration-300 hover:border-slate-600 dark:hover:border-slate-600 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50">
                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-slate-50 dark:bg-slate-800 opacity-0 transition-opacity duration-300 group-hover:opacity-50" />

                {/* Icon Container */}
                <div className="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-sm bg-slate-600 dark:bg-slate-700 transition-all duration-300 group-hover:bg-[#051c2c] dark:group-hover:bg-slate-600">
                  <feature.icon className="h-8 w-8 text-white" stroke={1.5} />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-semibold text-[#051c2c] dark:text-white mb-3">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t(feature.descriptionKey)}
                  </p>
                </div>

                {/* Bottom Border Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-600 dark:bg-slate-700 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

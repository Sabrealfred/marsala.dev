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
    gradient: "from-moss-600 to-moss-700",
    hoverGradient: "from-moss-500 to-moss-600",
  },
  {
    icon: IconBolt,
    titleKey: "features.crm.title",
    descriptionKey: "features.crm.description",
    gradient: "from-sage-600 to-sage-700",
    hoverGradient: "from-sage-500 to-sage-600",
  },
  {
    icon: IconTrendingUp,
    titleKey: "features.data.title",
    descriptionKey: "features.data.description",
    gradient: "from-moss-700 to-moss-800",
    hoverGradient: "from-moss-600 to-moss-700",
  },
  {
    icon: IconBrain,
    titleKey: "features.automation.title",
    descriptionKey: "features.automation.description",
    gradient: "from-sage-700 to-moss-700",
    hoverGradient: "from-sage-600 to-moss-600",
  },
  {
    icon: IconTarget,
    titleKey: "features.analytics.title",
    descriptionKey: "features.analytics.description",
    gradient: "from-moss-600 to-sage-600",
    hoverGradient: "from-moss-500 to-sage-500",
  },
  {
    icon: IconShieldCheck,
    titleKey: "features.security.title",
    descriptionKey: "features.security.description",
    gradient: "from-sage-600 to-moss-600",
    hoverGradient: "from-sage-500 to-moss-500",
  },
];

export function FeaturesSectionWithHoverEffects() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-moss-950 via-moss-900 to-moss-950 py-24 lg:py-32">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a2e1a_1px,transparent_1px),linear-gradient(to_bottom,#1a2e1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(106,138,108,0.15),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t("features.title")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-moss-200 max-w-2xl mx-auto">
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
              <div className="relative h-full overflow-hidden rounded-2xl border border-moss-700/50 bg-gradient-to-br from-moss-900/50 to-moss-950/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-moss-600/50 hover:shadow-xl hover:shadow-moss-500/10">
                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.hoverGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />

                {/* Icon Container */}
                <div className={`relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg shadow-moss-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-moss-500/40`}>
                  <feature.icon className="h-8 w-8 text-white" stroke={1.5} />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-semibold text-white mb-3 transition-colors duration-300 group-hover:text-moss-100">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-moss-300 leading-relaxed transition-colors duration-300 group-hover:text-moss-200">
                    {t(feature.descriptionKey)}
                  </p>
                </div>

                {/* Bottom Border Accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

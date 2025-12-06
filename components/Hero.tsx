import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-white text-[#051c2c] dark:bg-navy-950 dark:text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-slate-50 dark:bg-navy-950" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white border border-slate-200 mb-8 dark:bg-slate-900 dark:border-slate-700">
                    <span className="w-2 h-2 rounded-sm bg-[#051c2c] dark:bg-white" />
                    <span className="text-sm font-medium text-[#051c2c] tracking-wide dark:text-white">
                        Marsala OS
                    </span>
                </div>

                <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-[#051c2c] dark:text-white">
                    Intelligent <span className="text-[#051c2c] dark:text-white">Growth Studio</span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 dark:text-slate-300">
                    Design, build, and automate your digital ecosystem with modular intelligence across brand, web, CRM, AI, ads, and data.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/modules"
                        className="group relative px-8 py-4 bg-[#051c2c] text-white rounded-sm font-semibold text-lg transition-all hover:bg-[#0a2d42] dark:bg-white dark:text-[#051c2c] dark:hover:bg-slate-100"
                    >
                        <span className="flex items-center gap-2">
                            Explore Modules
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>

                    <Link
                        href="/contact"
                        className="group px-8 py-4 bg-white text-[#051c2c] rounded-sm font-semibold text-lg border-2 border-[#051c2c] transition-all hover:bg-slate-50 dark:bg-transparent dark:text-white dark:border-white dark:hover:bg-slate-900"
                    >
                        <span className="flex items-center gap-2">
                            Start a Project
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

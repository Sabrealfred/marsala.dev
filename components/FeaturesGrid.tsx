import { Code2, Users, Zap, Shield, Globe, Cpu } from "lucide-react";

const features = [
    {
        icon: Code2,
        title: "AI-Powered Coding",
        description: "Intelligent code completion and refactoring suggestions powered by state-of-the-art models.",
    },
    {
        icon: Users,
        title: "Real-time Collaboration",
        description: "Code together with your team in real-time, with integrated voice and video chat.",
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Built on Rust for unparalleled performance and near-instant startup times.",
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "Bank-grade encryption and compliance features to keep your code safe.",
    },
    {
        icon: Globe,
        title: "Cloud Native",
        description: "Deploy directly to any cloud provider with a single click from your editor.",
    },
    {
        icon: Cpu,
        title: "Resource Efficient",
        description: "Uses 50% less memory than Electron-based editors, keeping your system responsive.",
    },
];

export function FeaturesGrid() {
    return (
        <section className="py-24 bg-white dark:bg-[#051c2c] relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#051c2c] dark:text-white mb-6">
                        Engineered for <span className="text-[#051c2c] dark:text-slate-100">Performance</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-xl max-w-2xl mx-auto">
                        Everything you need to build world-class software, packaged in a beautiful, lightweight interface.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-600 dark:hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50"
                        >
                            <div className="w-12 h-12 rounded-sm bg-slate-600 dark:bg-slate-700 flex items-center justify-center mb-6 group-hover:bg-[#051c2c] dark:group-hover:bg-slate-600 transition-all duration-300">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#051c2c] dark:text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

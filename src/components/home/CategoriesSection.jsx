import React from 'react';
import { motion } from 'framer-motion';
import { 
    FileText, ShoppingCart, Download, Eye, 
    Heart, Home, Landmark, Trophy,
    Bitcoin, Sparkles
} from 'lucide-react';

const categories = [
    { icon: FileText, name: 'CPL', label: 'Cost Per Lead', color: 'from-blue-500 to-blue-600', description: 'Pay per qualified lead generated' },
    { icon: ShoppingCart, name: 'CPA', label: 'Cost Per Action', color: 'from-purple-500 to-purple-600', description: 'Pay when users complete actions' },
    { icon: Trophy, name: 'CPS', label: 'Cost Per Sale', color: 'from-green-500 to-green-600', description: 'Commission on each sale made' },
    { icon: Download, name: 'CPD', label: 'Cost Per Download', color: 'from-orange-500 to-orange-600', description: 'Pay for app installs & downloads' },
    { icon: Eye, name: 'CPM', label: 'Cost Per Mille', color: 'from-pink-500 to-pink-600', description: 'Pay per thousand impressions' },
    { icon: Heart, name: 'Health Insurance', label: 'Insurance Leads', color: 'from-red-500 to-red-600', description: 'Premium insurance lead generation' },
    { icon: Home, name: 'Home Improvement', label: 'Home Services', color: 'from-amber-500 to-amber-600', description: 'Home renovation & services' },
    { icon: Landmark, name: 'Fintech', label: 'Financial Tech', color: 'from-cyan-500 to-cyan-600', description: 'Banking & financial services' },
    { icon: Trophy, name: 'Sweepstakes', label: 'Contests', color: 'from-yellow-500 to-yellow-600', description: 'Prize & contest campaigns' },
    { icon: Bitcoin, name: 'Crypto', label: 'Cryptocurrency', color: 'from-violet-500 to-violet-600', description: 'Crypto trading platforms' },
    { icon: Sparkles, name: 'AI', label: 'Artificial Intelligence', color: 'from-indigo-500 to-indigo-600', description: 'AI tools & services' }
];

export default function CategoriesSection() {
    return (
        <section id="categories" className="py-24 bg-[#0F172A] relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                        Offer Categories
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Diverse
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Verticals </span>
                        to Promote
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Access high-converting offers across multiple industries and pricing models
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-full">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <category.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-1">{category.name}</h3>
                                <p className="text-gray-500 text-sm">{category.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
import React from 'react';
import { motion } from 'framer-motion';
import { 
    Globe, Smartphone, ShoppingBag, 
    TrendingUp, Users, ArrowRight 
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const services = [
    {
        icon: Globe,
        title: 'Web Development',
        description: 'Custom websites built with modern technologies for optimal performance and user experience.',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        icon: Smartphone,
        title: 'App Development',
        description: 'Native and cross-platform mobile applications that engage and convert users.',
        color: 'from-purple-500 to-pink-500'
    },
    {
        icon: ShoppingBag,
        title: 'E-commerce Store',
        description: 'Complete e-commerce solutions with secure payments and inventory management.',
        color: 'from-orange-500 to-red-500'
    },
    {
        icon: TrendingUp,
        title: 'Affiliate Marketing',
        description: 'Performance-based marketing campaigns that deliver measurable ROI.',
        color: 'from-green-500 to-emerald-500'
    },
    {
        icon: Users,
        title: 'Influencer Marketing',
        description: 'Connect with top influencers to amplify your brand reach and engagement.',
        color: 'from-yellow-500 to-orange-500'
    }
];

export default function ServicesSection() {
    return (
        <section id="services" className="py-24 bg-gradient-to-b from-[#0A1628] to-[#0F172A] relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
                        Our Services
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Digital Solutions
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> That Scale </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        End-to-end digital services to help your business grow and succeed in the digital landscape
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="relative h-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <service.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>
                                <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                                    <span className="text-sm font-medium">Learn more</span>
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
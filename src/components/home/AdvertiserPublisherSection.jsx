import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
    Target, TrendingUp, Shield, BarChart3, 
    Users, DollarSign, Zap, Globe,
    ArrowRight, CheckCircle2
} from 'lucide-react';

const advertiserBenefits = [
    { icon: Target, text: 'Targeted Quality Traffic' },
    { icon: BarChart3, text: 'Real-time Analytics' },
    { icon: Shield, text: 'Fraud Prevention' },
    { icon: TrendingUp, text: 'Performance-Based Pricing' }
];

const publisherBenefits = [
    { icon: DollarSign, text: 'High Payouts & On-time Payments' },
    { icon: Zap, text: 'Exclusive Offers' },
    { icon: Globe, text: 'Global Campaigns' },
    { icon: Users, text: 'Dedicated Support' }
];

export default function AdvertiserPublisherSection() {
    return (
        <section className="py-24 bg-gradient-to-b from-[#0A1628] to-[#0F172A] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Choose Your
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Path </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Whether you're looking to grow your business or monetize your traffic, we have the perfect solution for you.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Advertiser Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                        <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-500">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                                    <Target className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white">For Advertisers</h3>
                                    <p className="text-blue-400 text-sm">Scale your business with quality leads</p>
                                </div>
                            </div>

                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Partner with us to reach millions of potential customers. Our network of verified publishers 
                                delivers high-quality traffic that converts. Pay only for results.
                            </p>

                            <div className="space-y-4 mb-8">
                                {advertiserBenefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                            <benefit.icon className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <span className="text-gray-300">{benefit.text}</span>
                                    </div>
                                ))}
                            </div>

                            <a
                                href="https://wahenoor.offer18.com/m/login"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-[1.02]">
                                    Become an Advertiser
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </a>
                        </div>
                    </motion.div>

                    {/* Publisher Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                        <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-500">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                    <Users className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white">For Publishers</h3>
                                    <p className="text-purple-400 text-sm">Monetize your traffic effectively</p>
                                </div>
                            </div>

                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Join our network of successful publishers earning consistent revenue. Access exclusive 
                                high-converting offers with competitive payouts and reliable payments.
                            </p>

                            <div className="space-y-4 mb-8">
                                {publisherBenefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                            <benefit.icon className="w-4 h-4 text-purple-400" />
                                        </div>
                                        <span className="text-gray-300">{benefit.text}</span>
                                    </div>
                                ))}
                            </div>

                            <a
                                href="https://wahenoor.offer18.com/m/login"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-[1.02]">
                                    Become a Publisher
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
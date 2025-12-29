import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ContactSection() {
    return (
        <section id="contact" className="py-24 bg-gradient-to-b from-[#0F172A] to-[#0A1628] relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
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
                        Get In Touch
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Let's Start
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Working Together </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Ready to grow your business? Reach out to us and let's discuss how we can help
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="space-y-8">
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Our Office</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        564, New Gobind Nagar,<br />
                                        Chaura Bazar, Sultanwind Road,<br />
                                        Amritsar, Punjab, India
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
                                    <a href="tel:+917009039292" className="text-gray-400 hover:text-blue-400 transition-colors text-lg">
                                        +91-7009039292
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                                    <a href="mailto:info@wahenoormedia.com" className="text-gray-400 hover:text-blue-400 transition-colors text-lg">
                                        info@wahenoormedia.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Business Hours</h3>
                                    <p className="text-gray-400">
                                        Monday - Saturday: 10:00 AM - 7:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm h-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl" />
                            
                            <div className="relative">
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                    Ready to Scale Your Business?
                                </h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    Join thousands of successful advertisers and publishers who trust Wahenoor Digital Media 
                                    for their performance marketing needs. Sign up today and start earning!
                                </p>

                                <div className="space-y-4">
                                    <a
                                        href="https://wahenoor.offer18.com/m/login"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-6 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-[1.02]">
                                            Sign Up Now
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </a>
                                    
                                    <a
                                        href="mailto:info@wahenoormedia.com"
                                        className="block"
                                    >
                                        <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 py-6 rounded-xl text-lg font-semibold">
                                            <Mail className="mr-2 w-5 h-5" />
                                            Send Us an Email
                                        </Button>
                                    </a>
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <p className="text-gray-500 text-sm text-center">
                                        Join 500+ publishers already earning with us
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
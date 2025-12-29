import React from 'react';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const quickLinks = [
    { name: 'Advertiser', href: '#advertiser' },
    { name: 'Publisher', href: '#publisher' },
    { name: 'Categories', href: '#categories' },
    { name: 'Services', href: '#services' },
    { name: 'Products', href: '#products' },
    { name: 'Contact', href: '#contact' }
];

const products = [
    { name: 'PolicyWala', href: 'https://policywala.help' },
    { name: 'NoorHerbs', href: 'https://noorherbs.com' },
    { name: 'Ekam Matchmaker', href: 'https://ekammatchmaker.com' },
    { name: 'Alt Energy', href: 'https://altenergy.com' },
    { name: 'Lok Prakash', href: 'https://lokprakash.com' }
];

export default function Footer() {
    return (
        <footer className="bg-[#0A1628] border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                Wahenoor
                                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Digital</span>
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">Media</p>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Leading affiliate marketing agency connecting premium advertisers with top-tier publishers for performance-driven results.
                        </p>
                        <a
                            href="https://wahenoor.offer18.com/m/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
                        >
                            Sign Up Now
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href={link.href}
                                        className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Our Products</h3>
                        <ul className="space-y-3">
                            {products.map((product, index) => (
                                <li key={index}>
                                    <a 
                                        href={product.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
                                    >
                                        {product.name}
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-400 text-sm">
                                    564, New Gobind Nagar,<br />
                                    Chaura Bazar, Sultanwind Road,<br />
                                    Amritsar
                                </span>
                            </li>
                            <li>
                                <a href="tel:+917009039292" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors text-sm">
                                    <Phone className="w-5 h-5 text-blue-400" />
                                    +91-7009039292
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@wahenoormedia.com" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors text-sm">
                                    <Mail className="w-5 h-5 text-blue-400" />
                                    info@wahenoormedia.com
                                </a>
                            </li>
                            <li className="pt-4 border-t border-white/10">
                                <a href="/AdminOffers" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30 transition-all text-sm">
                                    <ExternalLink className="w-4 h-4" />
                                    Admin Login
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Wahenoor Digital Media. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Privacy Policy</a>
                            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Button } from "@/components/ui/button";
import { Menu, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';

const navLinks = [
    { name: 'Home', href: '#hero', page: 'Home' },
    { name: 'Offers', page: 'Offers' },
    { name: 'Categories', href: '#categories' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
];

export default function Layout({ children }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#0A1628]">
            <ScrollToTop />
            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-[#0A1628]/95 backdrop-blur-lg border-b border-white/10 shadow-lg' : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to={createPageUrl('Home')} className="flex items-center">
                            <span className="text-xl sm:text-2xl font-bold text-white">
                                Wahenoor
                                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Digital</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link, index) => (
                                link.page ? (
                                    <Link
                                        key={index}
                                        to={createPageUrl(link.page)}
                                        className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <button
                                        key={index}
                                        onClick={() => scrollToSection(link.href)}
                                        className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                                    >
                                        {link.name}
                                    </button>
                                )
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="hidden lg:flex items-center gap-4">
                            <a
                                href="https://wahenoor.offer18.com/m/login"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-6">
                                    Sign Up
                                    <ExternalLink className="ml-2 w-4 h-4" />
                                </Button>
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-[#0A1628]/98 backdrop-blur-lg border-b border-white/10"
                        >
                            <div className="px-4 py-6 space-y-4">
                                {navLinks.map((link, index) => (
                                    link.page ? (
                                        <Link
                                            key={index}
                                            to={createPageUrl(link.page)}
                                            className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2 text-lg"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <button
                                            key={index}
                                            onClick={() => scrollToSection(link.href)}
                                            className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2 text-lg"
                                        >
                                            {link.name}
                                        </button>
                                    )
                                ))}
                                <a
                                    href="https://wahenoor.offer18.com/m/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full mt-4">
                                        Sign Up Now
                                        <ExternalLink className="ml-2 w-4 h-4" />
                                    </Button>
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Page Content */}
            <main>{children}</main>
        </div>
    );
}
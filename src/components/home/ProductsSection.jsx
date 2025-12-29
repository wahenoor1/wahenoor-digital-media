import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Leaf, Heart, Sun, Newspaper, ExternalLink, Package } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function ProductsSection() {
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => base44.entities.Product.filter({ status: 'active' }, '-created_date'),
    });

    if (isLoading || products.length === 0) return null;
    return (
        <section id="products" className="py-24 bg-[#0F172A] relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-green-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-4">
                        Our Products
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Ventures We
                        <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent"> Power </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Explore our diverse portfolio of digital products serving millions of users
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => {
                        const iconMap = { Shield, Leaf, Heart, Sun, Newspaper, Package };
                        const IconComponent = iconMap[product.icon_name] || Shield;
                        return (
                        <motion.a
                            key={index}
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group block"
                        >
                            <div className="relative h-full rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500">
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={product.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />
                                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${product.color || 'from-blue-500 to-indigo-500'} text-white text-xs font-medium`}>
                                        {product.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${product.color || 'from-blue-500 to-indigo-500'} flex items-center justify-center`}>
                                            <IconComponent className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{product.name}</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{product.description}</p>
                                    <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                                        <span className="text-sm font-medium">Visit Website</span>
                                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
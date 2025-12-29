import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Calendar, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';

export default function GallerySection() {
    const { data: gallery = [], isLoading } = useQuery({
        queryKey: ['gallery'],
        queryFn: () => base44.entities.Gallery.list('-created_date', 8),
    });

    if (isLoading) {
        return (
            <section className="py-24 bg-[#0A1628]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-gray-400">Loading gallery...</div>
                </div>
            </section>
        );
    }

    if (gallery.length === 0) {
        return null;
    }

    return (
        <section id="gallery" className="py-24 bg-[#0A1628] relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
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
                        <ImageIcon className="w-4 h-4 inline mr-2" />
                        Event Gallery
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Our
                        <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"> Moments </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Highlights from our events, conferences, and celebrations
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {gallery.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <img 
                                src={item.image_url}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                                {item.event_date && (
                                    <div className="flex items-center gap-1 text-gray-300 text-xs">
                                        <Calendar className="w-3 h-3" />
                                        {format(new Date(item.event_date), 'MMM d, yyyy')}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
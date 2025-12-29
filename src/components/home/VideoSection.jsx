import React from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';

const videos = [
    {
        id: 1,
        url: 'https://youtube.com/shorts/C5x2dTicuNA',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=600&fit=crop',
        title: 'Performance Marketing Tips'
    },
    {
        id: 2,
        url: 'https://youtube.com/shorts/yJlcPtuEYSo',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop',
        title: 'Affiliate Success Stories'
    },
    {
        id: 3,
        url: 'https://youtube.com/shorts/psU9BNmBMS4',
        thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=600&fit=crop',
        title: 'Industry Insights'
    }
];

export default function VideoSection() {
    return (
        <section className="py-24 bg-[#0A1628] relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
                        Watch & Learn
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Industry
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Insights </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Watch our latest videos on affiliate marketing strategies and success stories
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {videos.map((video, index) => (
                        <motion.a
                            key={video.id}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer"
                        >
                            <img 
                                src={video.thumbnail}
                                alt={video.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            
                            {/* Play button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                                </div>
                            </div>

                            {/* Title */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-white font-semibold text-lg mb-2">{video.title}</h3>
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <ExternalLink className="w-4 h-4" />
                                    Watch on YouTube
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
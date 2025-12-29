import React from 'react';
import { motion } from 'framer-motion';

// Extract video ID from YouTube URL
const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split('/').pop().split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
};

const videos = [
    {
        id: 1,
        url: 'https://youtube.com/shorts/C5x2dTicuNA',
        title: 'Performance Marketing Tips'
    },
    {
        id: 2,
        url: 'https://youtube.com/shorts/yJlcPtuEYSo',
        title: 'Affiliate Success Stories'
    },
    {
        id: 3,
        url: 'https://youtube.com/shorts/psU9BNmBMS4',
        title: 'Industry Insights'
    }
];

export default function VideoSection() {
    return (
        <section className="py-16 bg-gradient-to-b from-[#EDE8E0] to-[#F5F1EB]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <p className="text-gray-700 text-base">
                        Watch what experts and customers say about Sea Buckthorn - The Wonder Berry from Ladakh
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="aspect-[9/16] rounded-xl overflow-hidden shadow-lg bg-white"
                        >
                            <iframe
                                src={getYouTubeEmbedUrl(video.url)}
                                title={video.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
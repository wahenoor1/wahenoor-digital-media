import React from 'react';
import { motion } from 'framer-motion';

const clients = [
    { name: 'Spinny', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spinny_Logo.svg/1200px-Spinny_Logo.svg.png' },
    { name: 'Cars24', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/CARS24_Logo.svg/2560px-CARS24_Logo.svg.png' },
    { name: 'TATA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/1200px-Tata_logo.svg.png' },
    { name: 'Dream11', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Dream11_logo.png/220px-Dream11_logo.png' },
    { name: 'Bajaj Allianz', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Bajaj_Allianz_logo.svg/1200px-Bajaj_Allianz_logo.svg.png' },
    { name: 'Reliance', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Reliance_Industries_Logo.svg/1200px-Reliance_Industries_Logo.svg.png' },
    { name: 'Exness', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Exness_logo.svg/2560px-Exness_logo.svg.png' },
    { name: 'XM', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/XM_logo.svg/1200px-XM_logo.svg.png' },
    { name: 'Capex', logo: 'https://play-lh.googleusercontent.com/dZK1qZF3-N2P9i5U9nQN3K1wHzK5xUqBUxLZ6J5_2E8Z0Q9W6qB7S6c8r8t0u8v0w8x' },
    { name: 'Aditya Birla', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Aditya_Birla_Group_Logo.svg/1200px-Aditya_Birla_Group_Logo.svg.png' },
    { name: 'Choice Home Warranty', logo: 'https://play-lh.googleusercontent.com/5Ku_X9mXK1V3E3N2P9i5U9nQN3K1wHzK5xUqBUxLZ6J5_2E8Z0Q9W6qB7S6c8r8t0u8v0w8x' },
    { name: 'Nerolac', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Nerolac_Paints_logo.svg/1200px-Nerolac_Paints_logo.svg.png' },
    { name: 'Asian Paints', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Asian_Paints_Logo.svg/1200px-Asian_Paints_Logo.svg.png' }
];

// Duplicate for seamless loop
const duplicatedClients = [...clients, ...clients];

export default function ClientCarousel() {
    return (
        <section className="py-16 bg-gradient-to-b from-[#0F172A] to-[#0A1628] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-4">
                        Trusted Partners
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Brands That
                        <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"> Trust Us </span>
                    </h2>
                </motion.div>
            </div>

            {/* Scrolling logos */}
            <div className="relative">
                {/* Left fade */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A1628] to-transparent z-10" />
                {/* Right fade */}
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A1628] to-transparent z-10" />

                <div className="overflow-hidden">
                    <motion.div
                        animate={{ x: [0, -50 * clients.length] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 30,
                                ease: "linear",
                            },
                        }}
                        className="flex gap-8 items-center"
                    >
                        {duplicatedClients.map((client, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-40 h-20 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center p-4 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="text-white font-bold text-lg text-center">
                                    {client.name}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
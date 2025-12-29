import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import AdvertiserPublisherSection from '@/components/home/AdvertiserPublisherSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import ClientCarousel from '@/components/home/ClientCarousel';
import VideoSection from '@/components/home/VideoSection';
import ServicesSection from '@/components/home/ServicesSection';
import ProductsSection from '@/components/home/ProductsSection';
import ContactSection from '@/components/home/ContactSection';
import Footer from '@/components/home/Footer';

export default function Home() {
    return (
        <div className="bg-[#0A1628] min-h-screen">
            <HeroSection />
            <AdvertiserPublisherSection />
            <CategoriesSection />
            <ClientCarousel />
            <VideoSection />
            <ServicesSection />
            <ProductsSection />
            <ContactSection />
            <Footer />
        </div>
    );
}
'use client';
import { useState, useEffect } from 'react';
import SideNavBar from '@/components/SideNavBar';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

const images = [
    { src: "/images/CBTK-1.png", alt: "Riley Cutting Hair!" },
    { src: "/images/CBTK-2.png", alt: "Riley Cutting Hair!" },
    { src: "/images/CBTK-3.png", alt: "Riley Cutting Hair!" }
];

export default function HomePage() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-row min-h-screen bg-black text-white overflow-hidden items-center">
            {/* Left Navigation Section */}
            <div className="lg:w-2/5 p-8 lg:p-16 flex flex-col justify-center">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl font-bold mb-4">DREAM</h1>
                    <h1 className="text-6xl font-bold mb-12">CORE</h1>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <SideNavBar />
                </motion.div>
            </div>

            {/* Image slideshow */}
            <div className="lg:w-3/5 relative h-screen">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <Image
                            fill
                            className="object-cover object-center"
                            alt={images[currentImage].alt}
                            src={images[currentImage].src}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
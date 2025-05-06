// src/app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import NavBar from '@/components/Navbar';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';


const images = [
  { src: "/images/CBTK-1.png", alt: "First image of riley's hair product" }
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
      <div className="min-h-screen bg-black text-white overflow-hidden items-center flex flex-col">
          {/* Left Navigation Section */}
          <div className="w-full p-8 lg:p-16 flex flex-col items-center">
              <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
              >
                  <NavBar />
              </motion.div>
          </div>
          {/* Image slideshow */}
          <div className="w-full relative h-screen">
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


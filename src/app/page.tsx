// src/app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import NavBar from '@/components/Header';
import CartButton from '@/components/CartButton';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';
import AnimatedLogo from '@/components/AnimatedLogo';

const images = [
  { src: "/product1-photos/product1.png", alt: "First image of riley's hair product" }, 
  { src: "/product1-photos/product2.png", alt: "Second image of riley's hair product" }
];

const navLinks = [
    { name: "Shop", href: "/store" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" }
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
    <div className="flex flex-col h-screen overflow-hidden md:flex-row md:min-h-screen md:overflow-auto">
      {/* Left Navigation Section */}
      <header className="w-full h-1/3 md:h-screen md:w-1/2 p-6 md:p-8 lg:p-16 flex flex-col items-center justify-center text-center md:text-left md:items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center md:items-start"
        >
          <div className="h-[120px] md:h-[200px] flex items-center justify-center w-full md:justify-start">
            <div className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl xl:text-9xl">
              <AnimatedLogo />
            </div>
          </div>
          <nav className="mt-4 md:mt-10 w-full flex md:flex-col flex-row justify-center space-x-4 md:space-x-0 md:space-y-2 md:items-start md:space-y-6 py-2 md:py-4">
              {navLinks.map((link) => (
                  <Link 
                      key={link.name} 
                      href={link.href}
                      className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl hover:scale-120 transition-transform duration-200"
                  >
                      {link.name}
                  </Link>
              ))}
          </nav>
        </motion.div>
      </header>

      {/* Right Image Slideshow Section */}
      <div className="w-full h-2/3 md:h-screen md:w-1/2 flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full"
          >
            <Image
              className="object-contain"
              alt={images[currentImage].alt}
              src={images[currentImage].src}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
  
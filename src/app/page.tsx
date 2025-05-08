// src/app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import NavBar from '@/components/Navbar';
import CartButton from '@/components/CartButton';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';
import AnimatedLogo from '@/components/AnimatedLogo';

const images = [
  { src: "/product-photos/product1.png", alt: "First image of riley's hair product" }, 
  { src: "/product-photos/product2.png", alt: "Second image of riley's hair product" }
];

const navLinks = [
    { name: "Shop", href: "/store" },
    { name: "Gallery", href: "/gallery" }
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
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Navigation Section (1/3) */}
      <div className="w-full md:w-1/3 p-8 lg:p-16 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full text-5xl md:text-7xl lg:text-7xl xl:text-9xl"
        >
          <AnimatedLogo />
          <nav className="mt-10 md:flex md:flex-col md:items-start md:justify-center md:space-y-6
                        static h-auto flex-row items-center justify-center space-y-0 space-x-6 py-4 w-full">
              {navLinks.map((link) => (
                  <Link 
                      key={link.name} 
                      href={link.href}
                      className="text-3xl md:text-5xl lg:text-7xl hover:scale-120 transition-transform duration-200"
                  >
                      {link.name}
                  </Link>
              ))}
          </nav>
        </motion.div>
      </div>

      {/* Right Image Slideshow Section (2/3) */}
      <div className="w-full md:w-2/3 flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative w-full h-[50vh] md:h-[80vh]"
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
  
// components/HomePage.tsx
// this home page has desmonds figma deisng kind of
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Define the product type for carousel items
interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
}

// Sample product data - explicitly using PNG format
const products: Product[] = [
  {
    id: 1,
    name: "grapes",
    image: "/images/image.png", 
    description: "grapes"
  },
  {
    id: 2,
    name: "grapes",
    image: "/images/image.png",
    description: "grapes"
  },
  {
    id: 3,
    name: "Lgrapes",
    image: "/images/image.png",
    description: "grapes"
  },
  {
    id: 4,
    name: "Void Candle",
    image: "/images/image.png",
    description: "Handcrafted black candle with notes of amber and smoky wood."
  },
];

export default function HomePage() {
  // Add custom styles to override any default white backgrounds
  useEffect(() => {
    // Add a style tag to override any shadcn defaults that might be causing the issue
    const style = document.createElement('style');
    style.innerHTML = `
      .carousel-override * {
        background-color: transparent !important;
      }
      
      .carousel-item-transparent {
        background-color: transparent !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white overflow-hidden">
      {/* Left Navigation Section */}
      <div className="lg:w-2/5 p-8 lg:p-16 flex flex-col justify-center">
        <h1 className="text-6xl font-bold mb-4">DREAM</h1>
        <h1 className="text-6xl font-bold mb-12">CORE</h1>
        
        <NavigationMenu orientation="vertical" className="mt-8">
          <NavigationMenuList className="flex flex-col items-start space-y-6">
            <NavigationMenuItem className="bg-transparent text-2xl hover:text-slate-300 transition-colors">
              <Link href="/book" legacyBehavior passHref>
                <NavigationMenuLink className="text-2xl">Book Now</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="bg-transparent text-2xl hover:text-gray-300 transition-colors">
              <Link href="/shop" legacyBehavior passHref>
                <NavigationMenuLink className="bg-transparent text-2xl">Shop</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="bg-transparent text-2xl hover:text-gray-300 transition-colors">
              <Link href="/gallery" legacyBehavior passHref>
                <NavigationMenuLink className="bg-transparent text-2xl">Gallery</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="bg-transparent text-2xl hover:text-gray-300 transition-colors">
              <Link href="/location" legacyBehavior passHref>
                <NavigationMenuLink className="bg-transparent text-2xl">Location</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="bg-transparent text-2xl hover:text-gray-300 transition-colors">
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className="bg-transparent text-2xl">About</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="bg-transparent text-2xl hover:text-gray-300 transition-colors">
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className="bg-transparent text-2xl">Contact</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right Carousel Section - Using custom styling approach instead of shadcn carousel */}
      <div className="lg:w-3/5 relative flex items-center justify-center bg-black">
        {/* Custom carousel instead of shadcn's default */}
        <div className="relative w-full max-w-lg h-96 carousel-override">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              } flex flex-col items-center justify-center bg-black carousel-item-transparent`}
            >
              <div className="relative w-full h-full carousel-item-transparent">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                  style={{ backgroundColor: 'transparent' }}
                />
              </div>
            </div>
          ))}
          
          {/* Navigation dots */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full focus:outline-none ${
                  activeIndex === index ? 'bg-white' : 'bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={() => setActiveIndex((prev) => (prev - 1 + products.length) % products.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-black bg-opacity-50 text-white z-20"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button 
            onClick={() => setActiveIndex((prev) => (prev + 1) % products.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-black bg-opacity-50 text-white z-20"
            aria-label="Next slide"
          >
            →
          </button>
          
          
        </div>
        {/* Buy Now Button */}
        <div className="absolute bottom-8 right-8 z-20">
            <Button 
              variant="ghost" 
              size="lg" 
              className="bg-transparent hover: grey-300 text-white border border-white rounded-full px-6 py-2 transition-colors duration-300"
              >
              Buy Now
            </Button>
          </div>
      </div>
    </div>
  );
}
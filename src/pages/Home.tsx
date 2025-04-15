"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from 'next/link';

// Carousel images data
const carouselImages = [
  {
    id: 1,
    src: "/images/grape.jpeg",
    alt: "Featured Product 1",
    title: "Premium Collection",
    description: "Discover our exclusive range of products"
  },
  {
    id: 2,
    src: "/images/grape.jpeg",
    alt: "Featured Product 2",
    title: "New Arrivals",
    description: "Check out the latest additions to our catalog"
  },
  {
    id: 3,
    src: "/images/grape.jpeg",
    alt: "Featured Product 3",
    title: "Limited Edition",
    description: "Get them before they're gone"
  },
  {
    id: 4,
    src: "/images/grape.jpeg",
    alt: "Featured Product 4",
    title: "Best Sellers",
    description: "Our most popular items"
  }
];

// Navigation links
const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Shop", href: "/shopgallerypage" },
  { name: "Booking", href: "/booking" },
  { name: "Photo Gallery", href: "/gallery" },
  { name: "Sign in", href:"/login"}

];

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">    
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-8 w-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className="px-4 py-2 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Carousel */}
        <section className="mb-12">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {carouselImages.map((image) => (
                <CarouselItem key={image.id}>
                  <Card className="border-0 overflow-hidden">
                    <CardContent className="p-0 relative aspect-[16/9]">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                        <h2 className="text-3xl font-bold mb-2">{image.title}</h2>
                        <p className="text-lg mb-4">{image.description}</p>
                        <Button className="w-fit bg-white text-black hover:bg-gray-200">
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </section>
      </main>
    </div>
  );
}   
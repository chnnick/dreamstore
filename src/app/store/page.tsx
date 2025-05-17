"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Footer } from '@/components/Footer';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  stocked: boolean;
  size: number;
  price: number;
  description: string;
  imageUrl: string;
}

const products: Product[] = [
  {
    id: 0,
    name: "Texture Powder",
    stocked: true,
    size: 20,
    price: 24.99,
    description: "Created by barbers for barbers.",
    imageUrl: "/product1-photos"
  }, 
  {
    id: 1,
    name: "Poop Powder",
    stocked: true,
    size: 20,
    price: 0.99,
    description: "Test item.",
    imageUrl: "/product2-photos"
  }
  
];

export default function ShopPage() {
  const [currentProduct, setCurrentProduct] = useState<Product>(products[0]);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const addItem = useCartStore(state => state.addItem);

  const goToPreviousProduct = () => {
    setSlideDirection('right');
    const prevIndex = currentProduct.id - 1 < 0 ? products.length - 1 : currentProduct.id - 1;
    setCurrentProduct(products[prevIndex]);
  };

  const goToNextProduct = () => {
    setSlideDirection('left');
    const nextIndex = currentProduct.id + 1 > products.length - 1 ? 0 : currentProduct.id + 1;
    setCurrentProduct(products[nextIndex]);
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row gap-20 max-w-7xl py-5 px-10">
        <motion.div 
          id="productinfo" 
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-[300px]">
            <h2 className="text-9xl font-semibold leading-tight">{currentProduct.name}</h2>
          </div>
          <div className="flex flex-col items-center h-[60px] my-3">
            <Button 
              className="w-full h-[60px] text-3xl bg-[var(--text-color)] text-[var(--bg-color)] hover:scale-110 transition-transform hover:bg-[var(--text-color)] hover:text-[var(--bg-color)]"
              onClick={() => addItem(currentProduct)}>
              Add to Cart
            </Button>
          </div>
          <div className="space-y-6">
            <div className="h-[60px]">
              <p className="text-5xl">${currentProduct.price.toFixed(2)}</p>
            </div>
            <div className="h-[60px]">
              <p className="text-5xl">{currentProduct.stocked ? "In Stock" : "Out of Stock"}</p>
            </div>
            <div className="h-[60px]">
              <p className="text-5xl">{currentProduct.size} OZ</p>
            </div>
            <div className="h-[60px]">
              <p className="text-5xl">{currentProduct.description}</p>
            </div>
          </div>
        </motion.div>
        <motion.div 
          id="productimage" 
          className="flex flex-row w-full md:w-1/2 justify-center items-center relative"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            onClick={goToPreviousProduct}
            className="absolute left-0 z-10 hover:scale-105 transition-transform"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="w-full relative overflow-hidden flex justify-center items-center">
            <img 
              src={`${currentProduct.imageUrl}/product1.png`}
              alt={currentProduct.name}
              className={`max-w-[700px] max-h-[500px] w-auto h-auto object-contain ${slideDirection ? `animate-slide-${slideDirection}` : ''}`}
              onAnimationEnd={() => setSlideDirection(null)}
            />
          </div>
          <Button 
            onClick={goToNextProduct}
            className="absolute right-0 z-10 hover:scale-110 transition-transform"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </motion.div>
      </div>
    </main>
  );
}

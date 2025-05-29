"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Footer } from '@/components/Footer';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';

interface Product {
  id: number;
  name: string;
  stock_status: string;
  size: string;
  price: number;
  description: string;
  image_url: string;
  second_image_url?: string;
  stripe_id: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setProducts(data);
        if (data.length > 0) {
          setCurrentProduct(data[0]);
        }
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const goToPreviousProduct = () => {
    if (!currentProduct || products.length === 0) return;
    
    setSlideDirection('right');
    const currentIndex = products.findIndex(p => p.id === currentProduct.id);
    const prevIndex = currentIndex - 1 < 0 ? products.length - 1 : currentIndex - 1;
    setCurrentProduct(products[prevIndex]);
  };

  const goToNextProduct = () => {
    if (!currentProduct || products.length === 0) return;
    
    setSlideDirection('left');
    const currentIndex = products.findIndex(p => p.id === currentProduct.id);
    const nextIndex = currentIndex + 1 > products.length - 1 ? 0 : currentIndex + 1;
    setCurrentProduct(products[nextIndex]);
  };

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-2xl">Loading products...</p>
        </div>
      </main>
    );
  }

  if (error || !currentProduct) {
    return (
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-2xl text-red-500">{error || 'No products available'}</p>
        </div>
      </main>
    );
  }

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
              <p className="text-5xl">{currentProduct.stock_status ? "In Stock" : "Out of Stock"}</p>
            </div>
            <div className="h-[60px]">
              <p className="text-5xl">{currentProduct.size}</p>
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
            <div className="relative flex justify-center items-center w-full h-full group">
              <img 
                src={currentProduct.image_url}
                alt={currentProduct.name}
                className={`max-w-[700px] max-h-[500px] w-auto h-auto object-contain transition-opacity duration-300 ${slideDirection ? `animate-slide-${slideDirection}` : ''} ${currentProduct.second_image_url ? 'group-hover:opacity-0' : ''}`}
                onAnimationEnd={() => setSlideDirection(null)}
              />
              {currentProduct.second_image_url && (
                <img 
                  src={currentProduct.second_image_url}
                  alt={`${currentProduct.name} - Second view`}
                  className="max-w-[700px] max-h-[500px] w-auto h-auto object-contain absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              )}
            </div>
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

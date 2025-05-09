"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import NavBar from "@/components/Navbar";
import { dispatchCartUpdate } from '@/lib/events';
import { Footer } from '@/components/Footer';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const products: Product[] = [
  {
    id: 0,
    name: "Texture Powder",
    price: 24.99,
    description: "Created by barbers for barbers, this is a high quality, easy to use, and affordable texture powder.",
    imageUrl: "/product-photos"
  }
];

export default function ShopPage() {
  const [currentProduct, setCurrentProduct] = useState<Product>(products[0]);

  const addToCart = (product: Product) => {
    const savedCart = localStorage.getItem('cart');
    const cartItems = savedCart ? JSON.parse(savedCart) : [];

    const existingItemIndex = cartItems.findIndex(
      (item: any) => item.product.id === product.id
    );

    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({ product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    dispatchCartUpdate();
  };

  const goToPreviousProduct = () => {
    const prevIndex = currentProduct.id - 1 < 0 ? products.length - 1 : currentProduct.id - 1;
    setCurrentProduct(products[prevIndex]);
  };

  const goToNextProduct = () => {
    const nextIndex = currentProduct.id + 1 > products.length - 1 ? 0 : currentProduct.id + 1;
    setCurrentProduct(products[nextIndex]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 px-15 w-full">
        <NavBar />
      </header>

      <main className="flex-grow">
        <div className="flex flex-col md:flex-row gap-6 max-w-7xl py-10 px-10">
          <div className="w-full">
            <h2 className="text-4xl font-semibold mb-6">{currentProduct.name}</h2>
            <Button onClick={() => addToCart(currentProduct)}>
              Add to Cart
            </Button>
            <p className="text-gray-600 mb-6">${currentProduct.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-6">{currentProduct.description}</p>
          </div>
          <div className="flex flex-row w-full md:w-1/2 justify-center items-center">
            <Button 
              onClick={goToPreviousProduct}
              className="hover:scale-120 "
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <img 
              src={`${currentProduct.imageUrl}/product1.png`}
              alt={currentProduct.name}
              className="w-full h-auto"
            />
            <Button 
              onClick={goToNextProduct}
              className="hover:scale-120 ">
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </main>

      <footer className="w-full mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

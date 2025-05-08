"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import CartButton from "@/components/CartButton";
import NavBar from "@/components/Navbar";
import { dispatchCartUpdate } from '@/lib/events';
import { Footer } from '@/components/Footer';

// Product type definition
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Texture Powder",
    price: 24.99,
    description: "Created by barbers for barbers, this is a high quality, easy to use, and affordable texture powder.",
    imageUrl: "/product-photos"
  }]

export default function ShopPage() {
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with Menu and Cart */}
      <header className="py-4 px-15 w-full">
        <NavBar />
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl py-10 px-10">
          {/* Products Grid */}
          <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden bg-black border-[var(--text-color)]">
                <div className="relative h-48 w-full group">
                  {/* Default image (shown normally) */}
                  <img
                    src={`${product.imageUrl}/product1.png`}
                    alt={product.name}
                    className="object-cover absolute inset-0 h-full w-full group-hover:opacity-0 transition-opacity duration-300"
                  />
                  {/* Hover image (only visible on hover) */}
                  <img
                    src={`${product.imageUrl}/product2.png`}
                    alt={product.name}
                    className="object-cover absolute inset-0 h-full w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <CardHeader>
                  <h3 className="text-[var(--text-color)] text-lg font-medium">{product.name}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--text-color)] text-sm">{product.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-[var(--text-color)] text-lg font-bold">${product.price.toFixed(2)}</span>
                  <Button 
                    onClick={() => addToCart(product)}
                    className="text-[var(--text-color)] hover:text-[var(--bg-color)] bg-[var(--bg-color)] hover:bg-[var(--text-color)] border border-[var(--text-color)]"
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

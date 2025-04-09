// src/app/page.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';

// Product type definition
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "GRAPE GRAPE",
    price: 24.99,
    description: "GRAPE GRAPE",
    imageUrl: "/images/grape.jpeg"
  },
  {
    id: 2,
    name: "GRAPE GRAPE",
    price: 59.99,
    description: "GRAPE GRAPE",
    imageUrl: "/images/grape.jpeg"
  },
  {
    id: 3,
    name: "GRAPE GRAPE",
    price: 89.99,
    description: "GRAPE GRAPE",
    imageUrl: "/images/grape.jpeg"
  },
  {
    id: 4,
    name: "GRAPE GRAPE",
    price: 34.99,
    description: "GRAPE GRAPE",
    imageUrl: "/images/grape.jpeg"
  }, 
  {
    id: 5,
    name: "GRAPE GRAPE",
    price: 24.99,
    description: "GRAPE GRAPE",
    imageUrl: "/images/grape.jpeg"
  },
  {
    id: 6,
    name: "GRAPE GRAPE",
    price: 59.99,
    description: "GRAPE GRAPE",
    imageUrl: "/images/grape.jpeg"
  },
  {
    id: 7,
    name: "GRAPE GRAPE",
    price: 89.99,
    description: "GRAPE GRAPE",
    imageUrl: "/images/grape.jpeg"
  },
  {
    id: 8,
    name: "GRAPE GRAPE",
    price: 34.99,
    description: "GRAPE GRAPE",
    imageUrl: "/images/grape.jpeg"
  }
];

export default function ShopPage() {
  const [cart, setCart] = useState<Product[]>([]);
  
  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };
  
  return (
    <div className="bg-grey-200 text-white min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">DreamCore Shop</h1>
          <div className="flex items-center">
            <span className="mr-2">Cart ({cart.length})</span>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Checkout
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Featured Banner */}
        <div className="bg-indigo-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-indigo-900 mb-2">Shop our GRAPES</h2>
          <p className="text-indigo-800 mb-4">Discover our latest products for the spring season!</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Shop Now
          </button>
        </div>
        
        {/* Products Grid */}
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">DreamCore Shop</h3>
              <p className="text-gray-300">Quality grapes for everyone</p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-2">Contact Us</h4>
              <p className="text-gray-300">support@dreamcore.com</p>
              <p className="text-gray-300">1-800-DREAM</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} DreamCore Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
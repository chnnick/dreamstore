"use client"
import { useState } from 'react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';

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
                <img
                  src={product.imageUrl}
                  alt={product.name}
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
    </div>
  );
}
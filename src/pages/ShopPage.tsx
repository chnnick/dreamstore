"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu } from "lucide-react";
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Product type definition
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

// Cart item with quantity
interface CartItem {
  product: Product;
  quantity: number;
}

// Navigation links
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Sign in", href:"/login"}
];

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
  }
];

export default function ShopPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Optional: Send cart to server
    const saveCartToServer = async () => {
      try {
        await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items: cartItems }),
        });
      } catch (error) {
        console.error('Failed to save cart to server:', error);
      }
    };
    
    saveCartToServer();
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Product exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Product doesn't exist, add new item
        return [...prevItems, { product, quantity: 1 }];
      }
    });
    
    // Open cart sheet when adding item
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Remove item from cart when quantity reaches 0
      removeFromCart(productId);
      return;
    }
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with Menu and Cart */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Left side menu */}
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
          {/* Cart button */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span>Cart</span>
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-slate-500">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
                <SheetDescription>
                  {cartItems.length === 0 
                    ? "Your cart is empty" 
                    : `You have ${totalItems} item(s) in your cart`}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-4 px-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 relative rounded overflow-hidden">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name}
                          className="object-cover absolute inset-0 h-full w-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {cartItems.length > 0 && (
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-lg font-medium px-5">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="px-4 pb-4">
                    <Link href="/checkoutpage" passHref>
                      <Button className="w-full bg-slate-500 hover:bg-slate-600">
                        Checkout
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            
        {/* Products Grid */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-cover absolute inset-0 h-full w-full"
                />
              </div>
              <CardHeader>
                <h3 className="text-lg font-medium">{product.name}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-sm">{product.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                <Button 
                  onClick={() => addToCart(product)}
                  className="bg-slate-500 hover:bg-slate-600"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import Link from 'next/link';
import { CART_UPDATED_EVENT } from '@/lib/events';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface CartItem {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
}

export default function CartButton() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    // Check if this is the first time adding to cart
    const hasAddedToCart = localStorage.getItem('hasAddedToCart');
    setIsFirstClick(!hasAddedToCart);
  };

  // Load cart from localStorage on component mount
  useEffect(() => {
    loadCart();
  }, []);

  // Listen for cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
    return () => window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
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

  const addToCart = () => {
    if (isFirstClick) {
      localStorage.setItem('hasAddedToCart', 'true');
      setIsFirstClick(false);
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-[var(--bg-color)] relative">
          <ShoppingCart className="h-5 w-5 mr-2" />
          <span>Cart</span>
          {totalItems > 0 && (
            <Badge 
              key={totalItems}
              className={`absolute -top-2 -right-2 bg-[var(--text-color)] text-[var(--bg-color)] ${
                isFirstClick ? 'animate-badge-grow-first' : 'animate-badge-grow'
              }`}
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-[var(--bg-color)] w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-4xl text-[var(--text-color)]">Shopping Cart</SheetTitle>
          <SheetDescription
            className="text-3xl text-[var(--text-color)]"
          >
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
                    src={`${item.product.imageUrl}/product1.png`}
                    alt={item.product.name}
                    className="object-cover absolute inset-0 h-full w-full"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{item.product.name}</h3>
                  <p className="text-sm ">${item.product.price.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-[var(--bg-color)]"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                >
                  -
                </Button>
                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-[var(--bg-color)]"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                >
                  +
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeFromCart(item.product.id)}
                  className="hover:scale-110 transition-transform duration-200 bg-[var(--bg-color)] hover:bg-transparent hover:text-red-500 text-red-500"
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
              <Link href="/store/checkout" passHref>
                <Button 
                  className="w-full border border-[var(--text-color)] bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-[var(--bg-color)]"
                >
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
} 
"use client"

import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from 'next/link';

export default function OrderSuccessPage() {
  // Generate a random order number for demo purposes
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Order Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <p className="text-sm text-gray-500">Order Number</p>
          <p className="font-medium text-lg">{orderNumber}</p>
        </div>
        
        <p className="text-gray-600 mb-8">
          A confirmation email has been sent to your email address.
        </p>
        
        <Link href="/" passHref>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
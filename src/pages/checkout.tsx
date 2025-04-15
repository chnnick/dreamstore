"use client"

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRouter } from 'next/navigation';

// Type definitions
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}
interface CheckoutFormValues {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}
export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Initialize react-hook-form
  const form = useForm<CheckoutFormValues>({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      zip: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);
  
    // Add this useEffect to save cart changes to localStorage
  useEffect(() => {
    // Only save if there are items in the cart
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]); // This will run whenever cartItems changes

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );

  const shippingCost = 5.99;
  const finalTotal = cartTotal + shippingCost;

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    setLoading(true);

    try {
      // In a real app, you would:
      // 1. Send payment info to payment processor (Stripe, PayPal, etc.)
      // 2. Create order in your database
      // 3. Empty the cart

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart in localStorage
      localStorage.removeItem('cart');
      
      // Redirect to success page
      router.push('/checkout/ordersuccess');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="font-medium">${cartTotal.toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p className="font-medium">${shippingCost.toFixed(2)}</p>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <p>Total</p>
                  <p>${finalTotal.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Shipping Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Shipping Information</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="zip"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code</FormLabel>
                              <FormControl>
                                <Input {...field} required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Payment Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Information</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input placeholder="1234 5678 9012 3456" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
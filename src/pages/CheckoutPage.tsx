"use client"

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
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
import { useForm } from 'react-hook-form';
import { useCartStore } from '@/store/cartStore';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_51RECkqIM92jQZxXyptz6E62tHW6Je8PueQlLxLTF8I98fQ8ZWnxZuDiuaffNX0slXfDBeYDNPjoUsAoPTcfC3Lpt00fdBLl8oh');

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
}

// for stripe
function CheckoutForm({ cartItems }: { cartItems: CartItem[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const clearCart = useCartStore(state => state.clearCart);
  
  const form = useForm<CheckoutFormValues>({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      zip: '',
    },
  });

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );

  const shippingCost = 5.99;
  const finalTotal = cartTotal + shippingCost;

  const onSubmit = async (data: CheckoutFormValues) => {
    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Create a payment intent on the server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(finalTotal * 100), // convert to cents
          items: cartItems,
          customer_details: data,
        }),
      });

      const { clientSecret } = await response.json();

      // 2. Confirm the payment on the client
      const cardElement = elements.getElement(CardElement);
      
      if (cardElement) {
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: data.name,
              email: data.email,
              address: {
                line1: data.address,
                city: data.city,
                postal_code: data.zip,
              },
            },
          },
        });

        if (error) {
          setError(error.message || 'An error occurred during payment');
        } else if (paymentIntent.status === 'succeeded') {
          // Payment succeeded
          clearCart(); // Clear cart using Zustand store
          router.push('/checkoutsuccess');
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
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
          
          <div className="p-4 border rounded-md">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm p-2">
              {error}
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-white text-black hover:bg-gray-300 hover: transition duration-200"
          disabled={loading || !stripe}
        >
          {loading ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
        </Button>
      </form>
    </Form>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore(state => state.items);
  const getTotalItems = useCartStore(state => state.getTotalItems);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);

  const cartTotal = getTotalPrice();
  const shippingCost = 5.99;
  const finalTotal = cartTotal + shippingCost;

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8 bg-transparent">
          <Button variant="outline" className="bg-transparent" onClick={() => router.push("/store")}>←</Button>
          <h1 className="text-3xl font-bold text-center flex-grow">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <Card className="md:col-span-1 bg-black text-white">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
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
          <Card className="md:col-span-2 bg-black text-white">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Elements stripe={stripePromise}>
                <CheckoutForm cartItems={items} />
              </Elements>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

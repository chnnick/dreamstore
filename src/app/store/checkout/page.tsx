// src/app/checkout/page.tsx
"use client"
import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import Checkout from '@/pages/CheckoutPage';

export default function checkout() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Checkout />
      <Footer />
    </main>
  )
}


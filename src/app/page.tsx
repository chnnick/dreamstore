// src/app/page.tsx
"use client"
import HomePage from '@/pages/home_test';
import { Footer } from '@/components/Footer';
import Header from '@/components/Header';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HomePage />
      <Footer />
    </main>
  )
}


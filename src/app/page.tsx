// src/app/page.tsx
"use client"
import HomePage from '@/pages/Home';
import { Footer } from '@/components/Footer';
import Header from '@/components/Header';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <HomePage />
      <Footer />
    </main>
  )
}


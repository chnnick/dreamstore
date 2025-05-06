// src/app/page.tsx
"use client"
import ShopPage from '@/pages/ShopPage';
import { Footer } from '@/components/Footer';
import Header from '@/components/Header';


export default function GalleryPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <ShopPage />
      <Footer />
    </main>
  )
}


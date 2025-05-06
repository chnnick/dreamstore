// src/app/page.tsx
"use client"
import LoginPage from '@/pages/LoginPage';
import { Footer } from '@/components/Footer';
import Header from '@/components/Header';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <LoginPage />
      <Footer />
    </main>
  )
}


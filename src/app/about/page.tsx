'use client'

import Header from "@/components/Header"
import { Instagram } from "lucide-react"
import Image from "next/image"
export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col justify-center items-center">
        <Image src="/chiller.png" alt="riley fish" width={100} height={100} />
        <div className="flex flex-row gap-4 justify-center items-center min-h-screen">
          <p>By CutByTheKid</p>
          <a href="https://www.instagram.com/cutbythekid/" target="_blank" rel="noopener noreferrer">
          <Instagram />
        </a>
        </div>
      </div>
    </main>
  )
}
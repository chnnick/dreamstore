'use client'

import Header from "@/components/Header"
import { motion } from "framer-motion"
import { Instagram } from "lucide-react"
import Image from "next/image"
export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col justify-center items-center gap-4">
        <Image src="/chiller.png" alt="riley fish" width={300} height={300} />
        <div className="flex flex-row gap-4 justify-center items-center">
          <p>By CutByTheKid</p>
          <a href="https://www.instagram.com/cutbythekid/" target="_blank" rel="noopener noreferrer">
            <Instagram />
          </a>
        </div>
      </motion.div>
    </main>
  )
}
"use client"
import CartButton from "@/components/CartButton";
import { motion } from "framer-motion";
import { Instagram } from 'lucide-react';

export function Footer() {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between justify-evenly p-8 border-t border-[var(--text-color)] items-center">
        <p className="text-sm">{new Date().getFullYear()} CutByTheKid. All rights reserved.</p>
        <motion.a 
                href="https://www.instagram.com/cutbythekid" 
                target="_blank" 
                className="text-foreground/80 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
        >
          <Instagram className="h-5 w-5 text-[var(--text-color)]" />
        </motion.a>
      </div>
    </div>
  );
}
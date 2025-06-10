"use client"
import Link from "next/link";
import AnimatedLogo from "./AnimatedLogo";
import CartButton from "./CartButton";
import { motion } from "framer-motion";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Store", href: "/store" },
    { name: "Gallery", href: "/gallery" }, 
    { name: "About", href: "/about" }
];

export default function Header() {
    return (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full"
      >
        <header className="flex flex-col md:flex-row justify-between items-center py-2 md:py-4 px-4 md:px-16">
          <div className="flex justify-center items-center mb-2 md:mb-0">
              <Link 
                  href="/"
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl hover:scale-110 transition-transform duration-200"
              >
                  <AnimatedLogo />
              </Link>
          </div>
          <nav className="flex items-center"> 
              <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8">
                  {navLinks.map((link) => (
                      <Link 
                          key={link.name} 
                          href={link.href}
                          className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl hover:scale-110 transition-transform duration-200"
                      >
                          {link.name}
                      </Link>
                  ))}
                  <CartButton />
              </div>
          </nav>
        </header>
      </motion.div>
    )
}
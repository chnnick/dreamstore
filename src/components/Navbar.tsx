"use client"
import Link from "next/link";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" }
];

export default function NavBar() {
    return (
        <nav className="flex flex-col md:flex-rowitems-center justify-between">
            <p className="text-3xl">DREAMCORE.US</p>
            <div className="flex flex-row items-center justify-center space-x-6">
              {navLinks.map((link) => (
                  <Link 
                      key={link.name} 
                      href={link.href}
                      className="text-2xl hover:scale-150 transition-transform duration-200"
                  >
                      {link.name}
                  </Link>
              ))}
            </div>
        </nav>
    )
}
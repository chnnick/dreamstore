"use client"

import Link from 'next/link';

const navLinks = [
    { name: "Shop", href: "/store" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" }
];

export default function Navbar() {
    return (
        <nav className="md:flex md:flex-col md:items-start md:justify-center md:space-y-6 md:p-8
                       sm:static sm:h-auto sm:flex-row sm:items-center sm:justify-center sm:space-y-0 sm:space-x-6 sm:p-4 sm:w-full">
            <p>DREAMCORE.US</p>
            {navLinks.map((link) => (
                <Link 
                    key={link.name} 
                    href={link.href}
                    className="text-2xl hover:scale-150 transition-transform duration-200"
                >
                    {link.name}
                </Link>
            ))}
        </nav>
    );
}
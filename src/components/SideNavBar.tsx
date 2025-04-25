"use client"

import Link from 'next/link';

const navLinks = [
    { name: "Shop", href: "/store" },
    { name: "Booking", href: "/booking" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" }
];

export default function SideNavBar() {
    return (
        <header className="shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex flex-col items-start space-y-6">
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
            </div>
        </header>
    );
}
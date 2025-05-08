"use client"
import Link from "next/link";
import AnimatedLogo from "./AnimatedLogo";
import CartButton from "./CartButton";

const navLinks = [
    { name: "Store", href: "/store" },
    { name: "Gallery", href: "/gallery" }
];

export default function NavBar() {
    return (
        <nav className="flex flex-row items-center justify-between w-full">
            <div className="flex items-center">
                <Link 
                    href="/"
                    className="text-2xl hover:scale-110 transition-transform duration-200"
                >
                    <AnimatedLogo />
                </Link>
            </div>
            <div className="flex items-center space-x-8">
                {navLinks.map((link) => (
                    <Link 
                        key={link.name} 
                        href={link.href}
                        className="text-2xl hover:scale-110 transition-transform duration-200"
                    >
                        {link.name}
                    </Link>
                ))}
                <CartButton />
            </div>
        </nav>
    )
}
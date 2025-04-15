"use client"


import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu } from "lucide-react";
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
    { name: "About Us", href: "/about" },
    { name: "Shop", href: "/shopgallerypage" },
    { name: "Booking", href: "/booking" },
    { name: "Photo Gallery", href: "/gallery" }
  ];

export default function NavSheet() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">    
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
        </Button>
        </SheetTrigger>
        <SheetContent side="left">
        <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col space-y-4">
            {navLinks.map((link) => (
            <Link 
                key={link.name} 
                href={link.href}
                className="px-4 py-2 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
            >
                {link.name}
            </Link>
            ))}
        </div>
        </SheetContent>
    </Sheet>
    </div>
    </header>
}
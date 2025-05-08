"use client"
import CartButton from "@/components/CartButton";

export function Footer() {
  return (
    <div className="bg-black w-full">
      <div className="flex md:flex-row flex-col md:justify-between justify-evenly mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
        <p className="text-sm">{new Date().getFullYear()} @CutByTheKid. All rights reserved.</p>
        <CartButton />
      </div>
    </div>
  );
}
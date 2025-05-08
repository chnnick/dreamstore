"use client"
import CartButton from "@/components/CartButton";

export function Footer() {
  return (
    <div className="w-full">
      <div className="flex md:flex-row flex-col md:justify-between justify-evenly mt-8 pt-8 border-t border-gray-700 items-center">
        <p className="text-sm">{new Date().getFullYear()} @CutByTheKid. All rights reserved.</p>
        <CartButton />
      </div>
    </div>
  );
}
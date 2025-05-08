"use client"
import CartButton from "@/components/CartButton";

export function Footer() {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between justify-evenly p-8 border-t border-[var(--text-color)] items-center">
        <p className="text-sm">{new Date().getFullYear()}CutByTheKid. All rights reserved.</p>
        
      </div>
    </div>
  );
}
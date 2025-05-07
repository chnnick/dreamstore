'use client'
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import CartButton from "@/components/CartButton";
import NavBar from "@/components/Navbar";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      const { data, error } = await supabase.storage.from('gallery').list('', { limit: 100 });
      if (error) {
        setError("Failed to load images");
        return;
      }
      const urls = data
        .filter(file => file.name.match(/\.(jpg|jpeg|png|webp)$/i))
        .map(file => `${supabaseUrl}/storage/v1/object/public/gallery/${file.name}`);
      setImages(urls);
    }
    fetchImages();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-4 flex justify-between items-center">
        <NavBar />
        <CartButton />
      </header>
      <main className="p-4">
        <h1 className="text-2xl mb-4">Gallery</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((url, i) => (
            <img key={i} src={url} alt={`Gallery image ${i + 1}`} className="w-full h-48 object-cover rounded" />
          ))}
        </div>
      </main>
    </div>
  );
}
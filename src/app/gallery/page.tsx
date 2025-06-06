'use client'
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import CartButton from "@/components/CartButton";
import NavBar from "@/components/Header";
import Image from "next/image";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface GalleryImage {
  id: number;
  image_url: string;
  description: string;
}

interface Position {
  x: number;
  y: number;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState<Record<number, Position>>({});
  const [zIndices, setZIndices] = useState<Record<number, number>>({});
  const [maxZIndex, setMaxZIndex] = useState(1);
  const [visibleImages, setVisibleImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    async function fetchImages() {
      try {
        const { data, error } = await supabase
          .from('images')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setImages(data || []);
        
        // Initialize random positions and z-indices
        const initialPositions: Record<number, Position> = {};
        const initialZIndices: Record<number, number> = {};
        data?.forEach((image) => {
          initialPositions[image.id] = getRandomPosition();
          initialZIndices[image.id] = Math.floor(Math.random() * 1000);
        });
        setPositions(initialPositions);
        setZIndices(initialZIndices);
        setMaxZIndex(Math.max(...Object.values(initialZIndices)));

        // Start sequential fade-in animation
        data?.forEach((image, index) => {
          setTimeout(() => {
            setVisibleImages(prev => ({
              ...prev,
              [image.id]: true
            }));
          }, 200 * index); // 200ms delay between each image
        });
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  // Function to generate random position within bounds
  const getRandomPosition = () => {
    const maxX = window.innerWidth / 2; // Account for image width
    const maxY = window.innerHeight / 2; // Account for image height
    return {
      x: Math.random() * maxX + (window.innerWidth / 4),
      y: Math.random() * maxY + (window.innerHeight / 4),
    };
  };

  const handleDragStart = (e: React.DragEvent, imageId: number) => {
    // Set the drag image to be invisible
    const dragImg = document.createElement('img');
    dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(dragImg, 0, 0);
    
    // Bring the dragged image to front
    const newZIndices = { ...zIndices };
    newZIndices[imageId] = maxZIndex + 1;
    setZIndices(newZIndices);
    setMaxZIndex(maxZIndex + 1);
  };

  const handleDrag = (e: React.DragEvent, imageId: number) => {
    if (e.clientX === 0 && e.clientY === 0) return; // Ignore invalid positions
    
    const newPositions = { ...positions };
    newPositions[imageId] = {
      x: e.clientX,
      y: e.clientY,
    };
    setPositions(newPositions);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)]">
      <NavBar />
      <div className="relative w-full h-screen overflow-hidden">
        {images.map((image) => {
          const position = positions[image.id] || getRandomPosition();
          return (
            <div
              key={image.id}
              className={`absolute cursor-move group transition-opacity duration-1000 ${
                visibleImages[image.id] ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: zIndices[image.id] || 1,
              }}
              draggable
              onDragStart={(e) => handleDragStart(e, image.id)}
              onDrag={(e) => handleDrag(e, image.id)}
            >
              <div className="relative w-64 h-64">
                <Image
                  src={image.image_url}
                  alt={image.description || 'Gallery image'}
                  fill
                  className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute -bottom-12 left-0 right-0 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm text-center">{image.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div> 
  );
}
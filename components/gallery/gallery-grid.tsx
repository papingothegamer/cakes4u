"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: string;
};

const categories = ["All", "Wedding", "Birthday", "Custom", "Seasonal"];

export function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Sample gallery data - replace with actual data from your public/gallery directory
  const images: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1621303837174-89787a7d4729",
      alt: "Wedding Cake",
      category: "Wedding",
    },
    // Add more images here
  ];

  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="min-w-[100px]"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredImages.map((image) => (
          <motion.div
            key={image.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative aspect-square cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
            <div className="relative max-w-4xl w-full aspect-square">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
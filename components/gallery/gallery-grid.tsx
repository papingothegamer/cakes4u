"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: string;
  description: string;
};

const categories = ["All", "Wedding", "Birthday", "Baby Shower", "Custom"];

const images: GalleryImage[] = [
  {
    id: 1,
    src: "api/images/wedding/PHOTO-2024-11-27-23-53-42.jpg",
    alt: "Elegant White Wedding Cake",
    category: "Wedding",
    description: "Four-tier white wedding cake with delicate lace patterns and crystal accents"
  },
  {
    id: 2,
    src: "api/images/pink-roses-wedding-cake.jpg",
    alt: "Pink Roses Wedding Cake",
    category: "Wedding",
    description: "White wedding cake decorated with cascading pink fondant roses and rhinestone band"
  },
  {
    id: 3,
    src: "api/images/birthday/PHOTO-2024-11-28-02-09-59 5.jpg",
    alt: "50th Birthday Celebration Cake",
    category: "Birthday",
    description: "Three-tier birthday cake with gold accents, photo frame, and pink damask pattern"
  },
  {
    id: 4,
    src: "api/images/custom/PHOTO-2024-11-27-23-38-03.jpg",
    alt: "Strawberry Chocolate Cake",
    category: "Custom",
    description: "Chocolate cake topped with fresh strawberries and white cream"
  },
  {
    id: 5,
    src: "api/images/custom/PHOTO-2024-11-27-23-41-03 2.jpg",
    alt: "Macaron and Raspberry Cake",
    category: "Custom",
    description: "White cream cake decorated with macarons, fresh raspberries, and chocolate accents"
  },
  {
    id: 6,
    src: "api/images/baby shower/PHOTO-2024-11-27-23-53-42.jpg",
    alt: "Baby Shower Cake",
    category: "Baby Shower",
    description: "Two-tier pink and white cake with baby clothes design"
  },
  {
    id: 7,
    src: "/images/oh-baby-cake.jpg",
    alt: "Oh Baby Celebration Cake",
    category: "Baby Shower",
    description: "Pastel colored cake with baby bottle motifs and 'Oh Baby' topper"
  },
  {
    id: 8,
    src: "/images/princess-dome-cakes.jpg",
    alt: "Princess Dome Cakes",
    category: "Custom",
    description: "Collection of princess-style dome cakes in lime green and pink colors"
  },
  {
    id: 9,
    src: "/images/elegant-white-wedding-cake.jpg",
    alt: "Elegant White Wedding Cake",
    category: "Wedding",
    description: "Four-tier white wedding cake with delicate lace patterns and crystal accents"
  },
  {
    id: 10,
    src: "/images/pink-roses-wedding-cake.jpg",
    alt: "Pink Roses Wedding Cake",
    category: "Wedding",
    description: "White wedding cake decorated with cascading pink fondant roses and rhinestone band"
  },
  {
    id: 11,
    src: "/images/70th-birthday-cake.jpg",
    alt: "70th Birthday Celebration Cake",
    category: "Birthday",
    description: "Three-tier birthday cake with gold accents, photo frame, and pink damask pattern"
  },
  {
    id: 12,
    src: "/images/strawberry-chocolate-cake.jpg",
    alt: "Strawberry Chocolate Cake",
    category: "Custom",
    description: "Chocolate cake topped with fresh strawberries and white cream"
  },
  {
    id: 13,
    src: "/images/macaron-raspberry-cake.jpg",
    alt: "Macaron and Raspberry Cake",
    category: "Custom",
    description: "White cream cake decorated with macarons, fresh raspberries, and chocolate accents"
  },
  {
    id: 14,
    src: "/images/baby-shower-cake.jpg",
    alt: "Baby Shower Cake",
    category: "Baby Shower",
    description: "Two-tier pink and white cake with baby clothes design"
  },
  {
    id: 15,
    src: "/images/oh-baby-cake.jpg",
    alt: "Oh Baby Celebration Cake",
    category: "Baby Shower",
    description: "Pastel colored cake with baby bottle motifs and 'Oh Baby' topper"
  },
  {
    id: 16,
    src: "/images/princess-dome-cakes.jpg",
    alt: "Princess Dome Cakes",
    category: "Custom",
    description: "Collection of princess-style dome cakes in lime green and pink colors"
  },
  {
    id: 17,
    src: "/images/elegant-white-wedding-cake.jpg",
    alt: "Elegant White Wedding Cake",
    category: "Wedding",
    description: "Four-tier white wedding cake with delicate lace patterns and crystal accents"
  },
  {
    id: 18,
    src: "/images/pink-roses-wedding-cake.jpg",
    alt: "Pink Roses Wedding Cake",
    category: "Wedding",
    description: "White wedding cake decorated with cascading pink fondant roses and rhinestone band"
  },
  {
    id: 19,
    src: "/images/70th-birthday-cake.jpg",
    alt: "70th Birthday Celebration Cake",
    category: "Birthday",
    description: "Three-tier birthday cake with gold accents, photo frame, and pink damask pattern"
  },
  {
    id: 20,
    src: "/images/strawberry-chocolate-cake.jpg",
    alt: "Strawberry Chocolate Cake",
    category: "Custom",
    description: "Chocolate cake topped with fresh strawberries and white cream"
  },
  {
    id: 21,
    src: "/images/macaron-raspberry-cake.jpg",
    alt: "Macaron and Raspberry Cake",
    category: "Custom",
    description: "White cream cake decorated with macarons, fresh raspberries, and chocolate accents"
  },
  {
    id: 22,
    src: "/images/baby-shower-cake.jpg",
    alt: "Baby Shower Cake",
    category: "Baby Shower",
    description: "Two-tier pink and white cake with baby clothes design"
  },
  {
    id: 23,
    src: "/images/oh-baby-cake.jpg",
    alt: "Oh Baby Celebration Cake",
    category: "Baby Shower",
    description: "Pastel colored cake with baby bottle motifs and 'Oh Baby' topper"
  },
  {
    id: 24,
    src: "/images/princess-dome-cakes.jpg",
    alt: "Princess Dome Cakes",
    category: "Custom",
    description: "Collection of princess-style dome cakes in lime green and pink colors"
  },
  {
    id: 25,
    src: "/images/elegant-white-wedding-cake.jpg",
    alt: "Elegant White Wedding Cake",
    category: "Wedding",
    description: "Four-tier white wedding cake with delicate lace patterns and crystal accents"
  },
  {
    id: 26,
    src: "/images/pink-roses-wedding-cake.jpg",
    alt: "Pink Roses Wedding Cake",
    category: "Wedding",
    description: "White wedding cake decorated with cascading pink fondant roses and rhinestone band"
  },
  {
    id: 27,
    src: "/images/70th-birthday-cake.jpg",
    alt: "70th Birthday Celebration Cake",
    category: "Birthday",
    description: "Three-tier birthday cake with gold accents, photo frame, and pink damask pattern"
  },
  {
    id: 28,
    src: "/images/strawberry-chocolate-cake.jpg",
    alt: "Strawberry Chocolate Cake",
    category: "Custom",
    description: "Chocolate cake topped with fresh strawberries and white cream"
  },
  {
    id: 29,
    src: "/images/macaron-raspberry-cake.jpg",
    alt: "Macaron and Raspberry Cake",
    category: "Custom",
    description: "White cream cake decorated with macarons, fresh raspberries, and chocolate accents"
  },
  {
    id: 30,
    src: "/images/baby-shower-cake.jpg",
    alt: "Baby Shower Cake",
    category: "Baby Shower",
    description: "Two-tier pink and white cake with baby clothes design"
  }
];

export function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="space-y-6 px-4 py-8">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative aspect-square cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold">{image.alt}</h3>
                  <p className="text-sm opacity-90">{image.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square md:aspect-[4/3] lg:aspect-[16/9]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="object-contain"
                />
              </div>
              <div className="p-4 bg-white">
                <h2 className="text-2xl font-semibold mb-2">{selectedImage.alt}</h2>
                <p className="text-gray-600 mb-2">{selectedImage.description}</p>
                <p className="text-sm text-gray-500">Category: {selectedImage.category}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


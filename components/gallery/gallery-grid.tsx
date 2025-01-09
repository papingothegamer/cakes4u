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
    src: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Pink Rose Wedding Cake",
    category: "Wedding",
    description: "Pink wedding cake decorated with cascading pink fondant roses and pearlized band"
  },
  {
    id: 3,
    src: "api/images/birthday/PHOTO-2024-11-28-02-09-59 5.jpg",
    alt: "50th Birthday Celebration Cake",
    category: "Birthday",
    description: "Three-tier birthday cake with gold accents, and marbled pattern"
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
    src: "https://images.unsplash.com/photo-1579736283361-4008b21c7ed6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Oh Baby Celebration Cake",
    category: "Baby Shower",
    description: "Pastel colored cake with  'Oh Baby' fondant text styling"
  },
  {
    id: 8,
    src: "/api/images/baby shower/PHOTO-2024-11-28-02-10-01.jpg",
    alt: "Princess Dome Cakes",
    category: "Custom",
    description: "Collection of princess-style dome cakes in pink with Minnie Mouse decor"
  },
  {
    id: 9,
    src: "/api/images/birthday/PHOTO-2024-11-28-02-09-59 4.jpg",
    alt: "Frozen Themed Birthday Cake",
    category: "Birthday",
    description: "Frozen-themed birthday cake for kids"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1623428454614-abaf00244e52?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "White Roses Wedding Cake",
    category: "Wedding",
    description: "White wedding cake decorated with cascading pink fondant roses and rhinestone band"
  },
  {
    id: 11,
    src: "/api/images/baby shower/PHOTO-2024-11-28-01-48-05 2.jpg",
    alt: "Star Wars Birthday Cake",
    category: "Birthday",
    description: "Birthday cake for a young Star Wars fan"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1519197462-7755f76e6fbd?q=80&w=2565&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Strawberry Chocolate Cake",
    category: "Custom",
    description: "Chocolate cake topped with fresh strawberries and white cream"
  },
  {
    id: 13,
    src: "/api/images/custom/PHOTO-2024-11-27-23-41-03 3.jpg",
    alt: "Macaron and Raspberry Cake",
    category: "Custom",
    description: "White cream cake decorated with macarons, fresh raspberries, and chocolate accents"
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1722951018877-729cb8822cd3?q=80&w=2536&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Blue Teddy Bear Cake",
    category: "Baby Shower",
    description: "Blue Bear cake for baby boys"
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1681158552000-953036b02df0?q=80&w=2599&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Chocolate Cake with Blue Frosting",
    category: "Custom",
    description: "Rich-flavored chocolate cake with blue frosting for small gatherings"
  },
  {
    id: 16,
    src: "/api/images/birthday/PHOTO-2024-11-28-02-10-00 3.jpg",
    alt: "Birthday Cake for Dads",
    category: "Birthday",
    description: "Oreo-topped, two-tiered cake for a special dad"
  },
  {
    id: 17,
    src: "/api/images/custom/PHOTO-2024-11-28-01-48-04.jpg",
    alt: "Elegant Chocolate Mint and Strawberry Cake",
    category: "Custom",
    description: "Tasty chocolate cake with mint and strawberry toppings"
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
    src: "/api/images/birthday/PHOTO-2024-11-28-02-09-59 3.jpg",
    alt: "70th Birthday Celebration Cake",
    category: "Birthday",
    description: "Three-tier birthday cake with gold accents, photo frame, and pink damask pattern"
  },
  {
    id: 20,
    src: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=2550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Vanilla Cake with Chocolate",
    category: "Custom",
    description: "Vanilla-flavored cake with assorted chocolate toppings"
  },
  {
    id: 21,
    src: "/api/images/custom/PHOTO-2024-11-28-02-10-00.jpg",
    alt: "Construction-Themed Cake",
    category: "Custom",
    description: "Customized edible hard hat and construction toolkit cake for a fun occasion"
  },
  {
    id: 22,
    src: "/api/images/custom/PHOTO-2024-11-28-02-10-00 5.jpg",
    alt: "Baby Shark Themed Cake",
    category: "Baby Shower",
    description: "Baby Shark themed cake"
  },
  {
    id: 23,
    src: "/api/images/custom/PHOTO-2024-11-27-23-50-46.jpg",
    alt: "Macaron Themed Cakes",
    category: "Custom",
    description: "Multiple flavors of cakes styled as macarons"
  },
  {
    id: 24,
    src: "/api/images/custom/PHOTO-2024-11-28-02-10-00 2.jpg",
    alt: "Hairstylist Kit Themed Cake",
    category: "Custom",
    description: "An edible toolkit for a hairstylist"
  },
  {
    id: 25,
    src: "/api/images/custom/PHOTO-2024-11-28-02-09-58.jpg",
    alt: "Chef-Themed Cake",
    category: "Custom",
    description: "Inspired by a chef's uniform"
  },
  {
    id: 26,
    src: "/api/images/custom/PHOTO-2024-11-28-01-48-05 3.jpg",
    alt: "Multi-tiered Graduation Cake",
    category: "Wedding",
    description: "White Graduation cake with burgundy accents for a proud class"
  },
  {
    id: 27,
    src: "/api/images/birthday/PHOTO-2024-11-28-02-09-59 2.jpg",
    alt: " Pink Birthday Celebration Cake",
    category: "Birthday",
    description: "Pink custom birthday cake with rose decor and stylized edible patterns"
  },
  {
    id: 28,
    src: "/api/images/custom/PHOTO-2024-11-28-02-09-59.jpg",
    alt: "Money Bag Cake",
    category: "Custom",
    description: "Chocolate cake topped with edible dollars and gold-covered chocolates"
  },
  {
    id: 29,
    src: "/api/images/custom/PHOTO-2024-11-27-23-47-04.jpg",
    alt: "White and Pink Rose Engagement Cake",
    category: "Wedding",
    description: "White cream cake decorated with pink roses for engagements"
  },
  {
    id: 30,
    src: "/api/images/custom/PHOTO-2024-11-28-02-10-01 3.jpg",
    alt: "Paw Patrol Themed Cake",
    category: "Birthday",
    description: "Single tiered Paw Patrol themed cake with Paw Patrol toppers"
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


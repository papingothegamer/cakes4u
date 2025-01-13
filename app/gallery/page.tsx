import { GalleryGrid } from "@/components/gallery/gallery-grid";

export default function GalleryPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Our Cake Gallery</h1>
          <p className="mt-4 text-gray-600">
            Browse through our collection of custom-made cakes for inspiration
          </p>
        </div>
        
        <div className="mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">About Us</h2>
          <p className="text-gray-700">
            At Cakes4U, we believe that every celebration deserves a touch of sweetness and creativity. 
            Our passionate team of bakers and decorators have been crafting exquisite, custom-made cakes 
            for over a decade. From elegant wedding cakes to whimsical birthday creations, we pour our 
            heart and soul into every design. Using only the finest ingredients and cutting-edge techniques, 
            we ensure that each cake not only looks stunning but tastes heavenly too. Let us bring your 
            cake dreams to life and make your special moments unforgettable.
          </p>
        </div>

        <GalleryGrid />
      </div>
    </div>
  );
}

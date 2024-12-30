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
        <GalleryGrid />
      </div>
    </div>
  );
}
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative h-[600px]">
      <Image
        src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80"
        alt="Decorated cake"
        fill
        className="object-cover brightness-50"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-3xl px-4">
          <h1 className="text-5xl font-bold mb-6">
            Create Your Perfect Cake Moment
          </h1>
          <p className="text-xl mb-8">
            Custom-designed cakes for every special occasion, made with love and
            attention to detail
          </p>
          <div className="space-x-4">
            <Button
              asChild
              size="lg"
              className="bg-pink-500 hover:bg-pink-600"
            >
              <Link href="/order">
                Order Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 border-white"
            >
              <Link href="/gallery">View Gallery</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="bg-pink-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Ready to Create Your Dream Cake?
        </h2>
        <Button
          asChild
          size="lg"
          className="bg-pink-500 hover:bg-pink-600"
        >
          <Link href="/order">
            Start Your Order <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
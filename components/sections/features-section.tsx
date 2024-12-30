import { Cake, Heart, Star } from 'lucide-react';

const features = [
  {
    icon: Cake,
    title: 'Custom Designs',
    description: 'Every cake is uniquely designed to match your vision and occasion',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Using only the finest ingredients and time-honored recipes',
  },
  {
    icon: Star,
    title: 'Perfect Results',
    description: 'Guaranteed satisfaction with every order, no compromises',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Choose Cakes4U?
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <feature.icon className="mx-auto h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
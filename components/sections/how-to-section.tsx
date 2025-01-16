'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Cake, FileEdit, Truck, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: "1",
    title: "Choose Your Cake",
    description: "Browse our selection and pick your favorite cake type, size, and flavor.",
    icon: Cake
  },
  {
    number: "2",
    title: "Customize Your Order",
    description: "Fill out our order form with your preferences and any special requests.",
    icon: FileEdit
  },
  {
    number: "3",
    title: "Confirm and Pay",
    description: "Review your order details and reach out to us for payment details via our email.",
    icon: CreditCard
  },
  {
    number: "4",
    title: "Await Delivery",
    description: "Sit back and relax! We'll prepare and deliver your cake right on time.",
    icon: Truck
  }
]

export function HowToSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How to Order Your Perfect Cake
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[600px] rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1559373098-e1caaccae791?q=80&w=2940&auto=format&fit=crop"
              alt="Beautiful wedding cake being decorated"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Steps Section */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-pink-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <span className="text-pink-500">{step.number}.</span>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
             ))}
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-4">Ready to Order Your Dream Cake?</h3>
          <Button
            onClick={() => window.location.href = 'auth/signup'}
            className="bg-pink-500 text-white px-8 py-3 font-medium hover:bg-pink-600 transition-colors duration-200 shadow-lg"
          >
            Sign Up Now
          </Button>
        </motion.div>
      </div>
    </section>
  )
}


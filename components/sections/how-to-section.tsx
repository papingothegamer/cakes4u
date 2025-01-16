'use client'

import { motion } from 'framer-motion'
import { Cake, FileEdit, Truck, CreditCard } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    title: "Choose Your Cake",
    description: "Browse our selection and pick your favorite cake type, size, and flavor.",
    icon: Cake
  },
  {
    title: "Customize Your Order",
    description: "Fill out our order form with your preferences and any special requests.",
    icon: FileEdit
  },
  {
    title: "Confirm and Pay",
    description: "Review your order details and reach out to us for payment details via our email.",
    icon: CreditCard
  },
  {
    title: "Await Delivery",
    description: "Sit back and relax! We'll prepare and deliver your cake right on time.",
    icon: Truck
  }
]

export function HowToSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How to Order Your Perfect Cake
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-pink-500 mr-2" />
                    <span>Step {index + 1}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


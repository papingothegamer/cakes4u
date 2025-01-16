'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I place an order for a custom cake?",
    answer: "To place an order, sign up with us, then click on the 'Order Now' button. Fill out the order form with your cake preferences, and submit. We'll contact you to confirm the details and provide a quote."
  },
  {
    question: "What information do I need to provide when ordering?",
    answer: "You'll need to provide the cake type, size, flavor, design preferences, delivery date, and any dietary requirements or allergies. Images can also be mailed to us with the order confirmation file after the order has been made.  The more details you provide, the better we can create your perfect cake."
  },
  {
    question: "How far in advance should I place my order?",
    answer: "We recommend placing your order at least 2 weeks in advance for standard cakes, and 4-6 weeks for wedding or complex custom cakes. This allows us enough time to plan and create your perfect cake."
  },
  {
    question: "Do you cater to dietary restrictions?",
    answer: "Yes, we offer options for various dietary needs including gluten-free, vegan, and nut-free cakes. Please specify your requirements when placing your order."
  },
  {
    question: "How do I pay for my order?",
    answer: "We accept various payment methods via Revolut or PayPal. After completion of the order, the final price will be sent to you via email, along with payment instructions."
  }
]

export function FAQSection() {
    const [openItems, setOpenItems] = useState<string[]>([])
  
    const toggleItem = (value: string) => {
      setOpenItems(prev => 
        prev.includes(value) 
          ? prev.filter(item => item !== value)
          : [...prev, value]
      )
    }
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <Accordion type="multiple" value={openItems} className="w-full max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger 
                  onClick={() => toggleItem(`item-${index}`)}
                  className="text-left"
                >
                  <motion.div
                    initial={false}
                    animate={{ color: openItems.includes(`item-${index}`) ? '#FF69B4' : '#000000' }}
                  >
                    {faq.question}
                  </motion.div>
                </AccordionTrigger>
                <AccordionContent>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    )
  }
  
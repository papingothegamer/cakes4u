'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Cake, Mail, Phone } from 'lucide-react'

const navigationLinks = [
  { name: 'Order Now', href: '/order' },
  { name: 'Gallery', href: '/gallery' },
]

export function Footer() {
  return (
    <footer className="bg-gray-950 text-white mt-4 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/" className="flex items-center justify-center gap-2 mb-6">
            <Cake className="h-8 w-8 text-pink-500" />
            <span className="text-4xl font-bold text-gray-100">Cakes4U</span>
          </Link>
          <div className="flex justify-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center space-y-3 mb-8"
        >
          <a 
            href="mailto:cakes4ufoods@gmail.com" 
            className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>cakes4ufoods@gmail.com</span>
          </a>
          <a 
            href="https://wa.me/46767457419" 
            className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>+46 76 745 7419</span>
          </a>
        </motion.div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6">
          <div className="text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Cakes4U. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}


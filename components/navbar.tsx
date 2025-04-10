'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Inicio', href: '#' },
  { name: 'Productos y Servicios', href: '#productos' },
  { name: 'Galeria', href: '#galeria' },
  { name: 'Testimonios', href: '#testimonios' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Contacto', href: '#contacto' },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 relative">
          {/* Desktop centered logo and navigation */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/img/logo.png"
                alt="Logo de DomClicka"
                width={153}
                height={45}
                priority
              />
            </Link>

            <div className="flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 font-medium relative"
                  style={{
                    textDecoration: 'none',
                    paddingBottom: '0.25rem',
                    borderBottom: '2px solid transparent',
                    transition: 'color 0.3s ease, border-color 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderBottom = '2px solid #6b7280';
                    e.currentTarget.style.color = '#6b7280';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderBottom = '2px solid transparent';
                    e.currentTarget.style.color = '#4b5563';
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile only logo */}
          <div className="md:hidden flex items-center gap-8">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/img/logo.png"
                alt="Logo de DomClicka"
                width={153}
                height={45}
                priority
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-600 font-medium relative"
                  style={{
                    textDecoration: 'none',
                    paddingBottom: '0.25rem',
                    borderBottom: '2px solid transparent',
                    transition: 'color 0.3s ease, border-color 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderBottom = '2px solid #6b7280';
                    e.currentTarget.style.color = '#6b7280';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderBottom = '2px solid transparent';
                    e.currentTarget.style.color = '#4B5563';
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 
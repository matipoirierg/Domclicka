'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, MessageCircle, XCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

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
  const [isQRPopupOpen, setIsQRPopupOpen] = useState(false)

  const handleOpenWhatsApp = () => {
    window.open('https://wa.me/your-number', '_blank')
  }

  const handleOpenQR = () => {
    setIsQRPopupOpen(true)
  }

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

          {/* WhatsApp Button */}
          <div className="absolute right-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleOpenWhatsApp}>
                  Abrir en WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleOpenQR}>
                  Escanear QR
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

      {/* QR Popup */}
      <AnimatePresence>
        {isQRPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsQRPopupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-sm w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsQRPopupOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Escanea el código QR</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <Image
                    src="/img/qr-code.png"
                    alt="QR Code"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Escanea este código con tu cámara para contactarnos por WhatsApp
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 
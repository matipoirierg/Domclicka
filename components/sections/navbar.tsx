'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, MessageCircle, Camera, ChevronDown, Lock, Video, Lightbulb, Key, Plug, Package, Home, Settings, Radio, ToggleLeft, Image as ImageIcon, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const services = [
  {
    category: 'Productos',
    items: [
      {
        subcategory: 'Cerraduras Inteligentes',
        items: [
          { name: 'Clasica', href: '/catalogo-productos/cerraduras-clasica' },
          { name: 'Clasica Pro', href: '/catalogo-productos/cerraduras-clasica-pro' },
          { name: 'Blindex Corrediza', href: '/catalogo-productos/cerraduras-blindex-corrediza' },
          { name: 'Blindex', href: '/catalogo-productos/cerraduras-blindex' },
          { name: 'Super Light', href: '/catalogo-productos/cerraduras-superlight' },
          { name: 'Ejecutiva', href: '/catalogo-productos/cerraduras-ejecutiva' },
          { name: 'Ejecutiva Pro', href: '/catalogo-productos/cerraduras-ejecutiva-pro' },
          { name: 'Super Heavy', href: '/catalogo-productos/cerraduras-super-heavy' },
          { name: 'Super Heavy Lux', href: '/catalogo-productos/cerraduras-super-heavy-lux' },
        ]
      },
      {
        subcategory: 'Cámaras',
        items: [
          { name: 'Cámara Interna', href: '/catalogo-productos/camara-interna' },
          { name: 'Cámara Externa', href: '/catalogo-productos/camara-externa' },
        ]
      },
      {
        subcategory: 'Interruptores Inteligentes',
        items: [
          { name: 'Smart 1C', href: '/catalogo-productos/interruptor-1c' },
          { name: 'Smart 2C', href: '/catalogo-productos/interruptor-2c' },
          { name: 'Smart 3C', href: '/catalogo-productos/interruptor-3c' },
        ]
      },
      {
        subcategory: 'Sensores',
        items: [
          { name: 'Sensor de Puerta', href: '/catalogo-productos/sensor-puerta' }
        ]
      },
      {
        subcategory: 'Tarjetas de Acceso',
        items: [
          { name: 'RFID', href: '/catalogo-productos/tarjetas-rfid' }
        ]
      },
      {
        subcategory: 'Toma corrientes',
        items: [
          { name: 'Toma Corrientes Smart', href: '/catalogo-productos/tomacorrientes-smart' }
        ]
      },
      {
        subcategory: 'Iluminación',
        items: [
          { name: 'Luces Neon', href: '/catalogo-productos/luces-neon' }
        ]
      }
    ]
  },
  {
    category: 'Servicios',
    items: [
      {
        subcategory: 'Paquetes',
        items: [
          { name: 'Simple Pack', href: '/catalogo-servicios/simple-pack' },
          { name: 'Full Service', href: '/catalogo-servicios/full-service' },
          { name: 'Proyectos IoT', href: '/catalogo-servicios/proyectos-iot' }
        ]
      }
    ]
  }
]

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Media', href: '#Media' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Contacto', href: '#contacto' },
]

interface NavbarProps {
  onOpenQR: () => void
}

export function Navbar({ onOpenQR }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const handleOpenWhatsApp = () => {
    window.open('https://wa.me/your-number', '_blank')
  }

  const handleOpenQR = () => {
    onOpenQR()
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
                item.name === 'Servicios' ? (
                  <DropdownMenu key={item.name} open={isServicesOpen} onOpenChange={setIsServicesOpen}>
                    <DropdownMenuTrigger className="text-gray-600 font-medium flex items-center gap-1 hover:text-gray-800 transition-colors">
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[800px] p-4 bg-white border border-gray-100 shadow-lg">
                      <div className="grid grid-cols-2 gap-8 divide-x divide-gray-200">
                        {services.map((section) => (
                          <div key={section.category} className={section.category === 'Productos' ? 'pr-8' : 'pl-8'}>
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                {section.category === 'Productos' ? (
                                  <Package className="w-5 h-5 text-[#25D366]" />
                                ) : (
                                  <Settings className="w-5 h-5 text-[#25D366]" />
                                )}
                                {section.category}
                              </h3>
                              <Link 
                                href={section.category === 'Productos' ? '/catalogo-productos' : '/catalogo-servicios'}
                                className="text-sm text-[#25D366] hover:text-[#128C7E] font-medium flex items-center gap-1 hover:underline"
                                onClick={() => setIsServicesOpen(false)}
                              >
                                Ver catálogo completo
                                <ChevronDown className="w-3 h-3 rotate-[-90deg] mt-0.5" />
                              </Link>
                            </div>
                            {section.category === 'Productos' ? (
                              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                {section.items.map((subcategory) => (
                                  <div key={subcategory.subcategory} className="space-y-1">
                                    <h4 className="font-medium text-sm text-gray-800 flex items-center gap-2 pb-1 border-b border-gray-100 bg-gray-50/50 px-2 py-1 rounded-md">
                                      {subcategory.subcategory === 'Cerraduras Inteligentes' && <Lock className="w-4 h-4 text-[#25D366]" />}
                                      {subcategory.subcategory === 'Cámaras' && <Video className="w-4 h-4 text-[#25D366]" />}
                                      {subcategory.subcategory === 'Interruptores Inteligentes' && <ToggleLeft className="w-4 h-4 text-[#25D366]" />}
                                      {subcategory.subcategory === 'Sensores' && <Radio className="w-4 h-4 text-[#25D366]" />}
                                      {subcategory.subcategory === 'Tarjetas de Acceso' && <Key className="w-4 h-4 text-[#25D366]" />}
                                      {subcategory.subcategory === 'Toma corrientes' && <Plug className="w-4 h-4 text-[#25D366]" />}
                                      {subcategory.subcategory === 'Iluminación' && <Lightbulb className="w-4 h-4 text-[#25D366]" />}
                                      {subcategory.subcategory}
                                    </h4>
                                    <div className="pl-6 space-y-0.5">
                                      {subcategory.items.map((item) => (
                                        <DropdownMenuItem key={item.name} asChild className="py-0.5 hover:bg-gray-50">
                                          <Link href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                                            {item.name}
                                          </Link>
                                        </DropdownMenuItem>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {section.items.map((subcategory) => (
                                  <div key={subcategory.subcategory}>
                                    <h4 className="font-medium text-sm text-gray-800 flex items-center gap-2 pb-1 border-b border-gray-100 bg-gray-50/50 px-2 py-1 rounded-md">
                                      {subcategory.subcategory === 'Paquetes' && <Home className="w-4 h-4 text-[#25D366]" />}
                                      {subcategory.subcategory}
                                    </h4>
                                    <div className="pl-6 mt-1 space-y-0.5">
                                      {subcategory.items.map((item) => (
                                        <DropdownMenuItem key={item.name} asChild className="py-0.5 hover:bg-gray-50">
                                          <Link href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                                            {item.name}
                                          </Link>
                                        </DropdownMenuItem>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : item.name === 'Media' ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger className="text-gray-600 font-medium flex items-center gap-1 hover:text-gray-800 transition-colors">
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 p-4 bg-white border border-gray-100 shadow-lg">
                      <div className="space-y-1">
                        <DropdownMenuItem asChild className="rounded-md hover:bg-gray-50/80">
                          <Link href="/galeria" className="flex items-center gap-2 py-2 px-2 w-full text-sm text-gray-600 hover:text-gray-900">
                            <ImageIcon className="w-4 h-4 text-[#25D366]" />
                            <span className="font-medium">Galería</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="rounded-md hover:bg-gray-50/80">
                          <Link href="/blog" className="flex items-center gap-2 py-2 px-2 w-full text-sm text-gray-600 hover:text-gray-900">
                            <BookOpen className="w-4 h-4 text-[#25D366]" />
                            <span className="font-medium">Blog</span>
                          </Link>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
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
                )
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
          <div className="absolute right-4 hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="default" 
                  size="default"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-medium rounded-full px-4 py-2 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 448 512" 
                    className="h-5 w-5 fill-current"
                  >
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                  </svg>
                  <span className="hidden sm:inline">WhatsApp</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem 
                  onClick={handleOpenWhatsApp}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  Abrir en WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleOpenQR}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Camera className="h-4 w-4 text-[#25D366]" />
                  Escanear QR
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile WhatsApp Button */}
          <div className="fixed bottom-6 right-6 md:hidden z-50">
            <Button 
              onClick={handleOpenWhatsApp}
              variant="default" 
              size="default"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white font-medium rounded-full px-4 py-3 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 448 512" 
                className="h-6 w-6 fill-current"
              >
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
              <span>WhatsApp</span>
            </Button>
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
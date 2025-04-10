'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Check, X } from 'lucide-react'

const products = [
  {
    name: 'SimplePack',
    description: 'Venta de Dispositivos domóticos varios',
    image: '/img/product.jpeg',
    tags: ['Dispositivos inteligentes', 'Entrega rápida'],
    features: [
      { name: 'Dispositivos domóticos', included: true },
      { name: 'Asesoría de instalación', included: false },
      { name: 'Instalación profesional', included: false },
      { name: 'Capacitación', included: false },
      { name: 'Análisis del hogar', included: false },
    ]
  },
  {
    name: 'Asesoría',
    description: 'Instalación y Capacitación del uso de los dispositivos',
    image: '/img/asesoria.jpeg',
    tags: ['Instalación profesional', 'Capacitación'],
    features: [
      { name: 'Dispositivos domóticos', included: true },
      { name: 'Asesoría de instalación', included: true },
      { name: 'Instalación profesional', included: true },
      { name: 'Capacitación', included: true },
      { name: 'Análisis del hogar', included: false },
    ]
  },
  {
    name: 'Full Service',
    description: 'Análisis, Instalación y Capacitación del uso de los dispositivos',
    image: '/img/install.jpeg',
    tags: ['Análisis personalizado', 'Servicio completo'],
    features: [
      { name: 'Dispositivos domóticos', included: true },
      { name: 'Asesoría de instalación', included: true },
      { name: 'Instalación profesional', included: true },
      { name: 'Capacitación', included: true },
      { name: 'Análisis del hogar', included: true },
    ]
  }
]

export function ProductsShowcase() {
  return (
    <section 
      id="products"
      className="py-20 bg-gray-50 scroll-margin-top"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100%" }}
          className="text-center mb-12 md:animate-[motion] animate-none"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600">
            Soluciones inteligentes para tu hogar
          </p>
        </motion.div>

        <div className="overflow-x-auto pb-8">
          <div className="flex gap-8 min-w-full md:min-w-0 md:justify-center md:flex-wrap">
            {products.map((product) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "100%" }}
                className="w-[80vw] md:w-80 flex-shrink-0 bg-white rounded-lg overflow-hidden shadow-lg md:[&>*]:animate-[motion]"
              >
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  
                  {/* Comparative feature list */}
                  <div className="border-t pt-4 mt-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Incluye:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature) => (
                        <li key={feature.name} className="flex items-center text-sm">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />
                          )}
                          <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100%" }}
          className="text-center mt-8 md:animate-[motion] animate-none"
        >
          <Button
            variant="outline"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Ver catálogo completo
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 
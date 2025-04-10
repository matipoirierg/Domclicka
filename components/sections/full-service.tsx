'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Search, Brain, Wrench, GraduationCap } from 'lucide-react'
import Image from 'next/image'

const steps = [
  {
    icon: Search,
    title: 'Análisis',
    description: 'Evaluamos tus necesidades y el espacio disponible para crear la solución perfecta.'
  },
  {
    icon: Brain,
    title: 'Diseño personalizado',
    description: 'Desarrollamos un plan detallado adaptado a tu estilo de vida y presupuesto.'
  },
  {
    icon: Wrench,
    title: 'Instalación',
    description: 'Nuestros técnicos certificados instalan todo el sistema de manera profesional.'
  },
  {
    icon: GraduationCap,
    title: 'Capacitación',
    description: 'Te enseñamos a usar el sistema y aprovechar todas sus funcionalidades.'
  }
]

export function FullService() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Servicio Integral
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Te acompañamos en todo el proceso, desde el análisis inicial hasta la capacitación final.
            </p>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Habla con un asesor
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-lg overflow-hidden"
          >
            <Image
              src="/service-illustration.jpg"
              alt="Servicio integral de domótica"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
} 
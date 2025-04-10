'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, Clock, Shield } from 'lucide-react'
import Image from 'next/image'

const supportFeatures = [
  {
    icon: Phone,
    title: 'Soporte 24/7',
    description: 'Asistencia técnica disponible en cualquier momento del día.'
  },
  {
    icon: Mail,
    title: 'Respuesta rápida',
    description: 'Respondemos a tus consultas en menos de 24 horas.'
  },
  {
    icon: Clock,
    title: 'Mantenimiento preventivo',
    description: 'Revisiones periódicas para asegurar el óptimo funcionamiento.'
  },
  {
    icon: Shield,
    title: 'Garantía extendida',
    description: 'Cobertura ampliada en todos nuestros productos y servicios.'
  }
]

export function SupportSection() {
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
              No solo instalamos, te acompañamos
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Nuestro compromiso va más allá de la instalación. Te ofrecemos soporte continuo y mantenimiento para asegurar que tu sistema funcione perfectamente.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-lg overflow-hidden"
          >
            <Image
              src="/support-illustration.jpg"
              alt="Soporte técnico de domótica"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
} 
'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Smartphone, Wrench } from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    title: 'Seguridad 24/7',
    description: 'Protección continua de tu hogar con sistemas inteligentes de vigilancia y control de acceso.'
  },
  {
    icon: Zap,
    title: 'Ahorro energético',
    description: 'Optimización automática del consumo energético para reducir tus facturas.'
  },
  {
    icon: Smartphone,
    title: 'Control desde tu móvil',
    description: 'Gestiona todos tus dispositivos desde cualquier lugar con nuestra aplicación móvil.'
  },
  {
    icon: Wrench,
    title: 'Instalación profesional',
    description: 'Equipo de técnicos especializados para una instalación rápida y sin complicaciones.'
  }
]

export function ValueProposition() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src="/img/landing.mp4"
          width={1920}
          height={1080}
          className="object-cover w-full h-full"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl backdrop-blur-sm bg-white/10 p-8 rounded-lg"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 text-shadow"
          >
            Haz tu hogar más inteligente, seguro y eficiente
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl font-medium text-white mb-8 text-shadow-strong"
          >
            Soluciones de domótica adaptadas a tu estilo de vida.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 
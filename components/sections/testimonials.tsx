'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Natalia Bascope',
    role: 'Cliente',
    image: '/img/natalia.jpg',
    content: 'El equipo de DOMCLICKA es de gran responsabilidad en el desempeño de su trabajo. muy atentos y siempre prestos a colaborar con sus clientes. Amables y muy profesionales. Recomendados 100%.',
    rating: 5
  },
  {
    name: 'Luis Armando Fonseca',
    role: 'Cliente',
    image: '/img/luis.jpg',
    content: 'Lo que me gusta de DOMCLICKA es la asesoría personalizada, calidad en el trabajo, la organización y las respuestas rápidas y oportunas a cada requerimiento que necesitamos. Talento humano y de trabajo óptimo para lograr objetivos trazados.',
    rating: 5
  },
  {
    name: 'Danilo Molina Camara',
    role: 'Cliente',
    image: '/img/danilo.jpg',
    content: 'En DOMCLICKA siempre buscan la satisfacción de sus clientes, desde el punto de vista técnico se mantienen actualizados en las nuevas tendencias, entienden cómo aplicarlas y obtienen beneficios para ellos y para sus clientes.',
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-600">
            Experiencias reales de personas que han transformado sus hogares
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <p className="text-gray-600">
                &ldquo;{testimonial.content}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: '¿Qué necesito para empezar?',
    answer: 'Solo necesitas una conexión a internet estable y un smartphone. Nuestros técnicos se encargarán de la instalación y configuración de todos los dispositivos.'
  },
  {
    question: '¿Funciona con asistentes de voz?',
    answer: 'Sí, nuestros sistemas son compatibles con los principales asistentes de voz como Alexa, Google Assistant y Siri.'
  },
  {
    question: '¿Cuánto se tarda la instalación?',
    answer: 'El tiempo de instalación varía según el tamaño del proyecto, pero generalmente oscila entre 1 y 3 días. Nuestros técnicos trabajan de manera eficiente para minimizar las molestias.'
  },
  {
    question: '¿Es compatible con sistemas antiguos?',
    answer: 'En la mayoría de los casos, sí. Nuestros sistemas pueden integrarse con instalaciones existentes. Durante el análisis inicial, evaluamos la compatibilidad y proponemos las mejores soluciones.'
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-xl text-gray-600">
            Resolvemos tus dudas sobre domótica
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border rounded-lg overflow-hidden"
            >
              <button
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 
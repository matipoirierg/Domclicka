'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

export function ContactForm() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Listo para automatizar tu hogar?
          </h2>
          <p className="text-xl text-gray-600">
            Te enviaremos una propuesta personalizada sin compromiso
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="property">Tipo de propiedad</Label>
              <Select id="property" required>
                <option value="">Selecciona una opción</option>
                <option value="house">Casa</option>
                <option value="apartment">Departamento</option>
                <option value="office">Oficina</option>
                <option value="commercial">Local comercial</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensaje (opcional)</Label>
              <textarea
                id="message"
                className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                placeholder="Cuéntanos sobre tu proyecto"
              />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="privacy" required />
              <Label htmlFor="privacy" className="text-sm text-gray-600">
                Acepto la política de privacidad y el tratamiento de mis datos
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Solicitar propuesta
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
} 
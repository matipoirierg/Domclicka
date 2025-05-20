'use client'

import Image from 'next/image'
import { Star, MessageCircle, Home, Settings, Package } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Service } from '../page'

interface ServiceDetailsProps {
  service: Service
}

// Mock reviews data - In a real app, this would come from a database
const reviews = [
  {
    id: 1,
    name: 'María González',
    rating: 5,
    comment: 'Excelente servicio, muy profesional y atentos a los detalles.',
    date: '2024-03-15'
  },
  {
    id: 2,
    name: 'Juan Pérez',
    rating: 4,
    comment: 'Buen servicio, la instalación fue rápida y eficiente.',
    date: '2024-03-10'
  }
]

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  const handleWhatsAppContact = () => {
    const message = `Hola, me interesa el servicio ${service.name} de DomClicka.`
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=59172007428&text&type=phone_number&app_absent=0`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Service Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.name}</h1>
            <p className="text-lg text-gray-600">{service.description}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Características principales</h2>
            <ul className="space-y-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-[#25D366] mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Reseñas de clientes</h2>
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Información adicional</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Home className="w-6 h-6 text-[#25D366]" />
                  <div>
                    <h3 className="font-medium">Instalación</h3>
                    <p className="text-sm text-gray-600">Incluye instalación profesional</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Settings className="w-6 h-6 text-[#25D366]" />
                  <div>
                    <h3 className="font-medium">Soporte</h3>
                    <p className="text-sm text-gray-600">Soporte técnico incluido</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-[#25D366]" />
                  <div>
                    <h3 className="font-medium">Garantía</h3>
                    <p className="text-sm text-gray-600">Garantía de servicio</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Column - Service Image */}
        <div className="space-y-6">
          <div className="relative h-[600px] rounded-lg overflow-hidden">
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <Badge className="bg-[#25D366] text-white mb-2">Servicio Premium</Badge>
              <h2 className="text-2xl font-bold mb-2">Transforma tu hogar hoy</h2>
              <p className="text-sm opacity-90">
                Obtén una consulta gratuita y descubre cómo podemos mejorar tu calidad de vida
              </p>
            </div>
          </div>

          <Button
            onClick={handleWhatsAppContact}
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Contactar por WhatsApp
          </Button>
        </div>
      </div>
    </main>
  )
} 
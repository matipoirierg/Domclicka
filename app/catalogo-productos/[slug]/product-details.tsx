'use client'

import Image from 'next/image'
import { Star, MessageCircle, Package, Truck, Shield, CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Product {
  name: string
  href: string
  description: string
  image: string
  features?: string[]
}

interface ProductCategory {
  subcategory: string
  items: Product[]
  icon: React.ReactNode
}

interface ProductDetailsProps {
  product: Product
  category?: ProductCategory
}

// Mock reviews data - In a real app, this would come from a database
const reviews = [
  {
    id: 1,
    name: 'Carlos Rodríguez',
    rating: 5,
    comment: 'Excelente producto, superó mis expectativas. La calidad es increíble.',
    date: '2024-03-15'
  },
  {
    id: 2,
    name: 'Ana Martínez',
    rating: 4,
    comment: 'Muy buen producto, fácil de instalar y usar. Lo recomiendo.',
    date: '2024-03-10'
  }
]

export default function ProductDetails({ product, category }: ProductDetailsProps) {
  const handleWhatsAppContact = () => {
    const message = `Hola, me interesa el producto ${product.name} de DomClicka.`
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=59172007428&text&type=phone_number&app_absent=0`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <main className="container mx-auto px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Product Info */}
        <div className="space-y-8">
          <div>
            {category && (
              <Badge className="mb-4 bg-gray-100 text-gray-800">{category.subcategory}</Badge>
            )}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.description}</p>
          </div>

          {product.features && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Características principales</h2>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
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
          )}

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
                  <Package className="w-6 h-6 text-[#25D366]" />
                  <div>
                    <h3 className="font-medium">Envío Gratis</h3>
                    <p className="text-sm text-gray-600">En compras mayores a $500</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#25D366]" />
                  <div>
                    <h3 className="font-medium">Garantía</h3>
                    <p className="text-sm text-gray-600">1 año de garantía</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-[#25D366]" />
                  <div>
                    <h3 className="font-medium">Entrega</h3>
                    <p className="text-sm text-gray-600">2-3 días hábiles</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-[#25D366]" />
                  <div>
                    <h3 className="font-medium">Pago Seguro</h3>
                    <p className="text-sm text-gray-600">Múltiples métodos</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Column - Product Image */}
        <div className="space-y-6">
          <div className="relative h-[600px] rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <Badge className="bg-[#25D366] text-white mb-2">Producto Premium</Badge>
              <h2 className="text-2xl font-bold mb-2">Calidad Garantizada</h2>
              <p className="text-sm opacity-90">
                Producto original con garantía de fábrica y soporte técnico incluido
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <Badge className="bg-[#25D366] text-white mb-3 px-4 py-1 text-sm">¡Oferta Especial!</Badge>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Precio por tiempo limitado</h3>
            <p className="text-gray-600">
              Contacta por WhatsApp para conocer nuestras promociones exclusivas
            </p>
          </div>

          <Button
            onClick={handleWhatsAppContact}
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Consultar por WhatsApp
          </Button>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Especificaciones técnicas</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Marca</span>
                <span className="font-medium">DomClicka</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Modelo</span>
                <span className="font-medium">{product.name}</span>
              </div>
              {category && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Categoría</span>
                  <span className="font-medium">{category.subcategory}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Garantía</span>
                <span className="font-medium">1 año</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
} 
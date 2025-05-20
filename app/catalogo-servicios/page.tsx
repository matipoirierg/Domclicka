import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Home, Settings, Package } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: 'Catálogo de Servicios | DomClicka',
  description: 'Descubre nuestros servicios de automatización y domótica para tu hogar.',
}

interface Service {
  name: string
  href: string
  description: string
  features: string[]
  image: string
  icon: React.ReactNode
}

export const services: Service[] = [
  {
    name: 'Simple Pack',
    href: '/catalogo-servicios/simple-pack',
    description: 'Solución básica de automatización para comenzar a transformar tu hogar.',
    image: '/img/services/simple-pack.jpg',
    icon: <Home className="w-6 h-6 text-[#25D366]" />,
    features: [
      'Instalación de 2 dispositivos inteligentes',
      'Configuración básica de la app',
      'Soporte técnico por 3 meses',
      'Guía de uso personalizada'
    ]
  },
  {
    name: 'Full Service',
    href: '/catalogo-servicios/full-service',
    description: 'Solución completa de automatización para todo tu hogar.',
    image: '/img/services/full-service.jpg',
    icon: <Settings className="w-6 h-6 text-[#25D366]" />,
    features: [
      'Instalación de hasta 5 dispositivos inteligentes',
      'Configuración avanzada de la app',
      'Soporte técnico por 12 meses',
      'Guía de uso personalizada',
      'Mantenimiento preventivo trimestral',
      'Actualizaciones de firmware incluidas'
    ]
  },
  {
    name: 'Proyectos IoT',
    href: '/catalogo-servicios/proyectos-iot',
    description: 'Soluciones personalizadas para proyectos de automatización a gran escala.',
    image: '/img/services/proyectos-iot.jpg',
    icon: <Package className="w-6 h-6 text-[#25D366]" />,
    features: [
      'Diseño personalizado del sistema',
      'Instalación de múltiples dispositivos',
      'Configuración avanzada y personalizada',
      'Soporte técnico premium',
      'Mantenimiento preventivo mensual',
      'Actualizaciones de firmware prioritarias',
      'Capacitación para el equipo técnico'
    ]
  }
]

export default function ServiceCatalog() {
  return (
    <main className="container mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Catálogo de Servicios</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ofrecemos soluciones personalizadas de automatización para cada necesidad. Descubre el servicio perfecto para tu hogar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Link href={service.href} key={service.name}>
            <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 w-full">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  {service.icon}
                  <CardTitle className="text-2xl">{service.name}</CardTitle>
                </div>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-6 flex-1">
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
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-[#25D366] font-medium">Ver detalles</span>
                  <svg
                    className="w-5 h-5 text-[#25D366]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
} 
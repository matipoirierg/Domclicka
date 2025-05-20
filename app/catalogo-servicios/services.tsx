import { Home, Settings, Package } from 'lucide-react'
import { ReactNode } from 'react'

export interface Service {
  name: string
  href: string
  description: string
  features: string[]
  image: string
  icon: ReactNode
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
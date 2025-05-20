import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Package, Lock, Video, ToggleLeft, Radio, Key, Plug, Lightbulb } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: 'Catálogo de Productos | DomClicka',
  description: 'Explora nuestra línea completa de productos inteligentes para tu hogar.',
}

interface Product {
  name: string
  href: string
  description: string
  image: string
  price?: string
  features?: string[]
}

interface ProductCategory {
  subcategory: string
  items: Product[]
  icon: React.ReactNode
}

export const productCategories: ProductCategory[] = [
  {
    subcategory: 'Cerraduras Inteligentes',
    items: [
      { 
        name: 'Clasica', 
        href: '/catalogo-productos/cerraduras-clasica',
        description: 'Cerradura inteligente básica con control por app y huella digital.',
        image: '/img/products/cerradura-clasica.jpg',
        price: '$199.99',
        features: [
          'Control por app',
          'Huella digital',
          'Código numérico',
          'Llave física de respaldo'
        ]
      },
      { 
        name: 'Clasica Pro', 
        href: '/catalogo-productos/cerraduras-clasica-pro',
        description: 'Versión mejorada con reconocimiento facial y alertas de seguridad.',
        image: '/img/products/cerradura-clasica-pro.jpg',
        price: '$299.99',
        features: [
          'Reconocimiento facial',
          'Alertas de seguridad',
          'Historial de acceso',
          'Modo vacaciones'
        ]
      },
      { 
        name: 'Blindex Corrediza', 
        href: '/catalogo-productos/cerraduras-blindex-corrediza',
        description: 'Cerradura para puertas corredizas con sistema de bloqueo automático.',
        image: '/img/products/cerradura-blindex-corrediza.jpg',
        price: '$349.99',
        features: [
          'Para puertas corredizas',
          'Bloqueo automático',
          'Control remoto',
          'Instalación sencilla'
        ]
      },
      { 
        name: 'Blindex', 
        href: '/catalogo-productos/cerraduras-blindex',
        description: 'Sistema de seguridad avanzado con múltiples métodos de acceso.',
        image: '/img/products/cerradura-blindex.jpg',
        price: '$399.99',
        features: [
          'Múltiples métodos de acceso',
          'Sistema anti-pánico',
          'Batería de larga duración',
          'Diseño premium'
        ]
      },
      { 
        name: 'Super Light', 
        href: '/catalogo-productos/cerraduras-superlight',
        description: 'Diseño ultraligero con máxima seguridad y facilidad de instalación.',
        image: '/img/products/cerradura-superlight.jpg',
        price: '$249.99',
        features: [
          'Diseño ultraligero',
          'Fácil instalación',
          'Batería recargable',
          'Compatibilidad universal'
        ]
      },
      { 
        name: 'Ejecutiva', 
        href: '/catalogo-productos/cerraduras-ejecutiva',
        description: 'Solución premium para oficinas y espacios ejecutivos.',
        image: '/img/products/cerradura-ejecutiva.jpg',
        price: '$449.99',
        features: [
          'Diseño ejecutivo',
          'Control de acceso avanzado',
          'Panel táctil',
          'Sistema de respaldo'
        ]
      },
      { 
        name: 'Ejecutiva Pro', 
        href: '/catalogo-productos/cerraduras-ejecutiva-pro',
        description: 'Versión ejecutiva con control de acceso avanzado y reportes.',
        image: '/img/products/cerradura-ejecutiva-pro.jpg',
        price: '$499.99',
        features: [
          'Reportes detallados',
          'Control de acceso avanzado',
          'Integración con sistemas',
          'Panel táctil premium'
        ]
      },
      { 
        name: 'Super Heavy', 
        href: '/catalogo-productos/cerraduras-super-heavy',
        description: 'Cerradura de alta resistencia para máxima seguridad.',
        image: '/img/products/cerradura-super-heavy.jpg',
        price: '$399.99',
        features: [
          'Alta resistencia',
          'Sistema anti-forzado',
          'Batería de larga duración',
          'Diseño robusto'
        ]
      },
      { 
        name: 'Super Heavy Lux', 
        href: '/catalogo-productos/cerraduras-super-heavy-lux',
        description: 'Edición de lujo con acabados premium y seguridad reforzada.',
        image: '/img/products/cerradura-super-heavy-lux.jpg',
        price: '$549.99',
        features: [
          'Acabados premium',
          'Seguridad reforzada',
          'Panel táctil de lujo',
          'Sistema anti-manipulación'
        ]
      }
    ],
    icon: <Lock className="w-6 h-6 text-[#25D366]" />
  },
  {
    subcategory: 'Cámaras',
    items: [
      { 
        name: 'Cámara Interna', 
        href: '/catalogo-productos/camara-interna',
        description: 'Cámara de seguridad interior con visión nocturna y detección de movimiento.',
        image: '/img/products/camara-interna.jpg',
        price: '$149.99',
        features: [
          'Visión nocturna',
          'Detección de movimiento',
          'Audio bidireccional',
          'Almacenamiento en la nube'
        ]
      },
      { 
        name: 'Cámara Externa', 
        href: '/catalogo-productos/camara-externa',
        description: 'Cámara exterior resistente a la intemperie con visión panorámica.',
        image: '/img/products/camara-externa.jpg',
        price: '$199.99',
        features: [
          'Resistente a la intemperie',
          'Visión panorámica',
          'Detección de movimiento',
          'Audio bidireccional'
        ]
      }
    ],
    icon: <Video className="w-6 h-6 text-[#25D366]" />
  },
  {
    subcategory: 'Interruptores Inteligentes',
    items: [
      { 
        name: 'Smart 1C', 
        href: '/catalogo-productos/interruptor-1c',
        description: 'Interruptor inteligente de un canal con control por app.',
        image: '/img/products/interruptor-1c.jpg',
        price: '$49.99',
        features: [
          'Control por app',
          'Programación',
          'Compatible con Alexa',
          'Fácil instalación'
        ]
      },
      { 
        name: 'Smart 2C', 
        href: '/catalogo-productos/interruptor-2c',
        description: 'Control dual de iluminación con programación avanzada.',
        image: '/img/products/interruptor-2c.jpg',
        price: '$69.99',
        features: [
          'Control dual',
          'Programación avanzada',
          'Compatible con Google Home',
          'Diseño moderno'
        ]
      },
      { 
        name: 'Smart 3C', 
        href: '/catalogo-productos/interruptor-3c',
        description: 'Triple control de iluminación con escenas personalizadas.',
        image: '/img/products/interruptor-3c.jpg',
        price: '$89.99',
        features: [
          'Triple control',
          'Escenas personalizadas',
          'Compatible con Alexa y Google',
          'Panel táctil'
        ]
      }
    ],
    icon: <ToggleLeft className="w-6 h-6 text-[#25D366]" />
  },
  {
    subcategory: 'Sensores',
    items: [
      { 
        name: 'Sensor de Puerta', 
        href: '/catalogo-productos/sensor-puerta',
        description: 'Sensor de apertura y cierre con alertas instantáneas.',
        image: '/img/products/sensor-puerta.jpg',
        price: '$39.99',
        features: [
          'Alertas instantáneas',
          'Batería de larga duración',
          'Fácil instalación',
          'Compatible con sistemas'
        ]
      }
    ],
    icon: <Radio className="w-6 h-6 text-[#25D366]" />
  },
  {
    subcategory: 'Tarjetas de Acceso',
    items: [
      { 
        name: 'RFID', 
        href: '/catalogo-productos/tarjetas-rfid',
        description: 'Sistema de acceso por tarjeta RFID con registro de entradas.',
        image: '/img/products/tarjeta-rfid.jpg',
        price: '$29.99',
        features: [
          'Registro de entradas',
          'Acceso rápido',
          'Diseño resistente',
          'Compatibilidad universal'
        ]
      }
    ],
    icon: <Key className="w-6 h-6 text-[#25D366]" />
  },
  {
    subcategory: 'Toma corrientes',
    items: [
      { 
        name: 'Toma Corrientes Smart', 
        href: '/catalogo-productos/tomacorrientes-smart',
        description: 'Enchufe inteligente con monitoreo de consumo y programación.',
        image: '/img/products/tomacorrientes-smart.jpg',
        price: '$59.99',
        features: [
          'Monitoreo de consumo',
          'Programación',
          'Control por app',
          'Compatibilidad universal'
        ]
      }
    ],
    icon: <Plug className="w-6 h-6 text-[#25D366]" />
  },
  {
    subcategory: 'Iluminación',
    items: [
      { 
        name: 'Luces Neon', 
        href: '/catalogo-productos/luces-neon',
        description: 'Iluminación LED inteligente con control de color y brillo.',
        image: '/img/products/luces-neon.jpg',
        price: '$79.99',
        features: [
          'Control de color',
          'Control de brillo',
          'Programación',
          'Diseño moderno'
        ]
      }
    ],
    icon: <Lightbulb className="w-6 h-6 text-[#25D366]" />
  }
]

export default function ProductCatalog() {
  return (
    <main className="container mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Catálogo de Productos</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre nuestra línea completa de productos inteligentes diseñados para hacer tu hogar más seguro y eficiente.
        </p>
      </div>

      {productCategories.map((category) => (
        <div key={category.subcategory} className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            {category.icon}
            <h2 className="text-2xl font-semibold text-gray-900">{category.subcategory}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.items.map((product) => (
              <Link href={product.href} key={product.name}>
                <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48 w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    {product.price && (
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-[#25D366]">{product.price}</span>
                        <span className="text-sm text-gray-500 ml-2">+ IVA</span>
                      </div>
                    )}
                    {product.features && (
                      <ul className="space-y-3 mb-6 flex-1">
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
                    )}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-[#25D366] font-medium">Ver detalles</span>
                      <Package className="w-5 h-5 text-[#25D366]" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </main>
  )
} 
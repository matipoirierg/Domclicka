import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceDetails from './service-details'
import { services } from '../page'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  
  const service = services.find(s => s.href === `/catalogo-servicios/${slug}`)

  if (!service) {
    return {
      title: 'Servicio no encontrado',
      description: 'El servicio solicitado no existe.'
    }
  }

  return {
    title: `${service.name} | DomClicka`,
    description: service.description,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  
  const service = services.find(s => s.href === `/catalogo-servicios/${slug}`)

  if (!service) {
    notFound()
  }

  return <ServiceDetails service={service} />
} 
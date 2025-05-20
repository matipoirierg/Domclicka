import { Metadata } from 'next'
import GalleryGrid from './gallery-grid'

export const metadata: Metadata = {
  title: 'Galería | DomClicka',
  description: 'Explora nuestra galería de fotos y videos de proyectos anteriores',
}

interface GalleryItem {
  id: string
  title: string
  description: string
  type: 'image' | 'video'
  src: string
  date: string
}

async function getGalleryItems(): Promise<GalleryItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/gallery/items`, {
    cache: 'no-store',
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch gallery items')
  }

  return res.json()
}

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems()

  return (
    <div className="container mx-auto py-12">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Nuestra Galería</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora nuestros proyectos anteriores para inspirarte y ver ejemplos de nuestro trabajo
          </p>
        </div>

        <GalleryGrid items={galleryItems} />
      </div>
    </div>
  )
} 
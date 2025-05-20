'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-bold">Artículo no encontrado</h2>
        <p className="text-muted-foreground">
          Lo sentimos, el artículo que estás buscando no existe o ha sido eliminado.
        </p>
        <Button asChild>
          <Link href="/blog">
            Volver al Blog
          </Link>
        </Button>
      </div>
    </div>
  )
} 
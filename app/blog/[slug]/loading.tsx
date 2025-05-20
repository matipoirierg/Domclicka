import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <article className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Cabecera */}
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-5 w-32" />
        </div>

        {/* Imagen de portada */}
        <Skeleton className="w-full aspect-video rounded-lg" />

        {/* Contenido */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </article>
  )
} 
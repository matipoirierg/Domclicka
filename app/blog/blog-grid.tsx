'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogPost {
  id: string
  title: string
  description: string
  content: string
  coverImage: string
  tags: string[]
  slug: string
  createdAt: string
}

interface BlogGridProps {
  posts: BlogPost[]
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({})
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No hay artículos publicados aún.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden flex flex-col">
          <div className="aspect-video relative overflow-hidden bg-muted">
            <div className={cn(
              "absolute inset-0 bg-muted",
              loadingImages[post.id] ? "opacity-100" : "opacity-0"
            )} />
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-cover transition-all duration-300",
                loadingImages[post.id] ? "opacity-0" : "opacity-100"
              )}
              onLoadingComplete={() => {
                setLoadingImages(prev => ({ ...prev, [post.id]: false }))
              }}
              onLoad={() => {
                setLoadingImages(prev => ({ ...prev, [post.id]: false }))
              }}
              loading="lazy"
            />
          </div>
          
          <CardContent className="flex-1 p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-muted-foreground mb-4">{post.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="p-6 pt-0">
            <Button asChild className="w-full">
              <Link href={`/blog/${post.slug}`}>
                Leer más
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
} 
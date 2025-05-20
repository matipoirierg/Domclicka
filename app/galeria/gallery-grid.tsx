'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GalleryItem {
  id: string
  title: string
  description: string
  type: 'image' | 'video'
  src: string
  date: string
}

interface GalleryGridProps {
  items: GalleryItem[]
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({})
  
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No hay elementos para mostrar en esta categoría.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card 
            key={item.id} 
            className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
            onClick={() => setSelectedItem(item)}
          >
            <CardContent className="p-0 relative">
              <div className="aspect-video relative overflow-hidden bg-muted">
                {item.type === 'image' ? (
                  <>
                    <div className={cn(
                      "absolute inset-0 bg-muted",
                      loadingImages[item.id] ? "opacity-100" : "opacity-0"
                    )} />
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={cn(
                        "object-cover transition-all duration-300",
                        loadingImages[item.id] ? "opacity-0" : "opacity-100",
                        "group-hover:scale-105"
                      )}
                      onLoadingComplete={() => {
                        setLoadingImages(prev => ({ ...prev, [item.id]: false }))
                      }}
                      onLoad={() => {
                        setLoadingImages(prev => ({ ...prev, [item.id]: false }))
                      }}
                      loading="lazy"
                    />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                      <Play className="w-16 h-16 text-white opacity-70 group-hover:opacity-100" />
                    </div>
                    <video
                      src={item.src}
                      className="absolute inset-0 w-full h-full object-cover brightness-75"
                      preload="metadata"
                    />
                  </>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-4xl w-[90vw]">
          <DialogHeader>
            <DialogTitle>{selectedItem?.title}</DialogTitle>
            <DialogDescription>{selectedItem?.description}</DialogDescription>
          </DialogHeader>
          
          <div className="relative mt-4">
            {selectedItem?.type === 'image' ? (
              <div className="relative w-full aspect-video bg-muted">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 90vw, 1100px"
                  priority
                />
              </div>
            ) : (
              <video
                src={selectedItem?.src}
                className="w-full aspect-video object-contain"
                controls
                autoPlay
              />
            )}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
} 
'use client'

import { useState, useRef } from 'react'
import { PutBlobResult } from '@vercel/blob'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Loader2, Upload } from 'lucide-react'

interface UploadFormData {
  title: string
  description: string
  file: File | null
}

const initialFormData: UploadFormData = {
  title: '',
  description: '',
  file: null,
}

export default function GalleryManager() {
  const [formData, setFormData] = useState<UploadFormData>(initialFormData)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setFormData(prev => ({ ...prev, file }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (!formData.file) {
      toast.error('Por favor selecciona un archivo')
      return
    }

    try {
      setIsUploading(true)

      // Upload file to Vercel Blob
      const fileType = formData.file.type.startsWith('video/') ? 'video' : 'image'
      const filename = `${Date.now()}-${formData.file.name}`
      
      const response = await fetch(`/api/gallery/upload?filename=${filename}`, {
        method: 'POST',
        body: formData.file,
      })

      if (!response.ok) {
        throw new Error('Error al subir el archivo')
      }

      const blob = await response.json() as PutBlobResult

      // Create gallery item
      const galleryItem = {
        title: formData.title,
        description: formData.description,
        type: fileType,
        src: blob.url,
      }

      const itemResponse = await fetch('/api/gallery/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(galleryItem),
      })

      if (!itemResponse.ok) {
        throw new Error('Error al crear el item de galería')
      }

      toast.success('Archivo subido correctamente')

      // Reset form
      setFormData(initialFormData)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Ocurrió un error al subir el archivo')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subir Nuevo Contenido</CardTitle>
        <CardDescription>
          Añade nuevas imágenes o videos a la galería
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Archivo</Label>
            <Input
              id="file"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              required
            />
          </div>

          <Button type="submit" disabled={isUploading} className="w-full">
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Subir Contenido
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 
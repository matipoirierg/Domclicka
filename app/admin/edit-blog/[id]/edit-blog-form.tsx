'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import React from 'react'
import slugify from 'slugify'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Loader2, Upload, Code, Quote, ArrowLeft } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import '@/app/styles/editor.css'

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

interface EditFormData {
  title: string
  description: string
  coverImage: File | null
  currentCoverImage: string
}

interface MenuBarProps {
  editor: ReturnType<typeof useEditor>
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) return null

  return (
    <div className="border rounded-lg p-2 mb-4 flex flex-wrap gap-2">
      <div className="flex gap-1 border-r pr-2">
        <Toggle size="sm" pressed={editor.isActive('bold')} onPressedChange={() => editor.chain().focus().toggleBold().run()} title="Bold (Ctrl+B)">
          <span className="font-bold">B</span>
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive('italic')} onPressedChange={() => editor.chain().focus().toggleItalic().run()} title="Italic (Ctrl+I)">
          <span className="italic">I</span>
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive('strike')} onPressedChange={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough (Ctrl+Shift+X)">
          <span className="line-through">S</span>
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive('code')} onPressedChange={() => editor.chain().focus().toggleCode().run()} title="Inline Code (Ctrl+E)">
          <Code className="h-4 w-4" />
        </Toggle>
      </div>
      <div className="flex gap-1 border-r pr-2">
        <Toggle size="sm" pressed={editor.isActive('heading', { level: 2 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2 (Ctrl+Alt+2)">
          H2
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive('heading', { level: 3 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3 (Ctrl+Alt+3)">
          H3
        </Toggle>
      </div>
      <div className="flex gap-1 border-r pr-2">
        <Toggle size="sm" pressed={editor.isActive('bulletList')} onPressedChange={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List (Ctrl+Shift+8)">
          • Lista
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive('orderedList')} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered List (Ctrl+Shift+7)">
          1. Lista
        </Toggle>
      </div>
      <div className="flex gap-1">
        <Toggle size="sm" pressed={editor.isActive('blockquote')} onPressedChange={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote (Ctrl+Shift+B)">
          <Quote className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive('codeBlock')} onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()} title="Code Block (Ctrl+Alt+C)">
          <Code className="h-4 w-4" /> Bloque
        </Toggle>
      </div>
    </div>
  )
}

interface EditBlogFormProps {
  id: string
}

export default function EditBlogForm({ id }: EditBlogFormProps) {
  const postId = id;
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<EditFormData>({
    title: '',
    description: '',
    coverImage: null,
    currentCoverImage: ''
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ 
        heading: { levels: [2, 3] }, 
        codeBlock: { HTMLAttributes: { class: 'rounded-md bg-muted p-4 font-mono' } },
        paragraph: {
          HTMLAttributes: {
            class: 'my-2',
          },
        },
      }),
      Image,
      Link.configure({ openOnClick: false }),
    ],
    content: '',
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[250px]',
      },
    },
  })

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true)
        const res = await fetch(`/api/blog/posts/${postId}`)
        if (!res.ok) {
          if (res.status === 404) {
            toast.error('Post no encontrado')
            router.push('/admin')
            return
          }
          throw new Error('Error al cargar el post')
        }
        const data = await res.json()
        setPost(data)
        setFormData({
          title: data.title,
          description: data.description,
          coverImage: null,
          currentCoverImage: data.coverImage
        })
        
        // Establecer el contenido en el editor
        if (editor) {
          editor.commands.setContent(data.content)
        }
      } catch (error) {
        console.error(error)
        toast.error('Error al cargar el post')
        router.push('/admin')
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      fetchPost()
    }
  }, [postId, router, editor])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!formData.title || formData.title.length < 5 || formData.title.length > 100) {
      toast.error('El título debe tener entre 5 y 100 caracteres')
      return
    }
    if (!formData.description || formData.description.length > 500) {
      toast.error('La descripción es requerida y debe tener menos de 500 caracteres')
      return
    }
    if (!editor?.getText() || editor.getText().trim() === '') {
      toast.error('Escribe el contenido del artículo')
      return
    }

    try {
      setSaving(true)
      
      let coverImageUrl = formData.currentCoverImage

      // Si hay una nueva imagen de portada, subirla
      if (formData.coverImage) {
        const filename = `${Date.now()}-${formData.coverImage.name}`
        const imageResponse = await fetch(`/api/gallery/upload?filename=${filename}`, {
          method: 'POST',
          body: formData.coverImage,
        })
        
        if (!imageResponse.ok) throw new Error('Error al subir la imagen')
        const imageBlob = await imageResponse.json()
        coverImageUrl = imageBlob.url
      }

      const slug = slugify(formData.title, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g })
      const updatedPost = {
        title: formData.title,
        description: formData.description,
        content: editor.getHTML(),
        coverImage: coverImageUrl,
        slug
      }

      const postResponse = await fetch(`/api/blog/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      })
      if (!postResponse.ok) throw new Error('Error al actualizar el artículo')

      toast.success('Artículo actualizado correctamente')
      router.push('/admin')
    } catch (error: unknown) {
      console.error('Error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error al actualizar el artículo'
      toast.error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex justify-center items-center h-60">
          <p className="text-muted-foreground">Cargando post...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push('/admin')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Editar Artículo</h1>
            <p className="mt-2 text-muted-foreground">
              Actualiza la información del artículo
            </p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Editar &ldquo;{post?.title}&rdquo;</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  required
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  required
                  maxLength={500}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Imagen de Portada</Label>
                <div className="text-sm text-muted-foreground mb-2">
                  Actualmente: {formData.currentCoverImage.split('/').pop()}
                </div>
                <Input
                  id="coverImage"
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => setFormData((prev) => ({ ...prev, coverImage: e.target.files?.[0] || null }))}
                  accept="image/jpeg,image/png,image/webp"
                />
              </div>

              <div className="space-y-2">
                <Label>Contenido</Label>
                {editor && <MenuBar editor={editor} />}
                <EditorContent editor={editor} className="border rounded-lg tiptap min-h-[300px]" />
              </div>

              <Button type="submit" disabled={saving} className="w-full">
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando cambios...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
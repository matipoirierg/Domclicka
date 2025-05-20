'use client'

import { useState, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import slugify from 'slugify'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Loader2, Upload, Code, Quote } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import '@/app/styles/editor.css'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

interface BlogFormData {
  title: string
  description: string
  coverImage: File | null
}

const initialFormData: BlogFormData = {
  title: '',
  description: '',
  coverImage: null,
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

export default function BlogManager() {
  const [formData, setFormData] = useState<BlogFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

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
    if (!formData.coverImage || !['image/jpeg', 'image/png', 'image/webp'].includes(formData.coverImage.type)) {
      toast.error('Selecciona una imagen válida (JPEG, PNG, WebP)')
      return
    }
    if (!editor?.getText() || editor.getText().trim() === '') {
      toast.error('Escribe el contenido del artículo')
      return
    }

    try {
      setIsSubmitting(true)

      // Upload cover image to Vercel Blob
      const filename = `${Date.now()}-${formData.coverImage.name}`
      const imageResponse = await fetch(`/api/gallery/upload?filename=${filename}`, {
        method: 'POST',
        body: formData.coverImage,
      })
      
      if (!imageResponse.ok) throw new Error('Error al subir la imagen')
      const imageBlob = await imageResponse.json()

      const slug = slugify(formData.title, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g })
      const blogPost = {
        title: formData.title,
        description: formData.description,
        content: editor.getHTML(),
        coverImage: imageBlob.url,
        tags: [],
        slug,
      }

      const postResponse = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogPost),
      })
      if (!postResponse.ok) throw new Error('Error al crear el artículo')

      toast.success('Artículo creado correctamente')
      setFormData(initialFormData)
      editor.commands.setContent('')
      
      // Reset file input
      if (formRef.current) {
        formRef.current.reset()
      }
    } catch (error: unknown) {
      console.error('Error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error al crear el artículo'
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Nuevo Artículo</CardTitle>
        <CardDescription>Añade un nuevo artículo al blog</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
            <Input
              id="coverImage"
              type="file"
              onChange={(e) => setFormData((prev) => ({ ...prev, coverImage: e.target.files?.[0] || null }))}
              accept="image/jpeg,image/png,image/webp"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Contenido</Label>
            {editor && <MenuBar editor={editor} />}
            <EditorContent editor={editor} className="border rounded-lg tiptap min-h-[300px]" />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando artículo...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Publicar Artículo
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
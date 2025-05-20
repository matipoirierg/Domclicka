import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { promises as fs } from 'fs'
import path from 'path'
import { BlogContent } from '@/app/components/blog/blog-content'

// Define the BlogPost interface
interface BlogPost {
  id: string
  title: string
  description: string
  content: string
  coverImage: string
  slug: string
  tags: string[]
  createdAt: string
}

// Función para leer los posts del blog
async function readBlogPosts(): Promise<BlogPost[]> {
  const dataFilePath = path.join(process.cwd(), 'data', 'blog.json')
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch {
    return []
  }
}

// Función para obtener un post específico por slug
async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await readBlogPosts()
  return posts.find((post: BlogPost) => post.slug === slug)
}

type Params = Promise<{ slug: string }>

// Generar metadatos dinámicos
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  
  const post = await getBlogPost(slug)
  
  if (!post) {
    return {
      title: 'Post no encontrado | DomClicka',
    }
  }

  return {
    title: `${post.title} | DomClicka`,
    description: post.description,
  }
}

export default async function BlogPost({ params }: { params: Params }) {
  const { slug } = await params
  
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Cabecera */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </div>

        {/* Imagen de portada */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Contenido */}
        <BlogContent content={post.content} />
      </div>
    </article>
  )
} 
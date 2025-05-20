import { Metadata } from 'next'
import BlogGrid from './blog-grid'

export const metadata: Metadata = {
  title: 'Blog | DomClicka',
  description: 'Explora nuestros artículos sobre construcción, diseño y arquitectura',
}

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

async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog/posts`, {
    cache: 'no-store',
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch blog posts')
  }

  return res.json()
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto py-12">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Nuestro Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora nuestros artículos sobre construcción, diseño y las últimas tendencias en arquitectura
          </p>
        </div>

        <BlogGrid posts={posts} />
      </div>
    </div>
  )
} 
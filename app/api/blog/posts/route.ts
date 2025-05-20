import { NextResponse } from 'next/server'
import { z } from 'zod'
import { promises as fs } from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'blog.json')

// Ensure the data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Read blog posts from file
async function readBlogPosts() {
  try {
    await ensureDataDirectory()
    const fileContent = await fs.readFile(dataFilePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    return []
  }
}

// Write blog posts to file
async function writeBlogPosts(posts: any[]) {
  await ensureDataDirectory()
  await fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2))
}

const BlogPostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().url(),
  tags: z.array(z.string()),
  slug: z.string(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = BlogPostSchema.parse(body)
    
    // Add additional fields
    const newPost = {
      ...validatedData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    
    // Read existing posts
    const posts = await readBlogPosts()
    
    // Add new post
    posts.push(newPost)
    
    // Save to file
    await writeBlogPosts(posts)
    
    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Error creating blog post' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const posts = await readBlogPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return NextResponse.json(
      { error: 'Error reading blog posts' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    // Read existing posts
    const posts = await readBlogPosts()
    
    // Find post index
    const postIndex = posts.findIndex((post: any) => post.id === id)
    
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    // Remove post
    posts.splice(postIndex, 1)
    
    // Save to file
    await writeBlogPosts(posts)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Error deleting blog post' },
      { status: 500 }
    )
  }
} 
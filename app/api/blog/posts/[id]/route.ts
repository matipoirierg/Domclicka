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

const UpdateBlogPostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().url(),
  slug: z.string(),
})

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    
    // Read all posts
    const posts = await readBlogPosts()
    
    // Find the post
    const post = posts.find((post: any) => post.id === id)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error reading blog post:', error)
    return NextResponse.json(
      { error: 'Error reading blog post' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()
    
    // Validate request body
    const validatedData = UpdateBlogPostSchema.parse(body)
    
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
    
    // Update post
    posts[postIndex] = {
      ...posts[postIndex],
      title: validatedData.title,
      description: validatedData.description,
      content: validatedData.content,
      coverImage: validatedData.coverImage,
      slug: validatedData.slug,
      // Preserve other fields like id, createdAt, tags, etc.
    }
    
    // Save to file
    await writeBlogPosts(posts)
    
    return NextResponse.json(posts[postIndex])
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Error updating blog post' },
      { status: 500 }
    )
  }
} 
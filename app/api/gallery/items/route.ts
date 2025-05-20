import { NextResponse } from 'next/server'
import { z } from 'zod'
import { promises as fs } from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'gallery.json')

// Ensure the data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Read gallery items from file
async function readGalleryItems() {
  try {
    await ensureDataDirectory()
    const fileContent = await fs.readFile(dataFilePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    return []
  }
}

// Write gallery items to file
async function writeGalleryItems(items: any[]) {
  await ensureDataDirectory()
  await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2))
}

const GalleryItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['image', 'video']),
  src: z.string().url(),
})

const UpdateGalleryItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = GalleryItemSchema.parse(body)
    
    // Add additional fields
    const newItem = {
      ...validatedData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    }
    
    // Read existing items
    const items = await readGalleryItems()
    
    // Add new item
    items.push(newItem)
    
    // Save to file
    await writeGalleryItems(items)
    
    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Error creating gallery item:', error)
    return NextResponse.json(
      { error: 'Error creating gallery item' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const items = await readGalleryItems()
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error reading gallery items:', error)
    return NextResponse.json(
      { error: 'Error reading gallery items' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // Validate request body
    const validatedData = UpdateGalleryItemSchema.parse(body)
    
    // Read existing items
    const items = await readGalleryItems()
    
    // Find item index
    const itemIndex = items.findIndex((item: any) => item.id === id)
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      )
    }
    
    // Update item
    items[itemIndex] = {
      ...items[itemIndex],
      title: validatedData.title,
      description: validatedData.description,
    }
    
    // Save to file
    await writeGalleryItems(items)
    
    return NextResponse.json(items[itemIndex])
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Error updating gallery item:', error)
    return NextResponse.json(
      { error: 'Error updating gallery item' },
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

    // Read existing items
    const items = await readGalleryItems()
    
    // Find item index
    const itemIndex = items.findIndex((item: any) => item.id === id)
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      )
    }
    
    // Remove item
    items.splice(itemIndex, 1)
    
    // Save to file
    await writeGalleryItems(items)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    return NextResponse.json(
      { error: 'Error deleting gallery item' },
      { status: 500 }
    )
  }
} 
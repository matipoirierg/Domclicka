'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { Pencil, Trash2, Eye } from 'lucide-react'

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

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      setLoading(true)
      const res = await fetch('/api/blog/posts')
      if (!res.ok) throw new Error('Error al cargar los posts')
      const data = await res.json()
      setPosts(data)
    } catch (error) {
      console.error(error)
      toast.error('Error al cargar los posts')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (id: string) => {
    setPostToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!postToDelete) return

    try {
      const res = await fetch(`/api/blog/posts?id=${postToDelete}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Error al eliminar el post')

      toast.success('Post eliminado correctamente')
      fetchPosts()
    } catch (error) {
      console.error(error)
      toast.error('Error al eliminar el post')
    } finally {
      setDeleteDialogOpen(false)
      setPostToDelete(null)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-40">
            <p className="text-muted-foreground">Cargando posts...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          {posts.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No hay posts publicados aún</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Imagen</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden md:table-cell">Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="relative w-16 h-16 rounded-md overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(post.createdAt).toLocaleDateString('es-ES')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                        >
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                        >
                          <Link href={`/admin/edit-blog/${post.id}`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteClick(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Confirmar eliminación?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente este post del blog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
} 
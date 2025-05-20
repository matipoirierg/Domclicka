'use client'

import { useState, useEffect } from 'react'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Pencil, Trash2, Play } from 'lucide-react'

interface GalleryItem {
  id: string
  title: string
  description: string
  type: 'image' | 'video'
  src: string
  date: string
}

interface EditFormData {
  title: string
  description: string
}

export default function GalleryList() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToEdit, setItemToEdit] = useState<GalleryItem | null>(null)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [formData, setFormData] = useState<EditFormData>({
    title: '',
    description: '',
  })

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    try {
      setLoading(true)
      const res = await fetch('/api/gallery/items')
      if (!res.ok) throw new Error('Error al cargar los elementos')
      const data = await res.json()
      setItems(data)
    } catch (error) {
      console.error(error)
      toast.error('Error al cargar los elementos')
    } finally {
      setLoading(false)
    }
  }

  const handleEditClick = (item: GalleryItem) => {
    setItemToEdit(item)
    setFormData({
      title: item.title,
      description: item.description,
    })
    setEditDialogOpen(true)
  }

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!itemToEdit) return

    try {
      const res = await fetch(`/api/gallery/items?id=${itemToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
        }),
      })

      if (!res.ok) throw new Error('Error al actualizar el elemento')

      toast.success('Elemento actualizado correctamente')
      fetchItems()
      setEditDialogOpen(false)
    } catch (error) {
      console.error(error)
      toast.error('Error al actualizar el elemento')
    }
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return

    try {
      const res = await fetch(`/api/gallery/items?id=${itemToDelete}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Error al eliminar el elemento')

      toast.success('Elemento eliminado correctamente')
      fetchItems()
    } catch (error) {
      console.error(error)
      toast.error('Error al eliminar el elemento')
    } finally {
      setDeleteDialogOpen(false)
      setItemToDelete(null)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-40">
            <p className="text-muted-foreground">Cargando elementos...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          {items.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No hay elementos en la galería</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Media</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden md:table-cell">Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted">
                        {item.type === 'image' ? (
                          <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(item.date).toLocaleDateString('es-ES')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditClick(item)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteClick(item.id)}
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

      {/* Diálogo de edición */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Elemento</DialogTitle>
            <DialogDescription>
              Actualiza la información del elemento seleccionado.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Guardar cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Confirmar eliminación?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente este elemento de la galería.
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
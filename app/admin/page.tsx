import { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GalleryManager from './gallery-manager'
import BlogManager from './blog-manager'
import BlogList from './blog-list'
import GalleryList from './gallery-list'

export const metadata: Metadata = {
  title: 'Admin | Panel de Administración',
  description: 'Panel de administración para gestionar el contenido',
}

export default function AdminPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Panel de Administración</h1>
          <p className="mt-2 text-muted-foreground">
            Gestiona el contenido del sitio
          </p>
        </div>

        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList>
            <TabsTrigger value="gallery">Galería</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Elementos existentes</h2>
                <GalleryList />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Subir nuevo contenido</h2>
                <GalleryManager />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="blog" className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Artículos existentes</h2>
                <BlogList />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Crear nuevo artículo</h2>
                <BlogManager />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 
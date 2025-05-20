# Galería de Proyectos

Esta sección muestra una galería de fotos y videos de proyectos anteriores para que los clientes puedan visualizar el trabajo realizado.

## Estructura

- `app/galeria/page.tsx`: Página principal de la galería que incluye:
  - Título y descripción
  - Filtros por categoría (Todos, Interiores, Exteriores, Comercial, Residencial)
  - Componente de cuadrícula para mostrar los elementos

- `app/galeria/gallery-grid.tsx`: Componente cliente que maneja:
  - Visualización de elementos en formato de tarjetas
  - Modal para ver imágenes y videos en tamaño completo
  - Interacción del usuario con los elementos

## Características

- **Diseño Responsivo**: Se adapta a diferentes tamaños de pantalla (móvil, tablet, escritorio)
- **Filtrado por Categorías**: Permite filtrar proyectos por tipo
- **Optimización de Imágenes**: Utiliza Next.js Image para optimizar la carga y el rendimiento
- **Visualización Modal**: Al hacer clic en un elemento, se abre un modal con vista ampliada
- **Reproducción de Videos**: Soporte para videos con controles de reproducción
- **UX Mejorada**: Efectos de hover, indicadores visuales para videos, y más

## Personalización

Para agregar nuevos proyectos a la galería, modifica el array `galleryItems` en `page.tsx` con la siguiente estructura:

```typescript
{
  id: string,
  title: string,
  description: string,
  type: 'image' | 'video',
  src: string,
  category: 'todos' | 'interiores' | 'exteriores' | 'comercial' | 'residencial',
  date: string
}
```

## Notas Técnicas

- Para videos, se recomienda crear una imagen de thumbnail con el mismo nombre que el video pero con la extensión `.jpg` (ejemplo: `video.mp4` → `video-thumbnail.jpg`)
- Las imágenes y videos deben almacenarse en la carpeta `public/gallery/` 
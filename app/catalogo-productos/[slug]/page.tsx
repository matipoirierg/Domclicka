import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { productCategories } from '../page'
import ProductDetails from './product-details'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  
  const product = productCategories
    .flatMap(category => category.items)
    .find(p => p.href.replace('/catalogo-productos/', '') === slug)
  
  if (!product) {
    return {
      title: 'Producto no encontrado | DomClicka',
      description: 'El producto que buscas no existe.',
    }
  }

  return {
    title: `${product.name} | DomClicka`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  
  const product = productCategories
    .flatMap(category => category.items)
    .find(p => p.href.replace('/catalogo-productos/', '') === slug)
  
  if (!product) {
    notFound()
  }

  const category = productCategories.find(cat => 
    cat.items.some(item => item.href === product.href)
  )

  return <ProductDetails product={product} category={category} />
} 
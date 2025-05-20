'use client'

import { useEffect, useRef } from 'react'

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Asegurarse de que las clases específicas se apliquen correctamente
    if (!contentRef.current) return

    // Aplicar clases personalizadas a elementos específicos si es necesario
    const paragraphs = contentRef.current.querySelectorAll('p:not([class])')
    paragraphs.forEach((p) => {
      p.classList.add('my-2')
    })

    // Asegurar que las listas tengan formato adecuado
    const listItems = contentRef.current.querySelectorAll('li p')
    listItems.forEach((item) => {
      item.classList.add('my-0', 'mb-1')
    })
  }, [content])

  return (
    <div 
      ref={contentRef}
      className="prose prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-p:text-base prose-p:leading-relaxed prose-li:text-base prose-li:leading-relaxed max-w-none"
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  )
} 
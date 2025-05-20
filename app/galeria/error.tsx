'use client'

import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center justify-center space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-bold">Algo salió mal</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Hubo un error al cargar la galería. Por favor, intenta nuevamente.
        </p>
        <Button onClick={() => reset()}>Reintentar</Button>
      </div>
    </div>
  )
} 
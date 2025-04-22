'use client'

import { useState } from 'react'
import { QRPopup } from '@/components/sections/qr-popup'
import { Navbar } from '@/components/sections/navbar'

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isQRPopupOpen, setIsQRPopupOpen] = useState(false)

  return (
    <>
      <Navbar onOpenQR={() => setIsQRPopupOpen(true)} />
      <main className="pt-20">
        {children}
      </main>
      <QRPopup isOpen={isQRPopupOpen} onClose={() => setIsQRPopupOpen(false)} />
    </>
  )
} 
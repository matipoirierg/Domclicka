'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { XCircle } from 'lucide-react'

interface QRPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function QRPopup({ isOpen, onClose }: QRPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 z-[99]" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-sm w-full relative mx-auto my-auto z-[101]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Escanea el código QR</h3>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Image
                  src="/img/qr.png"
                  alt="QR Code"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Escanea este código con tu cámara para contactarnos por WhatsApp
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 
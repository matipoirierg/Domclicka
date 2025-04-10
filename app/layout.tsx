import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "DomClicka - Automatización del Hogar",
  description: "Transforma tu hogar con soluciones inteligentes de domótica. Instalación profesional, soporte 24/7 y productos de alta calidad.",
  keywords: ["domótica", "automatización", "hogar inteligente", "smart home", "IoT"],
  authors: [{ name: "DomClicka" }],
  openGraph: {
    title: "DomClicka - Automatización del Hogar",
    description: "Transforma tu hogar con soluciones inteligentes de domótica",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`scroll-smooth ${raleway.variable}`}>
      <body className={raleway.className}>
        <Navbar />
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}

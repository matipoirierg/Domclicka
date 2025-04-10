import { HeroSection } from '@/components/sections/hero-section'
import { ValueProposition } from '@/components/sections/value-proposition'
import { ProductsShowcase } from '@/components/sections/products-showcase'
import { FullService } from '@/components/sections/full-service'
import { Testimonials } from '@/components/sections/testimonials'
import { SupportSection } from '@/components/sections/support-section'
import { ContactForm } from '@/components/sections/contact-form'
import { FAQ } from '@/components/sections/faq'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <ValueProposition />
      <ProductsShowcase />
      <FullService />
      <Testimonials />
      <SupportSection />
      <ContactForm />
      <FAQ />
      <Footer />
    </main>
  )
}

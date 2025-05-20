import { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Footer } from "@/components/sections/footer"
import { Lightbulb, Leaf, Palette, Heart, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Quiénes Somos - Domclicka",
  description: "Conoce más sobre Domclicka, líder en domótica e IoT en Bolivia",
}

interface TeamMember {
  name: string
  role: string
  image: string
  initials: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Lic. Marco Barra",
    role: "Contabilidad",
    image: "/img/teammarco.jpg",
    initials: "MB",
  },
  {
    name: "Ing. Rafael Peredo Mantilla",
    role: "Área Comercial",
    image: "/img/teamrafa.jpg",
    initials: "RPM",
  },
  {
    name: "Srta. Yeancarla Azurduy Diaz",
    role: "Área Comercial",
    image: "/img/teamyancarla.jpg",
    initials: "YAD",
  },
  {
    name: "Lic. Roger Arandia",
    role: "Marketing",
    image: "/img/teamroger.jpg",
    initials: "RA",
  },
]

const values = [
  {
    title: "Pasión por la Innovación",
    description: "Amamos combinar tecnología y confort para crear experiencias únicas.",
    icon: Lightbulb,
  },
  {
    title: "Respeto al Medio Ambiente",
    description: "Diseñamos soluciones de domótica sostenible que reducen el consumo energético.",
    icon: Leaf,
  },
  {
    title: "Creatividad",
    description: "Buscamos constantemente nuevas formas de innovar en automatización.",
    icon: Palette,
  },
  {
    title: "Respeto",
    description: "Valoramos a nuestros clientes, empleados y al entorno que nos rodea.",
    icon: Heart,
  },
  {
    title: "Trabajo en Equipo",
    description: "Colaboramos para ofrecer los mejores resultados en cada proyecto.",
    icon: Users,
  },
]

export default function AboutPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Nosotros - Domclicka
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Innovación en Domótica para Bolivia
          </p>
        </section>

        {/* Main Content */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div className="prose prose-lg dark:prose-invert">
            <p>
              En Domclicka, transformamos espacios en hogares inteligentes, oficinas
              eficientes y comercios modernos mediante soluciones de domótica e IoT.
              Nuestra misión es mejorar la calidad de vida de nuestros clientes a
              través de la automatización, ofreciendo eficiencia energética,
              personalización de ambientes y máximo confort.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <Card key={value.title} className="hover:shadow-lg transition-shadow group">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Founder Section */}
        <section className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-[500px] md:h-full">
                <Image
                  src="/img/teamjaime.jpg"
                  alt="Ing. Jaime Cari Siles - Fundador"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <CardContent className="flex flex-col justify-center p-8">
                <h2 className="text-3xl font-bold mb-4">Nuestro Fundador</h2>
                <h3 className="text-xl font-semibold mb-2">Ing. Jaime Cari Siles</h3>
                <p className="text-muted-foreground mb-4">
                  Domclicka nació de la visión de nuestro fundador, quien inició este
                  proyecto con la venta de dispositivos IoT bajo la marca "Simplepack".
                  Con el tiempo, hemos evolucionado significativamente, expandiendo
                  nuestras operaciones y desarrollando nuestro servicio estrella:
                  "Full Service".
                </p>
                <p className="text-muted-foreground">
                  Este servicio integral incluye análisis detallado de proyectos,
                  instalación profesional de equipos y capacitación personalizada
                  para nuestros clientes. Nuestro compromiso con la innovación y la
                  excelencia nos ha permitido contribuir al desarrollo de una sociedad
                  más eficiente y sostenible en Bolivia, mejorando la calidad de vida
                  a través de soluciones domóticas inteligentes.
                </p>
              </CardContent>
            </div>
          </Card>
        </section>

        {/* Team Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member) => (
              <Card key={member.name} className="hover:shadow-lg transition-shadow group p-2">
                <CardContent className="pt-4 flex flex-col items-center text-center">
                  <Avatar className="w-20 h-20 mb-2">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-base font-semibold leading-tight">{member.name}</h3>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Organizational Chart */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Organigrama</h2>
          <div className="relative aspect-[16/9] w-full max-w-4xl mx-auto">
            <Image
              src="/img/organigrama.png"
              alt="Organigrama de Domclicka"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            ¿Por Qué Elegir Domclicka?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="space-y-2">
              <h3 className="font-semibold">✓ Expertos en domótica y tecnología IoT</h3>
              <h3 className="font-semibold">✓ Soluciones personalizadas</h3>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">✓ Compromiso con la eficiencia energética</h3>
              <h3 className="font-semibold">✓ Servicio integral</h3>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
} 
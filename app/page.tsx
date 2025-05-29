"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Activity,
  Bike,
  Dumbbell,
  Heart,
  MessageCircle,
  Play,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
  ChevronRight,
  Bell,
  Search,
  ShoppingCart,
  Waves,
  Mountain,
  User,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { CartDropdown } from "@/components/cart-dropdown"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import carouselIMG1 from "../resources/carouselIMG1.jpg"
import carouselIMG2 from "../resources/carouselIMG2.jpg"
import carouselIMG3 from "../resources/carouselIMG3.webp"
import carouselIMG4 from "../resources/carouselIMG4.webp"
import carouselIMG5 from "../resources/carouselIMG5.avif"
import carouselIMG6 from "../resources/carouselIMG6.webp"
import carouselIMG7 from "../resources/carouselIMG7.avif"

import runningCI from "../resources/running.jpg"
import swimmingCI from "../resources/swimming.jpg"
import outdoorsCI from "../resources/outdoor.jpg"
import crossfitCI from "../resources/Crossfit.jpg"
import fitnessCI from "../resources/fitness2.jpg"
import ciclismCI from "../resources/ciclismo.webp"


export default function ImpulsoSportsHome() {
  const { state, toggleCart } = useCart()
  // In the component, add the notifications functionality to the header
  const [showSearch, setShowSearch] = useState(false)

  // Imágenes para el carrusel del hero
  const heroImages = [
    {
      src: carouselIMG7,
      alt: "Atleta en acción 1",
    },
    {
      src: carouselIMG2,
      alt: "Atleta en acción 2",
    },
    {
      src: carouselIMG3,
      alt: "Atleta en acción 3",
    },
    {
      src: carouselIMG4,
      alt: "Atleta en acción 4",
    },
    {
      src: carouselIMG5,
      alt: "Atleta en acción 5",
    },
    {
      src: carouselIMG6,
      alt: "Atleta en acción 6",
    },
    {
      src: carouselIMG1,
      alt: "Atleta en acción 7",
    },
  ]

  const userDataString = localStorage.getItem('userData')
  const userData = userDataString ? JSON.parse(userDataString) : null

  console.log(userData)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">IMPULSO</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/productos" className="text-white hover:text-orange-400 transition-colors">
                Productos
              </Link>
              <Link href="/categorias" className="text-white hover:text-orange-400 transition-colors">
                Categorías
              </Link>
              <Link href="/comunidad" className="text-white hover:text-orange-400 transition-colors">
                Comunidad
              </Link>
            </nav>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => setShowSearch((prev) => !prev)}
                  aria-label="Buscar"
                >
                  <Search className="w-5 h-5" />
                </Button>
                {showSearch && (
                  <Input
                    autoFocus
                    type="text"
                    placeholder="Buscar productos..."
                    className="absolute right-0 top-12 w-64 bg-black/80 border-white/20 text-white placeholder:text-gray-400 z-50 transition-all"
                    onBlur={() => setShowSearch(false)}
                  />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 relative"
                  onClick={toggleCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {state.itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {state.itemCount}
                    </span>
                  )}
                </Button>
                <CartDropdown />
              </div>
              {!userData ? (
                <Button
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  asChild
                >
                  <Link href="/login">Únete</Link>
                </Button>
              ) : (
                <Link href='/login' className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-lg">
                  <User className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">
                    {userData.usuario.nombre}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* ...existing hero text and buttons... */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  SUPERA TUS
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    {" "}
                    LÍMITES
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Descubre ropa deportiva diseñada para atletas que nunca se rinden. Cada prenda está creada para
                  maximizar tu rendimiento y llevarte más allá.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href='/productos'>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Explorar Productos
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-8 pt-4 ml-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-gray-400">Satisfacción</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-sm text-gray-400">Soporte</div>
                </div>
              </div>
            </div>

            {/* Carrusel de imágenes en vez de imagen fija */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur-3xl opacity-30 animate-pulse" />
              <Carousel className="relative z-10">
                <CarouselContent>
                  {heroImages.map((img, idx) => (
                    <CarouselItem key={idx}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={500}
                        height={600}
                        className="rounded-3xl shadow-2xl object-cover w-full h-[600px]"
                        priority={idx === 0}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías Deportivas */}
      <section id="categorias" className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Encuentra Tu <span className="text-orange-400">Disciplina</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Equipamiento especializado para cada deporte y nivel de intensidad
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: "Running",
                description: "Zapatillas y ropa técnica para corredores",
                color: "from-blue-500 to-cyan-500",
                image: runningCI,
              },
              {
                icon: Bike,
                title: "Ciclismo",
                description: "Equipamiento aerodinámico y cómodo",
                color: "from-green-500 to-emerald-500",
                image: ciclismCI,
              },
              {
                icon: Waves,
                title: "Natacion",
                description: "Equipamiento hidrodinámico de competición",
                color: "from-cyan-500 to-blue-600",
                image: swimmingCI,
              },
              {
                icon: Mountain,
                title: "Outdoor",
                description: "Ropa resistente para entrenamientos intensos",
                color: "from-orange-500 to-red-500",
                image: outdoorsCI,
              },
              {
                icon: Dumbbell,
                title: "CrossFit",
                description: "Equipamiento resistente para aventureros",
                color: "from-purple-500 to-pink-500",
                image: crossfitCI,
              },
              {
                icon: Target,
                title: "Fitness & Gym",
                description: "Ropa cómoda y funcional para el gimnasio",
                color: "from-indigo-500 to-purple-600",
                image: fitnessCI,
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`} />
                  <div className="absolute top-4 left-4">
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-gray-300 mb-4">{category.description}</p>
                  <Link href='/productos'>
                    <Button variant="ghost" className="text-orange-400 hover:text-orange-300 p-0">
                      Explorar <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section id="productos" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Productos <span className="text-orange-400">Destacados</span>
            </h2>
            <p className="text-xl text-gray-300">Lo mejor de nuestra colección para atletas exigentes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Zapatillas IMPULSO Pro",
                price: "$189",
                rating: 4.9,
                image: "/placeholder.svg?height=250&width=200",
                badge: "Bestseller",
              },
              {
                name: "Camiseta Técnica Elite",
                price: "$79",
                rating: 4.8,
                image: "/placeholder.svg?height=250&width=200",
                badge: "Nuevo",
              },
              {
                name: "Shorts de Entrenamiento",
                price: "$65",
                rating: 4.7,
                image: "/placeholder.svg?height=250&width=200",
                badge: "Oferta",
              },
              {
                name: "Chaqueta Cortavientos",
                price: "$129",
                rating: 4.9,
                image: "/placeholder.svg?height=250&width=200",
                badge: "Premium",
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-orange-500 text-white">{product.badge}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-orange-400">{product.price}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-300 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    <Link href="/productos" className="w-full h-full flex items-center justify-center">
                      Ver en productos
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-end mt-8 mr-4">
            <Link
              href="/productos"
              className="text-sky-400 hover:text-white transition-colors font-semibold"
            >
              Ver más productos
            </Link>
          </div>
        </div>
      </section>

      {/* Comunidad */}
      <section id="comunidad" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Únete a la <Link href="/comunidad" className="text-orange-400">Comunidad</Link>
            </h2>
            <p className="text-xl text-gray-300">Conecta con atletas de todo el mundo y comparte tu pasión</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: Users,
                title: "Foro de Atletas",
                description: "Comparte experiencias y consejos con otros deportistas",
                members: "15K+ miembros activos",
              },
              {
                icon: Trophy,
                title: "Desafíos Mensuales",
                description: "Participa en retos y gana premios exclusivos",
                members: "Nuevos desafíos cada mes",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 text-center"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 mb-3">{feature.description}</p>
                  <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
                    {feature.members}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">IMPULSO</span>
              </div>
              <p className="text-gray-400 mb-4">
                Equipamiento deportivo de alta calidad para atletas que nunca se rinden.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Productos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/productos" className="hover:text-orange-400 transition-colors">
                    Running
                  </Link>
                </li>
                <li>
                  <Link href="/productos" className="hover:text-orange-400 transition-colors">
                    Ciclismo
                  </Link>
                </li>
                <li>
                  <Link href="/productos" className="hover:text-orange-400 transition-colors">
                    CrossFit
                  </Link>
                </li>
                <li>
                  <Link href="/productos" className="hover:text-orange-400 transition-colors">
                    Natacion
                  </Link>
                </li>
                <li>
                  <Link href="/productos" className="hover:text-orange-400 transition-colors">
                    Outdors
                  </Link>
                </li>
                <li>
                  <Link href="/productos" className="hover:text-orange-400 transition-colors">
                    Fitnes & Gym
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    Envíos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    Devoluciones
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 IMPULSO Sports. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

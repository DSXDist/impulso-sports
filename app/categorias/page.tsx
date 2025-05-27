"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  Bike,
  Dumbbell,
  Waves,
  Mountain,
  Users,
  Target,
  Zap,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  Award,
  Clock,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Datos de categorías principales
const mainCategories = [
  {
    id: "running",
    name: "Running",
    description: "Conquista cada kilómetro con equipamiento diseñado para corredores apasionados",
    icon: Activity,
    image: "/placeholder.svg?height=400&width=600",
    gradient: "from-blue-500 to-cyan-500",
    stats: { products: 156, athletes: "25K+", avgRating: 4.8 },
    subcategories: [
      { name: "Trail Running", products: 45, image: "/placeholder.svg?height=200&width=300" },
      { name: "Maratón", products: 38, image: "/placeholder.svg?height=200&width=300" },
      { name: "Velocidad", products: 32, image: "/placeholder.svg?height=200&width=300" },
      { name: "Running Urbano", products: 41, image: "/placeholder.svg?height=200&width=300" },
    ],
    featured: ["Zapatillas IMPULSO Pro", "Camisetas Técnicas", "Shorts de Running"],
    benefits: ["Tecnología de amortiguación", "Transpirabilidad máxima", "Durabilidad extrema"],
  },
  {
    id: "ciclismo",
    name: "Ciclismo",
    description: "Pedalea hacia la victoria con gear aerodinámico y de alto rendimiento",
    icon: Bike,
    image: "/placeholder.svg?height=400&width=600",
    gradient: "from-green-500 to-emerald-500",
    stats: { products: 89, athletes: "18K+", avgRating: 4.9 },
    subcategories: [
      { name: "Carretera", products: 28, image: "/placeholder.svg?height=200&width=300" },
      { name: "Montaña", products: 25, image: "/placeholder.svg?height=200&width=300" },
      { name: "Urbano", products: 20, image: "/placeholder.svg?height=200&width=300" },
      { name: "BMX", products: 16, image: "/placeholder.svg?height=200&width=300" },
    ],
    featured: ["Maillots Aerodinámicos", "Culotes de Compresión", "Zapatillas Clipless"],
    benefits: ["Aerodinámica optimizada", "Compresión muscular", "Ventilación estratégica"],
  },
  {
    id: "crossfit",
    name: "CrossFit",
    description: "Supera tus límites con equipamiento para entrenamientos de alta intensidad",
    icon: Dumbbell,
    image: "/placeholder.svg?height=400&width=600",
    gradient: "from-purple-500 to-pink-500",
    stats: { products: 134, athletes: "22K+", avgRating: 4.7 },
    subcategories: [
      { name: "Entrenamiento Funcional", products: 42, image: "/placeholder.svg?height=200&width=300" },
      { name: "Levantamiento", products: 35, image: "/placeholder.svg?height=200&width=300" },
      { name: "Cardio Intenso", products: 31, image: "/placeholder.svg?height=200&width=300" },
      { name: "Competición", products: 26, image: "/placeholder.svg?height=200&width=300" },
    ],
    featured: ["Shorts de Entrenamiento", "Tops de Compresión", "Zapatillas Multideporte"],
    benefits: ["Resistencia extrema", "Flexibilidad total", "Soporte muscular"],
  },
  {
    id: "natacion",
    name: "Natación",
    description: "Domina el agua con equipamiento hidrodinámico de competición",
    icon: Waves,
    image: "/placeholder.svg?height=400&width=600",
    gradient: "from-cyan-500 to-blue-600",
    stats: { products: 67, athletes: "12K+", avgRating: 4.8 },
    subcategories: [
      { name: "Piscina", products: 25, image: "/placeholder.svg?height=200&width=300" },
      { name: "Aguas Abiertas", products: 18, image: "/placeholder.svg?height=200&width=300" },
      { name: "Triatlón", products: 15, image: "/placeholder.svg?height=200&width=300" },
      { name: "Entrenamiento", products: 9, image: "/placeholder.svg?height=200&width=300" },
    ],
    featured: ["Trajes de Baño", "Gafas de Natación", "Gorros Técnicos"],
    benefits: ["Hidrodinámica avanzada", "Secado rápido", "Protección UV"],
  },
  {
    id: "outdoor",
    name: "Outdoor",
    description: "Explora la naturaleza con equipamiento resistente para aventureros",
    icon: Mountain,
    image: "/placeholder.svg?height=400&width=600",
    gradient: "from-orange-500 to-red-500",
    stats: { products: 98, athletes: "15K+", avgRating: 4.6 },
    subcategories: [
      { name: "Senderismo", products: 32, image: "/placeholder.svg?height=200&width=300" },
      { name: "Escalada", products: 24, image: "/placeholder.svg?height=200&width=300" },
      { name: "Camping", products: 22, image: "/placeholder.svg?height=200&width=300" },
      { name: "Aventura", products: 20, image: "/placeholder.svg?height=200&width=300" },
    ],
    featured: ["Chaquetas Impermeables", "Pantalones Técnicos", "Calzado de Montaña"],
    benefits: ["Resistencia al clima", "Durabilidad extrema", "Comodidad prolongada"],
  },
  {
    id: "fitness",
    name: "Fitness & Gym",
    description: "Transforma tu cuerpo con ropa cómoda y funcional para el gimnasio",
    icon: Target,
    image: "/placeholder.svg?height=400&width=600",
    gradient: "from-indigo-500 to-purple-600",
    stats: { products: 112, athletes: "30K+", avgRating: 4.7 },
    subcategories: [
      { name: "Entrenamiento", products: 38, image: "/placeholder.svg?height=200&width=300" },
      { name: "Yoga", products: 28, image: "/placeholder.svg?height=200&width=300" },
      { name: "Pilates", products: 24, image: "/placeholder.svg?height=200&width=300" },
      { name: "Wellness", products: 22, image: "/placeholder.svg?height=200&width=300" },
    ],
    featured: ["Leggings de Yoga", "Tops Deportivos", "Zapatillas de Entrenamiento"],
    benefits: ["Flexibilidad máxima", "Transpirabilidad", "Estilo urbano"],
  },
]

export default function CategoriasPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-white" />
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">IMPULSO</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/productos" className="text-white hover:text-orange-400 transition-colors">
                Productos
              </Link>
              <Link href="/entrenamiento" className="text-white hover:text-orange-400 transition-colors">
                Entrenamiento
              </Link>
              <Link href="/comunidad" className="text-white hover:text-orange-400 transition-colors">
                Comunidad
              </Link>
            </nav>

            <Button
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              asChild
            >
              <Link href="/login">Explorar Todo</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-400">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-white">Categorías</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
            Encuentra Tu
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"> Pasión</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Descubre equipamiento especializado para cada disciplina deportiva. Desde running hasta CrossFit, tenemos
            todo lo que necesitas para alcanzar tus metas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-2">
              🏃‍♂️ 6 Disciplinas Principales
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">🎯 +650 Productos</Badge>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
              ⭐ 4.8 Valoración Promedio
            </Badge>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {mainCategories.map((category, index) => (
            <Card
              key={category.id}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-500 group overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-70`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Category Icon */}
                <div className="absolute top-6 left-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Stats */}
                <div className="absolute top-6 right-6 flex flex-col gap-2">
                  <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30">
                    {category.stats.products} productos
                  </Badge>
                  <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30">
                    {category.stats.athletes} atletas
                  </Badge>
                </div>

                {/* Category Info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-200 mb-4 line-clamp-2">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-white text-sm">{category.stats.avgRating}</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-white text-sm">Popular</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-white/30"
                    >
                      Explorar
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {selectedCategory === category.id && (
                <CardContent className="p-6 space-y-6">
                  {/* Subcategories */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-orange-400" />
                      Subcategorías
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.subcategories.map((sub, subIndex) => (
                        <div
                          key={subIndex}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <Image
                            src={sub.image || "/placeholder.svg"}
                            alt={sub.name}
                            width={50}
                            height={50}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h5 className="text-white font-medium">{sub.name}</h5>
                            <p className="text-sm text-gray-400">{sub.products} productos</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured Products */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-orange-400" />
                      Productos Destacados
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.featured.map((product, productIndex) => (
                        <Badge
                          key={productIndex}
                          variant="outline"
                          className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 cursor-pointer"
                        >
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-orange-400" />
                      Beneficios Clave
                    </h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      {category.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-2 p-2 rounded-lg bg-white/5">
                          <div className="w-2 h-2 bg-orange-400 rounded-full" />
                          <span className="text-sm text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      asChild
                    >
                      <Link href={`/productos?categoria=${category.id}`}>
                        Ver Todos los Productos
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                      <Link href={`/guias/${category.id}`}>Guía de Compra</Link>
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Users, label: "Atletas Activos", value: "125K+", color: "text-blue-400" },
            { icon: Award, label: "Productos Premium", value: "650+", color: "text-orange-400" },
            { icon: Clock, label: "Años de Experiencia", value: "15+", color: "text-green-400" },
            { icon: MapPin, label: "Países", value: "25+", color: "text-purple-400" },
          ].map((stat, index) => (
            <Card key={index} className="bg-white/5 border-white/10 text-center">
              <CardContent className="p-6">
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl p-12 text-center border border-orange-500/20">
          <h2 className="text-3xl font-bold text-white mb-4">¿No encuentras tu disciplina?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Estamos constantemente expandiendo nuestro catálogo. Cuéntanos qué deporte practicas y trabajaremos para
            incluir el equipamiento que necesitas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              Solicitar Categoría
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
              <Link href="/contacto">Contactar Soporte</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

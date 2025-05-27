"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Activity,
  Bike,
  Dumbbell,
  Filter,
  Grid3X3,
  Heart,
  List,
  Search,
  ShoppingCart,
  Star,
  Zap,
  SlidersHorizontal,
  Eye,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { CartDropdown } from "@/components/cart-dropdown"
import { useCart } from "@/contexts/cart-context"

// Mock data para productos
const products = [
  {
    id: 1,
    name: "Zapatillas IMPULSO Pro Runner",
    price: 189,
    originalPrice: 220,
    rating: 4.9,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=250",
    category: "running",
    brand: "IMPULSO",
    colors: ["Negro", "Blanco", "Azul"],
    sizes: ["38", "39", "40", "41", "42", "43"],
    badge: "Bestseller",
    isNew: false,
    inStock: true,
  },
  {
    id: 2,
    name: "Camiseta Técnica Elite Dry-Fit",
    price: 79,
    originalPrice: null,
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=250",
    category: "running",
    brand: "IMPULSO",
    colors: ["Negro", "Gris", "Azul", "Rojo"],
    sizes: ["S", "M", "L", "XL"],
    badge: "Nuevo",
    isNew: true,
    inStock: true,
  },
  {
    id: 3,
    name: "Shorts de Entrenamiento CrossFit",
    price: 65,
    originalPrice: 85,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=250",
    category: "crossfit",
    brand: "IMPULSO",
    colors: ["Negro", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    badge: "Oferta",
    isNew: false,
    inStock: true,
  },
  {
    id: 4,
    name: "Maillot Ciclismo Aerodinámico",
    price: 129,
    originalPrice: null,
    rating: 4.9,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=250",
    category: "ciclismo",
    brand: "IMPULSO",
    colors: ["Negro", "Azul", "Verde"],
    sizes: ["S", "M", "L", "XL"],
    badge: "Premium",
    isNew: false,
    inStock: true,
  },
  {
    id: 5,
    name: "Chaqueta Cortavientos Running",
    price: 149,
    originalPrice: null,
    rating: 4.6,
    reviews: 123,
    image: "/placeholder.svg?height=300&width=250",
    category: "running",
    brand: "IMPULSO",
    colors: ["Negro", "Gris", "Azul"],
    sizes: ["S", "M", "L", "XL"],
    badge: null,
    isNew: false,
    inStock: true,
  },
  {
    id: 6,
    name: "Leggings Compresión Mujer",
    price: 95,
    originalPrice: 120,
    rating: 4.8,
    reviews: 201,
    image: "/placeholder.svg?height=300&width=250",
    category: "crossfit",
    brand: "IMPULSO",
    colors: ["Negro", "Gris", "Morado"],
    sizes: ["XS", "S", "M", "L"],
    badge: "Oferta",
    isNew: false,
    inStock: true,
  },
  {
    id: 7,
    name: "Zapatillas Ciclismo Pro",
    price: 299,
    originalPrice: null,
    rating: 4.9,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=250",
    category: "ciclismo",
    brand: "IMPULSO",
    colors: ["Negro", "Blanco"],
    sizes: ["38", "39", "40", "41", "42", "43"],
    badge: "Premium",
    isNew: true,
    inStock: false,
  },
  {
    id: 8,
    name: "Top Deportivo Mujer",
    price: 55,
    originalPrice: null,
    rating: 4.7,
    reviews: 178,
    image: "/placeholder.svg?height=300&width=250",
    category: "crossfit",
    brand: "IMPULSO",
    colors: ["Negro", "Blanco", "Rosa", "Azul"],
    sizes: ["XS", "S", "M", "L"],
    badge: null,
    isNew: false,
    inStock: true,
  },
]

const categories = [
  { id: "running", name: "Running", icon: Activity, count: 156 },
  { id: "ciclismo", name: "Ciclismo", icon: Bike, count: 89 },
  { id: "crossfit", name: "CrossFit", icon: Dumbbell, count: 134 },
]

const brands = ["IMPULSO", "Nike", "Adidas", "Under Armour", "Puma"]

export default function ProductosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const { state, toggleCart, addItem } = useCart()

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.isNew ? 1 : -1
      default:
        return b.reviews - a.reviews
    }
  })

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="w-5 h-5 text-white" />
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">IMPULSO</span>
              </Link>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
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
              <Button
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                asChild
              >
                <Link href="/login">Únete</Link>
              </Button>
            </div>
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
          <span className="text-white">Productos</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Nuestros <span className="text-orange-400">Productos</span>
            </h1>
            <p className="text-gray-300">
              Descubre equipamiento deportivo de alta calidad para llevar tu rendimiento al siguiente nivel
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-orange-500 hover:bg-orange-600" : "text-white hover:bg-white/10"}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-orange-500 hover:bg-orange-600" : "text-white hover:bg-white/10"}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Más Popular</SelectItem>
                <SelectItem value="newest">Más Nuevo</SelectItem>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="rating">Mejor Valorado</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-white/20 text-white hover:bg-white/10 lg:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`w-80 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filtros
                </h3>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">Categorías</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedCategory === category.id
                            ? "bg-orange-500/20 border border-orange-500/30"
                            : "hover:bg-white/5"
                        }`}
                        onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <category.icon className="w-5 h-5 text-orange-400" />
                          <span className="text-white">{category.name}</span>
                        </div>
                        <Badge variant="secondary" className="bg-white/10 text-gray-300">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">Rango de Precio</h4>
                  <div className="space-y-4">
                    <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="w-full" />
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">Marcas</h4>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <label htmlFor={brand} className="text-white cursor-pointer flex-1">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-black hover:bg-white/10"
                  onClick={() => {
                    setSelectedCategory(null)
                    setSelectedBrands([])
                    setPriceRange([0, 500])
                    setSearchTerm("")
                  }}
                >
                  Limpiar Filtros
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-300">
                Mostrando {sortedProducts.length} de {products.length} productos
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={250}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.badge && (
                          <Badge
                            className={`
                            ${product.badge === "Bestseller" ? "bg-orange-500" : ""}
                            ${product.badge === "Nuevo" ? "bg-green-500" : ""}
                            ${product.badge === "Oferta" ? "bg-red-500" : ""}
                            ${product.badge === "Premium" ? "bg-purple-500" : ""}
                            text-white
                          `}
                          >
                            {product.badge}
                          </Badge>
                        )}
                        {!product.inStock && (
                          <Badge variant="secondary" className="bg-gray-500 text-white">
                            Agotado
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="bg-white/20 backdrop-blur-md hover:bg-white/30"
                          onClick={() => toggleFavorite(product.id)}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-white"
                            }`}
                          />
                        </Button>
                        <Button size="icon" variant="ghost" className="bg-white/20 backdrop-blur-md hover:bg-white/30">
                          <Eye className="w-4 h-4 text-white" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-white mb-2 line-clamp-2">{product.name}</h3>

                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-400"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-300 ml-2">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-400">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50"
                        disabled={!product.inStock}
                        onClick={() => {
                          if (product.inStock) {
                            addItem({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              originalPrice: product.originalPrice ?? undefined,
                              image: product.image,
                              category: product.category,
                              brand: product.brand,
                              inStock: product.inStock,
                            })
                          }
                        }}
                      >
                        {product.inStock ? (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Agregar al Carrito
                          </>
                        ) : (
                          "Agotado"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="relative w-32 h-32 flex-shrink-0">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                          {product.badge && (
                            <Badge className="absolute top-1 left-1 text-xs bg-orange-500 text-white">
                              {product.badge}
                            </Badge>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-white hover:bg-white/10"
                              onClick={() => toggleFavorite(product.id)}
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""
                                }`}
                              />
                            </Button>
                          </div>

                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-400"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-300 ml-2">
                              {product.rating} ({product.reviews} reseñas)
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-orange-400">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                              )}
                            </div>

                            <div className="flex items-center space-x-2">
                              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                <Eye className="w-4 h-4 mr-2" />
                                Ver Detalles
                              </Button>
                              <Button
                                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50"
                                disabled={!product.inStock}
                                onClick={() => {
                                  if (product.inStock) {
                                    addItem({
                                      id: product.id,
                                      name: product.name,
                                      price: product.price,
                                      originalPrice: product.originalPrice ?? undefined,
                                      image: product.image,
                                      category: product.category,
                                      brand: product.brand,
                                      inStock: product.inStock,
                                    })
                                  }
                                }}
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                {product.inStock ? "Agregar" : "Agotado"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No se encontraron productos</h3>
                <p className="text-gray-400 mb-4">Intenta ajustar tus filtros o términos de búsqueda</p>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => {
                    setSelectedCategory(null)
                    setSelectedBrands([])
                    setPriceRange([0, 500])
                    setSearchTerm("")
                  }}
                >
                  Limpiar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

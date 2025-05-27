"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  Zap,
  CreditCard,
  Truck,
  Shield,
  Tag,
  Gift,
  Heart,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CarritoPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const shipping = 15
  const tax = state.total * 0.1 // 10% tax
  const discount = 0 // Could be calculated based on coupon
  const finalTotal = state.total + shipping + tax - discount

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsCheckingOut(false)
    // Here you would integrate with payment processor
  }

  const applyCoupon = () => {
    // Coupon logic would go here
    console.log("Applying coupon:", couponCode)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/productos" className="flex items-center space-x-2">
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
              <Link href="/categorias" className="text-white hover:text-orange-400 transition-colors">
                Categorías
              </Link>
              <Link href="/comunidad" className="text-white hover:text-orange-400 transition-colors">
                Comunidad
              </Link>
            </nav>

            <Button
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              asChild
            >
              <Link href="/login">Únete</Link>
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
          <Link href="/productos" className="hover:text-orange-400">
            Productos
          </Link>
          <span>/</span>
          <span className="text-white">Carrito</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Tu <span className="text-orange-400">Carrito</span>
          </h1>
          <p className="text-gray-300">
            {state.itemCount > 0
              ? `${state.itemCount} ${state.itemCount === 1 ? "producto" : "productos"} en tu carrito`
              : "Tu carrito está vacío"}
          </p>
        </div>

        {state.items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Descubre nuestros productos deportivos de alta calidad y comienza a construir tu equipamiento perfecto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                asChild
              >
                <Link href="/productos">Explorar Productos</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                <Link href="/categorias">Ver Categorías</Link>
              </Button>
            </div>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Productos en tu carrito</h2>
                  <Button variant="ghost" size="sm" onClick={clearCart} className="text-gray-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Vaciar carrito
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {state.items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}-${item.color}`}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="rounded-lg object-cover"
                        />
                        {item.originalPrice && (
                          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">Oferta</Badge>
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div>
                          <h3 className="text-white font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-400">{item.brand}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            {item.size && <span>Talla: {item.size}</span>}
                            {item.color && <span>Color: {item.color}</span>}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-orange-400">${item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">${item.originalPrice}</span>
                            )}
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-400 hover:text-white"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-400 hover:text-white"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-400 hover:text-red-400"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>

                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-white font-semibold">
                            Subtotal: ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Coupon */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-orange-400" />
                    Código de descuento
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ingresa tu código"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    />
                    <Button
                      onClick={applyCoupon}
                      variant="outline"
                      className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                    >
                      Aplicar
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Gift className="w-4 h-4" />
                    <span>¿Tienes una tarjeta regalo?</span>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white">Resumen del pedido</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-white">
                      <span>Subtotal ({state.itemCount} productos)</span>
                      <span>${state.total.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-white">
                      <span className="flex items-center">
                        <Truck className="w-4 h-4 mr-2 text-green-400" />
                        Envío
                      </span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-white">
                      <span>Impuestos</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Descuento</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-white/20" />

                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span className="text-orange-400">${finalTotal.toFixed(2)}</span>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg py-6"
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Procesando...</span>
                        </div>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          Proceder al pago
                        </>
                      )}
                    </Button>

                    <Button variant="outline" className="w-full border-white/20 text-black hover:bg-white/10" asChild>
                      <Link href="/productos">Seguir comprando</Link>
                    </Button>
                  </div>

                  <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 pt-4">
                    <Shield className="w-4 h-4" />
                    <span>Compra 100% segura y protegida</span>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4 space-y-3">
                  {[
                    { icon: Truck, text: "Envío gratis en pedidos +$100" },
                    { icon: Shield, text: "Garantía de 30 días" },
                    { icon: CreditCard, text: "Pago seguro SSL" },
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm text-gray-300">
                      <benefit.icon className="w-4 h-4 text-green-400" />
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

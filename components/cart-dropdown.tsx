"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CartDropdown() {
  const { state, updateQuantity, removeItem, setCartOpen } = useCart()

  if (!state.isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Overlay for mobile */}
      <div className="fixed inset-0 bg-black/50 lg:hidden" onClick={() => setCartOpen(false)} />

      {/* Cart dropdown */}
      <Card className="absolute right-0 top-full mt-2 w-96 max-w-[90vw] bg-slate-900/95 backdrop-blur-md border-white/20 shadow-2xl lg:w-96">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Carrito ({state.itemCount})
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCartOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {state.items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Tu carrito está vacío</p>
              <Button
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                onClick={() => setCartOpen(false)}
                asChild
              >
                <Link href="/productos">Explorar Productos</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="max-h-64 overflow-y-auto space-y-3">
                {state.items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5"
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-lg object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        {item.size && <span>Talla: {item.size}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-orange-400 font-semibold">${item.price}</span>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400 hover:text-white"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400 hover:text-white"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400 hover:text-red-400"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-white/20" />

              {/* Total */}
              <div className="space-y-2">
                <div className="flex justify-between text-white">
                  <span>Subtotal:</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Envío:</span>
                  <span>Calculado en checkout</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  onClick={() => setCartOpen(false)}
                  asChild
                >
                  <Link href="/carrito">Ver Carrito Completo</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-black hover:bg-white/10"
                  onClick={() => setCartOpen(false)}
                  asChild
                >
                  <Link href="/productos">Seguir Comprando</Link>
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

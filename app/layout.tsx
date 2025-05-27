import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { NotificationsProvider } from "@/contexts/notifications-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IMPULSO Sports - Supera Tus Límites",
  description: "Equipamiento deportivo de alta calidad para atletas que nunca se rinden",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <CartProvider>
          <NotificationsProvider>{children}</NotificationsProvider>
        </CartProvider>
      </body>
    </html>
  )
}

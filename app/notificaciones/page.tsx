"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Trash2,
  Settings,
  Filter,
  Search,
  Package,
  Users,
  Dumbbell,
  Tag,
  AlertCircle,
  Trophy,
  Zap,
  ArrowLeft,
  Clock,
  ExternalLink,
  MoreVertical,
  Archive,
  Star,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useNotifications } from "@/contexts/notifications-context"

const notificationIcons = {
  order: Package,
  community: Users,
  training: Dumbbell,
  promotion: Tag,
  system: AlertCircle,
  achievement: Trophy,
}

const notificationColors = {
  order: "text-blue-400",
  community: "text-green-400",
  training: "text-purple-400",
  promotion: "text-orange-400",
  system: "text-gray-400",
  achievement: "text-yellow-400",
}

const priorityColors = {
  low: "border-l-gray-400",
  medium: "border-l-orange-400",
  high: "border-l-red-400",
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "Hace un momento"
  if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} min`
  if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} h`
  if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`
  return date.toLocaleDateString()
}

export default function NotificacionesPage() {
  const { state, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications, setFilter } = useNotifications()

  const [searchTerm, setSearchTerm] = useState("")
  const [notificationSettings, setNotificationSettings] = useState({
    orders: true,
    community: true,
    training: true,
    promotions: false,
    system: true,
    achievements: true,
    email: true,
    push: true,
    sms: false,
  })

  const filteredNotifications = state.notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      state.filter === "all" || (state.filter === "unread" && !notification.read) || notification.type === state.filter

    return matchesSearch && matchesFilter
  })

  const getFilterCount = (filter: string) => {
    if (filter === "all") return state.notifications.length
    if (filter === "unread") return state.unreadCount
    return state.notifications.filter((n) => n.type === filter).length
  }

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
          <span className="text-white">Notificaciones</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
              <Bell className="w-8 h-8 mr-3 text-orange-400" />
              Notificaciones
              {state.unreadCount > 0 && (
                <Badge className="ml-3 bg-orange-500 text-white">{state.unreadCount} nuevas</Badge>
              )}
            </h1>
            <p className="text-gray-300">Mantente al día con todas las novedades de tu cuenta y la comunidad</p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {state.unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={markAllAsRead}
                className="border-white/20 text-black hover:bg-white/10"
              >
                <CheckCheck className="w-4 h-4 mr-2" />
                Marcar todas como leídas
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-white/20 text-black hover:bg-white/10">
                  <MoreVertical className="w-4 h-4 mr-2" />
                  Más acciones
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-800 border-white/20">
                <DropdownMenuItem onClick={clearAllNotifications} className="text-red-400">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar todas
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem>
                  <Archive className="w-4 h-4 mr-2" />
                  Archivar leídas
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs value="notifications" className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 bg-white/5 border border-white/10">
            <TabsTrigger value="notifications" className="data-[state=active]:bg-orange-500">
              <Bell className="w-4 h-4 mr-2" />
              Notificaciones
            </TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <Card className="bg-white/5 border-white/10 sticky top-24">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Filter className="w-5 h-5 mr-2" />
                      Filtros
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Buscar notificaciones..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* Filter Options */}
                    <div className="space-y-2">
                      {[
                        { id: "all", label: "Todas", icon: Bell },
                        { id: "unread", label: "No leídas", icon: BellOff },
                        { id: "order", label: "Pedidos", icon: Package },
                        { id: "community", label: "Comunidad", icon: Users },
                        { id: "training", label: "Entrenamiento", icon: Dumbbell },
                        { id: "promotion", label: "Promociones", icon: Tag },
                        { id: "achievement", label: "Logros", icon: Trophy },
                        { id: "system", label: "Sistema", icon: AlertCircle },
                      ].map((filter) => (
                        <button
                          key={filter.id}
                          onClick={() => setFilter(filter.id as any)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                            state.filter === filter.id
                              ? "bg-orange-500/20 border border-orange-500/30"
                              : "hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <filter.icon className="w-4 h-4 text-orange-400" />
                            <span className="text-white">{filter.label}</span>
                          </div>
                          <Badge variant="secondary" className="bg-white/10 text-gray-300">
                            {getFilterCount(filter.id)}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Notifications List */}
              <div className="lg:col-span-3">
                {state.isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Card key={i} className="bg-white/5 border-white/10">
                        <CardContent className="p-6">
                          <div className="animate-pulse">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-white/10 rounded-full" />
                              <div className="flex-1 space-y-2">
                                <div className="h-4 bg-white/10 rounded w-3/4" />
                                <div className="h-3 bg-white/10 rounded w-1/2" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : filteredNotifications.length === 0 ? (
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-12 text-center">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bell className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">No hay notificaciones</h3>
                      <p className="text-gray-400">
                        {state.filter === "unread"
                          ? "¡Genial! No tienes notificaciones sin leer."
                          : "No se encontraron notificaciones que coincidan con tu búsqueda."}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredNotifications.map((notification) => {
                      const IconComponent = notificationIcons[notification.type]
                      const iconColor = notificationColors[notification.type]
                      const priorityColor = priorityColors[notification.priority]

                      return (
                        <Card
                          key={notification.id}
                          className={`bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 border-l-4 ${priorityColor} ${
                            !notification.read ? "ring-1 ring-orange-500/30" : ""
                          }`}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              {/* Icon */}
                              <div className="flex-shrink-0">
                                {notification.image ? (
                                  <Avatar className="w-12 h-12">
                                    <AvatarImage src={notification.image || "/placeholder.svg"} />
                                    <AvatarFallback>
                                      <IconComponent className={`w-6 h-6 ${iconColor}`} />
                                    </AvatarFallback>
                                  </Avatar>
                                ) : (
                                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                    <IconComponent className={`w-6 h-6 ${iconColor}`} />
                                  </div>
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <h4
                                      className={`font-semibold ${notification.read ? "text-gray-300" : "text-white"}`}
                                    >
                                      {notification.title}
                                    </h4>
                                    {!notification.read && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <Badge
                                      variant="outline"
                                      className="border-white/20 text-gray-300 capitalize text-xs"
                                    >
                                      {notification.type}
                                    </Badge>

                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 text-gray-400 hover:text-white"
                                        >
                                          <MoreVertical className="w-4 h-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end" className="bg-slate-800 border-white/20">
                                        {!notification.read && (
                                          <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                            <Check className="w-4 h-4 mr-2" />
                                            Marcar como leída
                                          </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem>
                                          <Star className="w-4 h-4 mr-2" />
                                          Marcar como importante
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-white/20" />
                                        <DropdownMenuItem
                                          onClick={() => deleteNotification(notification.id)}
                                          className="text-red-400"
                                        >
                                          <Trash2 className="w-4 h-4 mr-2" />
                                          Eliminar
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>

                                <p className={`mb-3 ${notification.read ? "text-gray-400" : "text-gray-300"}`}>
                                  {notification.message}
                                </p>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                                    <span className="flex items-center">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {formatTimeAgo(notification.timestamp)}
                                    </span>

                                    {notification.priority === "high" && (
                                      <Badge className="bg-red-500/20 text-red-400 text-xs">Alta prioridad</Badge>
                                    )}
                                  </div>

                                  {notification.actionUrl && (
                                    <Button
                                      size="sm"
                                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                      asChild
                                    >
                                      <Link href={notification.actionUrl}>
                                        {notification.actionText || "Ver más"}
                                        <ExternalLink className="w-3 h-3 ml-2" />
                                      </Link>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <h3 className="text-xl font-semibold text-white">Preferencias de Notificaciones</h3>
                <p className="text-gray-400">Personaliza qué notificaciones quieres recibir y cómo</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Notification Types */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Tipos de Notificaciones</h4>
                  <div className="space-y-4">
                    {[
                      { key: "orders", label: "Pedidos y envíos", description: "Actualizaciones sobre tus pedidos" },
                      {
                        key: "community",
                        label: "Actividad de la comunidad",
                        description: "Nuevas publicaciones y comentarios",
                      },
                      {
                        key: "training",
                        label: "Recordatorios de entrenamiento",
                        description: "Rutinas y objetivos programados",
                      },
                      {
                        key: "promotions",
                        label: "Ofertas y promociones",
                        description: "Descuentos y ofertas especiales",
                      },
                      {
                        key: "system",
                        label: "Actualizaciones del sistema",
                        description: "Mantenimiento y nuevas funciones",
                      },
                      {
                        key: "achievements",
                        label: "Logros y desafíos",
                        description: "Progreso en desafíos y nuevos logros",
                      },
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                        <div>
                          <h5 className="text-white font-medium">{setting.label}</h5>
                          <p className="text-sm text-gray-400">{setting.description}</p>
                        </div>
                        <Switch
                          checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                          onCheckedChange={(checked) =>
                            setNotificationSettings((prev) => ({ ...prev, [setting.key]: checked }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-white/20" />

                {/* Delivery Methods */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Métodos de Entrega</h4>
                  <div className="space-y-4">
                    {[
                      { key: "email", label: "Email", description: "Recibir notificaciones por correo electrónico" },
                      {
                        key: "push",
                        label: "Notificaciones push",
                        description: "Notificaciones en tiempo real en la app",
                      },
                      { key: "sms", label: "SMS", description: "Mensajes de texto para notificaciones importantes" },
                    ].map((method) => (
                      <div key={method.key} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                        <div>
                          <h5 className="text-white font-medium">{method.label}</h5>
                          <p className="text-sm text-gray-400">{method.description}</p>
                        </div>
                        <Switch
                          checked={notificationSettings[method.key as keyof typeof notificationSettings]}
                          onCheckedChange={(checked) =>
                            setNotificationSettings((prev) => ({ ...prev, [method.key]: checked }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-white/20" />

                {/* Quiet Hours */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Horario Silencioso</h4>
                  <p className="text-gray-400 mb-4">
                    No recibir notificaciones durante estas horas (excepto las urgentes)
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quiet-start" className="text-white">
                        Desde
                      </Label>
                      <input
                        id="quiet-start"
                        type="time"
                        defaultValue="22:00"
                        className="w-full mt-1 p-2 bg-white/5 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quiet-end" className="text-white">
                        Hasta
                      </Label>
                      <input
                        id="quiet-end"
                        type="time"
                        defaultValue="08:00"
                        className="w-full mt-1 p-2 bg-white/5 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Guardar Configuración
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

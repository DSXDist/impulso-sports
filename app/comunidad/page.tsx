"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MessageCircle,
  Trophy,
  Target,
  Calendar,
  Heart,
  Share2,
  Plus,
  Search,
  Zap,
  ArrowLeft,
  TrendingUp,
  Award,
  ChevronRight,
  Camera,
  Video,
  MessageSquare,
  Send,
  Crown,
  Activity,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data para la comunidad
const communityStats = {
  totalMembers: "125,847",
  activeToday: "8,234",
  postsToday: "1,456",
  challengesActive: 12,
}

const featuredMembers = [
  {
    id: 1,
    name: "María González",
    title: "Maratonista Elite",
    avatar: "/placeholder.svg?height=60&width=60",
    badge: "🏃‍♀️ Runner Pro",
    achievements: 45,
    followers: "12.5K",
    sport: "running",
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    title: "CrossFit Champion",
    avatar: "/placeholder.svg?height=60&width=60",
    badge: "💪 Beast Mode",
    achievements: 38,
    followers: "9.8K",
    sport: "crossfit",
  },
  {
    id: 3,
    name: "Ana Martín",
    title: "Ciclista de Montaña",
    avatar: "/placeholder.svg?height=60&width=60",
    badge: "🚵‍♀️ Trail Queen",
    achievements: 52,
    followers: "15.2K",
    sport: "ciclismo",
  },
]

const recentPosts = [
  {
    id: 1,
    author: {
      name: "Diego Fernández",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "🏃‍♂️ Runner",
    },
    content:
      "¡Acabo de completar mi primer maratón en 3:45! Gracias a toda la comunidad por el apoyo y consejos. Las zapatillas IMPULSO Pro fueron increíbles. 🏃‍♂️💨",
    image: "/placeholder.svg?height=300&width=500",
    timestamp: "hace 2 horas",
    likes: 234,
    comments: 45,
    shares: 12,
    category: "logro",
  },
  {
    id: 2,
    author: {
      name: "Laura Sánchez",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "💪 CrossFitter",
    },
    content:
      "Rutina de CrossFit para principiantes que estoy probando esta semana. ¿Alguien se anima a hacerla conmigo? 💪",
    timestamp: "hace 4 horas",
    likes: 156,
    comments: 28,
    shares: 8,
    category: "entrenamiento",
  },
  {
    id: 3,
    author: {
      name: "Roberto Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "🚴‍♂️ Cyclist",
    },
    content:
      "Ruta épica por la montaña este fin de semana. 85km de pura adrenalina. ¿Quién se apunta para la próxima? 🚵‍♂️",
    image: "/placeholder.svg?height=300&width=500",
    timestamp: "hace 6 horas",
    likes: 189,
    comments: 32,
    shares: 15,
    category: "aventura",
  },
]

const activeGroups = [
  {
    id: 1,
    name: "Runners Madrid",
    members: 2847,
    image: "/placeholder.svg?height=80&width=80",
    description: "Grupo de corredores de Madrid para entrenamientos grupales",
    nextEvent: "Entrenamiento intervalos - Mañana 7:00 AM",
    category: "running",
  },
  {
    id: 2,
    name: "CrossFit Warriors",
    members: 1923,
    image: "/placeholder.svg?height=80&width=80",
    description: "Comunidad de CrossFit para compartir WODs y técnicas",
    nextEvent: "WOD Challenge - Viernes 6:00 PM",
    category: "crossfit",
  },
  {
    id: 3,
    name: "Ciclistas Barcelona",
    members: 3156,
    image: "/placeholder.svg?height=80&width=80",
    description: "Rutas en bici por Barcelona y alrededores",
    nextEvent: "Ruta costera - Sábado 8:00 AM",
    category: "ciclismo",
  },
]

const activeChallenges = [
  {
    id: 1,
    title: "Desafío 10K Enero",
    description: "Corre 10km todos los días de enero",
    participants: 5847,
    daysLeft: 12,
    prize: "Zapatillas IMPULSO Pro",
    progress: 65,
    category: "running",
  },
  {
    id: 2,
    title: "100 Burpees Challenge",
    description: "100 burpees diarios durante 30 días",
    participants: 3421,
    daysLeft: 18,
    prize: "Kit de Entrenamiento",
    progress: 40,
    category: "crossfit",
  },
  {
    id: 3,
    title: "500km en Bici",
    description: "Pedalea 500km este mes",
    participants: 2156,
    daysLeft: 8,
    prize: "Maillot Premium",
    progress: 78,
    category: "ciclismo",
  },
]

export default function ComunidadPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [newPost, setNewPost] = useState("")
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
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
              <Link href="/entrenamiento" className="text-white hover:text-orange-400 transition-colors">
                Entrenamiento
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Search className="w-5 h-5" />
              </Button>
              <Button
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                asChild
              >
                <Link href="/login">Unirse</Link>
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
          <span className="text-white">Comunidad</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
            Únete a la
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              {" "}
              Comunidad
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Conecta con atletas de todo el mundo, comparte tus logros, participa en desafíos y encuentra la motivación
            que necesitas para superar tus límites.
          </p>

          {/* Community Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Miembros Totales", value: communityStats.totalMembers, icon: Users, color: "text-blue-400" },
              { label: "Activos Hoy", value: communityStats.activeToday, icon: Activity, color: "text-green-400" },
              { label: "Posts Hoy", value: communityStats.postsToday, icon: MessageCircle, color: "text-orange-400" },
              {
                label: "Desafíos Activos",
                value: communityStats.challengesActive,
                icon: Trophy,
                color: "text-purple-400",
              },
            ].map((stat, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="p-4 text-center">
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
            <TabsTrigger value="feed" className="data-[state=active]:bg-orange-500">
              <MessageCircle className="w-4 h-4 mr-2" />
              Feed
            </TabsTrigger>
            
            <TabsTrigger value="desafios" className="data-[state=active]:bg-orange-500">
              <Trophy className="w-4 h-4 mr-2" />
              Desafíos
            </TabsTrigger>
            <TabsTrigger value="eventos" className="data-[state=active]:bg-orange-500">
              <Calendar className="w-4 h-4 mr-2" />
              Eventos
            </TabsTrigger>
            
          </TabsList>

          {/* Feed Tab */}
          <TabsContent value="feed" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                {/* Create Post */}
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>TU</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-4">
                        <Textarea
                          placeholder="¿Qué logro quieres compartir hoy?"
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 resize-none"
                          rows={3}
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                              <Camera className="w-4 h-4 mr-2" />
                              Foto
                            </Button>
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                              <Video className="w-4 h-4 mr-2" />
                              Video
                            </Button>
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                              <Target className="w-4 h-4 mr-2" />
                              Logro
                            </Button>
                          </div>
                          <Button
                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                            disabled={!newPost.trim()}
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Publicar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts */}
                {recentPosts.map((post) => (
                  <Card key={post.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <Avatar>
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {post.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-white">{post.author.name}</h4>
                            <Badge className="bg-orange-500/20 text-orange-400 text-xs">{post.author.badge}</Badge>
                          </div>
                          <p className="text-sm text-gray-400">{post.timestamp}</p>
                        </div>
                        <Badge variant="outline" className="border-white/20 text-gray-300 capitalize">
                          {post.category}
                        </Badge>
                      </div>

                      <p className="text-white mb-4">{post.content}</p>

                      {post.image && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt="Post image"
                            width={500}
                            height={300}
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center space-x-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`text-gray-400 hover:text-white ${likedPosts.includes(post.id) ? "text-red-400" : ""}`}
                            onClick={() => toggleLike(post.id)}
                          >
                            <Heart className={`w-4 h-4 mr-2 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                            {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Share2 className="w-4 h-4 mr-2" />
                            {post.shares}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Featured Members */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Crown className="w-5 h-5 mr-2 text-yellow-400" />
                      Atletas Destacados
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {featuredMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Avatar>
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-sm">{member.name}</h4>
                          <p className="text-xs text-gray-400">{member.title}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className="bg-orange-500/20 text-orange-400 text-xs">{member.badge}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Trending Topics */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                      Tendencias
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { tag: "#MaratonMadrid2024", posts: "1.2K posts" },
                      { tag: "#CrossFitChallenge", posts: "856 posts" },
                      { tag: "#CiclistasUnidos", posts: "634 posts" },
                      { tag: "#RunningTips", posts: "423 posts" },
                    ].map((trend, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <div>
                          <p className="text-orange-400 font-medium text-sm">{trend.tag}</p>
                          <p className="text-xs text-gray-400">{trend.posts}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Grupos Tab */}
          <TabsContent value="grupos" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Grupos Activos</h2>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Plus className="w-4 h-4 mr-2" />
                Crear Grupo
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeGroups.map((group) => (
                <Card
                  key={group.id}
                  className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <Image
                        src={group.image || "/placeholder.svg"}
                        alt={group.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{group.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">{group.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {group.members.toLocaleString()} miembros
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3 mb-4">
                      <p className="text-sm text-white mb-1">Próximo evento:</p>
                      <p className="text-xs text-orange-400">{group.nextEvent}</p>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      Unirse al Grupo
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Desafíos Tab */}
          <TabsContent value="desafios" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Desafíos Activos</h2>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Plus className="w-4 h-4 mr-2" />
                Crear Desafío
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeChallenges.map((challenge) => (
                <Card key={challenge.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">{challenge.title}</h3>
                        <p className="text-sm text-gray-400 mb-3">{challenge.description}</p>
                      </div>
                      <Badge className="bg-orange-500/20 text-orange-400">{challenge.daysLeft} días</Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Progreso</span>
                        <span className="text-white">{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${challenge.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4 text-sm">
                      <span className="text-gray-400 flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {challenge.participants.toLocaleString()} participantes
                      </span>
                      <span className="text-orange-400 flex items-center">
                        <Trophy className="w-4 h-4 mr-1" />
                        {challenge.prize}
                      </span>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      Unirse al Desafío
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Eventos Tab */}
          <TabsContent value="eventos" className="space-y-6">
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Próximamente</h3>
              <p className="text-gray-400 mb-6">Estamos preparando eventos increíbles para la comunidad</p>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                Notificarme
              </Button>
            </div>
          </TabsContent>

          {/* Atletas Tab */}
          <TabsContent value="atletas" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMembers.map((member) => (
                <Card key={member.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{member.title}</p>
                    <Badge className="bg-orange-500/20 text-orange-400 mb-4">{member.badge}</Badge>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-white">{member.achievements}</div>
                        <div className="text-xs text-gray-400">Logros</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">{member.followers}</div>
                        <div className="text-xs text-gray-400">Seguidores</div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      Seguir
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

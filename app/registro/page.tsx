"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Zap,
  ArrowLeft,
  Chrome,
  Facebook,
  Apple,
  UserPlus,
  Shield,
  Check,
  Activity,
  Target,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const deportes = [
  { value: "running", label: "Running", icon: "🏃‍♂️" },
  { value: "ciclismo", label: "Ciclismo", icon: "🚴‍♂️" },
  { value: "crossfit", label: "CrossFit", icon: "💪" },
  { value: "natacion", label: "Natación", icon: "🏊‍♂️" },
  { value: "fitness", label: "Fitness", icon: "🏋️‍♂️" },
  { value: "outdoor", label: "Outdoor", icon: "🏔️" },
]

const niveles = [
  { value: "principiante", label: "Principiante", description: "Empezando mi viaje deportivo" },
  { value: "intermedio", label: "Intermedio", description: "Tengo experiencia regular" },
  { value: "avanzado", label: "Avanzado", description: "Atleta experimentado" },
  { value: "elite", label: "Elite", description: "Competidor profesional" },
]

const objetivos = [
  { value: "perdida-peso", label: "Pérdida de peso", icon: "⚖️" },
  { value: "ganancia-muscular", label: "Ganancia muscular", icon: "💪" },
  { value: "resistencia", label: "Mejorar resistencia", icon: "🫁" },
  { value: "competicion", label: "Competir", icon: "🏆" },
  { value: "bienestar", label: "Bienestar general", icon: "😊" },
  { value: "rehabilitacion", label: "Rehabilitación", icon: "🩺" },
]

export default function RegistroPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Paso 1: Información básica
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptMarketing: false,

    // Paso 2: Perfil deportivo
    deporteFavorito: "",
    nivel: "",
    objetivos: [] as string[],
    experiencia: "",

    // Paso 3: Preferencias
    ubicacion: "",
    fechaNacimiento: "",
    genero: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const toggleObjetivo = (objetivo: string) => {
    const newObjetivos = formData.objetivos.includes(objetivo)
      ? formData.objetivos.filter((o) => o !== objetivo)
      : [...formData.objetivos, objetivo]
    handleInputChange("objetivos", newObjetivos)
  }

  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {}

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "El nombre es requerido"
      if (!formData.lastName) newErrors.lastName = "El apellido es requerido"
      if (!formData.email) {
        newErrors.email = "El email es requerido"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email inválido"
      }
      if (!formData.password) {
        newErrors.password = "La contraseña es requerida"
      } else if (formData.password.length < 8) {
        newErrors.password = "La contraseña debe tener al menos 8 caracteres"
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden"
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = "Debes aceptar los términos y condiciones"
      }
    }

    if (step === 2) {
      if (!formData.deporteFavorito) newErrors.deporteFavorito = "Selecciona tu deporte favorito"
      if (!formData.nivel) newErrors.nivel = "Selecciona tu nivel"
      if (formData.objetivos.length === 0) newErrors.objetivos = "Selecciona al menos un objetivo"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(currentStep)) return

    setIsLoading(true)
    // Simular llamada a API
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    // Aquí iría la lógica de registro real
    console.log("Registration data:", formData)

    window.location.href = "/"
  }

  const handleSocialRegister = (provider: string) => {
    console.log(`Register with ${provider}`)
    // Aquí iría la lógica de registro social
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold text-white">IMPULSO</span>
            </Link>

            <h1 className="text-5xl font-bold text-white mb-6">
              Únete a la
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                {" "}
                Revolución
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Forma parte de una comunidad de atletas apasionados. Tu viaje hacia la excelencia deportiva comienza aquí.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: "🏃‍♂️", title: "125K+", subtitle: "Atletas activos" },
                { icon: "🏆", title: "50+", subtitle: "Desafíos mensuales" },
                { icon: "🌍", title: "25+", subtitle: "Países" },
                { icon: "⭐", title: "4.9", subtitle: "Valoración" },
              ].map((stat, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl font-bold text-white">{stat.title}</div>
                  <div className="text-sm text-gray-400">{stat.subtitle}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Comunidad de atletas"
              width={500}
              height={400}
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <div className="lg:hidden mb-4">
                <Link href="/" className="inline-flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">IMPULSO</span>
                </Link>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Crear Cuenta</h2>
              <p className="text-gray-300">
                Paso {currentStep} de {totalSteps}
              </p>

              {/* Progress Bar */}
              <div className="mt-4">
                <Progress value={progress} className="h-2 bg-white/10" />
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <>
                  {/* Basic Information Form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-white">
                          Nombre
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="firstName"
                            placeholder="Tu nombre"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                          />
                        </div>
                        {errors.firstName && <p className="text-red-400 text-sm">{errors.firstName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-white">
                          Apellido
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Tu apellido"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        />
                        {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">
                        Contraseña
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white">
                        Confirmar Contraseña
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
                          Acepto los{" "}
                          <Link href="/terminos" className="text-orange-400 hover:text-orange-300">
                            términos y condiciones
                          </Link>{" "}
                          y la{" "}
                          <Link href="/privacidad" className="text-orange-400 hover:text-orange-300">
                            política de privacidad
                          </Link>
                        </Label>
                      </div>
                      {errors.acceptTerms && <p className="text-red-400 text-sm">{errors.acceptTerms}</p>}

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="marketing"
                          checked={formData.acceptMarketing}
                          onCheckedChange={(checked) => handleInputChange("acceptMarketing", checked as boolean)}
                        />
                        <Label htmlFor="marketing" className="text-sm text-gray-300">
                          Quiero recibir ofertas exclusivas y consejos de entrenamiento
                        </Label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Activity className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">Perfil Deportivo</h3>
                    <p className="text-sm text-gray-300">Personaliza tu experiencia deportiva</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white">Deporte Favorito</Label>
                      <Select
                        value={formData.deporteFavorito}
                        onValueChange={(value) => handleInputChange("deporteFavorito", value)}
                      >
                        <SelectTrigger className="bg-white/5 border-white/20 text-white">
                          <SelectValue placeholder="Selecciona tu deporte principal" />
                        </SelectTrigger>
                        <SelectContent>
                          {deportes.map((deporte) => (
                            <SelectItem key={deporte.value} value={deporte.value}>
                              <span className="flex items-center space-x-2">
                                <span>{deporte.icon}</span>
                                <span>{deporte.label}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.deporteFavorito && <p className="text-red-400 text-sm">{errors.deporteFavorito}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Nivel de Experiencia</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {niveles.map((nivel) => (
                          <div
                            key={nivel.value}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              formData.nivel === nivel.value
                                ? "border-orange-500 bg-orange-500/20"
                                : "border-white/20 hover:border-white/40"
                            }`}
                            onClick={() => handleInputChange("nivel", nivel.value)}
                          >
                            <div className="text-white font-medium text-sm">{nivel.label}</div>
                            <div className="text-gray-400 text-xs">{nivel.description}</div>
                          </div>
                        ))}
                      </div>
                      {errors.nivel && <p className="text-red-400 text-sm">{errors.nivel}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Objetivos (selecciona varios)</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {objetivos.map((objetivo) => (
                          <div
                            key={objetivo.value}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              formData.objetivos.includes(objetivo.value)
                                ? "border-orange-500 bg-orange-500/20"
                                : "border-white/20 hover:border-white/40"
                            }`}
                            onClick={() => toggleObjetivo(objetivo.value)}
                          >
                            <div className="flex items-center space-x-2">
                              <span>{objetivo.icon}</span>
                              <span className="text-white text-sm">{objetivo.label}</span>
                              {formData.objetivos.includes(objetivo.value) && (
                                <Check className="w-4 h-4 text-orange-400 ml-auto" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.objetivos && <p className="text-red-400 text-sm">{errors.objetivos}</p>}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Target className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">Información Adicional</h3>
                    <p className="text-sm text-gray-300">Completa tu perfil para una mejor experiencia</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ubicacion" className="text-white">
                        Ubicación
                      </Label>
                      <Input
                        id="ubicacion"
                        placeholder="Ciudad, País"
                        value={formData.ubicacion}
                        onChange={(e) => handleInputChange("ubicacion", e.target.value)}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fechaNacimiento" className="text-white">
                          Fecha de Nacimiento
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="fechaNacimiento"
                            type="date"
                            value={formData.fechaNacimiento}
                            onChange={(e) => handleInputChange("fechaNacimiento", e.target.value)}
                            className="pl-10 bg-white/5 border-white/20 text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Género</Label>
                        <Select value={formData.genero} onValueChange={(value) => handleInputChange("genero", value)}>
                          <SelectTrigger className="bg-white/5 border-white/20 text-white">
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="femenino">Femenino</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                            <SelectItem value="prefiero-no-decir">Prefiero no decir</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-white/20 text-black hover:bg-white/10"
                    onClick={handlePrevious}
                  >
                    Anterior
                  </Button>
                )}

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    onClick={handleNext}
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Creando cuenta...</span>
                      </div>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Crear Cuenta
                      </>
                    )}
                  </Button>
                )}
              </div>

              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-gray-300">
                  ¿Ya tienes una cuenta?{" "}
                  <Link href="/login" className="text-orange-400 hover:text-orange-300 font-semibold">
                    Iniciar sesión
                  </Link>
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                <Shield className="w-3 h-3" />
                <span>Tus datos están protegidos con encriptación SSL</span>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

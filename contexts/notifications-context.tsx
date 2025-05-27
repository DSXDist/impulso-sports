"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface Notification {
  id: string
  type: "order" | "community" | "training" | "promotion" | "system" | "achievement"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high"
  actionUrl?: string
  actionText?: string
  image?: string
  metadata?: {
    orderId?: string
    userId?: string
    challengeId?: string
    productId?: string
    amount?: number
  }
}

interface NotificationsState {
  notifications: Notification[]
  unreadCount: number
  filter: "all" | "unread" | "order" | "community" | "training" | "promotion" | "system" | "achievement"
  isLoading: boolean
}

type NotificationsAction =
  | { type: "SET_NOTIFICATIONS"; payload: Notification[] }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_AS_READ"; payload: string }
  | { type: "MARK_ALL_AS_READ" }
  | { type: "DELETE_NOTIFICATION"; payload: string }
  | { type: "CLEAR_ALL_NOTIFICATIONS" }
  | { type: "SET_FILTER"; payload: NotificationsState["filter"] }
  | { type: "SET_LOADING"; payload: boolean }

const notificationsReducer = (state: NotificationsState, action: NotificationsAction): NotificationsState => {
  switch (action.type) {
    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
        unreadCount: action.payload.filter((n) => !n.read).length,
      }

    case "ADD_NOTIFICATION":
      const newNotifications = [action.payload, ...state.notifications]
      return {
        ...state,
        notifications: newNotifications,
        unreadCount: newNotifications.filter((n) => !n.read).length,
      }

    case "MARK_AS_READ":
      const updatedNotifications = state.notifications.map((notification) =>
        notification.id === action.payload ? { ...notification, read: true } : notification,
      )
      return {
        ...state,
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter((n) => !n.read).length,
      }

    case "MARK_ALL_AS_READ":
      const allReadNotifications = state.notifications.map((notification) => ({ ...notification, read: true }))
      return {
        ...state,
        notifications: allReadNotifications,
        unreadCount: 0,
      }

    case "DELETE_NOTIFICATION":
      const filteredNotifications = state.notifications.filter((notification) => notification.id !== action.payload)
      return {
        ...state,
        notifications: filteredNotifications,
        unreadCount: filteredNotifications.filter((n) => !n.read).length,
      }

    case "CLEAR_ALL_NOTIFICATIONS":
      return {
        ...state,
        notifications: [],
        unreadCount: 0,
      }

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      }

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }

    default:
      return state
  }
}

const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
  filter: "all",
  isLoading: false,
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "¡Pedido confirmado!",
    message: "Tu pedido #IM-2024-001 ha sido confirmado y está siendo preparado para envío.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    priority: "high",
    actionUrl: "/pedidos/IM-2024-001",
    actionText: "Ver pedido",
    metadata: { orderId: "IM-2024-001", amount: 189 },
  },
  {
    id: "2",
    type: "achievement",
    title: "🏆 ¡Nuevo logro desbloqueado!",
    message: "Has completado el desafío '10K Enero'. ¡Felicitaciones por tu dedicación!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    priority: "medium",
    actionUrl: "/comunidad/logros",
    actionText: "Ver logros",
    image: "/placeholder.svg?height=60&width=60",
    metadata: { challengeId: "10k-enero" },
  },
  {
    id: "3",
    type: "community",
    title: "Nueva actividad en tu grupo",
    message: "María González compartió una nueva ruta de running en 'Runners Madrid'.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    read: true,
    priority: "low",
    actionUrl: "/comunidad/grupos/runners-madrid",
    actionText: "Ver grupo",
    image: "/placeholder.svg?height=60&width=60",
    metadata: { userId: "maria-gonzalez" },
  },
  {
    id: "4",
    type: "promotion",
    title: "🔥 Oferta especial para ti",
    message: "20% de descuento en toda la colección de running. Válido hasta el 31 de enero.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    read: false,
    priority: "medium",
    actionUrl: "/productos?categoria=running",
    actionText: "Ver ofertas",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "5",
    type: "training",
    title: "Recordatorio de entrenamiento",
    message: "Tu rutina de CrossFit está programada para hoy a las 18:00. ¡No te la pierdas!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    read: true,
    priority: "medium",
    actionUrl: "/entrenamiento/rutinas",
    actionText: "Ver rutina",
  },
  {
    id: "6",
    type: "order",
    title: "Pedido en camino",
    message: "Tu pedido #IM-2024-002 ha sido enviado y llegará mañana entre 9:00 y 18:00.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    read: true,
    priority: "high",
    actionUrl: "/pedidos/IM-2024-002",
    actionText: "Rastrear pedido",
    metadata: { orderId: "IM-2024-002" },
  },
  {
    id: "7",
    type: "system",
    title: "Actualización de la app",
    message: "Nueva versión disponible con mejoras en el seguimiento de entrenamientos.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    priority: "low",
    actionUrl: "/actualizaciones",
    actionText: "Ver novedades",
  },
  {
    id: "8",
    type: "community",
    title: "Nuevo desafío disponible",
    message: "¡Únete al desafío '100 Burpees' y compite con otros atletas!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: false,
    priority: "medium",
    actionUrl: "/comunidad/desafios/100-burpees",
    actionText: "Unirse",
    metadata: { challengeId: "100-burpees" },
  },
]

const NotificationsContext = createContext<{
  state: NotificationsState
  dispatch: React.Dispatch<NotificationsAction>
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAllNotifications: () => void
  setFilter: (filter: NotificationsState["filter"]) => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
} | null>(null)

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(notificationsReducer, initialState)

  // Load notifications on mount
  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true })
    // Simulate API call
    setTimeout(() => {
      dispatch({ type: "SET_NOTIFICATIONS", payload: mockNotifications })
      dispatch({ type: "SET_LOADING", payload: false })
    }, 1000)
  }, [])

  const markAsRead = (id: string) => {
    dispatch({ type: "MARK_AS_READ", payload: id })
  }

  const markAllAsRead = () => {
    dispatch({ type: "MARK_ALL_AS_READ" })
  }

  const deleteNotification = (id: string) => {
    dispatch({ type: "DELETE_NOTIFICATION", payload: id })
  }

  const clearAllNotifications = () => {
    dispatch({ type: "CLEAR_ALL_NOTIFICATIONS" })
  }

  const setFilter = (filter: NotificationsState["filter"]) => {
    dispatch({ type: "SET_FILTER", payload: filter })
  }

  const addNotification = (notification: Omit<Notification, "id" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    dispatch({ type: "ADD_NOTIFICATION", payload: newNotification })
  }

  return (
    <NotificationsContext.Provider
      value={{
        state,
        dispatch,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
        setFilter,
        addNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}

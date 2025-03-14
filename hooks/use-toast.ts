"use client"

// Adaptado de shadcn/ui toast
import { useState, useCallback } from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

type Toast = ToastProps & {
  id: string
  visible: boolean
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ title, description, variant = "default", duration = 3000 }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)

    setToasts((prevToasts) => [...prevToasts, { id, title, description, variant, duration, visible: true }])

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.map((t) => (t.id === id ? { ...t, visible: false } : t)))

      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
      }, 300)
    }, duration)
  }, [])

  return { toast, toasts }
}


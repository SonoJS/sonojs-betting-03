import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { cn } from 'cn'
import { CheckIcon, XIcon } from 'lucide-react'

/** Lightweight shared toast (06 §12.8): polite live region, auto-dismiss, non-blocking. */

type ToastTone = 'success' | 'error'
type ToastItem = { id: number; message: string; tone: ToastTone }

type ToastContextValue = { toast: (message: string, tone?: ToastTone) => void }

const ToastContext = createContext<ToastContextValue>({ toast: () => {} })

const TOAST_DURATION = 2400

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const counter = useRef(0)
  const timers = useRef<Map<number, number>>(new Map())

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id))
    const timer = timers.current.get(id)
    if (timer) window.clearTimeout(timer)
    timers.current.delete(id)
  }, [])

  const toast = useCallback(
    (message: string, tone: ToastTone = 'success') => {
      const id = ++counter.current
      setItems((prev) => [...prev.slice(-2), { id, message, tone }])
      timers.current.set(id, window.setTimeout(() => dismiss(id), TOAST_DURATION))
    },
    [dismiss],
  )

  useEffect(() => {
    const map = timers.current
    return () => map.forEach((t) => window.clearTimeout(t))
  }, [])

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-[calc(var(--bottom-nav-h,0px)+16px)] z-toast flex flex-col items-center gap-2 px-4 md:bottom-6"
      >
        {items.map((item) => (
          <div
            key={item.id}
            role="status"
            className={cn(
              'pointer-events-auto flex items-center gap-2 rounded-md border border-border bg-surface-elevated px-3 py-2 type-label font-medium text-foreground shadow-[0_12px_32px_-12px_rgb(0_0_0/0.8)]',
              'animate-in fade-in-0 slide-in-from-bottom-2 duration-(--motion-standard)',
            )}
          >
            {item.tone === 'success' ? <CheckIcon className="size-4 text-success" aria-hidden /> : <XIcon className="size-4 text-error" aria-hidden />}
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  return useContext(ToastContext)
}

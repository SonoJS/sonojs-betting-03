import { createContext, useCallback, useContext, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { cn } from 'cn'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useStrings } from '@/hooks/useLocale'

export type AuthMode = 'login' | 'register'

type AuthDialogContextValue = {
  open: boolean
  mode: AuthMode
  openAuth: (mode: AuthMode) => void
  closeAuth: () => void
}

const AuthDialogContext = createContext<AuthDialogContextValue | null>(null)

/** One shared AuthDialog per concept page (06 §12.2). Purely presentational: no submission, no async, no validation. */
export function AuthDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<AuthMode>('register')

  const openAuth = useCallback((m: AuthMode) => {
    setMode(m)
    setOpen(true)
  }, [])
  const closeAuth = useCallback(() => setOpen(false), [])

  const value = useMemo(() => ({ open, mode, openAuth, closeAuth }), [open, mode, openAuth, closeAuth])

  return (
    <AuthDialogContext.Provider value={value}>
      {children}
      <AuthDialog open={open} mode={mode} onOpenChange={setOpen} onModeChange={setMode} />
    </AuthDialogContext.Provider>
  )
}

export function useAuthDialog(): AuthDialogContextValue {
  const ctx = useContext(AuthDialogContext)
  if (!ctx) throw new Error('useAuthDialog must be used inside <AuthDialogProvider>')
  return ctx
}

/* ---------------------------------------------------------------- */

function AuthDialog({
  open,
  mode,
  onOpenChange,
  onModeChange,
}: {
  open: boolean
  mode: AuthMode
  onOpenChange: (open: boolean) => void
  onModeChange: (mode: AuthMode) => void
}) {
  const t = useStrings()
  const isLogin = mode === 'login'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent closeLabel={t.close} className="max-h-[calc(100dvh-2rem)] overflow-y-auto">
        <DialogHeader>
          <span className="type-caption font-semibold tracking-[0.12em] text-primary uppercase">{t.brand}</span>
          <DialogTitle>{isLogin ? t.authLoginTitle : t.authRegisterTitle}</DialogTitle>
          <DialogDescription>{t.heroSupport}</DialogDescription>
        </DialogHeader>

        {isLogin ? <LoginFormDemo /> : <RegisterFormDemo />}

        <div className="flex items-center gap-3 type-caption text-foreground-muted">
          <span className="h-px flex-1 bg-border" />
          {t.authOr}
          <span className="h-px flex-1 bg-border" />
        </div>

        <SocialAuthButtons />

        <p className="text-center type-label text-muted-foreground">
          {isLogin ? t.authNoAccount : t.authHaveAccount}{' '}
          <button
            type="button"
            className="font-semibold text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring rounded-xs"
            onClick={() => onModeChange(isLogin ? 'register' : 'login')}
          >
            {isLogin ? t.register : t.login}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  )
}

function preventSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="type-label font-medium text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  )
}

export function LoginFormDemo() {
  const t = useStrings()
  return (
    <form className="flex flex-col gap-4" onSubmit={preventSubmit} noValidate>
      <Field id="auth-login-id" label={t.authEmailOrUsername}>
        <Input id="auth-login-id" name="identifier" type="text" autoComplete="username" placeholder="player@noxa.demo" />
      </Field>
      <Field id="auth-login-password" label={t.authPassword}>
        <Input id="auth-login-password" name="password" type="password" autoComplete="current-password" placeholder="••••••••" />
      </Field>
      <div className="flex justify-end">
        <button type="button" className="rounded-xs type-caption text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
          {t.authForgot}
        </button>
      </div>
      <Button type="submit" size="lg" className="w-full">
        {t.login}
      </Button>
    </form>
  )
}

export function RegisterFormDemo() {
  const t = useStrings()
  return (
    <form className="flex flex-col gap-4" onSubmit={preventSubmit} noValidate>
      <Field id="auth-reg-email" label={t.authEmail}>
        <Input id="auth-reg-email" name="email" type="email" autoComplete="email" placeholder="player@noxa.demo" />
      </Field>
      <Field id="auth-reg-password" label={t.authPassword}>
        <Input id="auth-reg-password" name="password" type="password" autoComplete="new-password" placeholder="••••••••" />
      </Field>
      <Field id="auth-reg-promo" label={t.authPromoCode}>
        <Input id="auth-reg-promo" name="promo" type="text" autoComplete="off" placeholder="SPORTBET" />
      </Field>
      <label className="flex cursor-pointer items-start gap-3 type-label text-muted-foreground">
        <input
          type="checkbox"
          name="terms"
          className="mt-0.5 size-4 shrink-0 cursor-pointer rounded-xs border-border accent-primary outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
        <span>{t.authTerms}</span>
      </label>
      <Button type="submit" size="lg" className="w-full">
        {t.register}
      </Button>
    </form>
  )
}

export function SocialAuthButtons({ className }: { className?: string }) {
  const t = useStrings()
  return (
    <div className={cn('grid grid-cols-2 gap-3', className)}>
      <Button type="button" variant="secondary" className="w-full">
        <GoogleMark />
        {t.authGoogle}
      </Button>
      <Button type="button" variant="secondary" className="w-full">
        <TelegramMark />
        {t.authTelegram}
      </Button>
    </div>
  )
}

/* Simple monochrome marks — generic representations, not brand assets. */
function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="currentColor">
      <path d="M12 11v2.8h4.6c-.2 1.2-1.4 3.5-4.6 3.5-2.8 0-5-2.3-5-5.2s2.2-5.2 5-5.2c1.6 0 2.6.7 3.2 1.3l2.2-2.1C16 4.8 14.2 4 12 4 7.6 4 4 7.6 4 12s3.6 8 8 8c4.6 0 7.7-3.2 7.7-7.8 0-.5 0-.9-.1-1.3H12z" />
    </svg>
  )
}

function TelegramMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="currentColor">
      <path d="M21 4.5 3.6 11.2c-1 .4-1 1 0 1.3l4.4 1.4 1.7 5.2c.2.6.4.8 1 .8.4 0 .6-.2.9-.5l2.2-2.1 4.5 3.3c.8.5 1.4.2 1.6-.8L22.6 6c.3-1.2-.5-1.9-1.6-1.5zM9.4 13.4l8.9-5.6c.4-.3.8 0 .5.3l-7.4 6.7-.3 3.1-1.7-4.5z" />
    </svg>
  )
}

import type { ReactNode } from 'react'

import { TooltipProvider } from '@/components/ui/tooltip'

export function AppProviders({ children }: { children: ReactNode }) {
  return <TooltipProvider delay={300}>{children}</TooltipProvider>
}

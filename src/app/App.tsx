import { BrowserRouter } from 'react-router'

import { AppProviders } from '@/app/providers'
import { AppRouter } from '@/app/router'

export function App() {
  return (
    <BrowserRouter basename="/">
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </BrowserRouter>
  )
}

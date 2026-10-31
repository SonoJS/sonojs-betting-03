import { Navigate, Route, Routes } from 'react-router'

import { Concept03Page } from '@/concepts/concept-03'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Concept03Page />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

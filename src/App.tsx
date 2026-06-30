import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DiagnosticoPage from './pages/DiagnosticoPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DiagnosticoPage />} />
        <Route path="/diagnostico-agente-ia" element={<DiagnosticoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

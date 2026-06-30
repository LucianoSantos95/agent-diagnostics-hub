import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DiagnosticoPage from './pages/DiagnosticoPage'
import { ThemeProvider } from './contexts/ThemeContext'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DiagnosticoPage />} />
          <Route path="/diagnostico-agente-ia" element={<DiagnosticoPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

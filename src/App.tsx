import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DiagnosticoPage from './pages/DiagnosticoPage'
import UnsubscribePage from './pages/UnsubscribePage'
import { ThemeProvider } from './contexts/ThemeContext'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DiagnosticoPage />} />
          <Route path="/diagnostico-agente-ia" element={<DiagnosticoPage />} />
          <Route path="/unsubscribe" element={<UnsubscribePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

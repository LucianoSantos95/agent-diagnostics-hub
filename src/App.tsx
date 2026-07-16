import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DiagnosticoPage from './pages/DiagnosticoPage'
import UnsubscribePage from './pages/UnsubscribePage'
import ChatbotEmpresas from './pages/lp/ChatbotEmpresas'
import AutomacaoAtendimento from './pages/lp/AutomacaoAtendimento'
import IaPequenasEmpresas from './pages/lp/IaPequenasEmpresas'
import { ThemeProvider } from './contexts/ThemeContext'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<DiagnosticoPage />} />
          <Route path="/diagnostico-agente-ia" element={<DiagnosticoPage />} />
          <Route path="/chatbot-para-empresas" element={<ChatbotEmpresas />} />
          <Route path="/automacao-de-atendimento" element={<AutomacaoAtendimento />} />
          <Route path="/ia-para-pequenas-empresas" element={<IaPequenasEmpresas />} />
          <Route path="/unsubscribe" element={<UnsubscribePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

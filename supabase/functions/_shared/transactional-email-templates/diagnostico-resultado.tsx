import * as React from 'npm:react@18.3.1'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  categoria?: string
  downloadUrl?: string
  nome?: string
}

const Email = ({ categoria, downloadUrl, nome }: Props) => {
  const cat = categoria || 'seu Agente de IA'
  const link = downloadUrl || '#'
  return (
    <Html lang="pt-BR" dir="ltr">
      <Head />
      <Preview>Seu guia completo do diagnóstico Focus Inteligente está pronto</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brand}>Focus Inteligente</Text>
            <Text style={tagline}>Diagnóstico de Agente de IA</Text>
          </Section>

          <Section style={content}>
            <Heading style={h1}>{nome ? `Olá, ${nome}!` : 'Olá!'}</Heading>
            <Text style={paragraph}>
              Concluímos a análise das suas respostas. A recomendação para o seu
              contexto é:
            </Text>

            <Section style={highlight}>
              <Text style={highlightLabel}>CATEGORIA RECOMENDADA</Text>
              <Text style={highlightValue}>{cat}</Text>
            </Section>

            <Text style={paragraph}>
              Preparamos um guia completo em PDF com a recomendação detalhada e o
              histórico das suas respostas. Clique no botão abaixo para baixar:
            </Text>

            <Section style={{ textAlign: 'center', margin: '32px 0' }}>
              <Button href={link} style={button}>
                Baixar guia completo (PDF)
              </Button>
            </Section>

            <Text style={small}>
              O link é pessoal e fica ativo por 7 dias. Se precisar acessar
              novamente depois disso, é só refazer o diagnóstico.
            </Text>

            <Hr style={hr} />

            <Text style={paragraph}>
              Qualquer dúvida, é só responder este e-mail — nossa equipe está
              pronta para te ajudar a dar o próximo passo.
            </Text>

            <Text style={signature}>
              Equipe Focus Inteligente<br />
              focusinteligente.com.br
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
}

const container = {
  maxWidth: '580px',
  margin: '0 auto',
  padding: '24px 0 40px',
}

const header = {
  backgroundColor: '#0b1a36',
  padding: '28px 32px',
  borderRadius: '12px 12px 0 0',
}

const brand = {
  color: '#ffffff',
  fontSize: '22px',
  fontWeight: 700,
  margin: 0,
  letterSpacing: '-0.3px',
}

const tagline = {
  color: '#93b4ff',
  fontSize: '13px',
  margin: '4px 0 0',
}

const content = {
  backgroundColor: '#ffffff',
  border: '1px solid #e6ebf3',
  borderTop: 'none',
  borderRadius: '0 0 12px 12px',
  padding: '32px',
}

const h1 = {
  color: '#0b1a36',
  fontSize: '22px',
  fontWeight: 700,
  margin: '0 0 12px',
}

const paragraph = {
  color: '#2b3651',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 16px',
}

const highlight = {
  backgroundColor: '#f2f6ff',
  border: '1px solid #d7e3ff',
  borderRadius: '10px',
  padding: '18px 20px',
  margin: '20px 0 24px',
}

const highlightLabel = {
  color: '#5b6a86',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.6px',
  margin: '0 0 4px',
}

const highlightValue = {
  color: '#2563eb',
  fontSize: '20px',
  fontWeight: 700,
  margin: 0,
}

const button = {
  backgroundColor: '#2563eb',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 600,
  padding: '14px 28px',
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'inline-block',
}

const small = {
  color: '#5b6a86',
  fontSize: '13px',
  lineHeight: '20px',
  margin: '0 0 8px',
  textAlign: 'center' as const,
}

const hr = {
  borderColor: '#e6ebf3',
  margin: '28px 0',
}

const signature = {
  color: '#0b1a36',
  fontSize: '14px',
  lineHeight: '22px',
  fontWeight: 600,
  margin: '16px 0 0',
}

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `Seu guia do diagnóstico Focus Inteligente${data?.categoria ? ` — ${data.categoria}` : ''}`,
  displayName: 'Diagnóstico — Guia completo',
  previewData: {
    nome: 'Marina',
    categoria: 'Agente de Atendimento',
    downloadUrl: 'https://example.com/guia.pdf',
  },
} satisfies TemplateEntry

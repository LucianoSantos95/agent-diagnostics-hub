import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';

export interface FaqItem {
  pergunta: string;
  resposta: string;
}

interface LandingLayoutProps {
  slug: string;
  title: string;
  metaDescription: string;
  h1: ReactNode;
  intro: ReactNode;
  blocos: { titulo: string; conteudo: ReactNode }[];
  faq: FaqItem[];
  ctaTexto?: string;
  heroImage?: string;
  heroImageAlt?: string;
}

const BASE_URL = 'https://diagnostico.focusinteligente.com.br';

export default function LandingLayout({
  slug,
  title,
  metaDescription,
  h1,
  intro,
  blocos,
  faq,
  ctaTexto = 'Descubra em 2 minutos qual agente sua empresa precisa',
  heroImage,
  heroImageAlt,
}: LandingLayoutProps) {
  const url = `${BASE_URL}${slug}`;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: f.resposta },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ paddingTop: 60 }}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDescription} />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <PageBackground />
      <Header />

      <main className="relative z-10 flex-1">
        <article className="max-w-6xl mx-auto px-6 py-12 lg:py-20 flex flex-col gap-12">
          <header className={`grid gap-10 items-center ${heroImage ? 'lg:grid-cols-[1.05fr_1fr]' : ''}`}>
            <div className="flex flex-col gap-5 max-w-2xl">
              <span
                className="inline-flex self-start items-center gap-2 border text-[10px] font-mono font-semibold uppercase tracking-[0.24em] px-3.5 py-2 rounded-full"
                style={{
                  background: 'var(--surface-soft)',
                  borderColor: 'var(--surface-border)',
                  color: 'var(--text-secondary)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Guia prático · leitura de 4 min
              </span>
              <h1
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {h1}
              </h1>
              <div className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {intro}
              </div>
            </div>
            {heroImage && (
              <div className="relative">
                <div
                  className="absolute -inset-6 rounded-[2rem] blur-3xl opacity-60 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.35) 0%, transparent 65%)' }}
                />
                <div
                  className="relative rounded-2xl overflow-hidden border"
                  style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                    boxShadow: '0 40px 100px -30px rgba(79,70,229,0.45)',
                  }}
                >
                  <img
                    src={heroImage}
                    alt={heroImageAlt ?? ''}
                    width={1600}
                    height={1200}
                    className="w-full h-auto block"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(10,10,26,0.4) 100%)' }}
                  />
                </div>
              </div>
            )}
          </header>

          <section className="flex flex-col gap-8 max-w-3xl">
            {blocos.map((b) => (
              <div key={b.titulo} className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {b.titulo}
                </h2>
                <div className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {b.conteudo}
                </div>
              </div>
            ))}
          </section>

          <section
            className="rounded-2xl border p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--surface-border)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="flex flex-col gap-1">
              <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                {ctaTexto}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                6 perguntas · sem cadastro · resultado imediato
              </p>
            </div>
            <Link
              to="/"
              className="group relative px-7 py-3.5 rounded-2xl font-bold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                boxShadow: '0 0 40px rgba(79,70,229,0.35), 0 6px 24px rgba(0,0,0,0.25)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Começar diagnóstico
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Perguntas frequentes
            </h2>
            <div className="flex flex-col gap-3">
              {faq.map((f) => (
                <details
                  key={f.pergunta}
                  className="rounded-xl border p-4 group"
                  style={{ background: 'var(--surface-soft)', borderColor: 'var(--surface-border)' }}
                >
                  <summary
                    className="font-semibold cursor-pointer list-none flex justify-between items-center gap-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {f.pergunta}
                    <span className="text-xl transition-transform group-open:rotate-45" style={{ color: 'var(--text-muted)' }}>
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {f.resposta}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

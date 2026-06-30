import { useState } from "react";
import type { ReactNode } from "react";

interface Item { titulo: string; conteudo: string; }
interface Props { itens: Item[]; }

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <strong key={i} style={{ color: '#e2e8f0', fontWeight: 600 }}>{p.slice(2, -2)}</strong>
      : p
  );
}

function renderMarkdown(text: string) {
  const lines = text.split('\n').filter(l => l.trim() !== '');
  const result: ReactNode[] = [];
  let bullets: string[] = [];
  let numbered: string[] = [];

  function flushBullets() {
    if (!bullets.length) return;
    result.push(
      <ul key={result.length} style={{ listStyle: 'none', padding: 0, margin: '6px 0 0 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ color: '#60a5fa', flexShrink: 0, marginTop: 1 }}>•</span>
            <span>{renderInline(b)}</span>
          </li>
        ))}
      </ul>
    );
    bullets = [];
  }

  function flushNumbered() {
    if (!numbered.length) return;
    result.push(
      <ol key={result.length} style={{ listStyle: 'none', padding: 0, margin: '6px 0 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {numbered.map((n, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ color: '#60a5fa', flexShrink: 0, fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
            <span style={{ lineHeight: 1.55 }}>{renderInline(n)}</span>
          </li>
        ))}
      </ol>
    );
    numbered = [];
  }

  for (const line of lines) {
    if (line.startsWith('- ')) {
      flushNumbered();
      bullets.push(line.slice(2));
    } else if (/^\d+\.\s/.test(line)) {
      flushBullets();
      numbered.push(line.replace(/^\d+\.\s*/, ''));
    } else {
      flushBullets();
      flushNumbered();
      result.push(
        <p key={result.length} style={{ margin: 0, lineHeight: 1.6 }}>{renderInline(line)}</p>
      );
    }
  }
  flushBullets();
  flushNumbered();

  return <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>{result}</div>;
}

export default function AccordionResultado({ itens }: Props) {
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-2">
      {itens.map((item, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden border transition-all duration-200"
          style={{
            background: aberto === i ? 'rgba(37,99,235,0.08)' : 'rgba(255,255,255,0.04)',
            borderColor: aberto === i ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.08)',
          }}
        >
          <button
            onClick={() => setAberto(aberto === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <span className="text-sm font-semibold text-white">{item.titulo}</span>
            <span
              className="text-sm flex-shrink-0 ml-2 transition-transform duration-300"
              style={{ transform: aberto === i ? 'rotate(180deg)' : 'rotate(0deg)', color: '#60a5fa' }}
            >
              ▾
            </span>
          </button>

          <div
            style={{
              maxHeight: aberto === i ? '600px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.35s ease',
            }}
          >
            <div
              className="px-5 pb-5 pt-1 text-sm leading-relaxed border-t"
              style={{ color: '#94a3b8', borderColor: 'rgba(255,255,255,0.07)' }}
            >
              {renderMarkdown(item.conteudo)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

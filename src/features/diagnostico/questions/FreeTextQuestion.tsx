const MAX = 140;

interface Props {
  placeholder: string;
  valorAtual: string | undefined;
  onChange: (valor: string) => void;
}

export default function FreeTextQuestion({ placeholder, valorAtual, onChange }: Props) {
  const valor = valorAtual ?? '';
  const restantes = MAX - valor.length;

  return (
    <div className="flex flex-col gap-2">
      <textarea
        className="w-full rounded-xl px-4 py-3 text-sm resize-none focus:outline-none min-h-[100px] transition-all duration-200"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border-soft)',
          color: 'var(--text-primary)',
          caretColor: 'var(--accent)',
        }}
        placeholder={placeholder}
        maxLength={MAX}
        value={valor}
        onChange={e => onChange(e.target.value)}
        onFocus={e => {
          e.currentTarget.style.borderColor = 'var(--accent)';
          e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-soft)';
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = 'var(--border-soft)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
      <p className="text-xs text-right" style={{ color: restantes <= 20 ? 'var(--warn)' : 'var(--text-muted)' }}>
        {restantes} caracteres restantes
      </p>
    </div>
  );
}

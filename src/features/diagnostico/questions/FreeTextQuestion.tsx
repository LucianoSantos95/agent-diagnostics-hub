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
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: '#f1f5f9',
          caretColor: '#60a5fa'
        }}
        placeholder={placeholder}
        maxLength={MAX}
        value={valor}
        onChange={e => onChange(e.target.value)}
        onFocus={e => {
          e.currentTarget.style.borderColor = '#3b82f6';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.2)';
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
      <p className="text-xs text-right" style={{ color: restantes <= 20 ? '#fbbf24' : 'rgba(147,197,253,0.4)' }}>
        {restantes} caracteres restantes
      </p>
    </div>
  );
}

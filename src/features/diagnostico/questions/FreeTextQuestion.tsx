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
        className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-800
          placeholder:text-gray-400 resize-none focus:outline-none focus:border-[#1B3A5C] transition-colors
          min-h-[96px]"
        placeholder={placeholder}
        maxLength={MAX}
        value={valor}
        onChange={e => onChange(e.target.value)}
      />
      <p className={`text-xs text-right ${restantes <= 20 ? 'text-amber-500' : 'text-gray-400'}`}>
        {restantes} caracteres restantes
      </p>
    </div>
  );
}

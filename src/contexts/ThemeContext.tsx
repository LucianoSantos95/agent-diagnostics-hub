import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'padrao' | 'escuro' | 'claro';

interface ThemeCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

const STORAGE_KEY = 'focus-indica-theme';

function applyTheme(t: Theme) {
  const html = document.documentElement;
  html.classList.remove('theme-padrao', 'theme-escuro', 'theme-claro');
  html.classList.add(`theme-${t}`);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'padrao';
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return saved && ['padrao', 'escuro', 'claro'].includes(saved) ? saved : 'padrao';
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
}

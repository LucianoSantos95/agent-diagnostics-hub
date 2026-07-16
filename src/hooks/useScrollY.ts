import { useEffect, useState } from 'react';

export function useScrollY(threshold = 0) {
  const [y, setY] = useState(typeof window !== 'undefined' ? window.scrollY : 0);
  const [past, setPast] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const next = window.scrollY;
        setY(next);
        setPast(next > threshold);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return { y, past };
}

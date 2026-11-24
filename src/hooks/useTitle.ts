import { useEffect } from 'react';

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} · Cake Palace` : 'Cake Palace – Cakes & Pastries in Hyderabad';
  }, [title]);
}

// see upload-file-mock.tsx for the context of this code
'use client'
import { useEffect, useState } from 'react';

export function useClientMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleMatchChange = (e: any) => {
      setMatches(e.matches);
    }

    mediaQueryList.addEventListener('change', handleMatchChange)
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener('change', handleMatchChange);
    }
  }, [query])

  return matches;
}


export function useTouchPoint() {
  const [hasTouch, setTouch] = useState<boolean | null>(null);

  useEffect(() => {
    setTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  })

  return hasTouch;
}
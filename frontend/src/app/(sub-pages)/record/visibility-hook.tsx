"use client";

import { useState, useEffect } from 'react';

export default function usePageVisibility() {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  useEffect(() => {
    function handleVisibilityChange() {
      setIsVisible(document.visibilityState === 'visible');
    }

    window.addEventListener('visibilitychange', handleVisibilityChange); 
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
}

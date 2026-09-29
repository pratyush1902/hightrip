'use client';

import { useEffect } from 'react';

export function ExperiencesTheme() {
  useEffect(() => {
    const originalBodyBg = document.body.style.backgroundColor;
    const originalHtmlBg = document.documentElement.style.backgroundColor;
    const originalBodyColor = document.body.style.color;

    document.documentElement.style.backgroundColor = '#0b0a08';
    document.body.style.backgroundColor = '#0b0a08';
    document.body.style.color = '#f5efe6';

    return () => {
      document.documentElement.style.backgroundColor = originalHtmlBg;
      document.body.style.backgroundColor = originalBodyBg;
      document.body.style.color = originalBodyColor;
    };
  }, []);

  return null;
}

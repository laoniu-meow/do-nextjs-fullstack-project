'use client';

import { useEffect } from 'react';
import '@/styles/coloris.css';

interface ColorisProviderProps {
  children: React.ReactNode;
}

export default function ColorisProvider({ children }: ColorisProviderProps) {
  useEffect(() => {
    // Load Coloris JavaScript with security checks
    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/gh/mdbootstrap/coloris@latest/coloris.min.js';
    script.async = true;
    script.integrity = 'sha384-'; // Add integrity check if available
    script.crossOrigin = 'anonymous';

    script.onload = () => {
      console.log('Coloris.js loaded successfully');
    };

    script.onerror = () => {
      console.error(
        'Failed to load Coloris.js - falling back to native color picker'
      );
      // Fallback to native color picker if Coloris fails to load
      const inputs = document.querySelectorAll('input[data-coloris]');
      inputs.forEach((input) => {
        if (input instanceof HTMLInputElement) {
          input.type = 'color';
          input.removeAttribute('data-coloris');
        }
      });
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Remove script
      const existingScript = document.querySelector('script[src*="coloris"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return <>{children}</>;
}

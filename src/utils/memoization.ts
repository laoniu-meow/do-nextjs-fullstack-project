// Memoization utilities for performance optimization
import React from 'react';

// Simple memoization for expensive calculations
export const memoize = <T extends (...args: any[]) => any>(
  fn: T,
  keyFn?: (...args: Parameters<T>) => string
): T => {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

// Memoization for React components
export const createMemoizedComponent = <P extends object>(
  Component: React.ComponentType<P>,
  propsAreEqual?: (prevProps: P, nextProps: P) => boolean
) => {
  return React.memo(Component, propsAreEqual);
};

// Memoization for expensive style calculations
export const memoizedStyles = memoize(
  (isMobile: boolean, isTablet: boolean) => ({
    padding: isMobile ? '16px' : '20px',
    paddingLarge: isMobile ? '20px' : '24px',
    gap: isMobile ? '16px' : '20px',
    gapLarge: isMobile ? '20px' : '24px',
    buttonSize: isMobile ? '44px' : '50px',
    iconSize: isMobile ? '18px' : '20px',
    titleFontSize: isMobile ? '36px' : '38px',
    subtitleFontSize: isMobile ? '18px' : isTablet ? '19px' : '20px',
    bodyFontSize: isMobile ? '16px' : '18px',
    smallFontSize: isMobile ? '14px' : '16px',
    drawerWidth: isMobile ? '280px' : isTablet ? '320px' : '300px',
  }),
  (isMobile, isTablet) => `${isMobile}-${isTablet}`
);

// Memoization for color calculations
export const memoizedColorCalculations = memoize(
  (hue: number, saturation: number, lightness: number) => {
    // Expensive color calculations
    const h = hue / 360;
    const s = saturation / 100;
    const l = lightness / 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  },
  (hue, saturation, lightness) => `${hue}-${saturation}-${lightness}`
);

// Memoization for responsive calculations
export const memoizedResponsiveCalculations = memoize(
  (baseValue: number, screenSize: string) => {
    switch (screenSize) {
      case 'mobile':
        return baseValue * 0.55;
      case 'tablet':
        return baseValue * 0.75;
      case 'desktop':
        return baseValue * 0.85;
      default:
        return baseValue;
    }
  },
  (baseValue, screenSize) => `${baseValue}-${screenSize}`
);

// Debounce utility for expensive operations
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for frequent operations
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}; 
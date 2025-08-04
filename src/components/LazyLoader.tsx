'use client';

import React, { Suspense, useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LazyLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function LazyLoader({
  children,
  fallback,
  delay = 300,
  className = '',
}: LazyLoaderProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const defaultFallback = (
    <div
      className={`flex items-center justify-center min-h-[200px] ${className}`}
    >
      <LoadingSpinner size="large" />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {showContent ? children : fallback || defaultFallback}
    </Suspense>
  );
}

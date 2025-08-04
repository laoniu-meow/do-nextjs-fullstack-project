import React from 'react';

export default function HeaderSkeleton() {
  return (
    <header
      style={{
        width: '100%',
        height: '5rem',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e9ecef',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}
    >
      {/* Logo skeleton - minimal placeholder */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'transparent',
            borderRadius: '8px',
          }}
        />
      </div>

      {/* Toggle button skeleton */}
      <div
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#e9ecef',
          borderRadius: '50%',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      />
    </header>
  );
}

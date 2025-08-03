'use client';

import React from 'react';

export interface InfoStackItem {
  label: string;
  value: string;
}

export interface InfoStackProps {
  title: string;
  items: InfoStackItem[];
  maxWidth?: string;
  isMobile?: boolean;
  isTablet?: boolean;
  marginTop?: string;
}

export default function InfoStack({
  title,
  items,
  maxWidth = '60%',
  isMobile = false,
  isTablet = false,
  marginTop = '20px',
}: InfoStackProps) {
  return (
    <div
      style={{
        marginTop: marginTop,
        padding: isMobile ? '16px' : '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        fontSize: '14px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0',
      }}
    >
      <h3
        style={{
          margin: '0 0 16px 0',
          fontSize: isMobile ? '16px' : isTablet ? '17px' : '18px',
          fontWeight: '600',
          color: '#333333',
        }}
      >
        {title}
      </h3>

      {/* Stacks Format */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '12px' : '16px',
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              padding: isMobile ? '10px' : '12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              border: '1px solid #e9ecef',
              maxWidth: maxWidth,
            }}
          >
            <div
              style={{
                fontSize: isMobile ? '11px' : '12px',
                color: '#6c757d',
                marginBottom: '4px',
                fontWeight: '500',
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: isMobile ? '13px' : '14px',
                color: '#333333',
                fontWeight: '500',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                lineHeight: isMobile ? '1.4' : '1.5',
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

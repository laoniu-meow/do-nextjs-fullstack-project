'use client';

import React from 'react';
import { ResponsiveStyles } from '@/hooks/useResponsiveStyles';

export interface CompanyInfoFieldProps {
  label: string;
  value: string;
  isFullWidth?: boolean;
  responsive: ResponsiveStyles;
}

export default function CompanyInfoField({
  label,
  value,
  isFullWidth = false,
  responsive,
}: CompanyInfoFieldProps) {
  const { isMobile, smallFontSize, bodyFontSize } = responsive;

  return (
    <div
      style={{
        flex: isFullWidth ? '1 1 100%' : '1 1 50%',
        padding: isMobile ? '10px' : '12px',
      }}
    >
      <div
        style={{
          fontSize: smallFontSize,
          color: '#388e3c', // Green color for field labels
          marginBottom: '4px',
          fontWeight: '500',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: bodyFontSize,
          color: '#333333',
          fontWeight: '500',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          lineHeight: isMobile ? '1.4' : '1.5',
        }}
      >
        {value}
      </div>
    </div>
  );
}

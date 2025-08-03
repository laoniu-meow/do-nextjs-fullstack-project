'use client';

import React from 'react';
import { ResponsiveStyles } from '@/hooks/useResponsiveStyles';

export interface CompanyInfoFieldProps {
  label: string;
  value: string;
  isFullWidth?: boolean;
  responsive: ResponsiveStyles;
  isEditMode?: boolean;
  onValueChange?: (newValue: string) => void;
}

export default function CompanyInfoField({
  label,
  value,
  isFullWidth = false,
  responsive,
  isEditMode = false,
  onValueChange,
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
      {isEditMode ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onValueChange?.(e.target.value)}
          style={{
            width: '100%',
            fontSize: bodyFontSize,
            color: '#333333',
            fontWeight: '500',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#fff',
            lineHeight: isMobile ? '1.4' : '1.5',
          }}
        />
      ) : (
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
      )}
    </div>
  );
}

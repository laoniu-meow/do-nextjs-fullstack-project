'use client';

import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export interface ActionButtonProps {
  text: string;
  onClick: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function ActionButton({
  text,
  onClick,
  variant = 'primary',
  disabled = false,
  style,
}: ActionButtonProps) {
  const getButtonStyles = () => {
    const baseStyles = {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      opacity: disabled ? 0.6 : 1,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          backgroundColor: '#007bff',
          color: 'white',
        };
      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor: '#6c757d',
          color: 'white',
        };
      case 'danger':
        return {
          ...baseStyles,
          backgroundColor: '#dc3545',
          color: 'white',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...getButtonStyles(), ...style }}
    >
      {text}
    </button>
  );
}

'use client';

import React from 'react';

export interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'file';
  accept?: string;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormField({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  accept,
  onFileChange,
}: FormFieldProps) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: '500',
          color: '#333',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={type === 'text' ? value : undefined}
        onChange={
          type === 'file' ? onFileChange : (e) => onChange(e.target.value)
        }
        placeholder={placeholder}
        accept={accept}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      />
    </div>
  );
}

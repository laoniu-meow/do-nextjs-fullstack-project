import React from 'react';
import { getCrossPlatformStyles } from '@/utils/crossPlatformStyles';
import { ResponsiveStyles } from '@/hooks/useResponsiveStyles';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  description?: string;
  responsive: ResponsiveStyles;
  crossPlatformStyles: ReturnType<typeof getCrossPlatformStyles>;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  description,
  responsive,
  crossPlatformStyles,
}) => {
  return (
    <div>
      <label
        style={{
          fontSize: '12px',
          fontWeight: '500',
          color: '#6b7280',
          marginBottom: '4px',
          display: 'block',
        }}
      >
        {label}
      </label>
      {children}
      {description && (
        <div
          style={{
            fontSize: '11px',
            color: '#6b7280',
            marginTop: '4px',
            fontStyle: 'italic',
            width: '100%',
            minHeight: '32px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
};

export default FormField; 
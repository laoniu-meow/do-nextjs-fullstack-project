import React from 'react';
import { getCrossPlatformStyles } from '@/utils/crossPlatformStyles';
import { ResponsiveStyles } from '@/hooks/useResponsiveStyles';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  responsive: ResponsiveStyles;
  crossPlatformStyles: ReturnType<typeof getCrossPlatformStyles>;
  placeholder?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  value,
  onChange,
  options,
  responsive,
  crossPlatformStyles,
  placeholder,
}) => {
  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    e.target.style.borderColor = '#3b82f6';
    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    e.target.style.borderColor = '#d1d5db';
    e.target.style.boxShadow = 'none';
  };

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: crossPlatformStyles.inputPadding,
        border: '1px solid #d1d5db',
        borderRadius: crossPlatformStyles.inputBorderRadius,
        fontSize: crossPlatformStyles.inputFontSize,
        width: '100%',
        backgroundColor: 'white',
        transition: 'all 0.2s ease',
        outline: 'none',
        minHeight: crossPlatformStyles.inputMinHeight,
        height: crossPlatformStyles.inputMinHeight,
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField; 
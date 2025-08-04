'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';

// Import Coloris types with security considerations
declare global {
  interface Window {
    Coloris?: {
      init: () => void;
      set: (options: any) => void;
      close: () => void;
      update: (selector: string) => void;
    };
  }
}

interface AccessibleColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  id?: string;
  name?: string;
  required?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  showPreview?: boolean;
  showHex?: boolean;
  showRgb?: boolean;
  showHsl?: boolean;
  theme?: 'default' | 'large' | 'polaroid' | 'pill';
  format?: 'hex' | 'rgb' | 'hsl';
  swatches?: string[];
  swatchesOnly?: boolean;
  alpha?: boolean;
  focusInput?: boolean;
  selectInput?: boolean;
  clearButton?: boolean;
  clearLabel?: string;
  onClose?: () => void;
  onOpen?: () => void;
  onInput?: (color: string) => void;
  inline?: boolean;
  wrap?: boolean;
  defaultColor?: string;
  a11y?: {
    open: string;
    close: string;
    clear: string;
    marker: string;
    hueSlider: string;
    alphaSlider: string;
    input: string;
    format: string;
    swatch: string;
    instruction: string;
  };
}

export default function AccessibleColorPicker({
  value,
  onChange,
  label,
  placeholder = 'Select a color',
  disabled = false,
  style,
  id,
  name,
  required = false,
  ariaLabel,
  ariaDescribedBy,
  showPreview = true,
  showHex = true,
  showRgb = false,
  showHsl = false,
  theme = 'default',
  format = 'hex',
  swatches = [],
  swatchesOnly = false,
  alpha = false,
  focusInput = true,
  selectInput = true,
  clearButton = false,
  clearLabel = 'Clear',
  onClose,
  onOpen,
  onInput,
  inline = false,
  wrap = false,
  defaultColor = '#000000',
  a11y = {
    open: 'Open color picker',
    close: 'Close color picker',
    clear: 'Clear color',
    marker: 'Color marker',
    hueSlider: 'Hue slider',
    alphaSlider: 'Alpha slider',
    input: 'Color input',
    format: 'Color format',
    swatch: 'Color swatch',
    instruction:
      'Use Tab to navigate, Enter or Space to open color picker, Arrow keys to navigate colors, Enter to select, Escape to close',
  },
}: AccessibleColorPickerProps) {
  const responsive = useResponsiveStyles();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || defaultColor);
  const [isColorisLoaded, setIsColorisLoaded] = useState(false);

  // Check if Coloris is loaded
  useEffect(() => {
    const checkColorisLoaded = () => {
      if (typeof window !== 'undefined' && window.Coloris) {
        setIsColorisLoaded(true);
      } else {
        // Retry after a short delay
        setTimeout(checkColorisLoaded, 100);
      }
    };
    checkColorisLoaded();
  }, []);

  // Initialize Coloris with security considerations
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.Coloris &&
      !isInitialized &&
      isColorisLoaded
    ) {
      try {
        // Configure Coloris with security options
        window.Coloris.set({
          theme: theme,
          format: format,
          swatches: swatches,
          swatchesOnly: swatchesOnly,
          alpha: alpha,
          focusInput: focusInput,
          selectInput: selectInput,
          clearButton: clearButton,
          clearLabel: clearLabel,
          inline: inline,
          wrap: wrap,
          defaultColor: defaultColor,
          a11y: a11y,
          onChange: (color: string) => {
            // Validate color format for security
            if (isValidColor(color)) {
              setCurrentValue(color);
              onChange(color);
            }
          },
          onClose: onClose,
          onOpen: onOpen,
          onInput: (color: string) => {
            if (isValidColor(color)) {
              onInput?.(color);
            }
          },
        });

        // Initialize Coloris
        window.Coloris.init();
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing Coloris:', error);
        // Fallback to native color picker
        fallbackToNativeColorPicker();
      }
    }
  }, [
    theme,
    format,
    swatches,
    swatchesOnly,
    alpha,
    focusInput,
    selectInput,
    clearButton,
    clearLabel,
    onChange,
    onClose,
    onOpen,
    onInput,
    inline,
    wrap,
    defaultColor,
    a11y,
    isInitialized,
    isColorisLoaded,
  ]);

  // Update value when prop changes
  useEffect(() => {
    if (value !== currentValue && isValidColor(value)) {
      setCurrentValue(value);
      if (inputRef.current) {
        inputRef.current.value = value;
      }
    }
  }, [value, currentValue]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.Coloris) {
        try {
          window.Coloris.close();
        } catch (error) {
          console.error('Error closing Coloris:', error);
        }
      }
    };
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (isValidColor(newValue)) {
        setCurrentValue(newValue);
        onChange(newValue);
      }
    },
    [onChange]
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Handle keyboard navigation
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  }, []);

  const generateId = useCallback(() => {
    return id || `color-picker-${Math.random().toString(36).substr(2, 9)}`;
  }, [id]);

  const inputId = generateId();

  // Security: Validate color format
  const isValidColor = (color: string): boolean => {
    if (!color) return false;

    // Allow hex colors (#fff, #ffffff)
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(color)) return true;

    // Allow rgb/rgba colors
    const rgbRegex =
      /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)$/;
    if (rgbRegex.test(color)) return true;

    // Allow hsl/hsla colors
    const hslRegex =
      /^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[\d.]+\s*)?\)$/;
    if (hslRegex.test(color)) return true;

    // Allow named colors (basic set)
    const namedColors = [
      'black',
      'white',
      'red',
      'green',
      'blue',
      'yellow',
      'cyan',
      'magenta',
      'gray',
      'grey',
      'orange',
      'purple',
      'pink',
      'brown',
      'lime',
      'navy',
      'teal',
      'silver',
      'gold',
      'maroon',
      'olive',
      'aqua',
      'fuchsia',
    ];
    if (namedColors.includes(color.toLowerCase())) return true;

    return false;
  };

  // Fallback to native color picker
  const fallbackToNativeColorPicker = () => {
    if (inputRef.current) {
      inputRef.current.type = 'color';
      inputRef.current.removeAttribute('data-coloris');
      console.log('Falling back to native color picker');
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        ...style,
      }}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          style={{
            display: 'block',
            fontSize: responsive.smallFontSize,
            fontWeight: '500',
            color: '#333',
            marginBottom: '8px',
          }}
        >
          {label}
          {required && <span style={{ color: '#d32f2f' }}> *</span>}
        </label>
      )}

      {/* Color Input */}
      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="text"
          value={currentValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel || label || 'Color picker'}
          aria-describedby={ariaDescribedBy}
          aria-invalid={required && !currentValue ? 'true' : 'false'}
          data-coloris
          data-coloris-theme={theme}
          data-coloris-format={format}
          data-coloris-alpha={alpha}
          data-coloris-swatches={swatches.join(',')}
          data-coloris-swatches-only={swatchesOnly}
          data-coloris-inline={inline}
          data-coloris-wrap={wrap}
          data-coloris-default-color={defaultColor}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            fontSize: responsive.smallFontSize,
            fontFamily: showHex ? 'monospace' : 'inherit',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            transition: 'all 0.2s ease',
            position: 'relative',
            paddingLeft: showPreview ? '48px' : '16px',
          }}
          onFocus={(e) => {
            if (!disabled) {
              e.target.style.borderColor = '#1976d2';
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e0e0e0';
          }}
        />

        {/* Color Preview */}
        {showPreview && (
          <div
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              backgroundColor: currentValue || '#ffffff',
              border: '1px solid #ddd',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      {/* Color Information Display */}
      {(showHex || showRgb || showHsl) && currentValue && (
        <div
          style={{
            marginTop: '8px',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            fontSize: responsive.smallFontSize,
          }}
        >
          {showHex && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 8px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
              }}
            >
              <span style={{ fontWeight: '500', color: '#666' }}>HEX:</span>
              <code
                style={{
                  fontFamily: 'monospace',
                  color: '#333',
                  backgroundColor: '#f1f1f1',
                  padding: '2px 4px',
                  borderRadius: '3px',
                }}
              >
                {currentValue}
              </code>
            </div>
          )}

          {showRgb && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 8px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
              }}
            >
              <span style={{ fontWeight: '500', color: '#666' }}>RGB:</span>
              <code
                style={{
                  fontFamily: 'monospace',
                  color: '#333',
                  backgroundColor: '#f1f1f1',
                  padding: '2px 4px',
                  borderRadius: '3px',
                }}
              >
                {hexToRgb(currentValue)}
              </code>
            </div>
          )}

          {showHsl && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 8px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
              }}
            >
              <span style={{ fontWeight: '500', color: '#666' }}>HSL:</span>
              <code
                style={{
                  fontFamily: 'monospace',
                  color: '#333',
                  backgroundColor: '#f1f1f1',
                  padding: '2px 4px',
                  borderRadius: '3px',
                }}
              >
                {hexToHsl(currentValue)}
              </code>
            </div>
          )}
        </div>
      )}

      {/* Accessibility Instructions */}
      <div
        style={{
          marginTop: '4px',
          fontSize: responsive.smallFontSize,
          color: '#666',
        }}
      >
        <span className="sr-only">{a11y.instruction}</span>
      </div>

      {/* Security Warning for Invalid Colors */}
      {currentValue && !isValidColor(currentValue) && (
        <div
          style={{
            marginTop: '8px',
            padding: '8px 12px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '4px',
            fontSize: responsive.smallFontSize,
            color: '#856404',
          }}
        >
          ⚠️ Invalid color format. Please use a valid hex, RGB, HSL, or named
          color.
        </div>
      )}
    </div>
  );
}

// Utility functions for color conversion
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `${r}, ${g}, ${b}`;
  }
  return '0, 0, 0';
}

function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
  }
  return '0, 0%, 0%';
}

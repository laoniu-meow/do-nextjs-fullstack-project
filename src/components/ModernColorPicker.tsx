'use client';

import { useState, useRef, useEffect, useCallback, useId } from 'react';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';
import {
  getCrossPlatformStyles,
  getPlatformCSS,
} from '@/utils/crossPlatformStyles';

interface ModernColorPickerProps {
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
  showAlpha?: boolean;
  showSwatches?: boolean;
  showHistory?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'minimal' | 'advanced';
  onClose?: () => void;
  onOpen?: () => void;
}

interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  alpha: number;
}

export default function ModernColorPicker({
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
  showAlpha = true,
  showSwatches = true,
  showHistory = true,
  theme = 'light',
  size = 'medium',
  variant = 'default',
  onClose,
  onOpen,
}: ModernColorPickerProps) {
  const responsive = useResponsiveStyles();
  const crossPlatformStyles = getCrossPlatformStyles(responsive);
  const platformCSS = getPlatformCSS(responsive);

  // Convert RGB to HSL
  const rgbToHsl = useCallback((r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
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

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }, []);

  // Convert RGB to Hex
  const rgbToHex = useCallback((r: number, g: number, b: number): string => {
    return (
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  }, []);

  // Parse color string to Color object
  const parseColor = useCallback(
    (colorStr: string): Color => {
      // Handle SSR - return default color if document is not available
      if (typeof document === 'undefined') {
        return {
          hex: '#000000',
          rgb: { r: 0, g: 0, b: 0 },
          hsl: { h: 0, s: 0, l: 0 },
          alpha: 1,
        };
      }

      const tempDiv = document.createElement('div');
      tempDiv.style.color = colorStr;
      document.body.appendChild(tempDiv);
      const computedColor = getComputedStyle(tempDiv).color;
      document.body.removeChild(tempDiv);

      const rgbMatch = computedColor.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
      );
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        const a = rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1;

        const hsl = rgbToHsl(r, g, b);
        return {
          hex: rgbToHex(r, g, b),
          rgb: { r, g, b },
          hsl,
          alpha: a,
        };
      }

      return {
        hex: '#000000',
        rgb: { r: 0, g: 0, b: 0 },
        hsl: { h: 0, s: 0, l: 0 },
        alpha: 1,
      };
    },
    [rgbToHsl, rgbToHex]
  );

  // Use React's useId for guaranteed stable IDs
  const reactId = useId();
  const inputId = id || `modern-color-picker-${reactId}`;

  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState<Color>(() => {
    // Only parse color on client side to prevent hydration mismatch
    if (typeof window === 'undefined') {
      return {
        hex: value || '#000000',
        rgb: { r: 0, g: 0, b: 0 },
        hsl: { h: 0, s: 0, l: 0 },
        alpha: 1,
      };
    }
    return parseColor(value || '#000000');
  });
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [lightness, setLightness] = useState(0);
  const [alpha, setAlpha] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const pickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add client-side only state to prevent hydration mismatch
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Convert HSL to RGB
  const hslToRgb = useCallback((h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }, []);

  // Handle color change
  const handleColorChange = useCallback(
    (color: Color) => {
      setCurrentColor(color);
      const colorString =
        color.alpha < 1
          ? `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.alpha})`
          : color.hex;

      onChange(colorString);

      // Add to history
      if (showHistory && !colorHistory.includes(colorString)) {
        setColorHistory((prev) => [colorString, ...prev.slice(0, 9)]);
      }
    },
    [onChange, showHistory, colorHistory]
  );

  // Handle click outside (now handled by backdrop overlay)
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(!isOpen);
        if (!isOpen) {
          onOpen?.();
        } else {
          onClose?.();
        }
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        onClose?.();
      }
    },
    [isOpen, onOpen, onClose]
  );

  // --- Drag state for SL and sliders ---
  const [dragTarget, setDragTarget] = useState<null | 'sl' | 'hue' | 'alpha'>(
    null
  );

  // Update color when HSL changes
  useEffect(() => {
    const rgb = hslToRgb(hue, saturation, lightness);
    const newColor: Color = {
      hex: rgbToHex(rgb.r, rgb.g, rgb.b),
      rgb,
      hsl: { h: hue, s: saturation, l: lightness },
      alpha,
    };
    console.log(
      'HSL changed - hue:',
      hue,
      'sat:',
      saturation,
      'light:',
      lightness,
      'new hex:',
      newColor.hex
    );
    setCurrentColor(newColor);

    // Call onChange when color changes during drag
    if (dragTarget) {
      const colorString =
        newColor.alpha < 1
          ? `rgba(${newColor.rgb.r}, ${newColor.rgb.g}, ${newColor.rgb.b}, ${newColor.alpha})`
          : newColor.hex;
      onChange(colorString);
    }
  }, [
    hue,
    saturation,
    lightness,
    alpha,
    hslToRgb,
    rgbToHex,
    dragTarget,
    onChange,
  ]);

  // Initialize color properly on client side (but not during drag)
  useEffect(() => {
    if (isClient && value && !dragTarget) {
      const parsedColor = parseColor(value);
      console.log('Initializing color:', value, 'parsed:', parsedColor);
      setCurrentColor(parsedColor);
      setHue(parsedColor.hsl.h);
      setSaturation(parsedColor.hsl.s);
      setLightness(parsedColor.hsl.l);
      setAlpha(parsedColor.alpha);
    }
  }, [isClient, value, dragTarget, parseColor]);

  // Update color when value prop changes (but not during drag)
  useEffect(() => {
    if (value && value !== currentColor.hex && !dragTarget) {
      const parsedColor = parseColor(value);
      setCurrentColor(parsedColor);
      setHue(parsedColor.hsl.h);
      setSaturation(parsedColor.hsl.s);
      setLightness(parsedColor.hsl.l);
      setAlpha(parsedColor.alpha);
    }
  }, [value, currentColor.hex, dragTarget, parseColor]);

  // --- Mouse event handlers for drag ---
  useEffect(() => {
    if (!dragTarget) return;
    function onMove(e: MouseEvent) {
      if (!pickerRef.current) return;
      console.log('Mouse move, dragTarget:', dragTarget);
      const rect = pickerRef.current.getBoundingClientRect();
      if (dragTarget === 'sl') {
        const slRect = document
          .getElementById(inputId + '-sl')
          ?.getBoundingClientRect();
        if (!slRect) return;
        const x = Math.max(
          0,
          Math.min(1, (e.clientX - slRect.left) / slRect.width)
        );
        const y = Math.max(
          0,
          Math.min(1, (e.clientY - slRect.top) / slRect.height)
        );
        console.log(
          'Setting saturation:',
          x * 100,
          'lightness:',
          (1 - y) * 100
        );
        setSaturation(x * 100);
        setLightness((1 - y) * 100);
      } else if (dragTarget === 'hue') {
        const hueRect = document
          .getElementById(inputId + '-hue')
          ?.getBoundingClientRect();
        if (!hueRect) return;
        const x = Math.max(
          0,
          Math.min(1, (e.clientX - hueRect.left) / hueRect.width)
        );
        setHue(x * 360);
      } else if (dragTarget === 'alpha') {
        const alphaRect = document
          .getElementById(inputId + '-alpha')
          ?.getBoundingClientRect();
        if (!alphaRect) return;
        const x = Math.max(
          0,
          Math.min(1, (e.clientX - alphaRect.left) / alphaRect.width)
        );
        setAlpha(x);
      }
    }
    function onUp() {
      setDragTarget(null);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [dragTarget, inputId]);

  // Predefined color swatches
  const colorSwatches = [
    '#ff0000',
    '#ff8000',
    '#ffff00',
    '#80ff00',
    '#00ff00',
    '#00ff80',
    '#00ffff',
    '#0080ff',
    '#0000ff',
    '#8000ff',
    '#ff00ff',
    '#ff0080',
    '#ff4040',
    '#ff8040',
    '#ffff40',
    '#80ff40',
    '#40ff40',
    '#40ff80',
    '#40ffff',
    '#4080ff',
  ];

  // Theme styles
  const themeStyles = {
    light: {
      background: '#ffffff',
      border: '#e0e0e0',
      text: '#333333',
      shadow: '0 4px 20px rgba(0,0,0,0.15)',
    },
    dark: {
      background: '#2d2d2d',
      border: '#444444',
      text: '#ffffff',
      shadow: '0 4px 20px rgba(0,0,0,0.3)',
    },
    auto: {
      background: '#ffffff',
      border: '#e0e0e0',
      text: '#333333',
      shadow: '0 4px 20px rgba(0,0,0,0.15)',
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  // Size styles
  const sizeStyles = {
    small: {
      width: '280px',
      height: '320px',
      fontSize: '12px',
    },
    medium: {
      width: '320px',
      height: '360px',
      fontSize: '14px',
    },
    large: {
      width: '360px',
      height: '400px',
      fontSize: '16px',
    },
  };

  const currentSize = sizeStyles[size];

  // Only render the component content on the client side
  if (!isClient) {
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
              color: '#333333',
              marginBottom: '8px',
            }}
          >
            {label}
            {required && <span style={{ color: '#d32f2f' }}> *</span>}
          </label>
        )}

        {/* Placeholder input during SSR */}
        <input
          id={inputId}
          name={name}
          type="text"
          defaultValue={value || '#000000'}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel || label || 'Modern color picker'}
          aria-describedby={ariaDescribedBy}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #e0e0e0',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            color: '#333333',
            fontSize: responsive.smallFontSize,
            fontFamily: showHex ? 'monospace' : 'inherit',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            transition: 'all 0.2s ease',
            position: 'relative',
            paddingLeft: showPreview ? '48px' : '16px',
          }}
        />

        {/* Placeholder color preview during SSR */}
        {showPreview && (
          <div
            style={{
              position: 'absolute',
              left: size === 'small' ? '8px' : '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: size === 'small' ? '20px' : '24px',
              height: size === 'small' ? '20px' : '24px',
              borderRadius: size === 'small' ? '4px' : '8px',
              background: `linear-gradient(45deg, transparent 50%, rgba(0,0,0,0.1) 50%)`,
              border: '2px solid #ffffff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '6px',
                backgroundColor: value || '#000000',
              }}
            />
          </div>
        )}
      </div>
    );
  }

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
            color: currentTheme.text,
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
          value={currentColor.hex}
          onChange={(e) => {
            const newColor = parseColor(e.target.value);
            setCurrentColor(newColor);
            setHue(newColor.hsl.h);
            setSaturation(newColor.hsl.s);
            setLightness(newColor.hsl.l);
            setAlpha(newColor.alpha);
            handleColorChange(newColor);
          }}
          onClick={() => {
            if (!disabled && !isOpen) {
              setIsOpen(true);
              onOpen?.();
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel || label || 'Modern color picker'}
          aria-describedby={ariaDescribedBy}
          aria-invalid={required && !currentColor.hex ? 'true' : 'false'}
          style={{
            width: '100%',
            padding:
              size === 'small' ? crossPlatformStyles.inputPadding : '12px 16px',
            border:
              size === 'small'
                ? '1px solid #d1d5db'
                : `1px solid ${currentTheme.border}`,
            borderRadius:
              size === 'small' ? crossPlatformStyles.inputBorderRadius : '12px',
            backgroundColor:
              size === 'small' ? 'white' : currentTheme.background,
            color: currentTheme.text,
            fontSize:
              size === 'small' ? crossPlatformStyles.inputFontSize : '13px',
            fontFamily: showHex ? 'monospace' : 'inherit',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            transition: 'all 0.2s ease',
            position: 'relative',
            paddingLeft: showPreview
              ? size === 'small'
                ? '40px'
                : '48px'
              : size === 'small'
                ? '10px'
                : '16px',
            minHeight:
              size === 'small' ? crossPlatformStyles.inputMinHeight : 'auto',
            height:
              size === 'small' ? crossPlatformStyles.inputMinHeight : 'auto',
            ...(responsive.isIOS && size === 'small' ? platformCSS.ios : {}),
            ...(responsive.isAndroid && size === 'small'
              ? platformCSS.android
              : {}),
            ...(responsive.isWindows && size === 'small'
              ? platformCSS.windows
              : {}),
            ...(responsive.isMac && size === 'small' ? platformCSS.mac : {}),
            ...(responsive.isTouchDevice && size === 'small'
              ? platformCSS.touch
              : {}),
          }}
          onFocus={(e) => {
            if (!disabled) {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor =
              size === 'small' ? '#d1d5db' : currentTheme.border;
            e.target.style.boxShadow = 'none';
          }}
        />

        {/* Color Preview */}
        {showPreview && (
          <div
            style={{
              position: 'absolute',
              left: size === 'small' ? '8px' : '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: size === 'small' ? '20px' : '24px',
              height: size === 'small' ? '20px' : '24px',
              borderRadius: size === 'small' ? '4px' : '8px',
              background: `linear-gradient(45deg, transparent 50%, rgba(0,0,0,0.1) 50%)`,
              border: '2px solid #ffffff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (!disabled) {
                setIsOpen(!isOpen);
                if (!isOpen) {
                  onOpen?.();
                } else {
                  onClose?.();
                }
              }
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '6px',
                backgroundColor: currentColor.hex,
                opacity: currentColor.alpha,
              }}
            />
          </div>
        )}
      </div>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
          onClick={() => {
            setIsOpen(false);
            onClose?.();
          }}
        />
      )}

      {/* Modern Color Picker Dropdown */}
      {isOpen && (
        <div
          ref={pickerRef}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10000,
            width: currentSize.width,
            height: currentSize.height,
            backgroundColor: currentTheme.background,
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '16px',
            boxShadow: currentTheme.shadow,
            padding: '20px',
            backdropFilter: 'blur(10px)',
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'auto',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: '600',
                color: currentTheme.text,
              }}
            >
              Color Picker
            </h3>
            <button
              onClick={() => {
                setIsOpen(false);
                onClose?.();
              }}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                color: currentTheme.text,
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              ×
            </button>
          </div>

          {/* Saturation/Lightness Picker */}
          <div
            id={inputId + '-sl'}
            style={{
              position: 'relative',
              width: '100%',
              height: '120px',
              borderRadius: '12px',
              background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`,
              marginBottom: '16px',
              cursor: dragTarget === 'sl' ? 'grabbing' : 'crosshair',
              overflow: 'hidden',
            }}
            onMouseDown={(e) => {
              setDragTarget('sl');
              const slRect = (
                e.currentTarget as HTMLDivElement
              ).getBoundingClientRect();
              const x = Math.max(
                0,
                Math.min(1, (e.clientX - slRect.left) / slRect.width)
              );
              const y = Math.max(
                0,
                Math.min(1, (e.clientY - slRect.top) / slRect.height)
              );
              setSaturation(x * 100);
              setLightness((1 - y) * 100);
            }}
          >
            {/* Marker */}
            <div
              style={{
                position: 'absolute',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '3px solid #ffffff',
                boxShadow: '0 0 6px rgba(0,0,0,0.6)',
                left: `${saturation}%`,
                top: `${100 - lightness}%`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Hue Slider */}
          <div
            id={inputId + '-hue'}
            style={{
              position: 'relative',
              width: '100%',
              height: '12px',
              borderRadius: '6px',
              background:
                'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
              marginBottom: '16px',
              cursor: dragTarget === 'hue' ? 'grabbing' : 'pointer',
            }}
            onMouseDown={(e) => {
              setDragTarget('hue');
              const hueRect = (
                e.currentTarget as HTMLDivElement
              ).getBoundingClientRect();
              const x = Math.max(
                0,
                Math.min(1, (e.clientX - hueRect.left) / hueRect.width)
              );
              setHue(x * 360);
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '3px solid #ffffff',
                boxShadow: '0 0 6px rgba(0,0,0,0.6)',
                left: `${(hue / 360) * 100}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Alpha Slider */}
          {showAlpha && (
            <div
              id={inputId + '-alpha'}
              style={{
                position: 'relative',
                width: '100%',
                height: '12px',
                borderRadius: '6px',
                background: `linear-gradient(90deg, transparent, ${currentColor.hex})`,
                marginBottom: '16px',
                cursor: dragTarget === 'alpha' ? 'grabbing' : 'pointer',
              }}
              onMouseDown={(e) => {
                setDragTarget('alpha');
                const alphaRect = (
                  e.currentTarget as HTMLDivElement
                ).getBoundingClientRect();
                const x = Math.max(
                  0,
                  Math.min(1, (e.clientX - alphaRect.left) / alphaRect.width)
                );
                setAlpha(x);
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '3px solid #ffffff',
                  boxShadow: '0 0 6px rgba(0,0,0,0.6)',
                  left: `${alpha * 100}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          )}

          {/* Color Information */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            {showHex && (
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    color: currentTheme.text,
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  HEX
                </label>
                <input
                  type="text"
                  value={currentColor.hex}
                  onChange={(e) => {
                    const newColor = parseColor(e.target.value);
                    setCurrentColor(newColor);
                    setHue(newColor.hsl.h);
                    setSaturation(newColor.hsl.s);
                    setLightness(newColor.hsl.l);
                    setAlpha(newColor.alpha);
                    handleColorChange(newColor);
                  }}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '6px',
                    backgroundColor: currentTheme.background,
                    color: currentTheme.text,
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                />
              </div>
            )}

            {showRgb && (
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    color: currentTheme.text,
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  RGB
                </label>
                <input
                  type="text"
                  value={`${currentColor.rgb.r}, ${currentColor.rgb.g}, ${currentColor.rgb.b}`}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '6px',
                    backgroundColor: currentTheme.background,
                    color: currentTheme.text,
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                />
              </div>
            )}

            {showHsl && (
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    color: currentTheme.text,
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  HSL
                </label>
                <input
                  type="text"
                  value={`${currentColor.hsl.h}, ${currentColor.hsl.s}%, ${currentColor.hsl.l}%`}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '6px',
                    backgroundColor: currentTheme.background,
                    color: currentTheme.text,
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                />
              </div>
            )}
          </div>

          {/* Color Swatches */}
          {showSwatches && (
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  fontSize: '12px',
                  color: currentTheme.text,
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Swatches
              </label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(10, 1fr)',
                  gap: '6px',
                }}
              >
                {colorSwatches.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const newColor = parseColor(color);
                      setCurrentColor(newColor);
                      setHue(newColor.hsl.h);
                      setSaturation(newColor.hsl.s);
                      setLightness(newColor.hsl.l);
                      setAlpha(newColor.alpha);
                      handleColorChange(newColor);
                    }}
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '2px solid #ffffff',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      backgroundColor: color,
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Color History */}
          {showHistory && colorHistory.length > 0 && (
            <div>
              <label
                style={{
                  fontSize: '12px',
                  color: currentTheme.text,
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                History
              </label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(10, 1fr)',
                  gap: '6px',
                }}
              >
                {colorHistory.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const newColor = parseColor(color);
                      setCurrentColor(newColor);
                      setHue(newColor.hsl.h);
                      setSaturation(newColor.hsl.s);
                      setLightness(newColor.hsl.l);
                      setAlpha(newColor.alpha);
                      handleColorChange(newColor);
                    }}
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '2px solid #ffffff',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      backgroundColor: color,
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Apply Button */}
          <button
            onClick={() => {
              handleColorChange(currentColor);
              setIsOpen(false);
              onClose?.();
            }}
            style={{
              width: '100%',
              padding: '10px 16px',
              backgroundColor: '#1976d2',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1565c0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1976d2';
            }}
          >
            Apply Color
          </button>
        </div>
      )}
    </div>
  );
}

export const HEADER_HEIGHT_OPTIONS = [
  { value: '3rem', label: 'Small (48px)' },
  { value: '5rem', label: 'Medium (80px)' },
  { value: '7rem', label: 'Large (112px)' },
] as const;

export const HEADER_POSITION_OPTIONS = [
  { value: 'fixed', label: 'Fixed' },
  { value: 'sticky', label: 'Sticky' },
  { value: 'static', label: 'Static' },
] as const;

export const BORDER_SHADOW_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'light', label: 'Light' },
  { value: 'medium', label: 'Medium' },
  { value: 'heavy', label: 'Heavy' },
] as const;

export const LOGO_ORIENTATION_OPTIONS = [
  { value: 'portrait', label: 'Portrait' },
  { value: 'landscape', label: 'Landscape' },
] as const;

export const LOGO_SIZE_OPTIONS = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
] as const;

export const LOGO_SHADOW_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'light', label: 'Light' },
  { value: 'medium', label: 'Medium' },
  { value: 'heavy', label: 'Heavy' },
  { value: 'glow', label: 'Glow' },
] as const;

export const LOGO_SHADOW_COLOR_OPTIONS = [
  { value: 'black', label: 'Black' },
  { value: 'grey', label: 'Grey' },
  { value: 'white', label: 'White' },
] as const;

export const LOGO_SHADOW_DIRECTION_OPTIONS = [
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-right', label: 'Bottom Right' },
] as const;

export const BUTTON_SHAPE_OPTIONS = [
  { value: 'rounded', label: 'Rounded' },
  { value: 'square', label: 'Square' },
] as const;

export const BUTTON_SIZE_OPTIONS = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
] as const;

export const DEFAULT_HEADER_CONFIG = {
  backgroundColor: '#ffffff',
  headerHeight: '5rem',
  headerPosition: 'fixed',
  borderColor: '#e0e0e0',
  borderHeight: '1px',
  borderShadow: 'none',
  logoWidth: '4.35rem',
  logoHeight: '6.5rem',
  logoOrientation: 'portrait',
  logoShadow: 'none',
  logoShadowColor: 'black',
  logoShadowDirection: 'bottom-right',
} as const; 
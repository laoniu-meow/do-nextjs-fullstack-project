// Simplified Toggle Menu Button Configuration Types

export type ButtonShape = 'circle' | 'rounded' | 'square';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ShadowType = 'none' | 'light' | 'medium' | 'heavy';

export interface ToggleMenuButtonConfig {
  // Basic Configuration
  enabled: boolean;
  shape: ButtonShape;
  size: ButtonSize;
  
  // Visual Configuration
  backgroundColor: string;
  shadowType: ShadowType;
  
  // Icon Configuration
  iconName: string;
  iconColor: string;
  iconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  // Responsive Configuration (auto-based on size)
  responsive: {
    mobile: {
      size: ButtonSize;
    };
    tablet: {
      size: ButtonSize;
    };
    desktop: {
      size: ButtonSize;
    };
  };
}

// Default configuration
export const defaultToggleMenuConfig: ToggleMenuButtonConfig = {
  enabled: true,
  shape: 'square',
  size: 'medium',
  
  backgroundColor: '#1976d2',
  shadowType: 'medium',
  
  iconName: 'menu',
  iconColor: '#ffffff',
  iconSize: 'md',
  
  responsive: {
    mobile: {
      size: 'small',
    },
    tablet: {
      size: 'medium',
    },
    desktop: {
      size: 'medium',
    },
  },
};

// Size mapping for different screen sizes
export const buttonSizeMap = {
  small: {
    mobile: { width: '40px', height: '40px', iconSize: 16 },
    tablet: { width: '44px', height: '44px', iconSize: 18 },
    desktop: { width: '48px', height: '48px', iconSize: 20 },
  },
  medium: {
    mobile: { width: '48px', height: '48px', iconSize: 20 },
    tablet: { width: '52px', height: '52px', iconSize: 22 },
    desktop: { width: '56px', height: '56px', iconSize: 24 },
  },
  large: {
    mobile: { width: '56px', height: '56px', iconSize: 24 },
    tablet: { width: '60px', height: '60px', iconSize: 26 },
    desktop: { width: '64px', height: '64px', iconSize: 28 },
  },
};

// Shape mapping
export const shapeMap = {
  circle: '50%',
  rounded: '12px',
  square: '0px',
  pill: '9999px',
};

// Shadow mapping
export const shadowMap = {
  none: 'none',
  light: '0 2px 4px rgba(0,0,0,0.1)',
  medium: '0 4px 8px rgba(0,0,0,0.15)',
  heavy: '0 8px 16px rgba(0,0,0,0.2)',
}; 
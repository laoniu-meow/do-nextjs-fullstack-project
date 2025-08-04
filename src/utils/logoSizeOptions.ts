export interface LogoSizeOption {
  label: string;
  width: string;
  height: string;
  description: string;
}

export interface LogoSizeOptions {
  portrait: {
    small: LogoSizeOption;
    medium: LogoSizeOption;
    large: LogoSizeOption;
  };
  landscape: {
    small: LogoSizeOption;
    medium: LogoSizeOption;
    large: LogoSizeOption;
  };
}

export const logoSizeOptions: LogoSizeOptions = {
  portrait: {
    small: {
      label: 'Small Portrait',
      width: '3rem',
      height: '4.5rem',
      description: 'Compact portrait logo (48px × 72px)',
    },
    medium: {
      label: 'Medium Portrait',
      width: '4rem',
      height: '6rem',
      description: 'Standard portrait logo (64px × 96px)',
    },
    large: {
      label: 'Large Portrait',
      width: '5rem',
      height: '7.5rem',
      description: 'Large portrait logo (80px × 120px)',
    },
  },
  landscape: {
    small: {
      label: 'Small Landscape',
      width: '4.5rem',
      height: '3rem',
      description: 'Compact landscape logo (72px × 48px)',
    },
    medium: {
      label: 'Medium Landscape',
      width: '6rem',
      height: '4rem',
      description: 'Standard landscape logo (96px × 64px)',
    },
    large: {
      label: 'Large Landscape',
      width: '7.5rem',
      height: '5rem',
      description: 'Large landscape logo (120px × 80px)',
    },
  },
};

export const getLogoSizeOptions = (orientation: 'portrait' | 'landscape') => {
  return logoSizeOptions[orientation];
};

export const getLogoSizeByOrientationAndSize = (
  orientation: 'portrait' | 'landscape',
  size: 'small' | 'medium' | 'large'
): LogoSizeOption => {
  return logoSizeOptions[orientation][size];
};

export const getLogoSizeLabel = (
  orientation: 'portrait' | 'landscape',
  size: 'small' | 'medium' | 'large'
): string => {
  return logoSizeOptions[orientation][size].label;
};

export const getLogoSizeDescription = (
  orientation: 'portrait' | 'landscape',
  size: 'small' | 'medium' | 'large'
): string => {
  return logoSizeOptions[orientation][size].description;
};

// Helper function to determine current logo size based on width/height
export const getCurrentLogoSize = (
  width: string,
  height: string,
  orientation: 'portrait' | 'landscape'
): 'small' | 'medium' | 'large' => {
  const options = logoSizeOptions[orientation];
  
  // Convert rem to numbers for comparison
  const widthNum = parseFloat(width.replace('rem', ''));
  const heightNum = parseFloat(height.replace('rem', ''));
  
  // Find the closest match
  const sizes = Object.entries(options) as [string, LogoSizeOption][];
  let closestSize: 'small' | 'medium' | 'large' = 'medium';
  let minDifference = Infinity;
  
  sizes.forEach(([size, option]) => {
    const optionWidth = parseFloat(option.width.replace('rem', ''));
    const optionHeight = parseFloat(option.height.replace('rem', ''));
    
    const difference = Math.abs(widthNum - optionWidth) + Math.abs(heightNum - optionHeight);
    
    if (difference < minDifference) {
      minDifference = difference;
      closestSize = size as 'small' | 'medium' | 'large';
    }
  });
  
  return closestSize;
};

// Responsive logo size adjustments
export const getResponsiveLogoSize = (
  baseSize: 'small' | 'medium' | 'large',
  screenSize: 'mobile' | 'tablet' | 'desktop'
): 'small' | 'medium' | 'large' => {
  const sizeMap = {
    mobile: {
      small: 'small' as const,
      medium: 'small' as const,
      large: 'medium' as const,
    },
    tablet: {
      small: 'small' as const,
      medium: 'medium' as const,
      large: 'large' as const,
    },
    desktop: {
      small: 'medium' as const,
      medium: 'large' as const,
      large: 'large' as const,
    },
  };
  
  return sizeMap[screenSize][baseSize];
}; 
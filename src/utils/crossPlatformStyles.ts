import { ResponsiveStyles } from '@/hooks/useResponsiveStyles';

export interface CrossPlatformStyles {
  // Input styling
  inputPadding: string;
  inputBorderRadius: string;
  inputFontSize: string;
  inputMinHeight: string;
  
  // Button styling
  buttonPadding: string;
  buttonBorderRadius: string;
  buttonMinHeight: string;
  
  // Touch targets
  touchTargetMinSize: string;
  touchSpacing: string;
  
  // Platform-specific adjustments
  iosAdjustments: {
    inputPadding: string;
    buttonPadding: string;
    fontSmoothing: string;
  };
  androidAdjustments: {
    inputPadding: string;
    buttonPadding: string;
    touchFeedback: string;
  };
  windowsAdjustments: {
    inputPadding: string;
    buttonPadding: string;
    scrollbarWidth: string;
  };
  macAdjustments: {
    inputPadding: string;
    buttonPadding: string;
    fontSmoothing: string;
  };
}

export const getCrossPlatformStyles = (responsive: ResponsiveStyles): CrossPlatformStyles => {
  const isTouch = responsive.isTouchDevice;
  const isMobile = responsive.isMobile;
  
  // Base styles
  const baseInputPadding = isTouch ? '12px 16px' : '8px 10px';
  const baseButtonPadding = isTouch ? '14px 20px' : '10px 16px';
  const baseBorderRadius = '4px';
  const baseFontSize = '13px';
  const baseMinHeight = isTouch ? '44px' : '36px';
  
  return {
    // Input styling
    inputPadding: baseInputPadding,
    inputBorderRadius: baseBorderRadius,
    inputFontSize: baseFontSize,
    inputMinHeight: baseMinHeight,
    
    // Button styling
    buttonPadding: baseButtonPadding,
    buttonBorderRadius: baseBorderRadius,
    buttonMinHeight: baseMinHeight,
    
    // Touch targets
    touchTargetMinSize: isTouch ? '44px' : '36px',
    touchSpacing: isTouch ? '8px' : '4px',
    
    // Platform-specific adjustments
    iosAdjustments: {
      inputPadding: responsive.isIOS ? '12px 16px' : baseInputPadding,
      buttonPadding: responsive.isIOS ? '14px 20px' : baseButtonPadding,
      fontSmoothing: '-webkit-font-smoothing: antialiased',
    },
    androidAdjustments: {
      inputPadding: responsive.isAndroid ? '12px 16px' : baseInputPadding,
      buttonPadding: responsive.isAndroid ? '14px 20px' : baseButtonPadding,
      touchFeedback: 'rgba(0, 0, 0, 0.1)',
    },
    windowsAdjustments: {
      inputPadding: responsive.isWindows ? '8px 12px' : baseInputPadding,
      buttonPadding: responsive.isWindows ? '10px 16px' : baseButtonPadding,
      scrollbarWidth: 'thin',
    },
    macAdjustments: {
      inputPadding: responsive.isMac ? '10px 14px' : baseInputPadding,
      buttonPadding: responsive.isMac ? '12px 18px' : baseButtonPadding,
      fontSmoothing: '-webkit-font-smoothing: antialiased',
    },
  };
};

// Platform-specific CSS properties
export const getPlatformCSS = (responsive: ResponsiveStyles) => {
  const styles = getCrossPlatformStyles(responsive);
  
  return {
    // iOS-specific styles
    ios: {
      WebkitAppearance: 'none' as const,
      WebkitFontSmoothing: 'antialiased' as const,
      MozOsxFontSmoothing: 'grayscale' as const,
      WebkitUserSelect: 'none' as const,
      WebkitTouchCallout: 'none' as const,
    },
    
    // Android-specific styles
    android: {
      WebkitTapHighlightColor: 'transparent',
      touchAction: 'manipulation' as const,
    },
    
    // Windows-specific styles
    windows: {
      msOverflowStyle: 'none' as const,
      scrollbarWidth: 'thin' as const,
    },
    
    // Mac-specific styles
    mac: {
      WebkitFontSmoothing: 'antialiased' as const,
      MozOsxFontSmoothing: 'grayscale' as const,
    },
    
    // Universal touch-friendly styles
    touch: responsive.isTouchDevice ? {
      cursor: 'pointer',
      userSelect: 'none' as const,
      WebkitUserSelect: 'none' as const,
      MozUserSelect: 'none' as const,
      msUserSelect: 'none' as const,
    } : {},
  };
};

// Safe area handling for notched devices
export const getSafeAreaStyles = () => {
  return {
    paddingTop: 'env(safe-area-inset-top)',
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  };
};

// Viewport meta tag recommendations
export const getViewportMeta = () => {
  return {
    width: 'device-width',
    initialScale: '1',
    maximumScale: '1',
    userScalable: 'no',
    viewportFit: 'cover',
  };
}; 
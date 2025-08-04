import { useState, useEffect, useCallback } from 'react';
import { getLogoSizeOptions, getCurrentLogoSize } from '@/utils/logoSizeOptions';

interface HeaderConfig {
  backgroundColor: string;
  headerHeight: string;
  headerPosition: string;
  borderColor: string;
  borderHeight: string;
  borderShadow: string;
  logoWidth: string;
  logoHeight: string;
  logoOrientation: string;
  logoShadow: string;
  logoShadowColor: string;
  logoShadowDirection: string;
}

interface UseHeaderSettingsReturn {
  headerConfig: HeaderConfig;
  setHeaderConfig: React.Dispatch<React.SetStateAction<HeaderConfig>>;
  currentLogoSize: 'small' | 'medium' | 'large';
  setCurrentLogoSize: React.Dispatch<React.SetStateAction<'small' | 'medium' | 'large'>>;
  hasChanges: boolean;
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  handleFieldChange: (field: string, value: string) => void;
  handleLogoOrientationChange: (orientation: string) => void;
  handlePredefinedLogoSizeChange: (size: 'small' | 'medium' | 'large') => void;
  getLogoDimensions: (orientation: string, size: string) => { width: string; height: string };
}

export const useHeaderSettings = (): UseHeaderSettingsReturn => {
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>({
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
  });

  const [currentLogoSize, setCurrentLogoSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [hasChanges, setHasChanges] = useState(false);

  const getLogoDimensions = useCallback((orientation: string, size: string) => {
    const baseWidth = size === 'small' ? 3 : size === 'medium' ? 4.35 : 5.5;
    const baseHeight = size === 'small' ? 4.5 : size === 'medium' ? 6.5 : 8.5;

    if (orientation === 'landscape') {
      return {
        width: `${baseWidth * 1.5}rem`,
        height: `${baseHeight}rem`,
      };
    } else {
      return {
        width: `${baseWidth}rem`,
        height: `${baseHeight}rem`,
      };
    }
  }, []);

  const handleFieldChange = useCallback((field: string, value: string) => {
    setHeaderConfig((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  }, []);

  const handleLogoOrientationChange = useCallback((orientation: string) => {
    const { width, height } = getLogoDimensions(orientation, currentLogoSize);

    setHeaderConfig((prev) => ({
      ...prev,
      logoOrientation: orientation,
      logoWidth: width,
      logoHeight: height,
    }));
    setHasChanges(true);
  }, [currentLogoSize, getLogoDimensions]);

  const handlePredefinedLogoSizeChange = useCallback((size: 'small' | 'medium' | 'large') => {
    setCurrentLogoSize(size);
    const logoSizeOption = getLogoSizeOptions(
      headerConfig.logoOrientation as 'portrait' | 'landscape'
    )[size];

    setHeaderConfig((prev) => ({
      ...prev,
      logoWidth: logoSizeOption.width,
      logoHeight: logoSizeOption.height,
    }));
    setHasChanges(true);
  }, [headerConfig.logoOrientation]);

  // Initialize current logo size when header config changes
  useEffect(() => {
    if (headerConfig.logoWidth && headerConfig.logoHeight) {
      const size = getCurrentLogoSize(
        headerConfig.logoWidth,
        headerConfig.logoHeight,
        headerConfig.logoOrientation as 'portrait' | 'landscape'
      );
      setCurrentLogoSize(size);
    }
  }, [headerConfig.logoWidth, headerConfig.logoHeight, headerConfig.logoOrientation]);

  return {
    headerConfig,
    setHeaderConfig,
    currentLogoSize,
    setCurrentLogoSize,
    hasChanges,
    setHasChanges,
    handleFieldChange,
    handleLogoOrientationChange,
    handlePredefinedLogoSizeChange,
    getLogoDimensions,
  };
}; 
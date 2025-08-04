import { useState, useCallback } from 'react';

export interface HeaderConfig {
  backgroundColor: string;
  headerHeight: string;
  headerPosition: string;
  borderColor: string;
  borderHeight: string;
  borderShadow: string;
  logoWidth: string;
  logoHeight: string;
  logoOrientation: string;
}

export const useHeaderConfig = (initialConfig?: Partial<HeaderConfig>) => {
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
    ...initialConfig,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateConfig = useCallback((updates: Partial<HeaderConfig>) => {
    setHeaderConfig(prev => ({
      ...prev,
      ...updates,
    }));
    setHasChanges(true);
  }, []);

  const updateField = useCallback((field: keyof HeaderConfig, value: string) => {
    setHeaderConfig(prev => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  }, []);

  const resetChanges = useCallback(() => {
    setHasChanges(false);
  }, []);

  const getLogoDimensions = useCallback((orientation: string, size: string) => {
    const sizeMap = {
      small: '5rem',
      medium: '6.5rem',
      large: '8rem',
    };

    const height = sizeMap[size as keyof typeof sizeMap] || '2.5rem';

    if (orientation === 'portrait') {
      const heightValue = parseFloat(height);
      const widthValue = heightValue * 0.67;
      return {
        width: `${widthValue}rem`,
        height: height,
      };
    } else {
      const heightValue = parseFloat(height);
      const widthValue = heightValue * 1.5;
      return {
        width: `${widthValue}rem`,
        height: height,
      };
    }
  }, []);

  const updateLogoOrientation = useCallback((orientation: string) => {
    const currentSize =
      headerConfig.logoHeight === '5rem'
        ? 'small'
        : headerConfig.logoHeight === '6.5rem'
          ? 'medium'
          : 'large';

    const dimensions = getLogoDimensions(orientation, currentSize);

    setHeaderConfig(prev => ({
      ...prev,
      logoOrientation: orientation,
      logoWidth: dimensions.width,
      logoHeight: dimensions.height,
    }));
    setHasChanges(true);
  }, [headerConfig.logoHeight, getLogoDimensions]);

  const updateLogoSize = useCallback((size: string) => {
    const dimensions = getLogoDimensions(headerConfig.logoOrientation, size);

    setHeaderConfig(prev => ({
      ...prev,
      logoWidth: dimensions.width,
      logoHeight: dimensions.height,
    }));
    setHasChanges(true);
  }, [headerConfig.logoOrientation, getLogoDimensions]);

  return {
    headerConfig,
    hasChanges,
    updateConfig,
    updateField,
    resetChanges,
    updateLogoOrientation,
    updateLogoSize,
    getLogoDimensions,
  };
}; 
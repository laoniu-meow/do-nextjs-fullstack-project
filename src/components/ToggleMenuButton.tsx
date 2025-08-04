import React, { useState } from 'react';
import { Icon } from '@/components/icons/IconLibrary';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';
import {
  ToggleMenuButtonConfig,
  defaultToggleMenuConfig,
  buttonSizeMap,
  shapeMap,
  shadowMap,
  ButtonSize,
  ButtonShape,
} from '@/types/toggleMenuConfig';

interface ToggleMenuButtonProps {
  config?: Partial<ToggleMenuButtonConfig>;
  onClick?: () => void;
  isOpen?: boolean;
  className?: string;
  isPreview?: boolean; // For preview mode in header settings
}

export const ToggleMenuButton: React.FC<ToggleMenuButtonProps> = ({
  config = {},
  onClick,
  isOpen = false,
  className = '',
  isPreview = false,
}) => {
  const responsive = useResponsiveStyles();
  const [isHovered, setIsHovered] = useState(false);

  // Merge with default config
  const finalConfig: ToggleMenuButtonConfig = {
    ...defaultToggleMenuConfig,
    ...config,
  };

  // Get responsive configuration based on screen size
  const getResponsiveConfig = () => {
    if (responsive.isMobile) {
      return {
        size: finalConfig.responsive.mobile.size,
      };
    } else if (responsive.isTablet) {
      return {
        size: finalConfig.responsive.tablet.size,
      };
    } else {
      return {
        size: finalConfig.responsive.desktop.size,
      };
    }
  };

  const responsiveConfig = getResponsiveConfig();

  // For preview mode, always use the main size setting
  // For actual usage, use the responsive configuration based on screen size
  const sizeToUse = isPreview ? finalConfig.size : responsiveConfig.size;
  const sizeConfig = buttonSizeMap[sizeToUse as ButtonSize];

  // Apply responsive scaling based on screen size
  const currentSize = responsive.isMobile
    ? sizeConfig.mobile
    : responsive.isTablet
      ? sizeConfig.tablet
      : sizeConfig.desktop;
  const borderRadius = shapeMap[finalConfig.shape as ButtonShape];
  const shadow = shadowMap[finalConfig.shadowType];

  // Button styles
  const buttonStyles: React.CSSProperties = {
    position: 'relative', // Always use relative positioning for proper flexbox integration
    width: currentSize.width,
    height: currentSize.height,
    borderRadius,
    backgroundColor: isHovered
      ? finalConfig.backgroundColor
      : finalConfig.backgroundColor,
    color: finalConfig.iconColor,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: `${currentSize.iconSize}px`,
    boxShadow: shadow,
    zIndex: isPreview ? 1 : 1001,
    transition: 'all 0.2s ease-in-out',
    border: 'none',
    outline: 'none',
    padding: 0, // Ensure no padding affects centering
  };

  // Icon styles
  const iconStyles: React.CSSProperties = {
    transition: 'all 0.2s ease-in-out',
    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  };

  if (!finalConfig.enabled) {
    return null;
  }

  return (
    <button
      style={buttonStyles}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`toggle-menu-button ${className}`}
      aria-label="Toggle menu"
      title="Toggle menu"
      role="button"
      tabIndex={0}
    >
      <div style={iconStyles}>
        <Icon
          name={finalConfig.iconName}
          size={finalConfig.iconSize}
          color="currentColor"
          className="flex items-center justify-center m-0 p-0"
        />
      </div>
    </button>
  );
};

// Hook for managing toggle menu button configuration
export const useToggleMenuButton = (
  initialConfig?: Partial<ToggleMenuButtonConfig>
) => {
  const [config, setConfig] = useState<ToggleMenuButtonConfig>({
    ...defaultToggleMenuConfig,
    ...initialConfig,
  });

  const updateConfig = (updates: Partial<ToggleMenuButtonConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const resetConfig = () => {
    setConfig(defaultToggleMenuConfig);
  };

  return {
    config,
    updateConfig,
    resetConfig,
  };
};

export default ToggleMenuButton;

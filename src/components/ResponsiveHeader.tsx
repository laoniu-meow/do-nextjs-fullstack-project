'use client';

import React from 'react';
import Image from 'next/image';
import ToggleMenuButton from './ToggleMenuButton';
import { ToggleMenuButtonConfig } from '@/types/toggleMenuConfig';

interface CompanyLogo {
  logo: string | null;
  companyName: string;
}

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
  logoShadow: string; // Shadow type: none, light, medium, heavy, glow
  logoShadowColor: string; // Shadow color: black, grey, white
  logoShadowDirection: string; // Shadow direction: top-right, bottom-right, etc.
}

interface ResponsiveHeaderProps {
  headerConfig: HeaderConfig;
  companyLogo: CompanyLogo | null;
  isLoading: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
  toggleMenuConfig?: ToggleMenuButtonConfig;
  onToggleMenu?: () => void;
  isMenuOpen?: boolean;
}

export default function ResponsiveHeader({
  headerConfig,
  companyLogo,
  isLoading,
  screenSize,
  toggleMenuConfig,
  onToggleMenu,
  isMenuOpen = false,
}: ResponsiveHeaderProps) {
  // Helper function to get border shadow CSS
  const getBorderShadow = (shadowType: string) => {
    switch (shadowType) {
      case 'light':
        return '0 1px 3px rgba(0,0,0,0.1)';
      case 'medium':
        return '0 2px 8px rgba(0,0,0,0.15)';
      case 'heavy':
        return '0 4px 12px rgba(0,0,0,0.2)';
      default:
        return 'none';
    }
  };

  // Helper function to determine if a color is light or dark
  const isLightColor = (color: string) => {
    try {
      // Convert hex to RGB
      const hex = color.replace('#', '');
      if (hex.length !== 6) return true; // Default to light if invalid hex

      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);

      // Calculate luminance
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.5;
    } catch (error) {
      return true; // Default to light color if parsing fails
    }
  };

  // Helper function to get shadow color based on user selection
  const getShadowColor = (shadowColor: string) => {
    switch (shadowColor) {
      case 'black':
        return 'rgba(0,0,0,';
      case 'grey':
        return 'rgba(128,128,128,';
      case 'white':
        return 'rgba(255,255,255,';
      default:
        return 'rgba(0,0,0,'; // Default to black
    }
  };

  // Helper function to get shadow direction offsets
  const getShadowDirection = (direction: string) => {
    switch (direction) {
      case 'top-right':
        return { x: 2, y: -2 };
      case 'bottom-right':
        return { x: 2, y: 2 };
      case 'bottom-left':
        return { x: -2, y: 2 };
      case 'top-left':
        return { x: -2, y: -2 };
      case 'top':
        return { x: 0, y: -2 };
      case 'bottom':
        return { x: 0, y: 2 };
      case 'left':
        return { x: -2, y: 0 };
      case 'right':
        return { x: 2, y: 0 };
      default:
        return { x: 2, y: 2 }; // Default to bottom-right
    }
  };

  // Helper function to get logo shadow CSS with manual color and direction control
  const getLogoShadow = (
    shadowType: string,
    shadowColor: string,
    shadowDirection: string
  ) => {
    const color = getShadowColor(shadowColor);
    const direction = getShadowDirection(shadowDirection);

    switch (shadowType) {
      case 'light':
        return `${direction.x}px ${direction.y}px 4px ${color}0.12), ${direction.x / 2}px ${direction.y / 2}px 2px ${color}0.08)`;
      case 'medium':
        return `${direction.x}px ${direction.y}px 8px ${color}0.15), ${direction.x / 2}px ${direction.y / 2}px 4px ${color}0.1)`;
      case 'heavy':
        return `${direction.x}px ${direction.y}px 12px ${color}0.2), ${direction.x / 2}px ${direction.y / 2}px 6px ${color}0.15)`;
      case 'glow':
        return `0 0 8px ${color}0.3), 0 0 4px ${color}0.2)`;
      default:
        return 'none';
    }
  };

  // Responsive logo sizing based on screen size - Improved scaling
  const getResponsiveLogoSize = (baseSize: string, screenSize: string) => {
    const baseValue = parseFloat(baseSize);
    switch (screenSize) {
      case 'mobile':
        return `${baseValue * 0.55}rem`; // Reduced for more realistic mobile sizing
      case 'tablet':
        return `${baseValue * 0.75}rem`; // Keep current (looks good)
      case 'desktop':
        return `${baseValue * 0.85}rem`; // Reduced from 100% to 85%
      default:
        return baseSize;
    }
  };

  // Responsive header height based on screen size - Improved scaling
  const getResponsiveHeaderHeight = (
    baseHeight: string,
    screenSize: string
  ) => {
    const baseValue = parseFloat(baseHeight);
    switch (screenSize) {
      case 'mobile':
        return `${baseValue * 0.75}rem`; // Reduced for more realistic mobile height
      case 'tablet':
        return `${baseValue * 0.85}rem`; // Keep current (looks good)
      case 'desktop':
        return baseHeight; // Full height
      default:
        return baseHeight;
    }
  };

  // Responsive padding based on screen size
  const getResponsivePadding = (screenSize: string) => {
    switch (screenSize) {
      case 'mobile':
        return '6px 10px'; // Reduced for more compact mobile layout
      case 'tablet':
        return '12px 16px';
      case 'desktop':
        return '16px 24px';
      default:
        return '16px 24px';
    }
  };

  // Responsive gap for logo area
  const getResponsiveGap = (screenSize: string) => {
    switch (screenSize) {
      case 'mobile':
        return '8px'; // Reduced for more compact mobile layout
      case 'tablet':
        return '18px';
      case 'desktop':
        return '25px';
      default:
        return '25px';
    }
  };

  // Responsive font sizes
  const getResponsiveFontSize = (screenSize: string) => {
    switch (screenSize) {
      case 'mobile':
        return '10px';
      case 'tablet':
        return '12px';
      case 'desktop':
        return '14px';
      default:
        return '14px';
    }
  };

  // Responsive container width
  const getResponsiveWidth = (screenSize: string) => {
    switch (screenSize) {
      case 'mobile':
        return '100%';
      case 'tablet':
        return '100%';
      case 'desktop':
        return '100%';
      default:
        return '100%';
    }
  };

  const responsiveHeaderHeight = getResponsiveHeaderHeight(
    headerConfig.headerHeight,
    screenSize
  );

  // Ensure logo height doesn't exceed header height
  const getConstrainedLogoHeight = (
    logoHeight: string,
    headerHeight: string
  ) => {
    const logoValue = parseFloat(logoHeight);
    const headerValue = parseFloat(headerHeight);
    return logoValue > headerValue * 0.8
      ? `${headerValue * 0.8}rem`
      : logoHeight;
  };

  const responsiveLogoWidth = getResponsiveLogoSize(
    headerConfig.logoWidth,
    screenSize
  );
  const responsiveLogoHeight = getConstrainedLogoHeight(
    getResponsiveLogoSize(headerConfig.logoHeight, screenSize),
    responsiveHeaderHeight
  );
  const responsivePadding = getResponsivePadding(screenSize);
  const responsiveGap = getResponsiveGap(screenSize);
  const responsiveFontSize = getResponsiveFontSize(screenSize);
  const responsiveWidth = getResponsiveWidth(screenSize);

  return (
    <div
      style={{
        width: responsiveWidth,
        height: responsiveHeaderHeight,
        backgroundColor: headerConfig.backgroundColor,
        borderBottom: `${headerConfig.borderHeight} solid ${headerConfig.borderColor}`,
        padding: '0', // Remove padding from container
        boxShadow: getBorderShadow(headerConfig.borderShadow),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '8px',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
        minHeight: responsiveHeaderHeight,
      }}
    >
      {/* Logo Area */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: responsiveGap,
          marginLeft:
            screenSize === 'mobile'
              ? '8px'
              : screenSize === 'tablet'
                ? '16px'
                : '24px',
          height: '100%',
          minHeight: responsiveHeaderHeight,
        }}
      >
        {/* Company Logo */}
        <div
          style={{
            width: responsiveLogoWidth,
            height: responsiveLogoHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: 'transparent',
            boxShadow: getLogoShadow(
              headerConfig.logoShadow,
              headerConfig.logoShadowColor || 'black',
              headerConfig.logoShadowDirection || 'bottom-right'
            ),
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          {companyLogo?.logo ? (
            // Actual logo from database
            <Image
              src={companyLogo.logo}
              alt={`${companyLogo.companyName} Logo`}
              width={parseInt(responsiveLogoWidth.replace('rem', '')) * 16}
              height={parseInt(responsiveLogoHeight.replace('rem', '')) * 16}
              style={{
                objectFit: 'contain',
                borderRadius: '8px',
                width: '100%',
                height: '100%',
              }}
            />
          ) : (
            !isLoading && (
              // Fallback placeholder - only show when not loading and no logo
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#1976d2',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: responsiveFontSize,
                  fontWeight: 'bold',
                }}
              >
                L
              </div>
            )
          )}
        </div>
      </div>

      {/* Toggle Menu Button - Right Aligned */}
      {toggleMenuConfig && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight:
              screenSize === 'mobile'
                ? '8px'
                : screenSize === 'tablet'
                  ? '16px'
                  : '24px',
            height: '100%',
          }}
        >
          <ToggleMenuButton
            config={toggleMenuConfig}
            onClick={onToggleMenu}
            isOpen={isMenuOpen}
            isPreview={true}
          />
        </div>
      )}
    </div>
  );
}

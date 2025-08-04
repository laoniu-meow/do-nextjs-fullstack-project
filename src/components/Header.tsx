'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ToggleMenuButton from './ToggleMenuButton';
import { useToggleMenuConfig } from '@/hooks/useToggleMenuConfig';

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

type ScreenSize = 'mobile' | 'tablet' | 'desktop';

export default function Header() {
  const [companyLogo, setCompanyLogo] = useState<CompanyLogo | null>(null);
  const [screenSize, setScreenSize] = useState<ScreenSize>('desktop');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fetch toggle menu configuration
  const { config: toggleMenuConfig, isLoading: toggleMenuLoading } =
    useToggleMenuConfig();

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

  // Comprehensive screen size detection
  useEffect(() => {
    const getScreenSize = (width: number): ScreenSize => {
      if (width < 768) return 'mobile'; // Mobile devices
      if (width < 1024) return 'tablet'; // Tablet devices
      return 'desktop'; // Desktop devices
    };

    const checkScreenSize = () => {
      setScreenSize(getScreenSize(window.innerWidth));
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Responsive header configuration for all screen sizes
  const getResponsiveHeaderConfig = (config: HeaderConfig) => {
    const baseHeight = parseFloat(config.headerHeight);
    const baseLogoWidth = parseFloat(config.logoWidth);
    const baseLogoHeight = parseFloat(config.logoHeight);

    switch (screenSize) {
      case 'mobile': // Mobile devices - Improved balance
        return {
          ...config,
          headerHeight: `${baseHeight * 0.85}rem`, // Increased from 70% to 85%
          headerPosition: 'sticky', // Better for mobile scrolling
          logoWidth: `${baseLogoWidth * 0.65}rem`, // Increased from 50% to 65%
          logoHeight: `${baseLogoHeight * 0.65}rem`,
        };
      case 'tablet': // Tablet devices - Keep current (looks good)
        return {
          ...config,
          headerHeight: `${baseHeight * 0.85}rem`, // 85% of original
          headerPosition: config.headerPosition, // Keep user preference
          logoWidth: `${baseLogoWidth * 0.75}rem`, // 75% of original
          logoHeight: `${baseLogoHeight * 0.75}rem`,
        };
      case 'desktop': // Desktop devices - Slightly smaller logo
        return {
          ...config,
          headerHeight: config.headerHeight, // Full size
          headerPosition: config.headerPosition,
          logoWidth: `${baseLogoWidth * 0.85}rem`, // Reduced from 100% to 85%
          logoHeight: `${baseLogoHeight * 0.85}rem`,
        };
      default:
        return config;
    }
  };

  // Responsive padding for all screen sizes
  const getResponsivePadding = () => {
    switch (screenSize) {
      case 'mobile':
        return '8px 12px';
      case 'tablet':
        return '12px 16px';
      case 'desktop':
        return '16px 24px';
      default:
        return '16px 24px';
    }
  };

  // Responsive gap for logo area
  const getResponsiveGap = () => {
    switch (screenSize) {
      case 'mobile':
        return '10px';
      case 'tablet':
        return '18px';
      case 'desktop':
        return '25px';
      default:
        return '25px';
    }
  };

  // Responsive font sizes
  const getResponsiveFontSize = () => {
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

  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>({
    backgroundColor: '#ffffff',
    headerHeight: '5rem',
    headerPosition: 'fixed',
    borderColor: '#e0e0e0',
    borderHeight: '1px',
    borderShadow: 'none',
    logoWidth: '4.35rem', // Medium portrait (6.5rem * 0.67)
    logoHeight: '6.5rem',
    logoOrientation: 'portrait',
    logoShadow: 'none', // Shadow type: none, light, medium, heavy, glow
    logoShadowColor: 'black', // Shadow color: black, grey, white
    logoShadowDirection: 'bottom-right', // Shadow direction
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch company logo and header config from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch company logo
        const logoResponse = await fetch('/api/company/logo');
        if (logoResponse.ok) {
          const logoData = await logoResponse.json();
          setCompanyLogo(logoData);
        } else {
          console.error('Failed to fetch company logo');
        }

        // Fetch header configuration
        const headerResponse = await fetch('/api/header');
        if (headerResponse.ok) {
          const headerData = await headerResponse.json();
          setHeaderConfig(headerData);
        } else {
          console.error('Failed to fetch header configuration');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Listen for update events
    const handleLogoUpdate = () => {
      fetchData();
    };

    const handleHeaderUpdate = () => {
      fetchData();
    };

    window.addEventListener('logo-updated', handleLogoUpdate);
    window.addEventListener('header-updated', handleHeaderUpdate);

    return () => {
      window.removeEventListener('logo-updated', handleLogoUpdate);
      window.removeEventListener('header-updated', handleHeaderUpdate);
    };
  }, []);

  // Apply responsive configuration
  const responsiveConfig = getResponsiveHeaderConfig(headerConfig);
  const responsivePadding = getResponsivePadding();
  const responsiveGap = getResponsiveGap();
  const responsiveFontSize = getResponsiveFontSize();

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

  const constrainedLogoHeight = getConstrainedLogoHeight(
    responsiveConfig.logoHeight,
    responsiveConfig.headerHeight
  );

  return (
    <header
      style={{
        width: '100%',
        height: responsiveConfig.headerHeight,
        position: responsiveConfig.headerPosition as
          | 'fixed'
          | 'sticky'
          | 'relative',
        top: 0,
        left: 0,
        backgroundColor: responsiveConfig.backgroundColor,
        borderBottom: `${responsiveConfig.borderHeight} solid ${responsiveConfig.borderColor}`,
        padding: '0', // Remove padding from header container
        zIndex: 1000,
        boxShadow: getBorderShadow(responsiveConfig.borderShadow),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        opacity: isLoading ? 0.8 : 1,
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      {/* Logo Area */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: responsiveGap,
          marginLeft:
            screenSize === 'mobile'
              ? '12px'
              : screenSize === 'tablet'
                ? '16px'
                : '24px',
          height: '100%',
          minHeight: responsiveConfig.headerHeight,
        }}
      >
        {/* Company Logo */}
        <div
          style={{
            width: responsiveConfig.logoWidth,
            height: constrainedLogoHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: 'transparent',
            boxShadow: getLogoShadow(
              responsiveConfig.logoShadow,
              responsiveConfig.logoShadowColor || 'black',
              responsiveConfig.logoShadowDirection || 'bottom-right'
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
              width={
                parseInt(responsiveConfig.logoWidth.replace('rem', '')) * 16
              }
              height={parseInt(constrainedLogoHeight.replace('rem', '')) * 16}
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

      {/* Toggle Menu Button */}
      {!toggleMenuLoading && toggleMenuConfig && (
        <div
          style={{
            marginRight:
              screenSize === 'mobile'
                ? '12px'
                : screenSize === 'tablet'
                  ? '16px'
                  : '24px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ToggleMenuButton
            config={toggleMenuConfig}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            isOpen={isMenuOpen}
          />
        </div>
      )}
    </header>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';

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
}

interface ResponsiveHeaderProps {
  headerConfig: HeaderConfig;
  companyLogo: CompanyLogo | null;
  isLoading: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
}

export default function ResponsiveHeader({
  headerConfig,
  companyLogo,
  isLoading,
  screenSize,
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
        return '375px';
      case 'tablet':
        return '768px';
      case 'desktop':
        return '1200px';
      default:
        return '1200px';
    }
  };

  const responsiveLogoWidth = getResponsiveLogoSize(
    headerConfig.logoWidth,
    screenSize
  );
  const responsiveLogoHeight = getResponsiveLogoSize(
    headerConfig.logoHeight,
    screenSize
  );
  const responsiveHeaderHeight = getResponsiveHeaderHeight(
    headerConfig.headerHeight,
    screenSize
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
              ? '8px'
              : screenSize === 'tablet'
                ? '16px'
                : '24px',
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
            backgroundColor: companyLogo?.logo ? 'transparent' : '#1976d2',
          }}
        >
          {isLoading ? (
            // Loading placeholder
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: responsiveFontSize,
                color: '#999',
              }}
            >
              ...
            </div>
          ) : companyLogo?.logo ? (
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
            // Fallback placeholder
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
          )}
        </div>
      </div>

      {/* Menu Button */}
      <button
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          padding:
            screenSize === 'mobile'
              ? '4px'
              : screenSize === 'tablet'
                ? '6px'
                : '8px',
          cursor: 'pointer',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.2s ease',
          minHeight: '44px', // Touch-friendly minimum
          minWidth: '44px',
          marginRight:
            screenSize === 'mobile'
              ? '8px'
              : screenSize === 'tablet'
                ? '16px'
                : '24px',
        }}
        onClick={() => {
          // TODO: Add menu functionality later
          console.log('Menu button clicked');
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f5f5f5';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <div
          style={{
            width:
              screenSize === 'mobile'
                ? '16px'
                : screenSize === 'tablet'
                  ? '18px'
                  : '20px',
            height: '2px',
            backgroundColor: '#333',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top:
                screenSize === 'mobile'
                  ? '-4px'
                  : screenSize === 'tablet'
                    ? '-5px'
                    : '-6px',
              left: '0',
              width: '100%',
              height: '2px',
              backgroundColor: '#333',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top:
                screenSize === 'mobile'
                  ? '4px'
                  : screenSize === 'tablet'
                    ? '5px'
                    : '6px',
              left: '0',
              width: '100%',
              height: '2px',
              backgroundColor: '#333',
            }}
          />
        </div>
      </button>
    </div>
  );
}

import { useState, useEffect } from 'react';

export interface ResponsiveStyles {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  // Typography
  titleFontSize: string;
  subtitleFontSize: string;
  bodyFontSize: string;
  smallFontSize: string;
  // Spacing
  padding: string;
  paddingLarge: string;
  gap: string;
  gapLarge: string;
  // Sizes
  buttonSize: string;
  iconSize: string;
  cardWidth: string;
  // Drawer
  drawerWidth: string;
}

export const useResponsiveStyles = (): ResponsiveStyles => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width <= 1024);
      setIsDesktop(width > 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
    // Typography
    titleFontSize: isMobile ? '36px' : '38px', // Increased from 32px/34px
    subtitleFontSize: isMobile ? '18px' : isTablet ? '19px' : '20px', // Increased from 16px/17px/18px
    bodyFontSize: isMobile ? '16px' : '18px', // Increased from 14px/16px
    smallFontSize: isMobile ? '14px' : '16px', // Increased from 12px/14px
    // Spacing
    padding: isMobile ? '16px' : '20px',
    paddingLarge: isMobile ? '20px' : '24px',
    gap: isMobile ? '16px' : '20px',
    gapLarge: isMobile ? '20px' : '24px',
    // Sizes
    buttonSize: isMobile ? '44px' : '50px',
    iconSize: isMobile ? '18px' : '20px',
    cardWidth: isMobile ? '100%' : '200px',
    // Drawer
    drawerWidth: isMobile ? '280px' : isTablet ? '320px' : '300px',
  };
}; 
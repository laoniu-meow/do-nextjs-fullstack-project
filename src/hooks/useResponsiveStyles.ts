import { useState, useEffect } from 'react';

export interface ResponsiveStyles {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  // Platform detection
  isIOS: boolean;
  isAndroid: boolean;
  isWindows: boolean;
  isMac: boolean;
  isTouchDevice: boolean;
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
  // Touch-friendly adjustments
  touchTargetSize: string;
  touchPadding: string;
  // Drawer
  drawerWidth: string;
}

export const useResponsiveStyles = (): ResponsiveStyles => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isWindows, setIsWindows] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width <= 1024);
      setIsDesktop(width > 1024);
    };

    const checkPlatform = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const platform = navigator.platform.toLowerCase();
      
      // iOS detection
      const isIOSDevice = /iphone|ipad|ipod/.test(userAgent) || 
                         (platform.includes('mac') && 'ontouchend' in document);
      setIsIOS(isIOSDevice);
      
      // Android detection
      const isAndroidDevice = /android/.test(userAgent);
      setIsAndroid(isAndroidDevice);
      
      // Windows detection
      const isWindowsDevice = /windows/.test(userAgent) || platform.includes('win');
      setIsWindows(isWindowsDevice);
      
      // Mac detection
      const isMacDevice = /macintosh|mac os x/.test(userAgent) || platform.includes('mac');
      setIsMac(isMacDevice);
      
      // Touch device detection
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
    };

    checkScreenSize();
    checkPlatform();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Platform-specific adjustments
  const getTouchTargetSize = () => {
    if (isTouchDevice) {
      // iOS and Android guidelines recommend minimum 44px touch targets
      return isMobile ? '44px' : '48px';
    }
    return isMobile ? '36px' : '40px';
  };

  const getTouchPadding = () => {
    if (isTouchDevice) {
      // Extra padding for touch devices
      return isMobile ? '12px 16px' : '14px 18px';
    }
    return isMobile ? '8px 10px' : '10px 12px';
  };

  return {
    isMobile,
    isTablet,
    isDesktop,
    // Platform detection
    isIOS,
    isAndroid,
    isWindows,
    isMac,
    isTouchDevice,
    // Typography
    titleFontSize: isMobile ? '36px' : '38px',
    subtitleFontSize: isMobile ? '18px' : isTablet ? '19px' : '20px',
    bodyFontSize: isMobile ? '16px' : '18px',
    smallFontSize: isMobile ? '14px' : '16px',
    // Spacing
    padding: isMobile ? '16px' : '20px',
    paddingLarge: isMobile ? '20px' : '24px',
    gap: isMobile ? '16px' : '20px',
    gapLarge: isMobile ? '20px' : '24px',
    // Sizes
    buttonSize: isMobile ? '44px' : '50px',
    iconSize: isMobile ? '18px' : '20px',
    cardWidth: isMobile ? '100%' : '200px',
    // Touch-friendly adjustments
    touchTargetSize: getTouchTargetSize(),
    touchPadding: getTouchPadding(),
    // Drawer
    drawerWidth: isMobile ? '280px' : isTablet ? '320px' : '300px',
  };
}; 
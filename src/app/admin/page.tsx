'use client';

import { useState, useEffect } from 'react';
import { MenuList, adminMenuItems } from '@/components/menu';
import { usePagePersistence } from '@/hooks/usePagePersistence';

export default function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [orientation, setOrientation] = useState<'Portrait' | 'Landscape'>(
    'Portrait'
  );

  // Page persistence hook
  const { navigateToPage, clearSavedPage } = usePagePersistence({
    storageKey: 'admin-current-page',
    defaultPath: '/admin',
    enabled: true,
  });

  // Responsive breakpoint detection
  useEffect(() => {
    const checkScreenSize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Mobile: < 768px
        // Tablet: 768px - 1024px
        // Desktop: > 1024px
        setIsMobile(width < 768);
        setIsTablet(width >= 768 && width <= 1024);
        setOrientation(width > height ? 'Landscape' : 'Portrait');
      }
    };

    checkScreenSize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item: any) => {
    setActiveItemId(item.id);

    // Navigate to the appropriate page using page persistence
    if (item.href) {
      navigateToPage(item.href);
    }

    // Auto-close menu on mobile after item click
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Responsive drawer width
  const getDrawerWidth = () => {
    if (isMobile) return '280px';
    if (isTablet) return '320px';
    return '300px';
  };

  const drawerWidth = getDrawerWidth();

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Drawer Menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : `-${drawerWidth}`,
          width: drawerWidth,
          height: '100vh',
          backgroundColor: '#f5f5f5',
          borderLeft: '1px solid #ddd',
          transition: 'right 0.3s ease-in-out',
          zIndex: 1000,
          padding: isMobile ? '16px' : '20px',
          boxShadow: isOpen ? '-2px 0 8px rgba(0,0,0,0.1)' : 'none',
          overflowY: 'auto',
        }}
      >
        <MenuList
          items={adminMenuItems}
          title="Admin Menu"
          onItemClick={handleMenuItemClick}
          activeItemId={activeItemId}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        style={{
          height: '100vh',
          padding: isMobile ? '16px' : '20px',
          overflowY: 'auto',
        }}
      >
        <h1
          style={{
            width: '80%',
            fontSize: isMobile ? '32px' : '34px',
            paddingBottom: '8px',
            marginBottom: isMobile ? '24px' : '16px', // More bottom margin on mobile
            //backgroundColor: 'lightblue', // temporary will be removed after development
            color: '#1976d2', // Primary blue color
          }}
        >
          Admin Dashboard
        </h1>

        {/* Additional line below Admin Dashboard */}
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: '#ddd',
            marginBottom: '16px',
          }}
        />
        <p
          style={{
            fontSize: isMobile ? '14px' : '16px',
            marginBottom: '8px',
            //backgroundColor: 'lightblue', // temporary will be removed after development
          }}
        >
          Welcome to the admin panel
        </p>
        <p
          style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#666',
            //backgroundColor: 'lightblue', // temporary will be removed after development
          }}
        >
          Active menu item: {activeItemId}
        </p>

        {/* Responsive info */}
        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            fontSize: '14px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0',
          }}
        >
          <h3
            style={{
              margin: '0 0 16px 0',
              fontSize: '18px',
              fontWeight: '600',
              color: '#333333',
            }}
          >
            Screen Info
          </h3>
          <p style={{ margin: '8px 0', color: '#666666' }}>
            Device: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
          </p>
          <p style={{ margin: '8px 0', color: '#666666' }}>
            Orientation: {orientation}
          </p>
          <p style={{ margin: '8px 0', color: '#666666' }}>
            Drawer Width: {drawerWidth}
          </p>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        style={{
          position: 'fixed',
          top: isMobile ? '16px' : '20px',
          right: isOpen ? `calc(${drawerWidth} + 20px)` : '20px',
          width: isMobile ? '44px' : '50px',
          height: isMobile ? '44px' : '50px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: '#1976d2',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isMobile ? '18px' : '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          transition: 'right 0.3s ease-in-out',
          zIndex: 1001,
        }}
      >
        ☰
      </button>
    </div>
  );
}

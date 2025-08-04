// Common styles utility to reduce duplication
export const commonStyles = {
  // Layout styles
  fullHeightContainer: {
    position: 'relative' as const,
    height: '100vh',
    overflow: 'hidden' as const,
  },
  
  // Drawer styles
  drawer: {
    position: 'fixed' as const,
    top: 0,
    right: 0,
    height: '100vh',
    backgroundColor: '#f5f5f5',
    borderLeft: '1px solid #ddd',
    transition: 'right 0.3s ease-in-out',
    zIndex: 1000,
    boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
    overflowY: 'auto' as const,
  },
  
  // Card styles
  card: {
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    fontSize: '14px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease',
  },
  
  cardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
  },
  
  // Button styles
  actionButton: {
    padding: '8px',
    borderRadius: '8px',
    backgroundColor: '#f3f4f6',
    transition: 'all 0.2s ease',
    cursor: 'pointer' as const,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  
  actionButtonHover: {
    backgroundColor: '#e5e7eb',
    transform: 'scale(1.05)',
  },
  
  // Toggle button styles
  toggleButton: {
    position: 'fixed' as const,
    top: '20px',
    right: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#1976d2',
    color: 'white',
    cursor: 'pointer' as const,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    fontSize: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    transition: 'right 0.3s ease-in-out, transform 0.3s ease-in-out',
    zIndex: 1001,
  },
  
  // Section header styles
  sectionHeader: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: '8px',
    marginBottom: '20px',
  },
  
  sectionAccent: {
    width: '4px',
    height: '20px',
    backgroundColor: '#1976d2',
    borderRadius: '2px',
  },
  
  sectionTitle: {
    margin: '0',
    fontSize: '18px',
    fontWeight: '700' as const,
    color: '#1e293b',
  },
  
  // Form styles
  formField: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '8px',
  },
  
  formLabel: {
    fontSize: '13px',
    fontWeight: '600' as const,
    color: '#374151',
    marginBottom: '4px',
    display: 'block' as const,
  },
  
  formInput: {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    width: '100%',
    backgroundColor: 'white',
    transition: 'all 0.2s ease',
    outline: 'none' as const,
  },
  
  formInputFocus: {
    borderColor: '#1976d2',
    boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
  },
  
  // Preview styles
  previewContainer: {
    display: 'flex' as const,
    justifyContent: 'center' as const,
    marginBottom: '16px',
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  
  // Mobile device frame styles
  mobileFrame: {
    display: 'flex' as const,
    justifyContent: 'center' as const,
    marginBottom: '16px',
    padding: '8px',
    backgroundColor: '#f8fafc',
    borderRadius: '20px',
    border: '2px solid #e2e8f0',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)',
    position: 'relative' as const,
    maxWidth: '320px',
    margin: '0 auto',
  },
  
  // Status bar styles
  statusBar: {
    position: 'absolute' as const,
    top: '0',
    left: '0',
    right: '0',
    height: '24px',
    backgroundColor: 'rgba(0,0,0,0.05)',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    padding: '0 12px',
    fontSize: '10px',
    color: '#374151',
    zIndex: 5,
  },
  
  // Notch styles
  notch: {
    position: 'absolute' as const,
    top: '8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '4px',
    backgroundColor: '#1f2937',
    borderRadius: '2px',
    zIndex: 10,
  },
};

// Responsive style helpers
export const getResponsiveStyles = (isMobile: boolean, isTablet: boolean) => ({
  padding: isMobile ? '16px' : '20px',
  paddingLarge: isMobile ? '20px' : '24px',
  gap: isMobile ? '16px' : '20px',
  gapLarge: isMobile ? '20px' : '24px',
  buttonSize: isMobile ? '44px' : '50px',
  iconSize: isMobile ? '18px' : '20px',
  titleFontSize: isMobile ? '36px' : '38px',
  subtitleFontSize: isMobile ? '18px' : isTablet ? '19px' : '20px',
  bodyFontSize: isMobile ? '16px' : '18px',
  smallFontSize: isMobile ? '14px' : '16px',
  drawerWidth: isMobile ? '280px' : isTablet ? '320px' : '300px',
});

// Color utilities
export const colors = {
  primary: '#1976d2',
  secondary: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  success: '#10b981',
  info: '#3b82f6',
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    muted: '#9ca3af',
  },
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
  },
  border: {
    light: '#e2e8f0',
    medium: '#cbd5e1',
    dark: '#94a3b8',
  },
}; 
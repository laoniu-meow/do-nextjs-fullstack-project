'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { MenuList, adminMenuItems } from '@/components/menu';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';
import ModernColorPicker from '@/components/ModernColorPicker';
import ResponsiveHeader from '@/components/ResponsiveHeader';
import ToggleMenuButton from '@/components/ToggleMenuButton';
import { Icon } from '@/components/icons/IconLibrary';
import { usePagePersistence } from '@/hooks/usePagePersistence';
import {
  ToggleMenuButtonConfig,
  defaultToggleMenuConfig,
  ButtonShape,
  ButtonSize,
  ShadowType,
} from '@/types/toggleMenuConfig';
import { getCrossPlatformStyles } from '@/utils/crossPlatformStyles';
import {
  getLogoSizeOptions,
  getLogoSizeByOrientationAndSize,
  getCurrentLogoSize,
  type LogoSizeOption,
} from '@/utils/logoSizeOptions';

export default function HeaderSettingsPage() {
  const responsive = useResponsiveStyles();
  const crossPlatformStyles = getCrossPlatformStyles(responsive);
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState('header');

  // Page persistence hook
  const { navigateToPage } = usePagePersistence({
    storageKey: 'admin-current-page',
    defaultPath: '/admin',
    enabled: true,
  });

  // Header configuration states
  const [originalHeaderData, setOriginalHeaderData] = useState<any>(null);
  const [stagingData, setStagingData] = useState<any>(null);
  const [productionData, setProductionData] = useState<any>(null);

  // Header configuration data
  const [headerConfig, setHeaderConfig] = useState({
    backgroundColor: '#ffffff',
    headerHeight: '5rem', // Medium (80px equivalent)
    headerPosition: 'fixed',
    borderColor: '#e0e0e0',
    borderHeight: '1px',
    borderShadow: 'none', // none, light, medium, heavy
    logoWidth: '4.35rem', // Medium portrait (6.5rem * 0.67)
    logoHeight: '6.5rem', // Medium (96px equivalent)
    logoOrientation: 'portrait', // portrait or landscape
    logoShadow: 'none', // none, light, medium, heavy, glow
    logoShadowColor: 'black', // black, grey, white
    logoShadowDirection: 'bottom-right', // shadow direction
  });

  // Toggle Menu Button configuration
  const [toggleMenuConfig, setToggleMenuConfig] =
    useState<ToggleMenuButtonConfig>(defaultToggleMenuConfig);
  const [toggleMenuConfigLoaded, setToggleMenuConfigLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLogoSize, setCurrentLogoSize] = useState<
    'small' | 'medium' | 'large'
  >('medium');

  // Change tracking states
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [originalSettings, setOriginalSettings] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Staging states for individual settings
  const [stagingBackgroundColor, setStagingBackgroundColor] = useState<
    string | null
  >(null);
  const [stagingBorderColor, setStagingBorderColor] = useState<string | null>(
    null
  );
  const [stagingBorderHeight, setStagingBorderHeight] = useState<string | null>(
    null
  );
  const [stagingLogoWidth, setStagingLogoWidth] = useState<string | null>(null);
  const [stagingLogoHeight, setStagingLogoHeight] = useState<string | null>(
    null
  );
  const [stagingHeaderHeight, setStagingHeaderHeight] = useState<string | null>(
    null
  );
  const [stagingHeaderPosition, setStagingHeaderPosition] = useState<
    string | null
  >(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Production header data for preview
  const [productionHeaderData, setProductionHeaderData] = useState<{
    logo: string | null;
    companyName: string;
  } | null>(null);

  const loadHeaderData = async () => {
    try {
      // Load production header data (same as frontend)
      const headerResponse = await fetch('/api/company/logo');
      const headerData = await headerResponse.json();
      setProductionHeaderData(headerData);

      // Load production data
      const prodResponse = await fetch('/api/header');
      const prodData = await prodResponse.json();
      setProductionData(prodData);

      // Load staging data
      const stagingResponse = await fetch('/api/header/staging');
      const stagingData = await stagingResponse.json();
      setStagingData(stagingData || null);

      // Use staging data if available, otherwise use production data
      const dataToUse = stagingData && stagingData.id ? stagingData : prodData;

      if (dataToUse && dataToUse.id) {
        setOriginalHeaderData(dataToUse);

        // Update headerConfig with the loaded data
        const newHeaderConfig = {
          backgroundColor: dataToUse.backgroundColor || '#ffffff',
          headerHeight: dataToUse.headerHeight || '5rem',
          headerPosition: dataToUse.headerPosition || 'fixed',
          borderColor: dataToUse.borderColor || '#e0e0e0',
          borderHeight: dataToUse.borderHeight || '1px',
          borderShadow: dataToUse.borderShadow || 'none',
          logoWidth: dataToUse.logoWidth || '4.35rem',
          logoHeight: dataToUse.logoHeight || '6.5rem',
          logoOrientation: dataToUse.logoOrientation || 'portrait',
          logoShadow: dataToUse.logoShadow || 'none',
          logoShadowColor: dataToUse.logoShadowColor || 'black',
          logoShadowDirection: dataToUse.logoShadowDirection || 'bottom-right',
        };

        setHeaderConfig(newHeaderConfig);
        setOriginalSettings(newHeaderConfig); // Store original settings for cancel functionality
      }
    } catch (error) {
      // Handle error silently or implement proper error handling
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item: any) => {
    setActiveItemId(item.id);
    setIsOpen(false);

    // Navigate to the appropriate page using page persistence
    if (item.href) {
      navigateToPage(item.href);
    }
  };

  const getBorderShadow = (shadowType: string) => {
    switch (shadowType) {
      case 'light':
        return '0 1px 3px rgba(0,0,0,0.12)';
      case 'medium':
        return '0 2px 6px rgba(0,0,0,0.15)';
      case 'heavy':
        return '0 4px 12px rgba(0,0,0,0.25)';
      default:
        return 'none';
    }
  };

  const getLogoDimensions = (orientation: string, size: string) => {
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
  };

  const handleFieldChange = (field: string, value: string) => {
    setHeaderConfig((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleLogoOrientationChange = (orientation: string) => {
    // Use the current logo size to get new dimensions for the new orientation
    const { width, height } = getLogoDimensions(orientation, currentLogoSize);

    setHeaderConfig((prev) => ({
      ...prev,
      logoOrientation: orientation,
      logoWidth: width,
      logoHeight: height,
    }));
    setHasUnsavedChanges(true);
  };

  const handleLogoSizeChange = (size: string) => {
    const { width, height } = getLogoDimensions(
      headerConfig.logoOrientation,
      size
    );
    setHeaderConfig((prev) => ({
      ...prev,
      logoWidth: width,
      logoHeight: height,
    }));
    setHasChanges(true);
  };

  const handleToggleMenuConfigChange = (
    field: keyof ToggleMenuButtonConfig,
    value: any
  ) => {
    setToggleMenuConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleMenuResponsiveChange = (
    screen: 'mobile' | 'tablet' | 'desktop',
    field: 'size',
    value: any
  ) => {
    setToggleMenuConfig((prev) => ({
      ...prev,
      responsive: {
        ...prev.responsive,
        [screen]: {
          ...prev.responsive[screen],
          [field]: value,
        },
      },
    }));
  };

  const saveToggleMenuConfig = useCallback(async () => {
    try {
      const response = await fetch('/api/toggle-menu/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toggleMenuConfig),
      });

      if (response.ok) {
        // Toggle menu config saved successfully
      } else {
        // Failed to save toggle menu config
      }
    } catch (error) {
      // Error saving toggle menu config
    }
  }, [toggleMenuConfig]);

  const handleSaveToStaging = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/header/staging', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(headerConfig),
      });

      if (response.ok) {
        const savedData = await response.json();
        setStagingData(savedData);
        setHasUnsavedChanges(false);
        // Header settings saved to staging successfully
      } else {
        // Failed to save header settings to staging
      }
    } catch (error) {
      // Error saving header settings to staging
    } finally {
      setIsSaving(false);
    }
  };

  const handleUploadToProduction = async () => {
    setIsUploading(true);
    try {
      const response = await fetch('/api/header', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(headerConfig),
      });

      if (response.ok) {
        const savedData = await response.json();
        setProductionData(savedData);
        setStagingData(null);
        setHasUnsavedChanges(false);
        // Header settings uploaded to production successfully
      } else {
        // Failed to upload header settings to production
      }
    } catch (error) {
      // Error uploading header settings to production
    } finally {
      setIsUploading(false);
    }
  };

  const handlePreviewClick = () => {
    if (stagingData) {
      // Open preview in new tab
      window.open('/preview', '_blank');
    } else {
      // No staging data available to preview
    }
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCancelChanges = () => {
    if (originalSettings) {
      setHeaderConfig(originalSettings);
      setHasUnsavedChanges(false);
    }
  };

  const handlePredefinedLogoSizeChange = (
    size: 'small' | 'medium' | 'large'
  ) => {
    setCurrentLogoSize(size);
    const logoSizeOption = getLogoSizeByOrientationAndSize(
      headerConfig.logoOrientation as 'portrait' | 'landscape',
      size
    );

    setHeaderConfig((prev) => ({
      ...prev,
      logoWidth: logoSizeOption.width,
      logoHeight: logoSizeOption.height,
    }));
    setHasUnsavedChanges(true);
  };

  useEffect(() => {
    loadHeaderData();
  }, []);

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
  }, [
    headerConfig.logoWidth,
    headerConfig.logoHeight,
    headerConfig.logoOrientation,
  ]);

  useEffect(() => {
    if (toggleMenuConfigLoaded) {
      saveToggleMenuConfig();
    }
  }, [toggleMenuConfig, toggleMenuConfigLoaded, saveToggleMenuConfig]);

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Drawer Menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : `-${responsive.drawerWidth}`,
          width: responsive.drawerWidth,
          height: '100vh',
          backgroundColor: '#f5f5f5',
          borderLeft: '1px solid #ddd',
          transition: 'right 0.3s ease-in-out',
          zIndex: 1000,
          padding: responsive.padding,
          boxShadow: isOpen ? '-2px 0 8px rgba(0,0,0,0.1)' : 'none',
          overflowY: 'auto',
        }}
      >
        <MenuList
          items={adminMenuItems}
          title="Admin Menu"
          onItemClick={handleMenuItemClick}
          activeItemId={activeItemId}
          isMobile={responsive.isMobile}
          isTablet={responsive.isTablet}
        />
      </div>

      {/* Overlay for mobile */}
      {responsive.isMobile && isOpen && (
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
          padding: responsive.padding,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Static Header Section */}
        <div style={{ marginBottom: '20px', flexShrink: 0 }}>
          <h1
            style={{
              width: '100%',
              fontSize: responsive.titleFontSize,
              paddingBottom: '8px',
              marginBottom: responsive.isMobile ? '24px' : '16px',
              color: '#1a365d',
            }}
          >
            Header Settings
          </h1>

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
              fontSize: responsive.bodyFontSize,
              marginBottom: '8px',
              width: '60%',
            }}
          >
            Configure header settings for the frontend
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '98%',
            }}
          >
            <p
              style={{
                fontSize: responsive.smallFontSize,
                color: '#666',
                margin: '0',
              }}
            >
              Active menu item: {activeItemId}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div
                title="Preview Staging Data"
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  backgroundColor: '#f3f4f6',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <VisibilityIcon
                  onClick={handlePreviewClick}
                  style={{
                    fontSize: responsive.isMobile ? '24px' : '28px',
                    color: '#1976d2',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                />
              </div>
              {/* Save Button */}
              <div
                title={isSaving ? 'Saving...' : 'Save to Staging'}
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  backgroundColor:
                    hasUnsavedChanges && !isSaving ? '#1976d2' : '#f3f4f6',
                  transition: 'all 0.2s ease',
                  opacity: hasUnsavedChanges && !isSaving ? 1 : 0.5,
                  cursor:
                    hasUnsavedChanges && !isSaving ? 'pointer' : 'not-allowed',
                }}
                onClick={
                  hasUnsavedChanges && !isSaving
                    ? handleSaveToStaging
                    : undefined
                }
                onMouseEnter={(e) => {
                  if (hasUnsavedChanges && !isSaving) {
                    e.currentTarget.style.backgroundColor = '#1565c0';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    hasUnsavedChanges && !isSaving ? '#1976d2' : '#f3f4f6';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {isSaving ? (
                  <CircularProgress
                    size={responsive.isMobile ? 24 : 28}
                    color="inherit"
                  />
                ) : (
                  <SaveIcon
                    style={{
                      fontSize: responsive.isMobile ? '24px' : '28px',
                      color:
                        hasUnsavedChanges && !isSaving ? '#ffffff' : '#6b7280',
                      transition: 'color 0.2s ease',
                    }}
                  />
                )}
              </div>

              {/* Upload/Cancel Button */}
              <div
                title={
                  hasUnsavedChanges && !isSaving
                    ? 'Cancel Changes'
                    : !hasUnsavedChanges && stagingData && !isUploading
                      ? 'Upload to Production'
                      : isUploading
                        ? 'Uploading...'
                        : 'No staging data to upload'
                }
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  backgroundColor:
                    hasUnsavedChanges && !isSaving
                      ? '#dc3545'
                      : !hasUnsavedChanges && stagingData && !isUploading
                        ? '#28a745'
                        : '#f3f4f6',
                  transition: 'all 0.2s ease',
                  opacity:
                    (hasUnsavedChanges && !isSaving) ||
                    (!hasUnsavedChanges && stagingData && !isUploading)
                      ? 1
                      : 0.5,
                  cursor:
                    (hasUnsavedChanges && !isSaving) ||
                    (!hasUnsavedChanges && stagingData && !isUploading)
                      ? 'pointer'
                      : 'not-allowed',
                }}
                onClick={
                  hasUnsavedChanges && !isSaving
                    ? handleCancelChanges
                    : !hasUnsavedChanges && stagingData && !isUploading
                      ? handleUploadToProduction
                      : undefined
                }
                onMouseEnter={(e) => {
                  if (
                    (hasUnsavedChanges && !isSaving) ||
                    (!hasUnsavedChanges && stagingData && !isUploading)
                  ) {
                    e.currentTarget.style.backgroundColor =
                      hasUnsavedChanges && !isSaving ? '#c82333' : '#218838';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    hasUnsavedChanges && !isSaving
                      ? '#dc3545'
                      : !hasUnsavedChanges && stagingData && !isUploading
                        ? '#28a745'
                        : '#f3f4f6';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {isUploading ? (
                  <CircularProgress
                    size={responsive.isMobile ? 24 : 28}
                    color="inherit"
                  />
                ) : hasUnsavedChanges && !isSaving ? (
                  <CancelIcon
                    style={{
                      fontSize: responsive.isMobile ? '24px' : '28px',
                      color: '#ffffff',
                      transition: 'color 0.2s ease',
                    }}
                  />
                ) : (
                  <CloudUploadIcon
                    style={{
                      fontSize: responsive.isMobile ? '24px' : '28px',
                      color:
                        !hasUnsavedChanges && stagingData && !isUploading
                          ? '#ffffff'
                          : '#6b7280',
                      transition: 'color 0.2s ease',
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Section */}
        <div
          style={{
            marginBottom: '20px',
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
          }}
        >
          <h3
            style={{
              fontSize: responsive.bodyFontSize,
              marginBottom: '12px',
              color: '#495057',
              fontWeight: '600',
            }}
          >
            Live Preview
          </h3>
          <div
            style={{
              border: '1px solid #dee2e6',
              borderRadius: '6px',
              overflow: 'hidden',
              backgroundColor: 'white',
            }}
          >
            <ResponsiveHeader
              headerConfig={headerConfig}
              companyLogo={productionHeaderData}
              isLoading={!productionHeaderData}
              screenSize={
                responsive.isMobile
                  ? 'mobile'
                  : responsive.isTablet
                    ? 'tablet'
                    : 'desktop'
              }
              toggleMenuConfig={toggleMenuConfig}
              onToggleMenu={handleToggleMenu}
              isMenuOpen={isMenuOpen}
            />
          </div>
        </div>

        {/* Configuration Sections */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            flex: 1,
            overflowY: 'auto',
          }}
        >
          {/* Background & Layout Section */}
          <div
            style={{
              padding: '12px',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '12px',
                height: '16px',
              }}
            >
              Background & Layout
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                alignItems: 'end',
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '4px',
                    display: 'block',
                  }}
                >
                  Background Color
                </label>
                <ModernColorPicker
                  value={headerConfig.backgroundColor}
                  onChange={(color) =>
                    handleFieldChange('backgroundColor', color)
                  }
                  size="small"
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '4px',
                    display: 'block',
                  }}
                >
                  Header Height
                </label>
                <select
                  value={headerConfig.headerHeight}
                  onChange={(e) =>
                    handleFieldChange('headerHeight', e.target.value)
                  }
                  style={{
                    padding: crossPlatformStyles.inputPadding,
                    border: '1px solid #d1d5db',
                    borderRadius: crossPlatformStyles.inputBorderRadius,
                    fontSize: crossPlatformStyles.inputFontSize,
                    width: '100%',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    minHeight: crossPlatformStyles.inputMinHeight,
                    height: crossPlatformStyles.inputMinHeight,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow =
                      '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="4rem">Small (64px)</option>
                  <option value="5rem">Medium (80px)</option>
                  <option value="6rem">Large (96px)</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '4px',
                    display: 'block',
                  }}
                >
                  Header Position
                </label>
                <select
                  value={headerConfig.headerPosition}
                  onChange={(e) =>
                    handleFieldChange('headerPosition', e.target.value)
                  }
                  style={{
                    padding: crossPlatformStyles.inputPadding,
                    border: '1px solid #d1d5db',
                    borderRadius: crossPlatformStyles.inputBorderRadius,
                    fontSize: crossPlatformStyles.inputFontSize,
                    width: '100%',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    minHeight: crossPlatformStyles.inputMinHeight,
                    height: crossPlatformStyles.inputMinHeight,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow =
                      '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="fixed">Fixed</option>
                  <option value="static">Static</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section Divider */}
          <div style={{ height: '32px' }} />

          {/* Border & Shadow Section */}
          <div
            style={{
              padding: '12px',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '12px',
                height: '16px',
              }}
            >
              Border & Shadow
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                alignItems: 'end',
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '4px',
                    display: 'block',
                  }}
                >
                  Border Color
                </label>
                <ModernColorPicker
                  value={headerConfig.borderColor}
                  onChange={(color) => handleFieldChange('borderColor', color)}
                  size="small"
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '4px',
                    display: 'block',
                  }}
                >
                  Border Height
                </label>
                <input
                  type="text"
                  value={headerConfig.borderHeight}
                  onChange={(e) =>
                    handleFieldChange('borderHeight', e.target.value)
                  }
                  placeholder="1, 2, 3"
                  style={{
                    padding: '8px 10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '13px',
                    width: '100%',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow =
                      '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '4px',
                    display: 'block',
                  }}
                >
                  Border Shadow
                </label>
                <select
                  value={headerConfig.borderShadow}
                  onChange={(e) =>
                    handleFieldChange('borderShadow', e.target.value)
                  }
                  style={{
                    padding: crossPlatformStyles.inputPadding,
                    border: '1px solid #d1d5db',
                    borderRadius: crossPlatformStyles.inputBorderRadius,
                    fontSize: crossPlatformStyles.inputFontSize,
                    width: '100%',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    minHeight: crossPlatformStyles.inputMinHeight,
                    height: crossPlatformStyles.inputMinHeight,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow =
                      '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="none">None</option>
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section Divider */}
          <div style={{ height: '32px' }} />

          {/* Logo Configuration Section */}
          <div
            style={{
              padding: '12px',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '12px',
                height: '16px',
              }}
            >
              Logo Configuration
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                alignItems: 'end',
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '4px',
                    display: 'block',
                  }}
                >
                  Logo Size
                </label>
                <select
                  value={currentLogoSize}
                  onChange={(e) =>
                    handlePredefinedLogoSizeChange(
                      e.target.value as 'small' | 'medium' | 'large'
                    )
                  }
                  style={{
                    padding: crossPlatformStyles.inputPadding,
                    border: '1px solid #d1d5db',
                    borderRadius: crossPlatformStyles.inputBorderRadius,
                    fontSize: crossPlatformStyles.inputFontSize,
                    width: '100%',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    minHeight: crossPlatformStyles.inputMinHeight,
                    height: crossPlatformStyles.inputMinHeight,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow =
                      '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    marginTop: '4px',
                    fontStyle: 'italic',
                    width: '100%',
                    minHeight: '32px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {
                    getLogoSizeOptions(
                      headerConfig.logoOrientation as 'portrait' | 'landscape'
                    )[currentLogoSize].description
                  }
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '4px',
                    display: 'block',
                  }}
                >
                  Logo Orientation
                </label>
                <select
                  value={headerConfig.logoOrientation}
                  onChange={(e) => handleLogoOrientationChange(e.target.value)}
                  style={{
                    padding: crossPlatformStyles.inputPadding,
                    border: '1px solid #d1d5db',
                    borderRadius: crossPlatformStyles.inputBorderRadius,
                    fontSize: crossPlatformStyles.inputFontSize,
                    width: '100%',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    minHeight: crossPlatformStyles.inputMinHeight,
                    height: crossPlatformStyles.inputMinHeight,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow =
                      '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    marginTop: '4px',
                    fontStyle: 'italic',
                    width: '100%',
                    minHeight: '32px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {headerConfig.logoOrientation === 'portrait'
                    ? 'Tall orientation for square or vertical logos'
                    : 'Wide orientation for horizontal or text-based logos'}
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '4px',
                    display: 'block',
                  }}
                >
                  Logo Shadow
                </label>
                <select
                  value={headerConfig.logoShadow}
                  onChange={(e) =>
                    handleFieldChange('logoShadow', e.target.value)
                  }
                  style={{
                    padding: crossPlatformStyles.inputPadding,
                    border: '1px solid #d1d5db',
                    borderRadius: crossPlatformStyles.inputBorderRadius,
                    fontSize: crossPlatformStyles.inputFontSize,
                    width: '100%',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    minHeight: crossPlatformStyles.inputMinHeight,
                    height: crossPlatformStyles.inputMinHeight,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow =
                      '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="none">None</option>
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="heavy">Heavy</option>
                  <option value="glow">Glow</option>
                </select>
              </div>
              {headerConfig.logoShadow !== 'none' && (
                <>
                  <div>
                    <label
                      style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#6b7280',
                        marginBottom: '4px',
                        display: 'block',
                      }}
                    >
                      Logo Shadow Color
                    </label>
                    <select
                      value={headerConfig.logoShadowColor}
                      onChange={(e) =>
                        handleFieldChange('logoShadowColor', e.target.value)
                      }
                      style={{
                        padding: crossPlatformStyles.inputPadding,
                        border: '1px solid #d1d5db',
                        borderRadius: crossPlatformStyles.inputBorderRadius,
                        fontSize: crossPlatformStyles.inputFontSize,
                        width: '100%',
                        backgroundColor: 'white',
                        transition: 'all 0.2s ease',
                        outline: 'none',
                        minHeight: crossPlatformStyles.inputMinHeight,
                        height: crossPlatformStyles.inputMinHeight,
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3b82f6';
                        e.target.style.boxShadow =
                          '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="black">Black</option>
                      <option value="grey">Grey</option>
                      <option value="white">White</option>
                    </select>
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#6b7280',
                        marginBottom: '4px',
                        display: 'block',
                      }}
                    >
                      Logo Shadow Direction
                    </label>
                    <select
                      value={headerConfig.logoShadowDirection}
                      onChange={(e) =>
                        handleFieldChange('logoShadowDirection', e.target.value)
                      }
                      style={{
                        padding: crossPlatformStyles.inputPadding,
                        border: '1px solid #d1d5db',
                        borderRadius: crossPlatformStyles.inputBorderRadius,
                        fontSize: crossPlatformStyles.inputFontSize,
                        width: '100%',
                        backgroundColor: 'white',
                        transition: 'all 0.2s ease',
                        outline: 'none',
                        minHeight: crossPlatformStyles.inputMinHeight,
                        height: crossPlatformStyles.inputMinHeight,
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3b82f6';
                        e.target.style.boxShadow =
                          '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="top-left">Top Left</option>
                      <option value="top">Top</option>
                      <option value="top-right">Top Right</option>
                      <option value="left">Left</option>
                      <option value="bottom-left">Bottom Left</option>
                      <option value="bottom">Bottom</option>
                      <option value="bottom-right">Bottom Right</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Section Divider */}
          <div style={{ height: '32px' }} />

          {/* Toggle Menu Button Section */}
          <div
            style={{
              padding: '12px',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '12px',
                height: '16px',
              }}
            >
              Toggle Menu Button
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                alignItems: 'end',
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '4px',
                    display: 'block',
                  }}
                >
                  Button Shape
                </label>
                <select
                  value={toggleMenuConfig.shape}
                  onChange={(e) =>
                    handleToggleMenuConfigChange('shape', e.target.value)
                  }
                  style={{
                    padding: crossPlatformStyles.inputPadding,
                    border: '1px solid #d1d5db',
                    borderRadius: crossPlatformStyles.inputBorderRadius,
                    fontSize: crossPlatformStyles.inputFontSize,
                    width: '100%',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    minHeight: crossPlatformStyles.inputMinHeight,
                    height: crossPlatformStyles.inputMinHeight,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow =
                      '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="circle">Circle</option>
                  <option value="rounded">Rounded</option>
                  <option value="square">Square</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '4px',
                    display: 'block',
                  }}
                >
                  Button Size
                </label>
                <select
                  value={toggleMenuConfig.size}
                  onChange={(e) =>
                    handleToggleMenuConfigChange('size', e.target.value)
                  }
                  style={{
                    padding: crossPlatformStyles.inputPadding,
                    border: '1px solid #d1d5db',
                    borderRadius: crossPlatformStyles.inputBorderRadius,
                    fontSize: crossPlatformStyles.inputFontSize,
                    width: '100%',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    minHeight: crossPlatformStyles.inputMinHeight,
                    height: crossPlatformStyles.inputMinHeight,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow =
                      '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '4px',
                    display: 'block',
                  }}
                >
                  Mobile Size
                </label>
                <select
                  value={toggleMenuConfig.responsive.mobile.size}
                  onChange={(e) =>
                    handleToggleMenuResponsiveChange(
                      'mobile',
                      'size',
                      e.target.value
                    )
                  }
                  style={{
                    padding: crossPlatformStyles.inputPadding,
                    border: '1px solid #d1d5db',
                    borderRadius: crossPlatformStyles.inputBorderRadius,
                    fontSize: crossPlatformStyles.inputFontSize,
                    width: '100%',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    minHeight: crossPlatformStyles.inputMinHeight,
                    height: crossPlatformStyles.inputMinHeight,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow =
                      '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '4px',
                    display: 'block',
                  }}
                >
                  Tablet Size
                </label>
                <select
                  value={toggleMenuConfig.responsive.tablet.size}
                  onChange={(e) =>
                    handleToggleMenuResponsiveChange(
                      'tablet',
                      'size',
                      e.target.value
                    )
                  }
                  style={{
                    padding: crossPlatformStyles.inputPadding,
                    border: '1px solid #d1d5db',
                    borderRadius: crossPlatformStyles.inputBorderRadius,
                    fontSize: crossPlatformStyles.inputFontSize,
                    width: '100%',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    minHeight: crossPlatformStyles.inputMinHeight,
                    height: crossPlatformStyles.inputMinHeight,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow =
                      '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '4px',
                    display: 'block',
                  }}
                >
                  Desktop Size
                </label>
                <select
                  value={toggleMenuConfig.responsive.desktop.size}
                  onChange={(e) =>
                    handleToggleMenuResponsiveChange(
                      'desktop',
                      'size',
                      e.target.value
                    )
                  }
                  style={{
                    padding: crossPlatformStyles.inputPadding,
                    border: '1px solid #d1d5db',
                    borderRadius: crossPlatformStyles.inputBorderRadius,
                    fontSize: crossPlatformStyles.inputFontSize,
                    width: '100%',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    minHeight: crossPlatformStyles.inputMinHeight,
                    height: crossPlatformStyles.inputMinHeight,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow =
                      '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        style={{
          position: 'fixed',
          top: responsive.padding,
          right: isOpen ? `calc(${responsive.drawerWidth} + 20px)` : '20px',
          width: responsive.buttonSize,
          height: responsive.buttonSize,
          borderRadius: '50%',
          border: 'none',
          backgroundColor: '#1976d2',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: responsive.iconSize,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          transition: 'right 0.3s ease-in-out, transform 0.3s ease-in-out',
          zIndex: 1001,
        }}
      >
        <MenuOpenIcon
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease-in-out',
            fontSize: responsive.isMobile ? '24px' : '28px',
          }}
        />
      </button>
    </div>
  );
}

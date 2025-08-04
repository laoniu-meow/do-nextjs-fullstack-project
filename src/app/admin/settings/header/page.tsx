'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { MenuList, adminMenuItems } from '@/components/menu';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ModernColorPicker from '@/components/ModernColorPicker';
import ResponsiveHeader from '@/components/ResponsiveHeader';

export default function HeaderSettingsPage() {
  const responsive = useResponsiveStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState('header');

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
  });

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
      console.log('Loading header data...');

      // Load production header data (same as frontend)
      const headerResponse = await fetch('/api/company/logo');
      const headerData = await headerResponse.json();
      console.log('Production header data:', headerData);
      setProductionHeaderData(headerData);

      // Load production data
      const prodResponse = await fetch('/api/header');
      const prodData = await prodResponse.json();
      console.log('Production data:', prodData);
      setProductionData(prodData);

      // Load staging data
      const stagingResponse = await fetch('/api/header/staging');
      const stagingData = await stagingResponse.json();
      console.log('Staging data:', stagingData);
      setStagingData(stagingData || null);

      // Use staging data if available, otherwise use production data
      const dataToUse = stagingData && stagingData.id ? stagingData : prodData;
      console.log('Data to use:', dataToUse);

      if (dataToUse && dataToUse.id) {
        setOriginalHeaderData(dataToUse);

        // Update headerConfig with the loaded data
        setHeaderConfig({
          backgroundColor: dataToUse.backgroundColor || '#ffffff',
          headerHeight: dataToUse.headerHeight || '5rem',
          headerPosition: dataToUse.headerPosition || 'fixed',
          borderColor: dataToUse.borderColor || '#e0e0e0',
          borderHeight: dataToUse.borderHeight || '1px',
          borderShadow: dataToUse.borderShadow || 'none',
          logoWidth: dataToUse.logoWidth || '4.35rem',
          logoHeight: dataToUse.logoHeight || '6.5rem',
          logoOrientation: dataToUse.logoOrientation || 'portrait',
        });
      } else {
        console.log('No data found, using default values');
      }
    } catch (error) {
      console.error('Error loading header data:', error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadHeaderData();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item: any) => {
    setActiveItemId(item.id);
    console.log('Menu item clicked:', item);

    if (item.href) {
      window.location.href = item.href;
    }

    if (responsive.isMobile) {
      setIsOpen(false);
    }
  };

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

  // Helper function to calculate logo dimensions based on orientation and size
  const getLogoDimensions = (orientation: string, size: string) => {
    const sizeMap = {
      small: '5rem', // 80px - Increased from 4.5rem
      medium: '6.5rem', // 104px - Increased from 6rem
      large: '8rem', // 128px - Increased from 7.5rem
    };

    const height = sizeMap[size as keyof typeof sizeMap] || '2.5rem';

    if (orientation === 'portrait') {
      // Portrait: height is larger, width is smaller (2:3 ratio)
      const heightValue = parseFloat(height);
      const widthValue = heightValue * 0.67; // 2:3 ratio
      return {
        width: `${widthValue}rem`,
        height: height,
      };
    } else {
      // Landscape: width is larger, height is smaller (3:2 ratio)
      const heightValue = parseFloat(height);
      const widthValue = heightValue * 1.5; // 3:2 ratio
      return {
        width: `${widthValue}rem`,
        height: height,
      };
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setHeaderConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
    console.log('Field change:', field, value);
  };

  // Handle logo orientation change
  const handleLogoOrientationChange = (orientation: string) => {
    const currentSize =
      headerConfig.logoHeight === '5rem'
        ? 'small'
        : headerConfig.logoHeight === '6.5rem'
          ? 'medium'
          : 'large';

    const dimensions = getLogoDimensions(orientation, currentSize);

    setHeaderConfig((prev) => ({
      ...prev,
      logoOrientation: orientation,
      logoWidth: dimensions.width,
      logoHeight: dimensions.height,
    }));
    setHasChanges(true);
  };

  // Handle logo size change
  const handleLogoSizeChange = (size: string) => {
    const dimensions = getLogoDimensions(headerConfig.logoOrientation, size);

    setHeaderConfig((prev) => ({
      ...prev,
      logoWidth: dimensions.width,
      logoHeight: dimensions.height,
    }));
    setHasChanges(true);
  };

  const handleSaveToStaging = async () => {
    if (!hasChanges) {
      alert('No changes to save');
      return;
    }

    try {
      const response = await fetch('/api/header/staging', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          backgroundColor: headerConfig.backgroundColor,
          headerHeight: headerConfig.headerHeight,
          headerPosition: headerConfig.headerPosition,
          borderColor: headerConfig.borderColor,
          borderHeight: headerConfig.borderHeight,
          borderShadow: headerConfig.borderShadow,
          logoWidth: headerConfig.logoWidth,
          logoHeight: headerConfig.logoHeight,
          logoOrientation: headerConfig.logoOrientation,
        }),
      });

      if (response.ok) {
        const savedData = await response.json();
        setStagingData(savedData);
        setHasChanges(false);
        alert('All changes saved to staging successfully!');
      } else {
        alert('Failed to save changes to staging');
      }
    } catch (error) {
      console.error('Error saving to staging:', error);
      alert('Error saving to staging');
    }
  };

  const handleUploadToProduction = async () => {
    if (!stagingData || !stagingData.id) {
      alert('No staging data available to upload');
      return;
    }

    try {
      const response = await fetch('/api/header/staging', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stagingId: stagingData.id,
          reviewedBy: 'admin',
        }),
      });

      if (response.ok) {
        const productionData = await response.json();
        setProductionData(productionData);
        alert('Header settings successfully uploaded to production!');

        // Reload data after successful upload
        await loadHeaderData();

        // Dispatch event to update frontend header
        window.dispatchEvent(new Event('header-updated'));
      } else {
        alert('Failed to upload header settings to production');
      }
    } catch (error) {
      console.error('Error uploading header settings to production:', error);
      alert('Error uploading header settings to production');
    }
  };

  const handlePreviewClick = () => {
    if (stagingData && stagingData.id) {
      alert(
        `Preview Staging Data:\n\nBackground Color: ${stagingBackgroundColor || 'Not set'}\nHeader Height: ${stagingHeaderHeight || 'Not set'}\nHeader Position: ${stagingHeaderPosition || 'Not set'}\nBorder Color: ${stagingBorderColor || 'Not set'}\nBorder Height: ${stagingBorderHeight || 'Not set'}\nLogo Orientation: ${headerConfig.logoOrientation}\nLogo Width: ${stagingLogoWidth || 'Not set'}\nLogo Height: ${stagingLogoHeight || 'Not set'}\nStatus: ${stagingData.status}`
      );
    } else {
      alert('No staging data available to preview');
    }
  };

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
                  padding: '8px',
                  borderRadius: '8px',
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
                    fontSize: responsive.isMobile ? '28px' : '32px',
                    color: '#1976d2',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                />
              </div>
              <div
                title="Save to Staging"
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  backgroundColor: hasChanges ? '#dbeafe' : '#f3f4f6',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (hasChanges) {
                    e.currentTarget.style.backgroundColor = '#bfdbfe';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (hasChanges) {
                    e.currentTarget.style.backgroundColor = '#dbeafe';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                <SaveIcon
                  onClick={handleSaveToStaging}
                  style={{
                    fontSize: responsive.isMobile ? '28px' : '32px',
                    color: hasChanges ? '#1976d2' : '#9ca3af',
                    cursor: hasChanges ? 'pointer' : 'not-allowed',
                    opacity: hasChanges ? 1 : 0.5,
                    transition: 'color 0.2s ease',
                  }}
                />
              </div>
              <div
                title="Upload to Production"
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  backgroundColor:
                    stagingData && stagingData.id ? '#dcfce7' : '#f3f4f6',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (stagingData && stagingData.id) {
                    e.currentTarget.style.backgroundColor = '#bbf7d0';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (stagingData && stagingData.id) {
                    e.currentTarget.style.backgroundColor = '#dcfce7';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                <CloudUploadIcon
                  onClick={handleUploadToProduction}
                  style={{
                    fontSize: responsive.isMobile ? '28px' : '32px',
                    color:
                      stagingData && stagingData.id ? '#16a34a' : '#9ca3af',
                    cursor:
                      stagingData && stagingData.id ? 'pointer' : 'not-allowed',
                    opacity: stagingData && stagingData.id ? 1 : 0.5,
                    transition: 'color 0.2s ease',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Enhanced Header Preview Section */}
          <div
            style={{
              marginTop: '24px',
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '4px',
                  height: '20px',
                  backgroundColor: '#1976d2',
                  borderRadius: '2px',
                }}
              />
              <h4
                style={{
                  margin: '0',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#1e293b',
                }}
              >
                Live Preview
              </h4>
            </div>

            {/* Enhanced Header Preview Container */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '16px',
                padding: '16px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                maxWidth: responsive.isMobile ? '375px' : '100%',
                margin: responsive.isMobile ? '0 auto' : '0',
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
              />
            </div>

            {/* Enhanced Preview Info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '13px',
                color: '#64748b',
                fontStyle: 'italic',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#10b981',
                  borderRadius: '50%',
                }}
              />
              Automatically responsive across all devices
              <span
                style={{
                  marginLeft: '8px',
                  padding: '2px 8px',
                  backgroundColor: '#e0e7ff',
                  color: '#3730a3',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '500',
                }}
              >
                {responsive.isMobile
                  ? 'Mobile'
                  : responsive.isTablet
                    ? 'Tablet'
                    : 'Desktop'}{' '}
                Preview
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            paddingRight: '8px',
            paddingBottom: '20px',
            minHeight: 0,
          }}
        >
          {/* Single Comprehensive Header Configuration Card */}
          <div
            style={{
              padding: '24px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              fontSize: '14px',
              boxShadow:
                '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
              border: '1px solid #e2e8f0',
              transition: 'all 0.2s ease',
              marginBottom: '20px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 10px 25px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow =
                '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)';
            }}
          >
            {/* Card Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  width: '4px',
                  height: '20px',
                  backgroundColor: '#1976d2',
                  borderRadius: '2px',
                }}
              />
              <h4
                style={{
                  margin: '0',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1e293b',
                }}
              >
                Header Configuration
              </h4>
            </div>

            {/* Settings Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: responsive.isMobile
                  ? '1fr'
                  : 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {/* Background & Header Settings Section */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '3px',
                      height: '16px',
                      backgroundColor: '#10b981',
                      borderRadius: '2px',
                    }}
                  />
                  <h5
                    style={{
                      margin: '0',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                    }}
                  >
                    Background & Layout
                  </h5>
                </div>

                <ModernColorPicker
                  label=""
                  value={headerConfig.backgroundColor}
                  onChange={(color) =>
                    handleFieldChange('backgroundColor', color)
                  }
                  placeholder="Select header background color"
                  showHex={true}
                  showRgb={false}
                  showHsl={false}
                  showAlpha={false}
                  showSwatches={true}
                  showHistory={false}
                  size="medium"
                  theme="light"
                  ariaLabel="Header background color selection"
                />

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <label
                    style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#374151',
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
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      width: '100%',
                      backgroundColor: 'white',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#1976d2';
                      e.target.style.boxShadow =
                        '0 0 0 3px rgba(25, 118, 210, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="3.75rem">Small (60px)</option>
                    <option value="5rem">Medium (80px)</option>
                    <option value="6.25rem">Large (100px)</option>
                  </select>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <label
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#333',
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
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                      width: '100%',
                      backgroundColor: 'white',
                    }}
                  >
                    <option value="fixed">Fixed (Desktop)</option>
                    <option value="sticky">Sticky (Mobile Friendly)</option>
                    <option value="relative">Relative</option>
                  </select>
                  <small style={{ fontSize: '10px', color: '#666' }}>
                    Sticky is recommended for mobile devices
                  </small>
                </div>
              </div>

              {/* Border & Shadow Settings Section */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '3px',
                      height: '16px',
                      backgroundColor: '#f59e0b',
                      borderRadius: '2px',
                    }}
                  />
                  <h5
                    style={{
                      margin: '0',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                    }}
                  >
                    Border & Shadow
                  </h5>
                </div>

                <ModernColorPicker
                  label=""
                  value={headerConfig.borderColor}
                  onChange={(color) => handleFieldChange('borderColor', color)}
                  placeholder="Select header border color"
                  showHex={true}
                  showRgb={false}
                  showHsl={false}
                  showAlpha={false}
                  showSwatches={true}
                  showHistory={false}
                  size="medium"
                  theme="light"
                  ariaLabel="Header border color selection"
                />

                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <label
                      style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#333',
                      }}
                    >
                      Border Height (px)
                    </label>
                    <input
                      type="number"
                      value={parseInt(headerConfig.borderHeight) || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          handleFieldChange('borderHeight', `${value}px`);
                        } else {
                          handleFieldChange('borderHeight', '0px');
                        }
                      }}
                      placeholder="e.g., 1, 2, 3"
                      min="0"
                      max="20"
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        width: '100%',
                      }}
                    />
                  </div>

                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <label
                      style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#333',
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
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        width: '100%',
                        backgroundColor: 'white',
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

              {/* Logo Configuration Section */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '3px',
                      height: '16px',
                      backgroundColor: '#8b5cf6',
                      borderRadius: '2px',
                    }}
                  />
                  <h5
                    style={{
                      margin: '0',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                    }}
                  >
                    Logo Configuration
                  </h5>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <label
                      style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#333',
                      }}
                    >
                      Logo Orientation
                    </label>
                    <select
                      value={headerConfig.logoOrientation}
                      onChange={(e) =>
                        handleLogoOrientationChange(e.target.value)
                      }
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        width: '100%',
                        backgroundColor: 'white',
                      }}
                    >
                      <option value="portrait">Portrait (Tall)</option>
                      <option value="landscape">Landscape (Wide)</option>
                    </select>
                  </div>

                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <label
                      style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#333',
                      }}
                    >
                      Logo Size
                    </label>
                    <select
                      value={
                        headerConfig.logoHeight === '5rem'
                          ? 'small'
                          : headerConfig.logoHeight === '6.5rem'
                            ? 'medium'
                            : 'large'
                      }
                      onChange={(e) => handleLogoSizeChange(e.target.value)}
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        width: '100%',
                        backgroundColor: 'white',
                      }}
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    padding: '12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#666',
                    border: '1px solid #e9ecef',
                  }}
                >
                  <strong>Current Dimensions:</strong>
                  <br />
                  Width: {headerConfig.logoWidth}
                  <br />
                  Height: {headerConfig.logoHeight}
                </div>
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

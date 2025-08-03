'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { MenuList, adminMenuItems } from '@/components/menu';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export default function HeaderSettingsPage() {
  const responsive = useResponsiveStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState('header');

  // Auto-save functionality
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);

  // Edit mode states
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalHeaderData, setOriginalHeaderData] = useState<any>(null);
  const [stagingData, setStagingData] = useState<any>(null);
  const [productionData, setProductionData] = useState<any>(null);

  // Header configuration data
  const [headerConfig, setHeaderConfig] = useState({
    // Empty for now - ready for future configuration fields
  });

  const loadHeaderData = useCallback(async () => {
    try {
      console.log('Loading header data...');

      // Load production data
      const prodResponse = await fetch('/api/header');
      const prodData = await prodResponse.json();
      console.log('Production data:', prodData);
      setProductionData(prodData);

      // Load staging data
      const stagingResponse = await fetch('/api/header/staging');
      const stagingData = await stagingResponse.json();
      console.log('Staging data:', stagingData);
      setStagingData(stagingData);

      // Use staging data if available, otherwise use production data
      const dataToUse = stagingData.id ? stagingData : prodData;
      console.log('Data to use:', dataToUse);

      if (dataToUse.id) {
        setOriginalHeaderData(dataToUse);
      } else {
        console.log('No data found, using default values');
      }
    } catch (error) {
      console.error('Error loading header data:', error);
    }
  }, []);

  // Load data on component mount
  useEffect(() => {
    loadHeaderData();
  }, [loadHeaderData]);

  // Cleanup auto-save timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
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

  // Auto-save function with debouncing
  const autoSaveToStaging = useCallback(async () => {
    if (!hasChanges) return;

    try {
      setIsAutoSaving(true);
      console.log('Auto-saving header changes to staging...');

      const headerData = {
        // Empty for now - ready for future configuration fields
      };

      const response = await fetch('/api/header/staging', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(headerData),
      });

      if (response.ok) {
        const savedData = await response.json();
        setStagingData(savedData);
        setLastAutoSave(new Date());
        console.log('Auto-save successful');
      } else {
        console.error('Auto-save failed');
      }
    } catch (error) {
      console.error('Error during auto-save:', error);
    } finally {
      setIsAutoSaving(false);
    }
  }, [hasChanges]);

  // Debounced auto-save trigger
  const triggerAutoSave = useCallback(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      autoSaveToStaging();
    }, 2000); // 2 second delay
  }, [autoSaveToStaging]);

  // Edit mode functions
  const handleEditClick = () => {
    if (isEditMode) {
      // Cancel edit mode
      setIsEditMode(false);
      setHasChanges(false);
    } else {
      // Enter edit mode
      setIsEditMode(true);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    // Ready for future field changes
    console.log('Field change:', field, value);
  };

  const handlePreviewClick = () => {
    if (stagingData && stagingData.id) {
      alert(
        `Preview Staging Data:\n\nTitle: ${stagingData.title}\nDescription: ${stagingData.description}\n\nStatus: ${stagingData.status}`
      );
    } else {
      alert('No staging data available to preview');
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
          reviewedBy: 'admin', // This would come from user session in real app
        }),
      });

      if (response.ok) {
        const productionData = await response.json();
        setProductionData(productionData);
        alert('Successfully uploaded to production!');
        // Reload data to show production version
        loadHeaderData();
      } else {
        alert('Failed to upload to production');
      }
    } catch (error) {
      console.error('Error uploading to production:', error);
      alert('Error uploading to production');
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
        }}
      >
        {/* Static Header Section */}
        <div style={{ marginBottom: '20px' }}>
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
              {isAutoSaving && (
                <span style={{ color: '#1976d2', marginLeft: '8px' }}>
                  • Auto-saving...
                </span>
              )}
              {lastAutoSave && !isAutoSaving && (
                <span style={{ color: '#4caf50', marginLeft: '8px' }}>
                  • Last saved: {lastAutoSave.toLocaleTimeString()}
                </span>
              )}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div title="Preview Staging Data">
                <VisibilityIcon
                  onClick={handlePreviewClick}
                  style={{
                    fontSize: responsive.isMobile ? '28px' : '32px',
                    color: '#1976d2',
                    cursor: 'pointer',
                  }}
                />
              </div>
              <div title="Upload to Production">
                <CloudUploadIcon
                  onClick={handleUploadToProduction}
                  style={{
                    fontSize: responsive.isMobile ? '28px' : '32px',
                    color: '#388e3c',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Header Preview Section */}
          <div
            style={{
              marginTop: '20px',
            }}
          >
            <h4
              style={{
                margin: '0 0 12px 0',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1976d2',
              }}
            >
              Header Preview
            </h4>

            {/* Preview Header */}
            <div
              style={{
                width: '100%',
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e0e0e0',
                padding: '16px 24px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
            >
              <div
                style={{
                  maxWidth: '1200px',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  minHeight: '48px',
                }}
              >
                {/* Logo/Brand Area */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                  }}
                >
                  {/* Company Logo */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#1976d2',
                    }}
                  >
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
                        fontSize: '18px',
                        fontWeight: 'bold',
                      }}
                    >
                      L
                    </div>
                  </div>

                  {/* Company Name */}
                  <div
                    style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#1a365d',
                    }}
                  >
                    Company Name
                  </div>
                </div>

                {/* Menu Button */}
                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '8px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '2px',
                      backgroundColor: '#333',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '-6px',
                        left: '0',
                        width: '100%',
                        height: '2px',
                        backgroundColor: '#333',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '6px',
                        left: '0',
                        width: '100%',
                        height: '2px',
                        backgroundColor: '#333',
                      }}
                    />
                  </div>
                </button>
              </div>
            </div>

            <p
              style={{
                marginTop: '8px',
                fontSize: '11px',
                color: '#666',
                textAlign: 'center',
                fontStyle: 'italic',
                margin: '0',
              }}
            >
              This is how your header will appear on the frontend
            </p>
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div
          style={{
            height: 'calc(100vh - 200px)',
            overflowY: 'auto',
            paddingRight: '8px',
          }}
        >
          {/* Header Configuration Card */}
          <div
            style={{
              marginTop: responsive.gap,
              padding: responsive.padding,
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
                fontSize: responsive.subtitleFontSize,
                fontWeight: '600',
                color: '#1976d2',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>Header Configuration</span>
              <button
                onClick={
                  isEditMode
                    ? hasChanges
                      ? handleEditClick
                      : handleEditClick
                    : handleEditClick
                }
                style={{
                  padding: '6px 12px',
                  backgroundColor: isEditMode
                    ? hasChanges
                      ? '#4caf50'
                      : '#ff9800'
                    : '#ffcc80',
                  color: isEditMode
                    ? hasChanges
                      ? '#fff'
                      : '#fff'
                    : '#e65100',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                }}
                onMouseEnter={(e) => {
                  if (isEditMode) {
                    e.currentTarget.style.backgroundColor = hasChanges
                      ? '#45a049'
                      : '#f57c00';
                  } else {
                    e.currentTarget.style.backgroundColor = '#ffb74d';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isEditMode) {
                    e.currentTarget.style.backgroundColor = hasChanges
                      ? '#4caf50'
                      : '#ff9800';
                  } else {
                    e.currentTarget.style.backgroundColor = '#ffcc80';
                  }
                }}
              >
                {isEditMode ? (
                  hasChanges ? (
                    <SaveIcon style={{ fontSize: '16px' }} />
                  ) : (
                    <CancelIcon style={{ fontSize: '16px' }} />
                  )
                ) : (
                  '✏️'
                )}
              </button>
            </h3>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: responsive.isMobile ? '12px' : '16px',
              }}
            >
              {/* Ready for future configuration fields */}
              <div
                style={{
                  padding: '20px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  textAlign: 'center',
                  color: '#666',
                  fontSize: '14px',
                }}
              >
                Header configuration fields will be added here
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

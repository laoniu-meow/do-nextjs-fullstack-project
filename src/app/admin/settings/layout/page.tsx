'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { MenuList, adminMenuItems } from '@/components/menu';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ModernColorPicker from '@/components/ModernColorPicker';

export default function LayoutSettingsPage() {
  const responsive = useResponsiveStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState('layout');
  const [activeTab, setActiveTab] = useState('header');

  // Header Settings
  const [headerVisibility, setHeaderVisibility] = useState('visible');
  const [headerAlignment, setHeaderAlignment] = useState('left');
  const [headerPadding, setHeaderPadding] = useState('medium');

  // Background & Layout
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [headerHeight, setHeaderHeight] = useState('5rem');
  const [headerPosition, setHeaderPosition] = useState('fixed');

  // Border & Shadow
  const [borderColor, setBorderColor] = useState('#e5e7eb');
  const [borderWidth, setBorderWidth] = useState('1px');
  const [borderShadow, setBorderShadow] = useState('none');

  // Logo Configuration
  const [logoSize, setLogoSize] = useState('medium');
  const [logoOrientation, setLogoOrientation] = useState('portrait');
  const [logoShadow, setLogoShadow] = useState('none');

  // Toggle Menu Button
  const [buttonShape, setButtonShape] = useState('square');
  const [buttonSize, setButtonSize] = useState('medium');
  const [buttonColor, setButtonColor] = useState('#3b82f6');
  const [mobileSize, setMobileSize] = useState('small');
  const [tabletSize, setTabletSize] = useState('medium');
  const [desktopSize, setDesktopSize] = useState('medium');

  // Page Colors
  const [pageBackgroundColor, setPageBackgroundColor] = useState('#ffffff');
  const [primaryTextColor, setPrimaryTextColor] = useState('#1f2937');
  const [linkColor, setLinkColor] = useState('#3b82f6');
  const [linkHoverColor, setLinkHoverColor] = useState('#2563eb');

  // Typography
  const [primaryFont, setPrimaryFont] = useState('system');
  const [secondaryFont, setSecondaryFont] = useState('system');
  const [bodyTextSize, setBodyTextSize] = useState('medium');
  const [headingSize, setHeadingSize] = useState('medium');
  const [secondaryTextColor, setSecondaryTextColor] = useState('#6b7280');
  const [headingColor, setHeadingColor] = useState('#1f2937');
  const [lineHeight, setLineHeight] = useState('normal');
  const [paragraphSpacing, setParagraphSpacing] = useState('medium');

  // Footer Layout State
  const [footerCards, setFooterCards] = useState([
    {
      id: 'company',
      title: 'Company Information',
      icon: '🏢',
      description: 'Company name, address, contact info, and email',
      shortName: 'Company',
    },
    {
      id: 'links',
      title: 'Useful Links',
      icon: '🔗',
      description: 'Navigation links, legal pages, and quick access',
      shortName: 'Links',
    },
    {
      id: 'subscribe',
      title: 'Subscription Form',
      icon: '📧',
      description: 'Newsletter signup and email subscription',
      shortName: 'Subscribe',
    },
  ]);

  // Company Information Settings
  const [companyFont, setCompanyFont] = useState('Inter');
  const [companyFontSize, setCompanyFontSize] = useState('14px');
  const [companyFontColor, setCompanyFontColor] = useState('#374151');
  const [companyBannerSize, setCompanyBannerSize] = useState('medium');

  // Useful Links Settings
  const [linkStyle, setLinkStyle] = useState('text');
  const [linkLayout, setLinkLayout] = useState('horizontal');
  const [linkGrouping, setLinkGrouping] = useState('category');

  // Subscription Form Settings
  const [formStyle, setFormStyle] = useState('minimal');
  const [formLayout, setFormLayout] = useState('inline');
  const [placeholderText, setPlaceholderText] = useState('Enter your email...');
  const [buttonText, setButtonText] = useState('Subscribe');
  const [successMessage, setSuccessMessage] = useState(
    'Thank you for subscribing!'
  );
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);
  const [formWidth, setFormWidth] = useState('auto');
  const [formAlignment, setFormAlignment] = useState('left');

  // Memoize the footer cards to prevent unnecessary re-renders
  const memoizedFooterCards = useMemo(() => footerCards, [footerCards]);

  // Memoize the drag handler to prevent recreation on every render
  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      if (draggedIndex !== null && draggedIndex !== index) {
        setDragOverIndex(index);
      }
    },
    [draggedIndex]
  );

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();
      if (draggedIndex !== null && draggedIndex !== dropIndex) {
        setFooterCards((prevCards) => {
          const items = Array.from(prevCards);
          const [draggedItem] = items.splice(draggedIndex, 1);
          items.splice(dropIndex, 0, draggedItem);
          return items;
        });
      }
      setDraggedIndex(null);
      setDragOverIndex(null);
    },
    [draggedIndex]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item: any) => {
    setActiveItemId(item.id);
    setIsOpen(false);

    // Navigate to the appropriate page
    if (item.href && typeof window !== 'undefined') {
      window.location.href = item.href;
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
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
            Layout Settings
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
            Configure layout settings for the frontend
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
          </div>
        </div>

        {/* Content Area */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            padding: '20px',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: responsive.isMobile ? '0.75rem' : '1.25rem',
              height: '100%',
              flexDirection: responsive.isMobile ? 'column' : 'row',
            }}
          >
            {/* Live Preview Area */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                borderRadius: '0.5rem',
                border: '1px solid #e9ecef',
                padding: responsive.isMobile ? '1rem' : '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: responsive.isMobile ? '0.75rem' : '1rem',
                minHeight: responsive.isMobile ? 'auto' : 'auto',
                order: responsive.isMobile ? 1 : 2,
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1a365d',
                  marginBottom: '16px',
                  marginTop: '0',
                }}
              >
                Live Preview
              </h3>

              {/* Header Section */}
              <div
                style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: '0.375rem',
                  border: '1px solid #e9ecef',
                  padding: responsive.isMobile ? '0.75rem' : '1rem',
                  minHeight: responsive.isMobile ? '3.5rem' : '5rem',
                }}
              >
                <h4
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px',
                    marginTop: '0',
                  }}
                >
                  Header
                </h4>
                <div
                  style={{
                    color: '#6b7280',
                    fontSize: '12px',
                    fontStyle: 'italic',
                  }}
                >
                  Header preview coming soon...
                </div>
              </div>

              {/* Pages Section */}
              <div
                style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: '0.375rem',
                  border: '1px solid #e9ecef',
                  padding: responsive.isMobile ? '0.75rem' : '1rem',
                  minHeight: responsive.isMobile ? '2rem' : '2.5rem',
                  flex: 1,
                }}
              >
                <h4
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px',
                    marginTop: '0',
                  }}
                >
                  Pages
                </h4>
                <div
                  style={{
                    color: '#6b7280',
                    fontSize: '12px',
                    fontStyle: 'italic',
                  }}
                >
                  Pages preview coming soon...
                </div>
              </div>

              {/* Footer Section */}
              <div
                style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: '0.375rem',
                  border: '1px solid #e9ecef',
                  padding: responsive.isMobile ? '0.75rem' : '1rem',
                  minHeight: responsive.isMobile ? '10rem' : '15rem',
                }}
              >
                <h4
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px',
                    marginTop: '0',
                  }}
                >
                  Footer
                </h4>
                <div
                  style={{
                    color: '#6b7280',
                    fontSize: '12px',
                    fontStyle: 'italic',
                  }}
                >
                  Footer preview coming soon...
                </div>
              </div>
            </div>

            {/* Configuration Menu Box */}
            <div
              style={{
                width: responsive.isMobile
                  ? '100%'
                  : responsive.isTablet
                    ? '15rem'
                    : '17.5rem',
                backgroundColor: '#ffffff',
                borderRadius: '0.5rem',
                border: '1px solid #e9ecef',
                padding: responsive.isMobile ? '1rem' : '1.25rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                flexShrink: 0,
                minHeight: responsive.isMobile ? 'auto' : 'auto',
                order: responsive.isMobile ? 2 : 1,
                maxHeight: 'calc(100vh - 200px)',
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1a365d',
                  marginBottom: '16px',
                  marginTop: '0',
                }}
              >
                Configuration
              </h3>

              {/* Tab Navigation */}
              <div
                style={{
                  display: 'flex',
                  borderBottom: '1px solid #e9ecef',
                  marginBottom: '16px',
                }}
              >
                {[
                  { id: 'header', label: 'Header', icon: '📋' },
                  { id: 'pages', label: 'Pages', icon: '📄' },
                  { id: 'footer', label: 'Footer', icon: '⬇️' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: activeTab === tab.id ? '#3b82f6' : '#6b7280',
                      fontSize: '12px',
                      fontWeight: activeTab === tab.id ? '600' : '500',
                      cursor: 'pointer',
                      borderBottom:
                        activeTab === tab.id
                          ? '2px solid #3b82f6'
                          : '2px solid transparent',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'header' && (
                <div>
                  {/* Header Settings Section */}
                  <div
                    style={{
                      borderTop: '1px solid #e9ecef',
                      paddingTop: '16px',
                      marginTop: '16px',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '12px',
                        marginTop: '0',
                      }}
                    >
                      Header Settings
                    </h4>

                    {/* Header Visibility & Alignment Row */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      {/* Header Visibility */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Visibility
                        </label>
                        <select
                          value={headerVisibility}
                          onChange={(e) => setHeaderVisibility(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            width: '100%',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            minHeight: '36px',
                            height: '36px',
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
                          <option value="visible">Visible</option>
                          <option value="hidden">Hidden</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>

                      {/* Header Alignment */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Alignment
                        </label>
                        <select
                          value={headerAlignment}
                          onChange={(e) => setHeaderAlignment(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            width: '100%',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            minHeight: '36px',
                            height: '36px',
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
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                    </div>

                    {/* Header Padding - Full Width */}
                    <div style={{ marginBottom: '12px' }}>
                      <label
                        style={{
                          fontSize: '11px',
                          fontWeight: '500',
                          color: '#6b7280',
                          marginBottom: '4px',
                          display: 'block',
                        }}
                      >
                        Padding
                      </label>
                      <select
                        value={headerPadding}
                        onChange={(e) => setHeaderPadding(e.target.value)}
                        style={{
                          padding: '6px 10px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '13px',
                          width: '100%',
                          backgroundColor: 'white',
                          transition: 'all 0.2s ease',
                          outline: 'none',
                          minHeight: '36px',
                          height: '36px',
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

                  {/* Background & Layout Section */}
                  <div
                    style={{
                      borderTop: '1px solid #e9ecef',
                      paddingTop: '16px',
                      marginTop: '16px',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '12px',
                        marginTop: '0',
                      }}
                    >
                      Background & Layout
                    </h4>

                    {/* Background Color - Full Width */}
                    <div style={{ marginBottom: '12px' }}>
                      <label
                        style={{
                          fontSize: '11px',
                          fontWeight: '500',
                          color: '#6b7280',
                          marginBottom: '4px',
                          display: 'block',
                        }}
                      >
                        Background Color
                      </label>
                      <ModernColorPicker
                        value={backgroundColor}
                        onChange={(color) => setBackgroundColor(color)}
                        size="small"
                      />
                    </div>

                    {/* Header Height & Position Row */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      {/* Header Height */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Height
                        </label>
                        <select
                          value={headerHeight}
                          onChange={(e) => setHeaderHeight(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            width: '100%',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            minHeight: '36px',
                            height: '36px',
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
                          <option value="4rem">Small</option>
                          <option value="5rem">Medium</option>
                          <option value="6rem">Large</option>
                        </select>
                      </div>

                      {/* Header Position */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Position
                        </label>
                        <select
                          value={headerPosition}
                          onChange={(e) => setHeaderPosition(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            width: '100%',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            minHeight: '36px',
                            height: '36px',
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

                  {/* Border & Shadow Section */}
                  <div
                    style={{
                      borderTop: '1px solid #e9ecef',
                      paddingTop: '16px',
                      marginTop: '16px',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '12px',
                        marginTop: '0',
                      }}
                    >
                      Border & Shadow
                    </h4>

                    {/* Border Color - Full Width */}
                    <div style={{ marginBottom: '12px' }}>
                      <label
                        style={{
                          fontSize: '11px',
                          fontWeight: '500',
                          color: '#6b7280',
                          marginBottom: '4px',
                          display: 'block',
                        }}
                      >
                        Border Color
                      </label>
                      <ModernColorPicker
                        value={borderColor}
                        onChange={(color) => setBorderColor(color)}
                        size="small"
                      />
                    </div>

                    {/* Border Width & Shadow Row */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      {/* Border Width */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Width
                        </label>
                        <select
                          value={borderWidth}
                          onChange={(e) => setBorderWidth(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            width: '100%',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            minHeight: '36px',
                            height: '36px',
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
                          <option value="0px">None</option>
                          <option value="1px">Thin</option>
                          <option value="2px">Medium</option>
                          <option value="3px">Thick</option>
                        </select>
                      </div>

                      {/* Border Shadow */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Shadow
                        </label>
                        <select
                          value={borderShadow}
                          onChange={(e) => setBorderShadow(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            width: '100%',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            minHeight: '36px',
                            height: '36px',
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

                  {/* Logo Configuration Section */}
                  <div
                    style={{
                      borderTop: '1px solid #e9ecef',
                      paddingTop: '16px',
                      marginTop: '16px',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '12px',
                        marginTop: '0',
                      }}
                    >
                      Logo Configuration
                    </h4>

                    {/* Logo Size & Orientation Row */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      {/* Logo Size */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Size
                        </label>
                        <select
                          value={logoSize}
                          onChange={(e) => setLogoSize(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            width: '100%',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            minHeight: '36px',
                            height: '36px',
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

                      {/* Logo Orientation */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Orientation
                        </label>
                        <select
                          value={logoOrientation}
                          onChange={(e) => setLogoOrientation(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            width: '100%',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            minHeight: '36px',
                            height: '36px',
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
                      </div>
                    </div>

                    {/* Logo Shadow - Full Width */}
                    <div style={{ marginBottom: '12px' }}>
                      <label
                        style={{
                          fontSize: '11px',
                          fontWeight: '500',
                          color: '#6b7280',
                          marginBottom: '4px',
                          display: 'block',
                        }}
                      >
                        Shadow
                      </label>
                      <select
                        value={logoShadow}
                        onChange={(e) => setLogoShadow(e.target.value)}
                        style={{
                          padding: '6px 10px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '13px',
                          width: '100%',
                          backgroundColor: 'white',
                          transition: 'all 0.2s ease',
                          outline: 'none',
                          minHeight: '36px',
                          height: '36px',
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

                  {/* Toggle Menu Button Section */}
                  <div
                    style={{
                      borderTop: '1px solid #e9ecef',
                      paddingTop: '16px',
                      marginTop: '16px',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '12px',
                        marginTop: '0',
                      }}
                    >
                      Toggle Menu Button
                    </h4>

                    {/* Basic Settings - 2 Column Grid */}
                    <div style={{ marginBottom: '16px' }}>
                      <h5
                        style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          color: '#6b7280',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        Basic Settings
                      </h5>

                      {/* Button Shape & Size Row */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '12px',
                          marginBottom: '12px',
                        }}
                      >
                        {/* Button Shape */}
                        <div>
                          <label
                            style={{
                              fontSize: '11px',
                              fontWeight: '500',
                              color: '#6b7280',
                              marginBottom: '4px',
                              display: 'block',
                            }}
                          >
                            Shape
                          </label>
                          <select
                            value={buttonShape}
                            onChange={(e) => setButtonShape(e.target.value)}
                            style={{
                              padding: '6px 10px',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontSize: '13px',
                              width: '100%',
                              backgroundColor: 'white',
                              transition: 'all 0.2s ease',
                              outline: 'none',
                              minHeight: '36px',
                              height: '36px',
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
                            <option value="square">Square</option>
                            <option value="rounded">Rounded</option>
                            <option value="circle">Circle</option>
                          </select>
                        </div>

                        {/* Button Size */}
                        <div>
                          <label
                            style={{
                              fontSize: '11px',
                              fontWeight: '500',
                              color: '#6b7280',
                              marginBottom: '4px',
                              display: 'block',
                            }}
                          >
                            Size
                          </label>
                          <select
                            value={buttonSize}
                            onChange={(e) => setButtonSize(e.target.value)}
                            style={{
                              padding: '6px 10px',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontSize: '13px',
                              width: '100%',
                              backgroundColor: 'white',
                              transition: 'all 0.2s ease',
                              outline: 'none',
                              minHeight: '36px',
                              height: '36px',
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

                      {/* Button Color - Full Width */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Color
                        </label>
                        <ModernColorPicker
                          value={buttonColor}
                          onChange={setButtonColor}
                          size="small"
                        />
                      </div>
                    </div>

                    {/* Responsive Settings - 2 Column Grid */}
                    <div style={{ marginBottom: '16px' }}>
                      <h5
                        style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          color: '#6b7280',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        Responsive Sizes
                      </h5>

                      {/* Mobile & Tablet Row */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '12px',
                          marginBottom: '12px',
                        }}
                      >
                        {/* Mobile Size */}
                        <div>
                          <label
                            style={{
                              fontSize: '11px',
                              fontWeight: '500',
                              color: '#6b7280',
                              marginBottom: '4px',
                              display: 'block',
                            }}
                          >
                            📱 Mobile
                          </label>
                          <select
                            value={mobileSize}
                            onChange={(e) => setMobileSize(e.target.value)}
                            style={{
                              padding: '6px 10px',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontSize: '13px',
                              width: '100%',
                              backgroundColor: 'white',
                              transition: 'all 0.2s ease',
                              outline: 'none',
                              minHeight: '36px',
                              height: '36px',
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

                        {/* Tablet Size */}
                        <div>
                          <label
                            style={{
                              fontSize: '11px',
                              fontWeight: '500',
                              color: '#6b7280',
                              marginBottom: '4px',
                              display: 'block',
                            }}
                          >
                            📟 Tablet
                          </label>
                          <select
                            value={tabletSize}
                            onChange={(e) => setTabletSize(e.target.value)}
                            style={{
                              padding: '6px 10px',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontSize: '13px',
                              width: '100%',
                              backgroundColor: 'white',
                              transition: 'all 0.2s ease',
                              outline: 'none',
                              minHeight: '36px',
                              height: '36px',
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

                      {/* Desktop Size - Full Width */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          🖥️ Desktop
                        </label>
                        <select
                          value={desktopSize}
                          onChange={(e) => setDesktopSize(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            width: '100%',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            minHeight: '36px',
                            height: '36px',
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
              )}

              {activeTab === 'pages' && (
                <div>
                  {/* Page Colors Section */}
                  <div
                    style={{
                      borderTop: '1px solid #e9ecef',
                      paddingTop: '16px',
                      marginTop: '16px',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '12px',
                        marginTop: '0',
                      }}
                    >
                      🎨 Page Colors
                    </h4>

                    {/* Background Color - Full Width */}
                    <div style={{ marginBottom: '12px' }}>
                      <label
                        style={{
                          fontSize: '11px',
                          fontWeight: '500',
                          color: '#6b7280',
                          marginBottom: '4px',
                          display: 'block',
                        }}
                      >
                        Background Color
                      </label>
                      <ModernColorPicker
                        value={pageBackgroundColor}
                        onChange={(color) => setPageBackgroundColor(color)}
                        size="small"
                      />
                    </div>

                    {/* Primary Text & Link Colors Row */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      {/* Primary Text Color */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Primary Text
                        </label>
                        <ModernColorPicker
                          value={primaryTextColor}
                          onChange={(color) => setPrimaryTextColor(color)}
                          size="small"
                        />
                      </div>

                      {/* Link Color */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Link Color
                        </label>
                        <ModernColorPicker
                          value={linkColor}
                          onChange={(color) => setLinkColor(color)}
                          size="small"
                        />
                      </div>
                    </div>

                    {/* Link Hover Color - Full Width */}
                    <div style={{ marginBottom: '16px' }}>
                      <label
                        style={{
                          fontSize: '11px',
                          fontWeight: '500',
                          color: '#6b7280',
                          marginBottom: '4px',
                          display: 'block',
                        }}
                      >
                        Link Hover Color
                      </label>
                      <ModernColorPicker
                        value={linkHoverColor}
                        onChange={(color) => setLinkHoverColor(color)}
                        size="small"
                      />
                    </div>
                  </div>

                  {/* Typography Section */}
                  <div
                    style={{
                      borderTop: '1px solid #e9ecef',
                      paddingTop: '16px',
                      marginTop: '16px',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '12px',
                        marginTop: '0',
                      }}
                    >
                      📝 Typography
                    </h4>

                    {/* Font Family Row */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      {/* Primary Font */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Primary Font
                        </label>
                        <select
                          value={primaryFont}
                          onChange={(e) => setPrimaryFont(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            width: '100%',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            minHeight: '36px',
                            height: '36px',
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
                          <option value="system">System Fonts</option>
                          <option value="arial">Arial</option>
                          <option value="helvetica">Helvetica</option>
                          <option value="georgia">Georgia</option>
                          <option value="times">Times New Roman</option>
                          <option value="roboto">Roboto (Google)</option>
                          <option value="open-sans">Open Sans (Google)</option>
                          <option value="lato">Lato (Google)</option>
                        </select>
                      </div>

                      {/* Secondary Font */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Secondary Font
                        </label>
                        <select
                          value={secondaryFont}
                          onChange={(e) => setSecondaryFont(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            width: '100%',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            minHeight: '36px',
                            height: '36px',
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
                          <option value="system">System Fonts</option>
                          <option value="arial">Arial</option>
                          <option value="helvetica">Helvetica</option>
                          <option value="georgia">Georgia</option>
                          <option value="times">Times New Roman</option>
                          <option value="roboto">Roboto (Google)</option>
                          <option value="open-sans">Open Sans (Google)</option>
                          <option value="lato">Lato (Google)</option>
                        </select>
                      </div>
                    </div>

                    {/* Font Sizes Row */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      {/* Body Text Size */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Body Text Size
                        </label>
                        <select
                          value={bodyTextSize}
                          onChange={(e) => setBodyTextSize(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            width: '100%',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            minHeight: '36px',
                            height: '36px',
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
                          <option value="small">Small (14px)</option>
                          <option value="medium">Medium (16px)</option>
                          <option value="large">Large (18px)</option>
                        </select>
                      </div>

                      {/* Heading Size */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Heading Size
                        </label>
                        <select
                          value={headingSize}
                          onChange={(e) => setHeadingSize(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            width: '100%',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            minHeight: '36px',
                            height: '36px',
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

                    {/* Font Colors Row */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      {/* Secondary Text Color */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Secondary Text
                        </label>
                        <ModernColorPicker
                          value={secondaryTextColor}
                          onChange={(color) => setSecondaryTextColor(color)}
                          size="small"
                        />
                      </div>

                      {/* Heading Color */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Heading Color
                        </label>
                        <ModernColorPicker
                          value={headingColor}
                          onChange={(color) => setHeadingColor(color)}
                          size="small"
                        />
                      </div>
                    </div>

                    {/* Typography Spacing Row */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      {/* Line Height */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Line Height
                        </label>
                        <select
                          value={lineHeight}
                          onChange={(e) => setLineHeight(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            width: '100%',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            minHeight: '36px',
                            height: '36px',
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
                          <option value="tight">Tight (1.2)</option>
                          <option value="normal">Normal (1.5)</option>
                          <option value="loose">Loose (1.8)</option>
                        </select>
                      </div>

                      {/* Paragraph Spacing */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Paragraph Spacing
                        </label>
                        <select
                          value={paragraphSpacing}
                          onChange={(e) => setParagraphSpacing(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            width: '100%',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            minHeight: '36px',
                            height: '36px',
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
              )}

              {activeTab === 'footer' && (
                <div>
                  {/* Footer Layout Section */}
                  <div
                    style={{
                      borderTop: '1px solid #e9ecef',
                      paddingTop: '16px',
                      marginTop: '16px',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '12px',
                        marginTop: '0',
                      }}
                    >
                      ⬇️ Footer Layout
                    </h4>

                    {/* Footer Layout Description */}
                    <div
                      style={{
                        color: '#6b7280',
                        fontSize: '12px',
                        marginBottom: '16px',
                        lineHeight: '1.4',
                      }}
                    >
                      Drag and drop the cards below to reorder your footer
                      layout. The order will determine how your footer sections
                      appear.
                    </div>

                    {/* Draggable Footer Cards */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        marginBottom: '16px',
                      }}
                    >
                      {memoizedFooterCards.map((card, index) => (
                        <div
                          key={card.id}
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, index)}
                          onDragEnd={handleDragEnd}
                          style={{
                            backgroundColor:
                              draggedIndex === index
                                ? '#e5e7eb'
                                : dragOverIndex === index
                                  ? '#f0f8ff'
                                  : '#f8f9fa',
                            border: '1px solid #e9ecef',
                            borderRadius: '8px',
                            padding: '12px',
                            cursor: 'grab',
                            userSelect: 'none',
                            transition: 'all 0.2s ease',
                            transform:
                              draggedIndex === index ? 'rotate(2deg)' : 'none',
                            boxShadow:
                              draggedIndex === index
                                ? '0 8px 25px rgba(0,0,0,0.15)'
                                : 'none',
                            opacity: draggedIndex === index ? 0.8 : 1,
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '4px',
                            }}
                          >
                            <span style={{ fontSize: '16px' }}>
                              {card.icon}
                            </span>
                            <span
                              style={{
                                fontSize: '13px',
                                fontWeight: '600',
                                color: '#374151',
                              }}
                            >
                              {card.title}
                            </span>
                          </div>
                          <div
                            style={{
                              fontSize: '11px',
                              color: '#6b7280',
                              lineHeight: '1.3',
                            }}
                          >
                            {card.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Company Information Settings */}
                  <div
                    style={{
                      borderTop: '1px solid #e9ecef',
                      paddingTop: '16px',
                      marginTop: '16px',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '12px',
                        marginTop: '0',
                      }}
                    >
                      🏢 Company Information
                    </h4>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                      }}
                    >
                      {/* Font */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Font
                        </label>
                        <select
                          value={companyFont}
                          onChange={(e) => setCompanyFont(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            fontSize: '11px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: '#ffffff',
                            color: '#374151',
                            minHeight: '32px',
                          }}
                        >
                          <option value="Inter">Inter</option>
                          <option value="Roboto">Roboto</option>
                          <option value="Open Sans">Open Sans</option>
                          <option value="Lato">Lato</option>
                          <option value="Poppins">Poppins</option>
                          <option value="Montserrat">Montserrat</option>
                        </select>
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#6b7280',
                            marginTop: '2px',
                            lineHeight: '1.2',
                          }}
                        >
                          Typography family for company text
                        </div>
                      </div>

                      {/* Font Size */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Font Size
                        </label>
                        <select
                          value={companyFontSize}
                          onChange={(e) => setCompanyFontSize(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            fontSize: '11px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: '#ffffff',
                            color: '#374151',
                            minHeight: '32px',
                          }}
                        >
                          <option value="12px">Small (12px)</option>
                          <option value="14px">Medium (14px)</option>
                          <option value="16px">Large (16px)</option>
                          <option value="18px">Extra Large (18px)</option>
                        </select>
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#6b7280',
                            marginTop: '2px',
                            lineHeight: '1.2',
                          }}
                        >
                          Text size for company information
                        </div>
                      </div>

                      {/* Font Color */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Font Color
                        </label>
                        <ModernColorPicker
                          value={companyFontColor}
                          onChange={setCompanyFontColor}
                          size="small"
                        />
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#6b7280',
                            marginTop: '2px',
                            lineHeight: '1.2',
                          }}
                        >
                          Text color for company information
                        </div>
                      </div>

                      {/* Banner Size */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Banner Size
                        </label>
                        <select
                          value={companyBannerSize}
                          onChange={(e) => setCompanyBannerSize(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            fontSize: '11px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: '#ffffff',
                            color: '#374151',
                            minHeight: '32px',
                          }}
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                          <option value="extra-large">Extra Large</option>
                        </select>
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#6b7280',
                            marginTop: '2px',
                            lineHeight: '1.2',
                          }}
                        >
                          Padding size for company banner
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Useful Links Settings */}
                  <div
                    style={{
                      borderTop: '1px solid #e9ecef',
                      paddingTop: '16px',
                      marginTop: '16px',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '12px',
                        marginTop: '0',
                      }}
                    >
                      🔗 Useful Links
                    </h4>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                      }}
                    >
                      {/* Link Style */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Link Style
                        </label>
                        <select
                          value={linkStyle}
                          onChange={(e) => setLinkStyle(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            fontSize: '11px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: '#ffffff',
                            color: '#374151',
                            minHeight: '32px',
                          }}
                        >
                          <option value="text">Text Links</option>
                          <option value="button">Button Style</option>
                          <option value="icon">Icon Links</option>
                        </select>
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#6b7280',
                            marginTop: '2px',
                            lineHeight: '1.2',
                          }}
                        >
                          Visual style for link display
                        </div>
                      </div>

                      {/* Link Layout */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Link Layout
                        </label>
                        <select
                          value={linkLayout}
                          onChange={(e) => setLinkLayout(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            fontSize: '11px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: '#ffffff',
                            color: '#374151',
                            minHeight: '32px',
                          }}
                        >
                          <option value="horizontal">Horizontal List</option>
                          <option value="vertical">Vertical Stack</option>
                          <option value="grid">Grid Layout</option>
                        </select>
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#6b7280',
                            marginTop: '2px',
                            lineHeight: '1.2',
                          }}
                        >
                          Arrangement of links
                        </div>
                      </div>

                      {/* Link Grouping */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Link Grouping
                        </label>
                        <select
                          value={linkGrouping}
                          onChange={(e) => setLinkGrouping(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            fontSize: '11px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: '#ffffff',
                            color: '#374151',
                            minHeight: '32px',
                          }}
                        >
                          <option value="category">By Category</option>
                          <option value="alphabetical">Alphabetical</option>
                          <option value="custom">Custom Order</option>
                        </select>
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#6b7280',
                            marginTop: '2px',
                            lineHeight: '1.2',
                          }}
                        >
                          How links are organized
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subscription Form Settings */}
                  <div
                    style={{
                      borderTop: '1px solid #e9ecef',
                      paddingTop: '16px',
                      marginTop: '16px',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '12px',
                        marginTop: '0',
                      }}
                    >
                      📧 Subscription Form
                    </h4>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                      }}
                    >
                      {/* Form Style */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Form Style
                        </label>
                        <select
                          value={formStyle}
                          onChange={(e) => setFormStyle(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            fontSize: '11px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: '#ffffff',
                            color: '#374151',
                            minHeight: '32px',
                          }}
                        >
                          <option value="minimal">Minimal</option>
                          <option value="card">Card Style</option>
                          <option value="modern">Modern</option>
                          <option value="classic">Classic</option>
                        </select>
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#6b7280',
                            marginTop: '2px',
                            lineHeight: '1.2',
                          }}
                        >
                          Visual appearance of the form
                        </div>
                      </div>

                      {/* Form Layout */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Form Layout
                        </label>
                        <select
                          value={formLayout}
                          onChange={(e) => setFormLayout(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            fontSize: '11px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: '#ffffff',
                            color: '#374151',
                            minHeight: '32px',
                          }}
                        >
                          <option value="inline">Inline</option>
                          <option value="stacked">Stacked</option>
                          <option value="centered">Centered</option>
                          <option value="full-width">Full Width</option>
                        </select>
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#6b7280',
                            marginTop: '2px',
                            lineHeight: '1.2',
                          }}
                        >
                          Arrangement of form elements
                        </div>
                      </div>

                      {/* Placeholder Text */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Placeholder Text
                        </label>
                        <input
                          type="text"
                          value={placeholderText}
                          onChange={(e) => setPlaceholderText(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            fontSize: '11px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: '#ffffff',
                            color: '#374151',
                            minHeight: '32px',
                          }}
                          placeholder="Enter your email..."
                        />
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#6b7280',
                            marginTop: '2px',
                            lineHeight: '1.2',
                          }}
                        >
                          Hint text in email input field
                        </div>
                      </div>

                      {/* Button Text */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={buttonText}
                          onChange={(e) => setButtonText(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            fontSize: '11px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: '#ffffff',
                            color: '#374151',
                            minHeight: '32px',
                          }}
                          placeholder="Subscribe"
                        />
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#6b7280',
                            marginTop: '2px',
                            lineHeight: '1.2',
                          }}
                        >
                          Call-to-action button text
                        </div>
                      </div>

                      {/* Success Message */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Success Message
                        </label>
                        <input
                          type="text"
                          value={successMessage}
                          onChange={(e) => setSuccessMessage(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            fontSize: '11px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: '#ffffff',
                            color: '#374151',
                            minHeight: '32px',
                          }}
                          placeholder="Thank you for subscribing!"
                        />
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#6b7280',
                            marginTop: '2px',
                            lineHeight: '1.2',
                          }}
                        >
                          Message shown after successful subscription
                        </div>
                      </div>

                      {/* Form Width */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Form Width
                        </label>
                        <select
                          value={formWidth}
                          onChange={(e) => setFormWidth(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            fontSize: '11px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: '#ffffff',
                            color: '#374151',
                            minHeight: '32px',
                          }}
                        >
                          <option value="auto">Auto</option>
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                          <option value="full">Full Width</option>
                        </select>
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#6b7280',
                            marginTop: '2px',
                            lineHeight: '1.2',
                          }}
                        >
                          Width of the subscription form
                        </div>
                      </div>

                      {/* Form Alignment */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Form Alignment
                        </label>
                        <select
                          value={formAlignment}
                          onChange={(e) => setFormAlignment(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            fontSize: '11px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: '#ffffff',
                            color: '#374151',
                            minHeight: '32px',
                          }}
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#6b7280',
                            marginTop: '2px',
                            lineHeight: '1.2',
                          }}
                        >
                          Horizontal alignment of the form
                        </div>
                      </div>

                      {/* Privacy Notice */}
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '4px',
                            display: 'block',
                          }}
                        >
                          Privacy Notice
                        </label>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={showPrivacyNotice}
                            onChange={(e) =>
                              setShowPrivacyNotice(e.target.checked)
                            }
                            style={{ margin: 0 }}
                          />
                          <span
                            style={{
                              fontSize: '10px',
                              color: '#374151',
                            }}
                          >
                            Show privacy notice below form
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#6b7280',
                            marginTop: '2px',
                            lineHeight: '1.2',
                          }}
                        >
                          Display GDPR compliance text
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Separator after Subscription Form */}
                  <div
                    style={{
                      borderTop: '1px solid #e9ecef',
                      marginTop: '16px',
                      marginBottom: '16px',
                    }}
                  />
                </div>
              )}
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

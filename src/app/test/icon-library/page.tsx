'use client';

import React, { useState } from 'react';
import { Icon, IconButton, IconGroup } from '@/components/icons/IconLibrary';
import { customIcons } from '@/components/icons/CustomIcons';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';

export default function IconLibraryPage() {
  const responsive = useResponsiveStyles();
  const [selectedSize, setSelectedSize] = useState<
    'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  >('md');
  const [selectedColor, setSelectedColor] = useState<
    'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted'
  >('primary');
  const [searchTerm, setSearchTerm] = useState('');

  // Icon categories
  const iconCategories = [
    {
      name: 'Navigation',
      icons: [
        'menu',
        'menuOpen',
        'home',
        'settings',
        'user',
        'users',
        'building',
        'fileText',
        'image',
        'palette',
      ],
    },
    {
      name: 'Actions',
      icons: [
        'upload',
        'download',
        'save',
        'trash',
        'edit',
        'eye',
        'eyeOff',
        'plus',
        'minus',
        'close',
        'check',
      ],
    },
    {
      name: 'Arrows',
      icons: [
        'chevronDown',
        'chevronUp',
        'chevronLeft',
        'chevronRight',
        'arrowLeft',
        'arrowRight',
        'arrowUp',
        'arrowDown',
      ],
    },
    {
      name: 'Media',
      icons: [
        'camera',
        'video',
        'mic',
        'micOff',
        'volume',
        'volumeX',
        'volume1',
        'volume2',
      ],
    },
    {
      name: 'Files',
      icons: [
        'file',
        'folder',
        'folderOpen',
        'fileImage',
        'fileVideo',
        'fileAudio',
        'fileTextIcon',
        'fileCode',
        'fileArchive',
      ],
    },
    {
      name: 'Social',
      icons: [
        'facebook',
        'twitter',
        'instagram',
        'linkedin',
        'youtube',
        'github',
        'globe',
        'link',
        'externalLink',
      ],
    },
    {
      name: 'UI',
      icons: [
        'grid',
        'list',
        'calendar',
        'clock',
        'star',
        'heart',
        'thumbsUp',
        'thumbsDown',
        'flag',
        'bookmark',
        'share',
      ],
    },
    {
      name: 'Business',
      icons: [
        'creditCard',
        'dollarSign',
        'shoppingCart',
        'shoppingBag',
        'gift',
        'award',
        'target',
        'trendingUp',
        'trendingDown',
      ],
    },
    {
      name: 'Devices',
      icons: [
        'monitor',
        'smartphone',
        'tablet',
        'laptop',
        'printer',
        'wifi',
        'wifiOff',
        'bluetooth',
        'battery',
        'batteryCharging',
      ],
    },
    {
      name: 'Weather',
      icons: [
        'sun',
        'moon',
        'cloud',
        'cloudRain',
        'cloudSnow',
        'wind',
        'umbrella',
      ],
    },
  ];

  // Custom icon categories
  const customIconCategories = [
    {
      name: 'Status',
      icons: [
        'loadingSpinner',
        'successCheck',
        'errorX',
        'warningTriangle',
        'infoCircle',
      ],
    },
    {
      name: 'Navigation',
      icons: ['hamburgerMenu', 'closeX'],
    },
    {
      name: 'Brand',
      icons: ['companyLogo'],
    },
  ];

  // Filter icons based on search term
  const filteredCategories = iconCategories
    .map((category) => ({
      ...category,
      icons: category.icons.filter((icon) =>
        icon.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.icons.length > 0);

  const filteredCustomCategories = customIconCategories
    .map((category) => ({
      ...category,
      icons: category.icons.filter((icon) =>
        icon.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.icons.length > 0);

  return (
    <div
      style={{
        padding: responsive.padding,
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: responsive.titleFontSize,
            fontWeight: 'bold',
            color: '#1e293b',
            marginBottom: '8px',
          }}
        >
          Icon Library
        </h1>
        <p
          style={{
            fontSize: responsive.bodyFontSize,
            color: '#64748b',
            marginBottom: '24px',
          }}
        >
          Comprehensive icon library with Lucide React icons and custom brand
          icons
        </p>

        {/* Controls */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          {/* Search */}
          <div style={{ flex: '1', minWidth: '200px' }}>
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
          </div>

          {/* Size Selector */}
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value as any)}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <option value="xs">Extra Small</option>
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
            <option value="xl">Extra Large</option>
            <option value="2xl">2XL</option>
          </select>

          {/* Color Selector */}
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value as any)}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="info">Info</option>
            <option value="muted">Muted</option>
          </select>
        </div>
      </div>

      {/* Icon Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Lucide Icons */}
        {filteredCategories.map((category) => (
          <div
            key={category.name}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '16px',
              }}
            >
              {category.name} Icons
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: responsive.isMobile
                  ? 'repeat(2, 1fr)'
                  : 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '16px',
              }}
            >
              {category.icons.map((iconName) => (
                <div
                  key={iconName}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px',
                    border: '1px solid #f1f5f9',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon
                    name={iconName}
                    size={selectedSize}
                    color={selectedColor}
                    title={iconName}
                  />
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#64748b',
                      marginTop: '8px',
                      textAlign: 'center',
                      wordBreak: 'break-word',
                    }}
                  >
                    {iconName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Custom Icons */}
        {filteredCustomCategories.map((category) => (
          <div
            key={category.name}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '16px',
              }}
            >
              {category.name} Icons (Custom)
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: responsive.isMobile
                  ? 'repeat(2, 1fr)'
                  : 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '16px',
              }}
            >
              {category.icons.map((iconName) => {
                const CustomIcon =
                  customIcons[iconName as keyof typeof customIcons];
                return (
                  <div
                    key={iconName}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '16px',
                      border: '1px solid #f1f5f9',
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <CustomIcon
                      size={
                        selectedSize === 'xs'
                          ? 12
                          : selectedSize === 'sm'
                            ? 16
                            : selectedSize === 'md'
                              ? 20
                              : selectedSize === 'lg'
                                ? 24
                                : selectedSize === 'xl'
                                  ? 32
                                  : 48
                      }
                      title={iconName}
                    />
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#64748b',
                        marginTop: '8px',
                        textAlign: 'center',
                        wordBreak: 'break-word',
                      }}
                    >
                      {iconName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Usage Examples */}
      <div
        style={{
          marginTop: '48px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '16px',
          }}
        >
          Usage Examples
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Basic Icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Icon name="home" size="md" color="primary" />
            <span style={{ fontSize: '14px', color: '#374151' }}>
              Basic icon usage
            </span>
          </div>

          {/* Icon Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <IconButton
              name="save"
              size="md"
              color="success"
              variant="solid"
              onClick={() => alert('Save clicked!')}
              title="Save"
            />
            <span style={{ fontSize: '14px', color: '#374151' }}>
              Icon button with click handler
            </span>
          </div>

          {/* Icon Group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <IconGroup spacing="md">
              <Icon name="edit" size="sm" color="primary" />
              <Icon name="trash" size="sm" color="error" />
              <Icon name="eye" size="sm" color="info" />
            </IconGroup>
            <span style={{ fontSize: '14px', color: '#374151' }}>
              Icon group with spacing
            </span>
          </div>

          {/* Custom Icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <customIcons.loadingSpinner size={20} color="#1976d2" />
            <span style={{ fontSize: '14px', color: '#374151' }}>
              Custom loading spinner
            </span>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div
        style={{
          marginTop: '24px',
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          padding: '24px',
          color: '#ffffff',
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px',
          }}
        >
          Code Examples
        </h3>

        <pre
          style={{
            fontSize: '14px',
            lineHeight: '1.5',
            overflow: 'auto',
          }}
        >
          {`// Basic icon usage
<Icon name="home" size="md" color="primary" />

// Icon button
<IconButton
  name="save"
  size="md"
  color="success"
  variant="solid"
  onClick={() => handleSave()}
  title="Save"
/>

// Icon group
<IconGroup spacing="md">
  <Icon name="edit" size="sm" color="primary" />
  <Icon name="trash" size="sm" color="error" />
  <Icon name="eye" size="sm" color="info" />
</IconGroup>

// Custom icon
<customIcons.loadingSpinner size={20} color="#1976d2" />`}
        </pre>
      </div>
    </div>
  );
}

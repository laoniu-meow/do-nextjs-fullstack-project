'use client';

import React, { useState, useMemo } from 'react';
import { Icon, IconButton, IconGroup } from './IconLibrary';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';

interface IconCategory {
  name: string;
  description: string;
  icons: string[];
  color?: string;
}

export default function VisualIconLibrary() {
  const responsive = useResponsiveStyles();
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [selectedColor, setSelectedColor] = useState<string>('primary');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Icon categories with visual organization
  const iconCategories = useMemo<IconCategory[]>(() => [
    {
      name: 'Navigation',
      description: 'Menu, navigation, and layout icons',
      icons: ['menu', 'menuOpen', 'home', 'settings', 'user', 'users', 'building'],
      color: '#3b82f6'
    },
    {
      name: 'Actions',
      description: 'Common action and interaction icons',
      icons: ['upload', 'download', 'save', 'trash', 'edit', 'eye', 'eyeOff', 'plus', 'minus', 'close', 'check'],
      color: '#10b981'
    },
    {
      name: 'Arrows',
      description: 'Directional and navigation arrows',
      icons: ['chevronDown', 'chevronUp', 'chevronLeft', 'chevronRight', 'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown'],
      color: '#f59e0b'
    },
    {
      name: 'Media',
      description: 'Audio, video, and media control icons',
      icons: ['camera', 'video', 'mic', 'micOff', 'volume', 'volumeX', 'volume1', 'volume2'],
      color: '#8b5cf6'
    },
    {
      name: 'Files',
      description: 'File and folder management icons',
      icons: ['file', 'folder', 'folderOpen', 'fileImage', 'fileVideo', 'fileAudio', 'fileTextIcon', 'fileCode', 'fileArchive'],
      color: '#06b6d4'
    },
    {
      name: 'Social',
      description: 'Social media and communication icons',
      icons: ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'github', 'globe', 'link', 'externalLink'],
      color: '#ec4899'
    },
    {
      name: 'Status',
      description: 'Status, alert, and feedback icons',
      icons: ['alertCircle', 'alertTriangle', 'checkCircle', 'info', 'helpCircle', 'shield', 'lock', 'unlock'],
      color: '#ef4444'
    },
    {
      name: 'Communication',
      description: 'Email, messaging, and communication icons',
      icons: ['mail', 'phone', 'messageCircle', 'messageSquare', 'send', 'reply', 'forward'],
      color: '#84cc16'
    }
  ], []);

  // Filter icons based on search and category
  const filteredCategories = useMemo(() => {
    return iconCategories.filter(category => {
      if (selectedCategory !== 'all' && category.name !== selectedCategory) {
        return false;
      }
      
      if (searchTerm) {
        const matchingIcons = category.icons.filter(icon => 
          icon.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return matchingIcons.length > 0;
      }
      
      return true;
    });
  }, [searchTerm, selectedCategory, iconCategories]);

  const sizeOptions = [
    { value: 'sm', label: 'Small', size: '16px' },
    { value: 'md', label: 'Medium', size: '24px' },
    { value: 'lg', label: 'Large', size: '32px' },
    { value: 'xl', label: 'Extra Large', size: '48px' }
  ];

  const colorOptions = [
    { value: 'primary', label: 'Primary', color: '#3b82f6' },
    { value: 'secondary', label: 'Secondary', color: '#6b7280' },
    { value: 'success', label: 'Success', color: '#10b981' },
    { value: 'warning', label: 'Warning', color: '#f59e0b' },
    { value: 'error', label: 'Error', color: '#ef4444' },
    { value: 'info', label: 'Info', color: '#06b6d4' },
    { value: 'muted', label: 'Muted', color: '#9ca3af' }
  ];

  const handleIconClick = (iconName: string) => {
    // Copy icon name to clipboard
    navigator.clipboard.writeText(`<Icon name="${iconName}" />`);
    // You could add a toast notification here
  };

  return (
    <div style={{ padding: responsive.padding, maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: responsive.titleFontSize, 
          fontWeight: 'bold', 
          color: '#1f2937',
          marginBottom: '8px'
        }}>
          🎨 Visual Icon Library
        </h1>
        <p style={{ 
          fontSize: responsive.bodyFontSize, 
          color: '#6b7280',
          marginBottom: '24px'
        }}>
          Browse and copy icons for your project. Click any icon to copy its usage code.
        </p>
      </div>

      {/* Controls */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: responsive.isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
        padding: '20px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        {/* Search */}
        <div>
          <label style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#374151',
            marginBottom: '4px',
            display: 'block'
          }}>
            Search Icons
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search icons..."
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Category Filter */}
        <div>
          <label style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#374151',
            marginBottom: '4px',
            display: 'block'
          }}>
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            <option value="all">All Categories</option>
            {iconCategories.map(category => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Size Selector */}
        <div>
          <label style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#374151',
            marginBottom: '4px',
            display: 'block'
          }}>
            Size
          </label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value as any)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            {sizeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.size})
              </option>
            ))}
          </select>
        </div>

        {/* Color Selector */}
        <div>
          <label style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#374151',
            marginBottom: '4px',
            display: 'block'
          }}>
            Color
          </label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            {colorOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Icon Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {filteredCategories.map(category => {
          const filteredIcons = category.icons.filter(icon => 
            !searchTerm || icon.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (filteredIcons.length === 0) return null;

          return (
            <div key={category.name} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              {/* Category Header */}
                             <div style={{
                 padding: '16px 20px',
                 backgroundColor: (category.color || '#e5e7eb') + '10',
                 borderBottom: '1px solid #e5e7eb'
               }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: '0',
                  marginBottom: '4px'
                }}>
                  {category.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: '0'
                }}>
                  {category.description}
                </p>
              </div>

              {/* Icons Grid */}
              <div style={{
                padding: '20px',
                display: 'grid',
                gridTemplateColumns: responsive.isMobile 
                  ? 'repeat(auto-fill, minmax(80px, 1fr))'
                  : 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '16px'
              }}>
                {filteredIcons.map(iconName => (
                  <div
                    key={iconName}
                    onClick={() => handleIconClick(iconName)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      minHeight: '100px',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                      e.currentTarget.style.borderColor = category.color || '#e5e7eb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }}
                    title={`Click to copy: <Icon name="${iconName}" />`}
                  >
                    {/* Icon Display */}
                    <div style={{ marginBottom: '8px' }}>
                      <Icon
                        name={iconName}
                        size={selectedSize}
                        color={selectedColor}
                      />
                    </div>

                    {/* Icon Name */}
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      textAlign: 'center',
                      wordBreak: 'break-word',
                      lineHeight: '1.2'
                    }}>
                      {iconName}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#6b7280'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No icons found</h3>
          <p>Try adjusting your search terms or category filter.</p>
        </div>
      )}
    </div>
  );
} 
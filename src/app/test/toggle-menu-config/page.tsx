'use client';

import React, { useState, useEffect } from 'react';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';
import ToggleMenuButton from '@/components/ToggleMenuButton';
import ModernColorPicker from '@/components/ModernColorPicker';
import { Icon } from '@/components/icons/IconLibrary';
import {
  ToggleMenuButtonConfig,
  defaultToggleMenuConfig,
  ButtonShape,
  ButtonSize,
  ShadowType,
} from '@/types/toggleMenuConfig';

export default function ToggleMenuConfigTestPage() {
  const responsive = useResponsiveStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState('test');

  // Configuration state
  const [config, setConfig] = useState<ToggleMenuButtonConfig>(
    defaultToggleMenuConfig
  );
  const [hasChanges, setHasChanges] = useState(false);

  // Available icons for selection
  const availableIcons = [
    'menu',
    'menuOpen',
    'hamburgerMenu',
    'closeX',
    'plus',
    'minus',
    'x',
    'check',
    'settings',
    'user',
    'home',
    'search',
    'filter',
    'grid',
    'list',
    'moreHorizontal',
    'moreVertical',
    'chevronDown',
    'chevronUp',
    'chevronLeft',
    'chevronRight',
    'arrowLeft',
    'arrowRight',
    'arrowUp',
    'arrowDown',
    'refresh',
    'rotateCw',
    'eye',
    'eyeOff',
    'lock',
    'unlock',
    'bell',
    'star',
    'heart',
    'bookmark',
  ];

  // Available shapes
  const availableShapes: {
    value: ButtonShape;
    label: string;
    description: string;
  }[] = [
    { value: 'circle', label: 'Circle', description: 'Perfect circle shape' },
    { value: 'rounded', label: 'Rounded', description: 'Rounded corners' },
    { value: 'square', label: 'Square', description: 'Sharp corners' },
  ];

  // Available sizes
  const availableSizes: {
    value: ButtonSize;
    label: string;
    description: string;
  }[] = [
    { value: 'small', label: 'Small', description: 'Compact size for mobile' },
    {
      value: 'medium',
      label: 'Medium',
      description: 'Standard size for most screens',
    },
    {
      value: 'large',
      label: 'Large',
      description: 'Prominent size for desktop',
    },
  ];

  // Available shadow types
  const availableShadows: {
    value: ShadowType;
    label: string;
    description: string;
  }[] = [
    { value: 'none', label: 'None', description: 'No shadow' },
    { value: 'light', label: 'Light', description: 'Subtle shadow' },
    { value: 'medium', label: 'Medium', description: 'Standard shadow' },
    { value: 'heavy', label: 'Heavy', description: 'Prominent shadow' },
  ];

  const handleConfigChange = (
    field: keyof ToggleMenuButtonConfig,
    value: any
  ) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleResponsiveConfigChange = (
    screen: 'mobile' | 'tablet' | 'desktop',
    field: 'size',
    value: any
  ) => {
    setConfig((prev) => ({
      ...prev,
      responsive: {
        ...prev.responsive,
        [screen]: {
          ...prev.responsive[screen],
          [field]: value,
        },
      },
    }));
    setHasChanges(true);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleResetConfig = () => {
    setConfig(defaultToggleMenuConfig);
    setHasChanges(false);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Toggle Menu Button */}
      <ToggleMenuButton config={config} onClick={toggleMenu} isOpen={isOpen} />

      {/* Menu Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-300px',
          height: '100vh',
          backgroundColor: '#f5f5f5',
          borderLeft: '1px solid #ddd',
          transition: 'right 0.3s ease-in-out',
          zIndex: 1000,
          boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
          overflowY: 'auto',
          width: responsive.isMobile
            ? '280px'
            : responsive.isTablet
              ? '320px'
              : '300px',
        }}
      >
        <div style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '16px', color: '#374151' }}>Test Menu</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
              }}
            >
              Close Menu
            </button>
            <button
              onClick={() => handleResetConfig()}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
              }}
            >
              Reset Config
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          marginRight: isOpen
            ? responsive.isMobile
              ? '280px'
              : responsive.isTablet
                ? '320px'
                : '300px'
            : '0',
          transition: 'margin-right 0.3s ease-in-out',
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <div style={{ padding: responsive.padding }}>
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
              Toggle Menu Button Configuration Test
            </h1>
            <p
              style={{
                fontSize: responsive.bodyFontSize,
                color: '#64748b',
                marginBottom: '24px',
              }}
            >
              Test the toggle menu button configuration features
            </p>
          </div>

          {/* Configuration Sections */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Basic Configuration */}
            <div
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
                  marginBottom: '20px',
                }}
              >
                Basic Configuration
              </h2>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {/* Enable/Disable */}
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <input
                    type="checkbox"
                    id="enabled"
                    checked={config.enabled}
                    onChange={(e) =>
                      handleConfigChange('enabled', e.target.checked)
                    }
                    style={{ width: '18px', height: '18px' }}
                  />
                  <label
                    htmlFor="enabled"
                    style={{ fontSize: '14px', color: '#374151' }}
                  >
                    Enable toggle menu button
                  </label>
                </div>

                {/* Button Shape */}
                <div>
                  <label
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    Button Shape
                  </label>
                  <select
                    value={config.shape}
                    onChange={(e) =>
                      handleConfigChange('shape', e.target.value)
                    }
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  >
                    {availableShapes.map((shape) => (
                      <option key={shape.value} value={shape.value}>
                        {shape.label} - {shape.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Button Size */}
                <div>
                  <label
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    Button Size
                  </label>
                  <select
                    value={config.size}
                    onChange={(e) => handleConfigChange('size', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  >
                    {availableSizes.map((size) => (
                      <option key={size.value} value={size.value}>
                        {size.label} - {size.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Visual Configuration */}
            <div
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
                  marginBottom: '20px',
                }}
              >
                Visual Configuration
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: responsive.isMobile
                    ? '1fr'
                    : 'repeat(2, 1fr)',
                  gap: '16px',
                }}
              >
                {/* Background Color */}
                <div>
                  <label
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    Background Color
                  </label>
                  <ModernColorPicker
                    value={config.backgroundColor}
                    onChange={(color) =>
                      handleConfigChange('backgroundColor', color)
                    }
                    label=""
                  />
                </div>

                {/* Shadow Type */}
                <div>
                  <label
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    Shadow Type
                  </label>
                  <select
                    value={config.shadowType}
                    onChange={(e) =>
                      handleConfigChange('shadowType', e.target.value)
                    }
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  >
                    {availableShadows.map((shadow) => (
                      <option key={shadow.value} value={shadow.value}>
                        {shadow.label} - {shadow.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Icon Configuration */}
            <div
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
                  marginBottom: '20px',
                }}
              >
                Icon Configuration
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: responsive.isMobile
                    ? '1fr'
                    : 'repeat(2, 1fr)',
                  gap: '16px',
                }}
              >
                {/* Icon Selection */}
                <div>
                  <label
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    Icon
                  </label>
                  <select
                    value={config.iconName}
                    onChange={(e) =>
                      handleConfigChange('iconName', e.target.value)
                    }
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  >
                    {availableIcons.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Icon Color */}
                <div>
                  <label
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    Icon Color
                  </label>
                  <ModernColorPicker
                    value={config.iconColor}
                    onChange={(color) => handleConfigChange('iconColor', color)}
                    label=""
                  />
                </div>

                {/* Icon Size */}
                <div>
                  <label
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    Icon Size
                  </label>
                  <select
                    value={config.iconSize}
                    onChange={(e) =>
                      handleConfigChange('iconSize', e.target.value)
                    }
                    style={{
                      width: '100%',
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
                  </select>
                </div>

                {/* Icon Preview */}
                <div>
                  <label
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    Icon Preview
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      backgroundColor: '#f8fafc',
                    }}
                  >
                    <Icon
                      name={config.iconName}
                      size={config.iconSize}
                      color={config.iconColor}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Responsive Configuration */}
            <div
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
                  marginBottom: '20px',
                }}
              >
                Responsive Configuration
              </h2>

              {(['mobile', 'tablet', 'desktop'] as const).map((screen) => (
                <div key={screen} style={{ marginBottom: '20px' }}>
                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '12px',
                      textTransform: 'capitalize',
                    }}
                  >
                    {screen} Settings
                  </h3>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: responsive.isMobile
                        ? '1fr'
                        : 'repeat(3, 1fr)',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <label
                        style={{
                          fontSize: '12px',
                          color: '#6b7280',
                          marginBottom: '4px',
                          display: 'block',
                        }}
                      >
                        Size
                      </label>
                      <select
                        value={config.responsive[screen].size}
                        onChange={(e) =>
                          handleResponsiveConfigChange(
                            screen,
                            'size',
                            e.target.value
                          )
                        }
                        style={{
                          width: '100%',
                          padding: '6px 8px',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          fontSize: '12px',
                        }}
                      >
                        {availableSizes.map((size) => (
                          <option key={size.value} value={size.value}>
                            {size.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
                padding: '20px 0',
              }}
            >
              <button
                onClick={handleResetConfig}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

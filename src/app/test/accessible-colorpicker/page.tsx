'use client';

import { useState } from 'react';
import AccessibleColorPicker from '@/components/AccessibleColorPicker';
import ColorisProvider from '@/components/ColorisProvider';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';

export default function AccessibleColorPickerTestPage() {
  const responsive = useResponsiveStyles();
  const [selectedColors, setSelectedColors] = useState({
    primary: '#1976d2',
    secondary: '#4caf50',
    accent: '#ff9800',
    background: '#ffffff',
    text: '#1a365d',
    border: '#e0e0e0',
    custom: '#ff6b6b',
    alpha: '#ff6b6b',
    swatch: '#9c27b0',
  });

  const handleColorChange = (key: string, color: string) => {
    setSelectedColors((prev) => ({ ...prev, [key]: color }));
    console.log(`${key} color changed to:`, color);
  };

  // Predefined color swatches
  const colorSwatches = [
    '#ff0000',
    '#ff8000',
    '#ffff00',
    '#80ff00',
    '#00ff00',
    '#00ff80',
    '#00ffff',
    '#0080ff',
    '#0000ff',
    '#8000ff',
    '#ff00ff',
    '#ff0080',
    '#ff4040',
    '#ff8040',
    '#ffff40',
    '#80ff40',
    '#40ff40',
    '#40ff80',
    '#40ffff',
    '#4080ff',
  ];

  return (
    <ColorisProvider>
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          padding: responsive.padding,
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h1
            style={{
              fontSize: responsive.titleFontSize,
              color: '#1a365d',
              margin: '0 0 8px 0',
            }}
          >
            Accessible ColorPicker Test Page
          </h1>
          <p
            style={{
              fontSize: responsive.bodyFontSize,
              color: '#666',
              margin: '0',
            }}
          >
            Coloris.js powered color picker with full accessibility support
          </p>
        </div>

        {/* Accessible ColorPicker Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: responsive.isMobile
              ? '1fr'
              : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          {/* Basic ColorPicker */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontSize: responsive.subtitleFontSize,
                color: '#1976d2',
                margin: '0 0 16px 0',
              }}
            >
              Basic ColorPicker
            </h3>
            <AccessibleColorPicker
              label="Select Primary Color"
              value={selectedColors.primary}
              onChange={(color) => handleColorChange('primary', color)}
              placeholder="Choose primary color"
              ariaLabel="Primary color selection"
              ariaDescribedBy="primary-color-help"
            />
            <div
              id="primary-color-help"
              style={{
                fontSize: responsive.smallFontSize,
                color: '#666',
                marginTop: '4px',
              }}
            >
              Use keyboard navigation: Tab to focus, Enter to open, Arrow keys
              to navigate, Enter to select
            </div>
          </div>

          {/* ColorPicker with RGB Display */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontSize: responsive.subtitleFontSize,
                color: '#1976d2',
                margin: '0 0 16px 0',
              }}
            >
              With RGB Display
            </h3>
            <AccessibleColorPicker
              label="Select Secondary Color"
              value={selectedColors.secondary}
              onChange={(color) => handleColorChange('secondary', color)}
              placeholder="Choose secondary color"
              showRgb={true}
              ariaLabel="Secondary color selection with RGB values"
            />
          </div>

          {/* ColorPicker with HSL Display */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontSize: responsive.subtitleFontSize,
                color: '#1976d2',
                margin: '0 0 16px 0',
              }}
            >
              With HSL Display
            </h3>
            <AccessibleColorPicker
              label="Select Accent Color"
              value={selectedColors.accent}
              onChange={(color) => handleColorChange('accent', color)}
              placeholder="Choose accent color"
              showHsl={true}
              ariaLabel="Accent color selection with HSL values"
            />
          </div>

          {/* ColorPicker with Alpha Channel */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontSize: responsive.subtitleFontSize,
                color: '#1976d2',
                margin: '0 0 16px 0',
              }}
            >
              With Alpha Channel
            </h3>
            <AccessibleColorPicker
              label="Select Color with Alpha"
              value={selectedColors.alpha}
              onChange={(color) => handleColorChange('alpha', color)}
              placeholder="Choose color with transparency"
              alpha={true}
              ariaLabel="Color selection with alpha transparency"
            />
          </div>

          {/* ColorPicker with Swatches */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontSize: responsive.subtitleFontSize,
                color: '#1976d2',
                margin: '0 0 16px 0',
              }}
            >
              With Color Swatches
            </h3>
            <AccessibleColorPicker
              label="Select from Swatches"
              value={selectedColors.swatch}
              onChange={(color) => handleColorChange('swatch', color)}
              placeholder="Choose from predefined colors"
              swatches={colorSwatches}
              ariaLabel="Color selection from predefined swatches"
            />
          </div>

          {/* Required ColorPicker */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontSize: responsive.subtitleFontSize,
                color: '#1976d2',
                margin: '0 0 16px 0',
              }}
            >
              Required Field
            </h3>
            <AccessibleColorPicker
              label="Required Color Selection"
              value={selectedColors.text}
              onChange={(color) => handleColorChange('text', color)}
              placeholder="This field is required"
              required={true}
              ariaLabel="Required color selection field"
            />
          </div>

          {/* Disabled ColorPicker */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontSize: responsive.subtitleFontSize,
                color: '#1976d2',
                margin: '0 0 16px 0',
              }}
            >
              Disabled State
            </h3>
            <AccessibleColorPicker
              label="Disabled ColorPicker"
              value={selectedColors.border}
              onChange={(color) => handleColorChange('border', color)}
              placeholder="This is disabled"
              disabled={true}
              ariaLabel="Disabled color picker"
            />
          </div>

          {/* Large Theme ColorPicker */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontSize: responsive.subtitleFontSize,
                color: '#1976d2',
                margin: '0 0 16px 0',
              }}
            >
              Large Theme
            </h3>
            <AccessibleColorPicker
              label="Large Color Picker"
              value={selectedColors.custom}
              onChange={(color) => handleColorChange('custom', color)}
              placeholder="Large theme for better visibility"
              theme="large"
              ariaLabel="Large theme color picker"
            />
          </div>

          {/* Polaroid Theme ColorPicker */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontSize: responsive.subtitleFontSize,
                color: '#1976d2',
                margin: '0 0 16px 0',
              }}
            >
              Polaroid Theme
            </h3>
            <AccessibleColorPicker
              label="Polaroid Style"
              value={selectedColors.background}
              onChange={(color) => handleColorChange('background', color)}
              placeholder="Polaroid theme style"
              theme="polaroid"
              ariaLabel="Polaroid theme color picker"
            />
          </div>
        </div>

        {/* Live Preview */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '20px',
          }}
        >
          <h2
            style={{
              fontSize: responsive.subtitleFontSize,
              color: '#1976d2',
              margin: '0 0 20px 0',
            }}
          >
            Live Preview
          </h2>

          <div
            style={{
              backgroundColor: selectedColors.background,
              border: `2px solid ${selectedColors.border}`,
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px',
            }}
          >
            <h3
              style={{
                color: selectedColors.text,
                margin: '0 0 12px 0',
                fontSize: '18px',
              }}
            >
              Sample Header
            </h3>
            <p
              style={{
                color: selectedColors.text,
                margin: '0 0 16px 0',
                fontSize: '14px',
              }}
            >
              This is how your content will look with the selected colors.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <button
                style={{
                  backgroundColor: selectedColors.primary,
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Primary Button
              </button>
              <button
                style={{
                  backgroundColor: selectedColors.secondary,
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Secondary Button
              </button>
              <button
                style={{
                  backgroundColor: selectedColors.accent,
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Accent Button
              </button>
            </div>
          </div>
        </div>

        {/* Accessibility Features */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '20px',
          }}
        >
          <h3
            style={{
              fontSize: responsive.subtitleFontSize,
              color: '#1976d2',
              margin: '0 0 16px 0',
            }}
          >
            Accessibility Features
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: responsive.isMobile
                ? '1fr'
                : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            <div>
              <h4
                style={{
                  fontSize: responsive.bodyFontSize,
                  color: '#333',
                  margin: '0 0 12px 0',
                }}
              >
                ♿ Keyboard Navigation
              </h4>
              <ul
                style={{
                  margin: '0',
                  paddingLeft: '20px',
                  fontSize: responsive.smallFontSize,
                  color: '#666',
                }}
              >
                <li>
                  <strong>Tab</strong>: Navigate between elements
                </li>
                <li>
                  <strong>Enter/Space</strong>: Open color picker
                </li>
                <li>
                  <strong>Arrow Keys</strong>: Navigate color palette
                </li>
                <li>
                  <strong>Enter</strong>: Select color
                </li>
                <li>
                  <strong>Escape</strong>: Close color picker
                </li>
              </ul>
            </div>

            <div>
              <h4
                style={{
                  fontSize: responsive.bodyFontSize,
                  color: '#333',
                  margin: '0 0 12px 0',
                }}
              >
                🎯 Screen Reader Support
              </h4>
              <ul
                style={{
                  margin: '0',
                  paddingLeft: '20px',
                  fontSize: responsive.smallFontSize,
                  color: '#666',
                }}
              >
                <li>
                  <strong>ARIA Labels</strong>: Descriptive labels
                </li>
                <li>
                  <strong>ARIA DescribedBy</strong>: Additional context
                </li>
                <li>
                  <strong>ARIA Invalid</strong>: Form validation
                </li>
                <li>
                  <strong>Focus Management</strong>: Proper focus handling
                </li>
                <li>
                  <strong>Live Regions</strong>: Dynamic updates
                </li>
              </ul>
            </div>

            <div>
              <h4
                style={{
                  fontSize: responsive.bodyFontSize,
                  color: '#333',
                  margin: '0 0 12px 0',
                }}
              >
                🎨 Coloris.js Features
              </h4>
              <ul
                style={{
                  margin: '0',
                  paddingLeft: '20px',
                  fontSize: responsive.smallFontSize,
                  color: '#666',
                }}
              >
                <li>
                  <strong>Multiple Themes</strong>: Default, Large, Polaroid
                </li>
                <li>
                  <strong>Color Formats</strong>: HEX, RGB, HSL
                </li>
                <li>
                  <strong>Alpha Channel</strong>: Transparency support
                </li>
                <li>
                  <strong>Color Swatches</strong>: Predefined colors
                </li>
                <li>
                  <strong>Clear Button</strong>: Reset functionality
                </li>
              </ul>
            </div>

            <div>
              <h4
                style={{
                  fontSize: responsive.bodyFontSize,
                  color: '#333',
                  margin: '0 0 12px 0',
                }}
              >
                📱 Responsive Design
              </h4>
              <ul
                style={{
                  margin: '0',
                  paddingLeft: '20px',
                  fontSize: responsive.smallFontSize,
                  color: '#666',
                }}
              >
                <li>
                  <strong>Mobile Friendly</strong>: Touch support
                </li>
                <li>
                  <strong>Responsive Layout</strong>: Adapts to screen size
                </li>
                <li>
                  <strong>High Contrast</strong>: Better visibility
                </li>
                <li>
                  <strong>Large Targets</strong>: Easy to click/tap
                </li>
                <li>
                  <strong>Visual Feedback</strong>: Clear interactions
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Color Values Display */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h3
            style={{
              fontSize: responsive.subtitleFontSize,
              color: '#1976d2',
              margin: '0 0 16px 0',
            }}
          >
            Selected Color Values
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: responsive.isMobile
                ? '1fr'
                : 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            {Object.entries(selectedColors).map(([key, color]) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: color,
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}
                />
                <span
                  style={{
                    fontSize: responsive.smallFontSize,
                    fontWeight: '500',
                    color: '#333',
                    textTransform: 'capitalize',
                  }}
                >
                  {key}:
                </span>
                <code
                  style={{
                    fontSize: responsive.smallFontSize,
                    color: '#666',
                    backgroundColor: '#f1f1f1',
                    padding: '2px 6px',
                    borderRadius: '3px',
                  }}
                >
                  {color}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ColorisProvider>
  );
}

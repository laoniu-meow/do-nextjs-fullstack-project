'use client';

import { useState } from 'react';
import ModernColorPicker from '@/components/ModernColorPicker';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';

export default function ModernColorPickerTestPage() {
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
    dark: '#2d2d2d',
    light: '#f5f5f5',
  });

  const handleColorChange = (key: string, color: string) => {
    setSelectedColors((prev) => ({ ...prev, [key]: color }));
  };

  return (
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
          borderRadius: '16px',
          marginBottom: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <h1
          style={{
            fontSize: responsive.titleFontSize,
            color: '#1a365d',
            margin: '0 0 8px 0',
          }}
        >
          Modern ColorPicker Test Page
        </h1>
        <p
          style={{
            fontSize: responsive.bodyFontSize,
            color: '#666',
            margin: '0',
          }}
        >
          Contemporary color picker with advanced features and sleek UI
        </p>
      </div>

      {/* Modern ColorPicker Showcase */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: responsive.isMobile
            ? '1fr'
            : 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        {/* Basic Modern ColorPicker */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <h3
            style={{
              fontSize: responsive.subtitleFontSize,
              color: '#1976d2',
              margin: '0 0 16px 0',
            }}
          >
            Basic Modern ColorPicker
          </h3>
          <ModernColorPicker
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
              marginTop: '8px',
            }}
          >
            Click the color preview to open the modern picker interface
          </div>
        </div>

        {/* Advanced ColorPicker with All Features */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <h3
            style={{
              fontSize: responsive.subtitleFontSize,
              color: '#1976d2',
              margin: '0 0 16px 0',
            }}
          >
            Advanced Features
          </h3>
          <ModernColorPicker
            label="Select Secondary Color"
            value={selectedColors.secondary}
            onChange={(color) => handleColorChange('secondary', color)}
            placeholder="Choose secondary color"
            showRgb={true}
            showHsl={true}
            showAlpha={true}
            showSwatches={true}
            showHistory={true}
            ariaLabel="Secondary color selection with all features"
          />
        </div>

        {/* Dark Theme ColorPicker */}
        <div
          style={{
            backgroundColor: '#2d2d2d',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <h3
            style={{
              fontSize: responsive.subtitleFontSize,
              color: '#ffffff',
              margin: '0 0 16px 0',
            }}
          >
            Dark Theme
          </h3>
          <ModernColorPicker
            label="Select Accent Color"
            value={selectedColors.accent}
            onChange={(color) => handleColorChange('accent', color)}
            placeholder="Choose accent color"
            theme="dark"
            ariaLabel="Accent color selection with dark theme"
          />
        </div>

        {/* Large Size ColorPicker */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <h3
            style={{
              fontSize: responsive.subtitleFontSize,
              color: '#1976d2',
              margin: '0 0 16px 0',
            }}
          >
            Large Size
          </h3>
          <ModernColorPicker
            label="Select Background Color"
            value={selectedColors.background}
            onChange={(color) => handleColorChange('background', color)}
            placeholder="Choose background color"
            size="large"
            showRgb={true}
            ariaLabel="Background color selection with large size"
          />
        </div>

        {/* Small Size ColorPicker */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <h3
            style={{
              fontSize: responsive.subtitleFontSize,
              color: '#1976d2',
              margin: '0 0 16px 0',
            }}
          >
            Small Size
          </h3>
          <ModernColorPicker
            label="Select Text Color"
            value={selectedColors.text}
            onChange={(color) => handleColorChange('text', color)}
            placeholder="Choose text color"
            size="small"
            ariaLabel="Text color selection with small size"
          />
        </div>

        {/* Alpha Channel ColorPicker */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <h3
            style={{
              fontSize: responsive.subtitleFontSize,
              color: '#1976d2',
              margin: '0 0 16px 0',
            }}
          >
            Alpha Channel
          </h3>
          <ModernColorPicker
            label="Select Color with Alpha"
            value={selectedColors.alpha}
            onChange={(color) => handleColorChange('alpha', color)}
            placeholder="Choose color with transparency"
            showAlpha={true}
            showRgb={true}
            ariaLabel="Color selection with alpha transparency"
          />
        </div>

        {/* Minimal Variant */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <h3
            style={{
              fontSize: responsive.subtitleFontSize,
              color: '#1976d2',
              margin: '0 0 16px 0',
            }}
          >
            Minimal Variant
          </h3>
          <ModernColorPicker
            label="Select Border Color"
            value={selectedColors.border}
            onChange={(color) => handleColorChange('border', color)}
            placeholder="Choose border color"
            variant="minimal"
            showSwatches={false}
            showHistory={false}
            ariaLabel="Border color selection with minimal variant"
          />
        </div>

        {/* Custom Styling */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <h3
            style={{
              fontSize: responsive.subtitleFontSize,
              color: '#1976d2',
              margin: '0 0 16px 0',
            }}
          >
            Custom Styling
          </h3>
          <ModernColorPicker
            label="Select Custom Color"
            value={selectedColors.custom}
            onChange={(color) => handleColorChange('custom', color)}
            placeholder="Choose custom color"
            style={{
              border: '2px solid #ff6b6b',
              borderRadius: '20px',
              padding: '8px',
            }}
            ariaLabel="Custom color selection with custom styling"
          />
        </div>
      </div>

      {/* Live Preview */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
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
            borderRadius: '16px',
            padding: '24px',
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
            Modern UI Components
          </h3>
          <p
            style={{
              color: selectedColors.text,
              margin: '0 0 16px 0',
              fontSize: '14px',
            }}
          >
            Experience the modern color picker with contemporary design
            patterns.
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
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Primary Button
            </button>
            <button
              style={{
                backgroundColor: selectedColors.secondary,
                color: '#ffffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Secondary Button
            </button>
            <button
              style={{
                backgroundColor: selectedColors.accent,
                color: '#ffffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Accent Button
            </button>
          </div>
        </div>
      </div>

      {/* Modern Features */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
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
          Modern Features
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
              🎨 Advanced Color Selection
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
                <strong>HSL Color Space</strong>: Intuitive hue, saturation,
                lightness
              </li>
              <li>
                <strong>Alpha Channel</strong>: Transparency support
              </li>
              <li>
                <strong>Real-time Preview</strong>: Instant color feedback
              </li>
              <li>
                <strong>Drag & Drop</strong>: Smooth color selection
              </li>
              <li>
                <strong>Multiple Formats</strong>: HEX, RGB, HSL display
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
              🎯 User Experience
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
                <strong>Color History</strong>: Remember recent selections
              </li>
              <li>
                <strong>Color Swatches</strong>: Quick preset selection
              </li>
              <li>
                <strong>Keyboard Navigation</strong>: Full accessibility
              </li>
              <li>
                <strong>Click Outside</strong>: Intuitive closing
              </li>
              <li>
                <strong>Responsive Design</strong>: Mobile-friendly
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
              🎨 Design System
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
                <strong>Modern UI</strong>: Contemporary design patterns
              </li>
              <li>
                <strong>Dark/Light Themes</strong>: Theme support
              </li>
              <li>
                <strong>Smooth Animations</strong>: Fluid interactions
              </li>
              <li>
                <strong>Custom Styling</strong>: Flexible appearance
              </li>
              <li>
                <strong>Backdrop Blur</strong>: Modern glass effect
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
              ♿ Accessibility
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
                <strong>ARIA Labels</strong>: Screen reader support
              </li>
              <li>
                <strong>Keyboard Navigation</strong>: Tab, Enter, Escape
              </li>
              <li>
                <strong>High Contrast</strong>: Better visibility
              </li>
              <li>
                <strong>Focus Management</strong>: Proper focus handling
              </li>
              <li>
                <strong>Color Blind Support</strong>: Multiple formats
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Color Values Display */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
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
              : 'repeat(auto-fit, minmax(250px, 1fr))',
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
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: color,
                  borderRadius: '6px',
                  border: '2px solid #ffffff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              />
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontSize: responsive.smallFontSize,
                    fontWeight: '500',
                    color: '#333',
                    textTransform: 'capitalize',
                    display: 'block',
                  }}
                >
                  {key}
                </span>
                <code
                  style={{
                    fontSize: responsive.smallFontSize,
                    color: '#666',
                    backgroundColor: '#f1f1f1',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                  }}
                >
                  {color}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { ToggleMenuButtonConfig, defaultToggleMenuConfig } from '@/types/toggleMenuConfig';

// In-memory storage (replace with database in production)
// Reset to new default configuration with square shape
let toggleMenuConfig: ToggleMenuButtonConfig = defaultToggleMenuConfig;

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      config: toggleMenuConfig,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch toggle menu configuration',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newConfig: ToggleMenuButtonConfig = {
      ...defaultToggleMenuConfig,
      ...body,
    };

    // Validate the configuration
    if (!validateToggleMenuConfig(newConfig)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid toggle menu configuration',
        },
        { status: 400 }
      );
    }

    // Save the configuration (replace with database save in production)
    toggleMenuConfig = newConfig;

    return NextResponse.json({
      success: true,
      message: 'Toggle menu configuration saved successfully',
      config: toggleMenuConfig,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save toggle menu configuration',
      },
      { status: 500 }
    );
  }
}

// Validation function for toggle menu configuration
function validateToggleMenuConfig(config: any): config is ToggleMenuButtonConfig {
  // Basic validation
  if (typeof config !== 'object' || config === null) {
    return false;
  }

  // Check required fields
  const requiredFields = [
    'enabled',
    'size',
    'shape',
    'backgroundColor',
    'shadowType',
    'iconName',
    'iconColor',
    'iconSize',
    'responsive',
  ];

  for (const field of requiredFields) {
    if (!(field in config)) {
      return false;
    }
  }

  // Validate specific fields
  if (typeof config.enabled !== 'boolean') return false;
  if (typeof config.backgroundColor !== 'string') return false;
  if (typeof config.iconName !== 'string') return false;
  if (typeof config.iconColor !== 'string') return false;
  if (typeof config.shadowType !== 'string') return false;

  // Validate responsive configuration
  if (!config.responsive || typeof config.responsive !== 'object') {
    return false;
  }

  const screens = ['mobile', 'tablet', 'desktop'];
  for (const screen of screens) {
    if (!config.responsive[screen] || typeof config.responsive[screen] !== 'object') {
      return false;
    }

    const screenConfig = config.responsive[screen];
    if (!screenConfig.size) {
      return false;
    }
  }

  return true;
} 
'use client';

import React from 'react';

export interface MenuItemProps {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  children?: React.ReactNode;
  isMobile?: boolean;
  isTablet?: boolean;
  subItems?: MenuItemProps[];
  level?: number;
  hasSubItems?: boolean;
  isExpanded?: boolean;
}

export default function MenuItem({
  label,
  icon,
  href,
  onClick,
  isActive = false,
  children,
  isMobile = false,
  isTablet = false,
  level = 0,
  hasSubItems = false,
  isExpanded = false,
}: MenuItemProps) {
  return (
    <div
      style={{
        paddingTop: isMobile ? '10px' : isTablet ? '12px' : '12px',
        paddingRight: isMobile ? '12px' : isTablet ? '14px' : '16px',
        paddingBottom: isMobile ? '10px' : isTablet ? '12px' : '12px',
        paddingLeft: `${12 + level * 20}px`,
        cursor: 'pointer',
        backgroundColor: isActive ? '#e3f2fd' : 'transparent',
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '8px' : '12px',
        transition: 'background-color 0.2s ease',
        fontSize: isMobile ? '14px' : isTablet ? '15px' : '16px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f5f5f5';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isActive
          ? '#e3f2fd'
          : 'transparent';
      }}
      onClick={onClick}
    >
      {icon && (
        <span
          style={{
            fontSize: isMobile ? '16px' : isTablet ? '18px' : '18px',
            width: isMobile ? '16px' : '20px',
            textAlign: 'center',
          }}
        >
          {icon}
        </span>
      )}
      <span
        style={{
          color: isActive ? '#1976d2' : '#333',
          fontWeight: isActive ? '600' : '400',
          flex: '1',
        }}
      >
        {label}
      </span>
      {hasSubItems && (
        <span
          style={{
            fontSize: '12px',
            color: '#666',
            transition: 'transform 0.2s ease',
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        >
          ▶
        </span>
      )}
      {children}
    </div>
  );
}

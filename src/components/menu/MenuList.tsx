'use client';

import React from 'react';
import MenuItem, { MenuItemProps } from './MenuItem';

export interface MenuListProps {
  items: MenuItemProps[];
  title?: string;
  onItemClick?: (item: MenuItemProps) => void;
  activeItemId?: string;
  isMobile?: boolean;
  isTablet?: boolean;
}

export default function MenuList({
  items,
  title,
  onItemClick,
  activeItemId,
  isMobile = false,
  isTablet = false,
}: MenuListProps) {
  return (
    <div style={{ width: '100%' }}>
      {title && (
        <h2
          style={{
            marginBottom: isMobile ? '16px' : '20px',
            color: '#333',
            fontSize: isMobile ? '16px' : isTablet ? '18px' : '18px',
            fontWeight: '600',
            padding: isMobile ? '0 12px' : '0 16px',
          }}
        >
          {title}
        </h2>
      )}
      <div style={{ width: '100%' }}>
        {items.map((item) => (
          <MenuItem
            key={item.id}
            {...item}
            isActive={activeItemId === item.id}
            onClick={() => onItemClick?.(item)}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        ))}
      </div>
    </div>
  );
}

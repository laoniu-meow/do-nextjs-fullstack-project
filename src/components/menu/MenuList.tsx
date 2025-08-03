'use client';

import React, { useState } from 'react';
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
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const renderMenuItem = (item: MenuItemProps, level: number = 0) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = activeItemId === item.id;

    return (
      <div key={item.id}>
        <MenuItem
          {...item}
          isActive={isActive}
          onClick={() => {
            if (hasSubItems) {
              toggleExpanded(item.id);
            } else {
              onItemClick?.(item);
            }
          }}
          isMobile={isMobile}
          isTablet={isTablet}
          level={level}
          hasSubItems={hasSubItems}
          isExpanded={isExpanded}
        />
        {hasSubItems && isExpanded && (
          <div
            style={{
              marginLeft: level * 20 + 20,
              borderLeft: '2px solid #e0e0e0',
              marginTop: '4px',
              marginBottom: '4px',
            }}
          >
            {item.subItems!.map((subItem) =>
              renderMenuItem(subItem, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

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
        {items.map((item) => renderMenuItem(item))}
      </div>
    </div>
  );
}

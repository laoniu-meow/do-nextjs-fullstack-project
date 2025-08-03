'use client';

import React from 'react';
import { ResponsiveStyles } from '@/hooks/useResponsiveStyles';

export interface FileUploadCardProps {
  title: string;
  preview: string | null;
  placeholder: string;
  onClick: () => void;
  responsive: ResponsiveStyles;
}

export default function FileUploadCard({
  title,
  preview,
  placeholder,
  onClick,
  responsive,
}: FileUploadCardProps) {
  const { isMobile, subtitleFontSize, gap, cardWidth } = responsive;

  return (
    <div
      style={{
        flex: '1',
        width: isMobile ? '100%' : 'auto',
        minHeight: '120px',
      }}
    >
      <div
        style={{
          padding: isMobile ? '16px' : '20px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          fontSize: '14px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0',
          height: '100%',
          width: cardWidth,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h3
          style={{
            margin: '0 0 16px 0',
            fontSize: subtitleFontSize,
            fontWeight: '600',
            color: '#1976d2', // Prominent blue for section titles
          }}
        >
          {title}
        </h3>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isMobile ? '12px' : '16px',
            flex: '1',
            justifyContent: 'center',
          }}
        >
          {/* Upload Area */}
          <div
            onClick={onClick}
            style={{
              width: isMobile ? '120px' : '140px',
              height: isMobile ? '80px' : '90px',
              backgroundColor: '#f8f9fa',
              border: '2px dashed #dee2e6',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6c757d',
              fontSize: isMobile ? '12px' : '14px',
              textAlign: 'center',
              padding: isMobile ? '8px' : '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e9ecef';
              e.currentTarget.style.borderColor = '#adb5bd';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
              e.currentTarget.style.borderColor = '#dee2e6';
            }}
          >
            {preview ? (
              <img
                src={preview}
                alt={`${title} Preview`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            ) : (
              placeholder
            )}
          </div>

          {/* Upload text */}
          <div
            style={{
              fontSize: isMobile ? '11px' : '12px',
              color: '#6c757d',
              textAlign: 'center',
              marginTop: '4px',
              fontWeight: '500',
            }}
          >
            Upload {title} (Click the below to upload file)
          </div>
        </div>
      </div>
    </div>
  );
}

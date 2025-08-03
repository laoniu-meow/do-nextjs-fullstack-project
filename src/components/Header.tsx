'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface CompanyLogo {
  logo: string | null;
  companyName: string;
}

export default function Header() {
  const [companyLogo, setCompanyLogo] = useState<CompanyLogo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch company logo from API
  useEffect(() => {
    const fetchCompanyLogo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/company/logo');
        if (response.ok) {
          const data = await response.json();
          setCompanyLogo(data);
        } else {
          console.error('Failed to fetch company logo');
        }
      } catch (error) {
        console.error('Error fetching company logo:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyLogo();
  }, []);

  return (
    <header
      style={{
        width: '100%',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        padding: '16px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '48px',
        }}
      >
        {/* Logo Area */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '25px',
          }}
        >
          {/* Company Logo */}
          <div
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: companyLogo?.logo ? 'transparent' : '#1976d2',
            }}
          >
            {isLoading ? (
              // Loading placeholder
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  color: '#999',
                }}
              >
                ...
              </div>
            ) : companyLogo?.logo ? (
              // Actual logo from database
              <Image
                src={companyLogo.logo}
                alt={`${companyLogo.companyName} Logo`}
                width={40}
                height={40}
                style={{
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
              />
            ) : (
              // Fallback placeholder
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#1976d2',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                L
              </div>
            )}
          </div>

          {/* Company Name */}
          <div
            style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1a365d',
            }}
          >
            {companyLogo?.companyName || 'Company Name'}
          </div>
        </div>

        {/* Menu Button */}
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease',
          }}
          onClick={() => {
            // TODO: Add menu functionality later
            console.log('Menu button clicked');
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div
            style={{
              width: '20px',
              height: '2px',
              backgroundColor: '#333',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-6px',
                left: '0',
                width: '100%',
                height: '2px',
                backgroundColor: '#333',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '6px',
                left: '0',
                width: '100%',
                height: '2px',
                backgroundColor: '#333',
              }}
            />
          </div>
        </button>
      </div>
    </header>
  );
}

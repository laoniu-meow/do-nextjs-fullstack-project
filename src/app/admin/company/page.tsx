'use client';

import { useState, useEffect } from 'react';
import { MenuList, adminMenuItems } from '@/components/menu';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';
import CompanyInfoField from '@/components/CompanyInfoField';
import FileUploadCard from '@/components/FileUploadCard';
import FormField from '@/components/FormField';
import ActionButton from '@/components/ActionButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function CompanyPage() {
  const responsive = useResponsiveStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState('company');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'logo' | 'banner'>('logo');
  const [filename, setFilename] = useState('');
  const [altText, setAltText] = useState('');

  // Applied files (only shown after clicking Apply)
  const [appliedLogoFile, setAppliedLogoFile] = useState<File | null>(null);
  const [appliedBannerFile, setAppliedBannerFile] = useState<File | null>(null);
  const [appliedLogoPreview, setAppliedLogoPreview] = useState<string | null>(
    null
  );
  const [appliedBannerPreview, setAppliedBannerPreview] = useState<
    string | null
  >(null);

  // Company information data - organized for loop rendering
  const companyInfo = [
    { label: 'Company Name', value: 'Sample Company Ltd.' },
    { label: 'Company Registration Number', value: 'REG123456789' },
    { label: 'Address', value: '123 Business Street, Tech District' },
    { label: 'Country', value: 'United States' },
    { label: 'Postal Code', value: '12345' },
    { label: 'Email', value: 'contact@samplecompany.com' },
    { label: 'Contact', value: '+1 (555) 123-4567' },
  ];

  // Grouped fields for responsive layout
  const groupedFields = [
    [
      { label: 'Company Name', value: 'Sample Company Ltd.' },
      { label: 'Company Registration Number', value: 'REG123456789' },
    ],
    [{ label: 'Address', value: '123 Business Street, Tech District' }],
    [
      { label: 'Country', value: 'United States' },
      { label: 'Postal Code', value: '12345' },
    ],
    [
      { label: 'Email', value: 'contact@samplecompany.com' },
      { label: 'Contact', value: '+1 (555) 123-4567' },
    ],
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item: any) => {
    setActiveItemId(item.id);
    console.log('Menu item clicked:', item);

    if (item.href) {
      window.location.href = item.href;
    }

    if (responsive.isMobile) {
      setIsOpen(false);
    }
  };

  // File handling functions
  const handleLogoClick = () => {
    setModalType('logo');
    setFilename(appliedLogoFile?.name || '');
    setAltText('Company Logo');
    setShowModal(true);
  };

  const handleBannerClick = () => {
    setModalType('banner');
    setFilename(appliedBannerFile?.name || '');
    setAltText('Company Banner');
    setShowModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (modalType === 'logo') {
          setLogoFile(file);
          setLogoPreview(result);
        } else {
          setBannerFile(file);
          setBannerPreview(result);
        }
        setFilename(filename || file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    if (modalType === 'logo') {
      setLogoFile(null);
      setLogoPreview(null);
      setAppliedLogoFile(null);
      setAppliedLogoPreview(null);
    } else {
      setBannerFile(null);
      setBannerPreview(null);
      setAppliedBannerFile(null);
      setAppliedBannerPreview(null);
    }
    setFilename('');
  };

  const handleApply = async () => {
    try {
      console.log(
        `${modalType} file:`,
        modalType === 'logo' ? logoFile : bannerFile
      );
      console.log('Filename:', filename);
      console.log('Alt text:', altText);

      if (modalType === 'logo' && logoFile) {
        setAppliedLogoFile(logoFile);
        setAppliedLogoPreview(logoPreview);
        console.log(
          'Logo uploaded to:',
          process.env.UPLOAD_LOGOS_DIR || '/public/logos'
        );
        console.log('Logo filename:', filename);
      } else if (modalType === 'banner' && bannerFile) {
        setAppliedBannerFile(bannerFile);
        setAppliedBannerPreview(bannerPreview);
        console.log(
          'Banner uploaded to:',
          process.env.UPLOAD_MEDIA_DIR || '/public/media'
        );
        console.log('Banner filename:', filename);
      }

      setShowModal(false);
    } catch (error) {
      console.error('Error applying changes:', error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setFilename('');
    setAltText('');
    if (modalType === 'logo') {
      setLogoFile(null);
      setLogoPreview(null);
    } else {
      setBannerFile(null);
      setBannerPreview(null);
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Drawer Menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : `-${responsive.drawerWidth}`,
          width: responsive.drawerWidth,
          height: '100vh',
          backgroundColor: '#f5f5f5',
          borderLeft: '1px solid #ddd',
          transition: 'right 0.3s ease-in-out',
          zIndex: 1000,
          padding: responsive.padding,
          boxShadow: isOpen ? '-2px 0 8px rgba(0,0,0,0.1)' : 'none',
          overflowY: 'auto',
        }}
      >
        <MenuList
          items={adminMenuItems}
          title="Admin Menu"
          onItemClick={handleMenuItemClick}
          activeItemId={activeItemId}
          isMobile={responsive.isMobile}
          isTablet={responsive.isTablet}
        />
      </div>

      {/* Overlay for mobile */}
      {responsive.isMobile && isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        style={{
          height: '100vh',
          padding: responsive.padding,
          overflow: 'hidden',
        }}
      >
        {/* Static Header Section */}
        <div style={{ marginBottom: '20px' }}>
          <h1
            style={{
              width: '100%',
              fontSize: responsive.titleFontSize,
              paddingBottom: '8px',
              marginBottom: responsive.isMobile ? '24px' : '16px',
              color: '#1a365d',
            }}
          >
            Company Profile
          </h1>

          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: '#ddd',
              marginBottom: '16px',
            }}
          />

          <p
            style={{
              fontSize: responsive.bodyFontSize,
              marginBottom: '8px',
              width: '60%',
            }}
          >
            Welcome to the company management panel
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '95%',
            }}
          >
            <p
              style={{
                fontSize: responsive.smallFontSize,
                color: '#666',
                margin: '0',
              }}
            >
              Active menu item: {activeItemId}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div title="Preview">
                <VisibilityIcon
                  style={{
                    fontSize: responsive.isMobile ? '24px' : '28px',
                    color: '#1976d2',
                    cursor: 'pointer',
                  }}
                />
              </div>
              <div title="Upload">
                <CloudUploadIcon
                  style={{
                    fontSize: responsive.isMobile ? '24px' : '28px',
                    color: '#388e3c',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div
          style={{
            height: 'calc(100vh - 200px)',
            overflowY: 'auto',
            paddingRight: '8px',
          }}
        >
          {/* Company Info and Logo Container */}
          <div
            style={{
              marginTop: responsive.gap,
              display: 'flex',
              flexDirection: responsive.isMobile ? 'column' : 'row',
              gap: responsive.gap,
              maxWidth: '100%',
              alignItems: 'flex-start',
            }}
          >
            {/* Company Info using reusable components */}
            <div
              style={{ flex: responsive.isMobile ? '1' : '1', width: '100%' }}
            >
              <div
                style={{
                  padding: responsive.padding,
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: '1px solid #e0e0e0',
                }}
              >
                <h3
                  style={{
                    margin: '0 0 16px 0',
                    fontSize: responsive.subtitleFontSize,
                    fontWeight: '600',
                    color: '#1976d2',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>Company Information</span>
                  <button
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#ffcc80',
                      color: '#e65100',
                      border: 'none',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '500',
                      transition: 'background-color 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffb74d';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffcc80';
                    }}
                  >
                    ✏️
                  </button>
                </h3>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: responsive.isMobile ? '12px' : '16px',
                  }}
                >
                  {/* Render grouped fields using loops */}
                  {groupedFields.map((group, groupIndex) => (
                    <div
                      key={groupIndex}
                      style={{
                        display: 'flex',
                        flexDirection: responsive.isMobile ? 'column' : 'row',
                        gap: responsive.isMobile ? '8px' : '16px',
                      }}
                    >
                      {group.map((field, fieldIndex) => (
                        <CompanyInfoField
                          key={`${groupIndex}-${fieldIndex}`}
                          label={field.label}
                          value={field.value}
                          isFullWidth={group.length === 1}
                          responsive={responsive}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Logo and Banner Container using reusable components */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: responsive.gap,
                width: responsive.isMobile ? '100%' : 'auto',
                height: 'fit-content',
                maxHeight: '100%',
              }}
            >
              <FileUploadCard
                title="Logo"
                preview={appliedLogoPreview}
                placeholder={
                  companyInfo.find((item) => item.label === 'Company Name')
                    ?.value || 'Click to Upload Logo'
                }
                onClick={handleLogoClick}
                responsive={responsive}
              />

              <FileUploadCard
                title="Banner"
                preview={appliedBannerPreview}
                placeholder="Click to Upload Banner"
                onClick={handleBannerClick}
                responsive={responsive}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        style={{
          position: 'fixed',
          top: responsive.padding,
          right: isOpen ? `calc(${responsive.drawerWidth} + 20px)` : '20px',
          width: responsive.buttonSize,
          height: responsive.buttonSize,
          borderRadius: '50%',
          border: 'none',
          backgroundColor: '#1976d2',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: responsive.iconSize,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          transition: 'right 0.3s ease-in-out, transform 0.3s ease-in-out',
          zIndex: 1001,
        }}
      >
        <MenuOpenIcon
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease-in-out',
            fontSize: responsive.isMobile ? '24px' : '28px',
          }}
        />
      </button>

      {/* File Management Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCancel();
            }
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: responsive.paddingLarge,
              width: responsive.isMobile ? '90%' : '500px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            }}
          >
            <h2
              style={{
                margin: '0 0 20px 0',
                fontSize: '20px',
                fontWeight: '600',
                color: '#333',
              }}
            >
              {modalType === 'logo' ? 'Logo Management' : 'Banner Management'}
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: responsive.isMobile ? 'column' : 'row',
                gap: responsive.gapLarge,
                marginBottom: '20px',
              }}
            >
              {/* Image Preview Area */}
              <div
                style={{
                  flex: '1',
                  minHeight: '200px',
                  border: '2px dashed #dee2e6',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f8f9fa',
                  position: 'relative',
                }}
              >
                {(modalType === 'logo' ? logoPreview : bannerPreview) ? (
                  <img
                    src={
                      modalType === 'logo'
                        ? logoPreview || ''
                        : bannerPreview || ''
                    }
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', color: '#6c757d' }}>
                    <div style={{ fontSize: '48px', marginBottom: '8px' }}>
                      📁
                    </div>
                    <div>
                      {modalType === 'logo'
                        ? appliedLogoPreview
                          ? 'Current Logo'
                          : 'No logo selected'
                        : appliedBannerPreview
                          ? 'Current Banner'
                          : 'No banner selected'}
                    </div>
                  </div>
                )}
              </div>

              {/* Form Fields using reusable components */}
              <div
                style={{
                  flex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <FormField
                  label={`Upload ${modalType === 'logo' ? 'Logo' : 'Banner'}`}
                  value=""
                  onChange={() => {}}
                  type="file"
                  accept="image/*"
                />

                <FormField
                  label="Filename:"
                  value={filename}
                  onChange={setFilename}
                  placeholder="Enter filename"
                />

                <FormField
                  label="Alt:"
                  value={altText}
                  onChange={setAltText}
                  placeholder="Enter alt text"
                />

                {(modalType === 'logo' ? logoFile : bannerFile) && (
                  <ActionButton
                    text={`Remove Current ${modalType === 'logo' ? 'Logo' : 'Banner'}`}
                    onClick={handleRemoveFile}
                    variant="danger"
                  />
                )}
              </div>
            </div>

            {/* Action Buttons using reusable components */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
              }}
            >
              <ActionButton
                text="Cancel"
                onClick={handleCancel}
                variant="secondary"
              />
              <ActionButton
                text="Apply"
                onClick={handleApply}
                variant="primary"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

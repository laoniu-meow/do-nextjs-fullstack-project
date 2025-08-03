'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { MenuList, adminMenuItems } from '@/components/menu';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';
import CompanyInfoField from '@/components/CompanyInfoField';
import FileUploadCard from '@/components/FileUploadCard';
import FormField from '@/components/FormField';
import ActionButton from '@/components/ActionButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Image from 'next/image';

export default function CompanyPage() {
  const responsive = useResponsiveStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState('company');

  // File upload states
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

  // Edit mode states
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalCompanyData, setOriginalCompanyData] = useState<any>(null);
  const [stagingData, setStagingData] = useState<any>(null);
  const [productionData, setProductionData] = useState<any>(null);

  // Auto-save functionality
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);

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
  const [groupedFields, setGroupedFields] = useState([
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
  ]);

  const loadCompanyData = useCallback(async () => {
    try {
      console.log('Loading company data...');

      // Load both production and staging data in parallel
      const [prodResponse, stagingResponse] = await Promise.all([
        fetch('/api/company'),
        fetch('/api/company/staging'),
      ]);

      const prodData = await prodResponse.json();
      const stagingData = await stagingResponse.json();

      console.log('Production data:', prodData);
      console.log('Staging data:', stagingData);

      // Smart decision: use staging if it's newer than production
      let dataToUse;
      if (stagingData.id && prodData.id) {
        // Both exist - compare timestamps
        const stagingTime = new Date(stagingData.updatedAt).getTime();
        const prodTime = new Date(prodData.updatedAt).getTime();

        if (stagingTime > prodTime) {
          console.log('Using staging data (newer)');
          dataToUse = stagingData;
        } else {
          console.log('Using production data (newer or same)');
          dataToUse = prodData;
        }
      } else if (stagingData.id) {
        // Only staging exists
        console.log('Using staging data (only staging exists)');
        dataToUse = stagingData;
      } else if (prodData.id) {
        // Only production exists
        console.log('Using production data (only production exists)');
        dataToUse = prodData;
      } else {
        // No data exists
        console.log('No data found, using default values');
        dataToUse = {};
      }

      console.log('Final data to use:', dataToUse);

      if (dataToUse.id) {
        updateFieldsFromData(dataToUse);
        setOriginalCompanyData(dataToUse);
      } else {
        console.log('No data found, using default values');
      }

      // Store both datasets for reference
      setProductionData(prodData);
      setStagingData(stagingData);
    } catch (error) {
      console.error('Error loading company data:', error);
    }
  }, []);

  // Load data on component mount
  useEffect(() => {
    loadCompanyData();
  }, [loadCompanyData]);

  // Cleanup auto-save timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  const updateFieldsFromData = (data: any) => {
    const newFields = [
      [
        { label: 'Company Name', value: data.name || 'Sample Company Ltd.' },
        {
          label: 'Company Registration Number',
          value: data.registrationNumber || 'REG123456789',
        },
      ],
      [
        {
          label: 'Address',
          value: data.address || '123 Business Street, Tech District',
        },
      ],
      [
        { label: 'Country', value: data.country || 'United States' },
        { label: 'Postal Code', value: data.postalCode || '12345' },
      ],
      [
        { label: 'Email', value: data.email || 'contact@samplecompany.com' },
        { label: 'Contact', value: data.contact || '+1 (555) 123-4567' },
      ],
    ];
    setGroupedFields(newFields);

    // Set logo and banner previews from database data
    if (data.logo) {
      console.log(
        'Loading logo from database:',
        data.logo.substring(0, 50) + '...'
      );
      setAppliedLogoPreview(data.logo);
    } else {
      console.log('No logo data found in database');
      setAppliedLogoPreview(null);
    }
    if (data.banner) {
      console.log(
        'Loading banner from database:',
        data.banner.substring(0, 50) + '...'
      );
      setAppliedBannerPreview(data.banner);
    } else {
      console.log('No banner data found in database');
      setAppliedBannerPreview(null);
    }
  };

  // Auto-save function with debouncing
  const autoSaveToStaging = useCallback(async () => {
    if (!hasChanges) return;

    try {
      setIsAutoSaving(true);
      console.log('Auto-saving changes to staging...');

      const companyData = {
        name: groupedFields[0][0].value,
        registrationNumber: groupedFields[0][1].value,
        address: groupedFields[1][0].value,
        country: groupedFields[2][0].value,
        postalCode: groupedFields[2][1].value,
        email: groupedFields[3][0].value,
        contact: groupedFields[3][1].value,
        logo: appliedLogoPreview,
        banner: appliedBannerPreview,
      };

      const response = await fetch('/api/company/staging', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyData),
      });

      if (response.ok) {
        const savedData = await response.json();
        setStagingData(savedData);
        setLastAutoSave(new Date());
        console.log('Auto-save successful');
      } else {
        console.error('Auto-save failed');
      }
    } catch (error) {
      console.error('Error during auto-save:', error);
    } finally {
      setIsAutoSaving(false);
    }
  }, [groupedFields, appliedLogoPreview, appliedBannerPreview, hasChanges]);

  // Debounced auto-save trigger
  const triggerAutoSave = useCallback(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      autoSaveToStaging();
    }, 2000); // 2 second delay
  }, [autoSaveToStaging]);

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

      // Save the logo/banner immediately to staging
      await saveLogoBannerToStaging();

      // Trigger auto-save for any other pending changes
      triggerAutoSave();

      setShowModal(false);
    } catch (error) {
      console.error('Error applying changes:', error);
    }
  };

  const saveLogoBannerToStaging = async () => {
    try {
      const companyData = {
        name: groupedFields[0][0].value,
        registrationNumber: groupedFields[0][1].value,
        address: groupedFields[1][0].value,
        country: groupedFields[2][0].value,
        postalCode: groupedFields[2][1].value,
        email: groupedFields[3][0].value,
        contact: groupedFields[3][1].value,
        logo: modalType === 'logo' ? logoPreview : appliedLogoPreview,
        banner: modalType === 'banner' ? bannerPreview : appliedBannerPreview,
      };

      console.log('Saving logo/banner to staging:', {
        name: companyData.name,
        logo: companyData.logo
          ? companyData.logo.substring(0, 50) + '...'
          : 'null',
        banner: companyData.banner
          ? companyData.banner.substring(0, 50) + '...'
          : 'null',
      });

      const response = await fetch('/api/company/staging', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyData),
      });

      if (response.ok) {
        const savedData = await response.json();
        setStagingData(savedData);
        console.log('Logo/banner saved to staging successfully');
      } else {
        console.error('Failed to save logo/banner to staging');
      }
    } catch (error) {
      console.error('Error saving logo/banner to staging:', error);
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

  // Edit mode functions
  const handleEditClick = () => {
    if (isEditMode) {
      // Cancel edit mode
      setIsEditMode(false);
      setHasChanges(false);
      if (originalCompanyData) {
        updateFieldsFromData(originalCompanyData);
      }
    } else {
      // Enter edit mode
      setIsEditMode(true);
      setOriginalCompanyData({
        name: groupedFields[0][0].value,
        registrationNumber: groupedFields[0][1].value,
        address: groupedFields[1][0].value,
        country: groupedFields[2][0].value,
        postalCode: groupedFields[2][1].value,
        email: groupedFields[3][0].value,
        contact: groupedFields[3][1].value,
      });
    }
  };

  const handleSaveClick = async () => {
    try {
      // Clear any pending auto-save
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      const companyData = {
        name: groupedFields[0][0].value,
        registrationNumber: groupedFields[0][1].value,
        address: groupedFields[1][0].value,
        country: groupedFields[2][0].value,
        postalCode: groupedFields[2][1].value,
        email: groupedFields[3][0].value,
        contact: groupedFields[3][1].value,
        logo: appliedLogoPreview,
        banner: appliedBannerPreview,
      };

      console.log('Saving company data:', {
        name: companyData.name,
        logo: companyData.logo
          ? companyData.logo.substring(0, 50) + '...'
          : 'null',
        banner: companyData.banner
          ? companyData.banner.substring(0, 50) + '...'
          : 'null',
      });

      const response = await fetch('/api/company/staging', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyData),
      });

      if (response.ok) {
        const savedData = await response.json();
        setStagingData(savedData);
        setIsEditMode(false);
        setHasChanges(false);
        setLastAutoSave(new Date());
        alert('Changes saved to staging successfully!');
      } else {
        alert('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Error saving changes');
    }
  };

  const handleFieldChange = (
    groupIndex: number,
    fieldIndex: number,
    newValue: string
  ) => {
    const newFields = [...groupedFields];
    newFields[groupIndex][fieldIndex].value = newValue;
    setGroupedFields(newFields);

    // Check if there are changes
    if (originalCompanyData) {
      const hasFieldChanges = newFields.some((group, gIndex) =>
        group.some((field, fIndex) => {
          const originalValue = getOriginalValue(gIndex, fIndex);
          return field.value !== originalValue;
        })
      );
      setHasChanges(hasFieldChanges);

      // Trigger auto-save if there are changes
      if (hasFieldChanges) {
        triggerAutoSave();
      }
    }
  };

  const getOriginalValue = (groupIndex: number, fieldIndex: number) => {
    if (!originalCompanyData) return '';

    const field = groupedFields[groupIndex][fieldIndex];
    switch (field.label) {
      case 'Company Name':
        return originalCompanyData.name || '';
      case 'Company Registration Number':
        return originalCompanyData.registrationNumber || '';
      case 'Address':
        return originalCompanyData.address || '';
      case 'Country':
        return originalCompanyData.country || '';
      case 'Postal Code':
        return originalCompanyData.postalCode || '';
      case 'Email':
        return originalCompanyData.email || '';
      case 'Contact':
        return originalCompanyData.contact || '';
      default:
        return '';
    }
  };

  const handlePreviewClick = () => {
    if (stagingData && stagingData.id) {
      alert(
        `Preview Staging Data:\n\nCompany Name: ${stagingData.name}\nRegistration: ${stagingData.registrationNumber}\nAddress: ${stagingData.address}\nCountry: ${stagingData.country}\nPostal Code: ${stagingData.postalCode}\nEmail: ${stagingData.email}\nContact: ${stagingData.contact}\n\nStatus: ${stagingData.status}`
      );
    } else {
      alert('No staging data available to preview');
    }
  };

  const handleUploadToProduction = async () => {
    if (!stagingData || !stagingData.id) {
      alert('No staging data available to upload');
      return;
    }

    try {
      const response = await fetch('/api/company/staging', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stagingId: stagingData.id,
          reviewedBy: 'admin', // This would come from user session in real app
        }),
      });

      if (response.ok) {
        const productionData = await response.json();
        setProductionData(productionData);
        alert('Successfully uploaded to production!');
        // Reload data to show production version
        loadCompanyData();
      } else {
        alert('Failed to upload to production');
      }
    } catch (error) {
      console.error('Error uploading to production:', error);
      alert('Error uploading to production');
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
              {isAutoSaving && (
                <span style={{ color: '#1976d2', marginLeft: '8px' }}>
                  • Auto-saving...
                </span>
              )}
              {lastAutoSave && !isAutoSaving && (
                <span style={{ color: '#4caf50', marginLeft: '8px' }}>
                  • Last saved: {lastAutoSave.toLocaleTimeString()}
                </span>
              )}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div title="Preview Staging Data">
                <VisibilityIcon
                  onClick={handlePreviewClick}
                  style={{
                    fontSize: responsive.isMobile ? '24px' : '28px',
                    color: '#1976d2',
                    cursor: 'pointer',
                  }}
                />
              </div>
              <div title="Upload to Production">
                <CloudUploadIcon
                  onClick={handleUploadToProduction}
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
                    onClick={
                      isEditMode
                        ? hasChanges
                          ? handleSaveClick
                          : handleEditClick
                        : handleEditClick
                    }
                    style={{
                      padding: '6px 12px',
                      backgroundColor: isEditMode
                        ? hasChanges
                          ? '#4caf50'
                          : '#ff9800'
                        : '#ffcc80',
                      color: isEditMode
                        ? hasChanges
                          ? '#fff'
                          : '#fff'
                        : '#e65100',
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
                      if (isEditMode) {
                        e.currentTarget.style.backgroundColor = hasChanges
                          ? '#45a049'
                          : '#f57c00';
                      } else {
                        e.currentTarget.style.backgroundColor = '#ffb74d';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isEditMode) {
                        e.currentTarget.style.backgroundColor = hasChanges
                          ? '#4caf50'
                          : '#ff9800';
                      } else {
                        e.currentTarget.style.backgroundColor = '#ffcc80';
                      }
                    }}
                  >
                    {isEditMode ? (
                      hasChanges ? (
                        <SaveIcon style={{ fontSize: '16px' }} />
                      ) : (
                        <CancelIcon style={{ fontSize: '16px' }} />
                      )
                    ) : (
                      '✏️'
                    )}
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
                          isEditMode={isEditMode}
                          onValueChange={(newValue) =>
                            handleFieldChange(groupIndex, fieldIndex, newValue)
                          }
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
                  <Image
                    src={
                      modalType === 'logo'
                        ? logoPreview || ''
                        : bannerPreview || ''
                    }
                    alt="Preview"
                    width={400}
                    height={300}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                    modalType === 'logo'
                      ? appliedLogoPreview
                      : appliedBannerPreview
                  ) ? (
                  <Image
                    src={
                      modalType === 'logo'
                        ? appliedLogoPreview || ''
                        : appliedBannerPreview || ''
                    }
                    alt="Current Preview"
                    width={400}
                    height={300}
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
                        ? 'No logo selected'
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
                  onFileChange={handleFileUpload}
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
                    text={`Remove New ${modalType === 'logo' ? 'Logo' : 'Banner'}`}
                    onClick={handleRemoveFile}
                    variant="danger"
                  />
                )}
                {(modalType === 'logo'
                  ? appliedLogoPreview
                  : appliedBannerPreview) && (
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

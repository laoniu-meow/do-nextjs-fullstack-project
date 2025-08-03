'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useResponsiveStyles } from '@/hooks/useResponsiveStyles';

interface ImageItem {
  filename: string;
  path: string;
  url: string;
  type: 'logo' | 'banner';
  size?: number;
  lastModified?: Date;
}

interface ImageGalleryProps {
  type: 'logo' | 'banner';
  onSelect: (image: ImageItem) => void;
  selectedImage?: ImageItem | null;
  onUpload?: (file: File) => void;
  onDelete?: (image: ImageItem) => void;
}

export default function ImageGallery({
  type,
  onSelect,
  selectedImage,
  onUpload,
  onDelete,
}: ImageGalleryProps) {
  const responsive = useResponsiveStyles();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletedImages, setDeletedImages] = useState<Set<string>>(new Set());

  const loadImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/images?type=${type}`);
      const data = await response.json();

      if (response.ok) {
        setImages(data.images || []);
      } else {
        setError(data.error || 'Failed to load images');
      }
    } catch (error) {
      console.error('Error loading images:', error);
      setError('Failed to load images');
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Unknown';
    return new Date(date).toLocaleDateString();
  };

  const filteredImages = images.filter(
    (image) =>
      image.filename.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !deletedImages.has(image.path)
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔄</div>
        <div>Loading images...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#d32f2f' }}>
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
        <div>{error}</div>
        <button
          onClick={loadImages}
          style={{
            marginTop: '12px',
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        <div style={{ fontSize: '16px', marginBottom: '8px' }}>
          No {type}s found
        </div>
        <div style={{ fontSize: '12px', marginTop: '4px' }}>
          Upload some {type}s to see them here
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Search Bar */}
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder={`Search ${type}s...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '6px 10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '13px',
          }}
        />
      </div>

      {/* Image Grid */}
      <div
        style={{
          flex: '1',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: responsive.isMobile
            ? 'repeat(3, 1fr)'
            : responsive.isTablet
              ? 'repeat(4, 1fr)'
              : 'repeat(5, 1fr)',
          gap: '8px',
          padding: '4px',
        }}
      >
        {filteredImages.map((image) => (
          <div
            key={image.path}
            style={{
              border:
                selectedImage?.path === image.path
                  ? '2px solid #1976d2'
                  : '1px solid #ddd',
              borderRadius: '6px',
              padding: '6px',
              cursor: 'pointer',
              backgroundColor:
                selectedImage?.path === image.path ? '#f3f8ff' : '#fff',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
          >
            <div
              onClick={() => onSelect(image)}
              style={{
                width: '100%',
                height: '100%',
              }}
              onMouseEnter={(e) => {
                if (selectedImage?.path !== image.path) {
                  e.currentTarget.parentElement!.style.borderColor = '#1976d2';
                  e.currentTarget.parentElement!.style.backgroundColor =
                    '#f8f9fa';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedImage?.path !== image.path) {
                  e.currentTarget.parentElement!.style.borderColor = '#ddd';
                  e.currentTarget.parentElement!.style.backgroundColor = '#fff';
                }
              }}
            >
              {/* Image Preview */}
              <div
                style={{
                  width: '100%',
                  height: responsive.isMobile ? '80px' : '90px',
                  position: 'relative',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  backgroundColor: '#f8f9fa',
                }}
              >
                <Image
                  src={image.url}
                  alt={image.filename}
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </div>

              {/* File Size Only */}
              <div
                style={{
                  fontSize: '10px',
                  color: '#666',
                  textAlign: 'center',
                  marginTop: '4px',
                }}
              >
                {formatFileSize(image.size)}
              </div>
            </div>

            {/* Trash Icon */}
            {onDelete && (
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if (
                    confirm(
                      `Are you sure you want to delete "${image.filename}"?`
                    )
                  ) {
                    try {
                      // Call the delete API
                      const response = await fetch(
                        `/api/images/delete?filename=${image.filename}&type=${type}`,
                        {
                          method: 'DELETE',
                        }
                      );

                      if (response.ok) {
                        // Immediately remove from UI
                        setDeletedImages(
                          (prev) => new Set([...prev, image.path])
                        );

                        // If this image was selected, clear the selection
                        if (selectedImage?.path === image.path) {
                          onSelect({
                            ...image,
                            filename: '',
                            path: '',
                            url: '',
                            type: 'logo',
                          });
                        }

                        // Call the parent's onDelete callback
                        onDelete(image);
                      } else {
                        const error = await response.json();
                        console.error('Failed to delete image:', error);
                        alert('Failed to delete image. Please try again.');
                      }
                    } catch (error) {
                      console.error('Error deleting image:', error);
                      alert('Error deleting image. Please try again.');
                    }
                  }
                }}
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #ddd',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: '#d32f2f',
                  transition: 'all 0.2s ease',
                  zIndex: 10,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    'rgba(255, 255, 255, 1)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                title={`Delete ${image.filename}`}
              >
                🗑️
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Results Count */}
      <div
        style={{
          marginTop: '12px',
          fontSize: '12px',
          color: '#666',
          textAlign: 'center',
        }}
      >
        {filteredImages.length} of {images.length} {type}s
      </div>
    </div>
  );
}

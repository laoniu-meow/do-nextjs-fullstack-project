import React from 'react';

// Custom icon interface
export interface CustomIconProps {
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
}

// Company Logo Icon
export const CompanyLogoIcon: React.FC<CustomIconProps> = ({
  size = 24,
  color = '#1976d2',
  className = '',
  onClick,
  disabled = false,
  title,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    onClick={disabled ? undefined : onClick}
    aria-label={title || 'Company Logo'}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick && !disabled ? 0 : undefined}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" fill={color} />
    <path
      d="M8 12h8M12 8v8"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Loading Spinner Icon
export const LoadingSpinnerIcon: React.FC<CustomIconProps> = ({
  size = 24,
  color = '#1976d2',
  className = '',
  title = 'Loading...',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`animate-spin ${className}`}
    aria-label={title}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="31.416"
      strokeDashoffset="31.416"
      className="animate-spin"
    />
  </svg>
);

// Success Check Icon
export const SuccessCheckIcon: React.FC<CustomIconProps> = ({
  size = 24,
  color = '#10b981',
  className = '',
  onClick,
  disabled = false,
  title,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    onClick={disabled ? undefined : onClick}
    aria-label={title || 'Success'}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick && !disabled ? 0 : undefined}
  >
    <circle cx="12" cy="12" r="10" fill={color} />
    <path
      d="M9 12l2 2 4-4"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Error X Icon
export const ErrorXIcon: React.FC<CustomIconProps> = ({
  size = 24,
  color = '#ef4444',
  className = '',
  onClick,
  disabled = false,
  title,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    onClick={disabled ? undefined : onClick}
    aria-label={title || 'Error'}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick && !disabled ? 0 : undefined}
  >
    <circle cx="12" cy="12" r="10" fill={color} />
    <path
      d="M15 9l-6 6M9 9l6 6"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Warning Triangle Icon
export const WarningTriangleIcon: React.FC<CustomIconProps> = ({
  size = 24,
  color = '#f59e0b',
  className = '',
  onClick,
  disabled = false,
  title,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    onClick={disabled ? undefined : onClick}
    aria-label={title || 'Warning'}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick && !disabled ? 0 : undefined}
  >
    <path d="M12 2L2 20h20L12 2z" fill={color} />
    <path
      d="M12 8v4M12 16h.01"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Info Circle Icon
export const InfoCircleIcon: React.FC<CustomIconProps> = ({
  size = 24,
  color = '#3b82f6',
  className = '',
  onClick,
  disabled = false,
  title,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    onClick={disabled ? undefined : onClick}
    aria-label={title || 'Information'}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick && !disabled ? 0 : undefined}
  >
    <circle cx="12" cy="12" r="10" fill={color} />
    <path
      d="M12 8v4M12 16h.01"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Hamburger Menu Icon
export const HamburgerMenuIcon: React.FC<CustomIconProps> = ({
  size = 24,
  color = '#374151',
  className = '',
  onClick,
  disabled = false,
  title,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    onClick={disabled ? undefined : onClick}
    aria-label={title || 'Menu'}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick && !disabled ? 0 : undefined}
  >
    <path
      d="M3 6h18M3 12h18M3 18h18"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Close X Icon
export const CloseXIcon: React.FC<CustomIconProps> = ({
  size = 24,
  color = '#374151',
  className = '',
  onClick,
  disabled = false,
  title,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    onClick={disabled ? undefined : onClick}
    aria-label={title || 'Close'}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick && !disabled ? 0 : undefined}
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Export all custom icons
export const customIcons = {
  companyLogo: CompanyLogoIcon,
  loadingSpinner: LoadingSpinnerIcon,
  successCheck: SuccessCheckIcon,
  errorX: ErrorXIcon,
  warningTriangle: WarningTriangleIcon,
  infoCircle: InfoCircleIcon,
  hamburgerMenu: HamburgerMenuIcon,
  closeX: CloseXIcon,
};

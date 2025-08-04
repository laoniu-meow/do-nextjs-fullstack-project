/**
 * Security utilities for input validation and sanitization
 */

// Allowed HTML tags for sanitization
const ALLOWED_TAGS = ['b', 'i', 'em', 'strong', 'a', 'br', 'span'] as const;
const ALLOWED_ATTRIBUTES = ['href', 'target', 'rel'] as const;

/**
 * Sanitize HTML string to prevent XSS attacks
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export const sanitizeHTML = (html: string): string => {
  if (!html || typeof html !== 'string') {
    return '';
  }

  // Remove script tags and event handlers
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '');

  // Only allow specific tags
  const tagRegex = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;
  sanitized = sanitized.replace(tagRegex, (match, slash, tagName) => {
    const lowerTagName = tagName.toLowerCase();
    if (ALLOWED_TAGS.includes(lowerTagName as any)) {
      return match;
    }
    return '';
  });

  return sanitized;
};

/**
 * Validate and sanitize color values
 * @param color - The color value to validate
 * @returns Validated color value or default
 */
export const validateColor = (color: string): string => {
  if (!color || typeof color !== 'string') {
    return '#ffffff';
  }

  // Check for valid hex color
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (hexRegex.test(color)) {
    return color.toLowerCase();
  }

  // Check for valid CSS color keywords
  const validKeywords = [
    'black', 'white', 'red', 'green', 'blue', 'yellow', 'cyan', 'magenta',
    'gray', 'grey', 'orange', 'purple', 'pink', 'brown', 'lime', 'navy',
    'teal', 'silver', 'gold', 'maroon', 'olive', 'aqua', 'fuchsia'
  ];

  if (validKeywords.includes(color.toLowerCase())) {
    return color.toLowerCase();
  }

  return '#ffffff';
};

/**
 * Validate CSS length values (rem, px, em, %)
 * @param value - The CSS length value to validate
 * @returns Validated CSS length value or default
 */
export const validateCSSLength = (value: string): string => {
  if (!value || typeof value !== 'string') {
    return '1px';
  }

  const lengthRegex = /^(\d+(?:\.\d+)?)(rem|px|em|%|vh|vw)$/;
  if (lengthRegex.test(value)) {
    return value;
  }

  return '1px';
};

/**
 * Validate and sanitize string input
 * @param input - The string input to validate
 * @param maxLength - Maximum allowed length
 * @returns Sanitized string
 */
export const validateString = (input: string, maxLength: number = 1000): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove null bytes and control characters
  let sanitized = input
    .replace(/\0/g, '')
    .replace(/[\x00-\x1F\x7F]/g, '')
    .trim();

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
};

/**
 * Validate numeric input
 * @param value - The numeric value to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Validated number or default
 */
export const validateNumber = (value: number, min: number = 0, max: number = 1000): number => {
  if (typeof value !== 'number' || isNaN(value)) {
    return min;
  }

  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
};

/**
 * Validate URL input
 * @param url - The URL to validate
 * @returns Validated URL or empty string
 */
export const validateURL = (url: string): string => {
  if (!url || typeof url !== 'string') {
    return '';
  }

  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
      return url;
    }
  } catch {
    // Invalid URL
  }

  return '';
};

/**
 * Escape HTML entities to prevent XSS
 * @param text - The text to escape
 * @returns Escaped text
 */
export const escapeHTML = (text: string): string => {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validate file upload
 * @param file - The file object to validate
 * @param allowedTypes - Array of allowed MIME types
 * @param maxSize - Maximum file size in bytes
 * @returns Validation result
 */
export const validateFileUpload = (
  file: File,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif'],
  maxSize: number = 5 * 1024 * 1024 // 5MB
): { isValid: boolean; error?: string } => {
  if (!file || !(file instanceof File)) {
    return { isValid: false, error: 'Invalid file' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'File type not allowed' };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: 'File too large' };
  }

  return { isValid: true };
}; 
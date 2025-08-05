'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface UsePagePersistenceOptions {
  storageKey?: string;
  defaultPath?: string;
  enabled?: boolean;
  includeTabState?: boolean;
}

export function usePagePersistence(options: UsePagePersistenceOptions = {}) {
  const {
    storageKey = 'admin-current-page',
    defaultPath = '/admin',
    enabled = true,
    includeTabState = false,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const [isInitialized, setIsInitialized] = useState(false);

  // Save current page to localStorage
  const saveCurrentPage = useCallback((path: string, tabState?: string) => {
    if (typeof window !== 'undefined' && enabled) {
      try {
        const pageData = {
          path,
          tab: tabState || null,
          timestamp: Date.now(),
        };
        localStorage.setItem(storageKey, JSON.stringify(pageData));
      } catch (error) {
        // Handle localStorage errors (e.g., private browsing mode)
        // console.warn('Failed to save page to localStorage:', error);
      }
    }
  }, [storageKey, enabled]);

  // Get saved page from localStorage
  const getSavedPage = useCallback((): { path: string; tab: string | null } | null => {
    if (typeof window !== 'undefined' && enabled) {
      try {
        const saved = localStorage.getItem(storageKey);
        if (!saved) return null;
        
        // Try to parse as JSON (new format)
        try {
          const parsed = JSON.parse(saved);
          return {
            path: parsed.path,
            tab: parsed.tab || null,
          };
        } catch {
          // Fallback for old format (just string)
          return {
            path: saved,
            tab: null,
          };
        }
      } catch (error) {
        // console.warn('Failed to get page from localStorage:', error);
        return null;
      }
    }
    return null;
  }, [storageKey, enabled]);

  // Clear saved page (for logout)
  const clearSavedPage = useCallback(() => {
    if (typeof window !== 'undefined' && enabled) {
      try {
        localStorage.removeItem(storageKey);
      } catch (error) {
        // console.warn('Failed to clear page from localStorage:', error);
      }
    }
  }, [storageKey, enabled]);

  // Navigate to a page and save it
  const navigateToPage = useCallback((path: string, tabState?: string) => {
    saveCurrentPage(path, tabState);
    router.push(path);
  }, [saveCurrentPage, router]);

  // Initialize page persistence on mount
  useEffect(() => {
    if (!enabled || isInitialized) return;

    const savedPage = getSavedPage();
    
    // If we're on the default page and have a saved page, redirect to it
    if (pathname === defaultPath && savedPage && savedPage.path !== defaultPath) {
      router.push(savedPage.path);
    } else if (pathname !== defaultPath) {
      // Save the current page if it's not the default
      saveCurrentPage(pathname);
    }

    setIsInitialized(true);
  }, [pathname, defaultPath, enabled, isInitialized, router, getSavedPage, saveCurrentPage]);

  // Save current page whenever pathname changes
  useEffect(() => {
    if (enabled && isInitialized && pathname !== defaultPath) {
      saveCurrentPage(pathname);
    }
  }, [pathname, defaultPath, enabled, isInitialized, saveCurrentPage]);

  // Save tab state for current page
  const saveTabState = useCallback((tabState: string) => {
    if (enabled && isInitialized && pathname !== defaultPath) {
      saveCurrentPage(pathname, tabState);
    }
  }, [enabled, isInitialized, pathname, defaultPath, saveCurrentPage]);

  // Get saved tab state for current page
  const getSavedTabState = useCallback((): string | null => {
    const savedPage = getSavedPage();
    if (savedPage && savedPage.path === pathname) {
      return savedPage.tab;
    }
    return null;
  }, [getSavedPage, pathname]);

  return {
    navigateToPage,
    clearSavedPage,
    getSavedPage,
    saveTabState,
    getSavedTabState,
    isInitialized,
  };
} 
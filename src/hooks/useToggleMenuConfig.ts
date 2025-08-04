import { useState, useEffect } from 'react';
import { ToggleMenuButtonConfig, defaultToggleMenuConfig } from '@/types/toggleMenuConfig';

export const useToggleMenuConfig = () => {
  const [config, setConfig] = useState<ToggleMenuButtonConfig>(defaultToggleMenuConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/toggle-menu/config');
      const data = await response.json();
      
      if (data.success && data.config) {
        setConfig(data.config);
      } else {
        console.warn('No toggle menu configuration found, using defaults');
        setConfig(defaultToggleMenuConfig);
      }
    } catch (err) {
      console.error('Error fetching toggle menu configuration:', err);
      setError('Failed to load toggle menu configuration');
      setConfig(defaultToggleMenuConfig);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return {
    config,
    isLoading,
    error,
    refetch: fetchConfig,
  };
}; 
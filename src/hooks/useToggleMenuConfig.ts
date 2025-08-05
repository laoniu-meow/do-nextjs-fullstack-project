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
        setConfig(defaultToggleMenuConfig);
      }
    } catch (err) {
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
// API utility functions to reduce duplication and improve error handling

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic API call function
export const apiCall = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || `HTTP ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      0
    );
  }
};

// Specific API functions
export const api = {
  // Company data
  getCompanyData: () => apiCall('/api/company'),
  getCompanyStaging: () => apiCall('/api/company/staging'),
  saveCompanyStaging: (data: any) =>
    apiCall('/api/company/staging', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  uploadCompanyToProduction: (stagingId: string) =>
    apiCall('/api/company/staging', {
      method: 'PUT',
      body: JSON.stringify({
        stagingId,
        reviewedBy: 'admin',
      }),
    }),

  // Header data
  getHeaderData: () => apiCall('/api/header'),
  getHeaderStaging: () => apiCall('/api/header/staging'),
  saveHeaderStaging: (data: any) =>
    apiCall('/api/header/staging', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  uploadHeaderToProduction: (stagingId: string) =>
    apiCall('/api/header/staging', {
      method: 'PUT',
      body: JSON.stringify({
        stagingId,
        reviewedBy: 'admin',
      }),
    }),

  // Company logo
  getCompanyLogo: () => apiCall('/api/company/logo'),

  // File upload
  uploadFile: (formData: FormData) =>
    apiCall('/api/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set content-type for FormData
    }),

  // Images
  getImages: (type: string) => apiCall(`/api/images?type=${type}`),
  deleteImage: (path: string) =>
    apiCall('/api/images/delete', {
      method: 'DELETE',
      body: JSON.stringify({ path }),
    }),
};

// Error handling utility
export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Loading state management
export const createLoadingState = () => {
  let loadingCount = 0;
  
  return {
    start: () => {
      loadingCount++;
      return () => {
        loadingCount--;
      };
    },
    isLoading: () => loadingCount > 0,
  };
}; 
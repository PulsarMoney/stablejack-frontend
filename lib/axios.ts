import axios from "axios";

/**
 * Configured Axios instance for API calls
 * Base URL is set from environment variables
 * Authorization header is managed by AuthProvider
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout
});

/**
 * Request interceptor
 * Can be used to add additional headers or logging
 */
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Response interceptor
 * Handles common error cases
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common HTTP errors silently in production
    // Error state is managed by React Query
    return Promise.reject(error);
  },
);

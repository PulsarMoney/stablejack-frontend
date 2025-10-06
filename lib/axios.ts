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
    // Log requests in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handles common error cases and logging
 */
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`
      );
    }

    return response;
  },
  (error) => {
    // Handle common HTTP errors
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          console.error("[API] Unauthorized - Invalid or expired token");
          // Could trigger logout here if needed
          break;
        case 403:
          console.error("[API] Forbidden - Insufficient permissions");
          break;
        case 404:
          console.error("[API] Not found");
          break;
        case 500:
          console.error("[API] Server error");
          break;
        default:
          console.error(`[API] Error ${status}:`, data);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("[API] No response received from server");
    } else {
      // Error in request configuration
      console.error("[API] Request error:", error.message);
    }

    return Promise.reject(error);
  }
);

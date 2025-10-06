import { QueryClient } from "@tanstack/react-query";

/**
 * React Query client configuration
 * Provides default options for all queries and mutations
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 30 seconds
      staleTime: 30 * 1000,

      // Cache data for 5 minutes
      gcTime: 5 * 60 * 1000,

      // Retry failed requests up to 3 times
      retry: 3,

      // Retry with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Don't refetch on window focus in development (can be annoying)
      refetchOnWindowFocus: process.env.NODE_ENV === "production",

      // Refetch on mount if data is stale
      refetchOnMount: true,

      // Don't refetch on reconnect (network comes back online)
      refetchOnReconnect: false,
    },
    mutations: {
      // Retry mutations once
      retry: 1,

      // Shorter retry delay for mutations
      retryDelay: 1000,
    },
  },
});

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { Market, ApiResponse } from "@/types/api";

/**
 * Fetch all markets data
 */
async function fetchMarkets(): Promise<Market[]> {
  const response = await apiClient.get<ApiResponse<Market[]>>("/markets");

  return response.data.data;
}

/**
 * Hook to fetch markets data
 * Example usage of React Query with Axios
 *
 * @example
 * ```tsx
 * function MarketsPage() {
 *   const { data: markets, isLoading, error } = useMarkets();
 *
 *   if (isLoading) return <Spinner />;
 *   if (error) return <ErrorMessage error={error} />;
 *
 *   return (
 *     <div>
 *       {markets?.map((market) => (
 *         <MarketCard key={market.id} market={market} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useMarkets() {
  return useQuery({
    queryKey: ["markets"],
    queryFn: fetchMarkets,
    // Optional: customize query options
    staleTime: 60 * 1000, // Data considered fresh for 1 minute
    // Refetch every 30 seconds when window is focused
    refetchInterval: 30 * 1000,
  });
}

/**
 * Fetch single market by ID
 */
async function fetchMarket(id: string): Promise<Market> {
  const response = await apiClient.get<ApiResponse<Market>>(`/markets/${id}`);

  return response.data.data;
}

/**
 * Hook to fetch a single market
 */
export function useMarket(id: string) {
  return useQuery({
    queryKey: ["market", id],
    queryFn: () => fetchMarket(id),
    enabled: !!id, // Only run if ID is provided
  });
}

/**
 * Fetch user's portfolio (requires authentication)
 */
async function fetchUserPortfolio(): Promise<any> {
  const response = await apiClient.get<ApiResponse<any>>("/user/portfolio");

  return response.data.data;
}

/**
 * Hook to fetch user portfolio (authenticated)
 * Will automatically include Bearer token from AuthProvider
 */
export function useUserPortfolio() {
  return useQuery({
    queryKey: ["user", "portfolio"],
    queryFn: fetchUserPortfolio,
    // This will be automatically refetched when user logs in/out
    // thanks to the AuthProvider invalidating queries
  });
}

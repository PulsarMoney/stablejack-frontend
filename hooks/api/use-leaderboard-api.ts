import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type {
  LeaderboardFilters,
  PublicLeaderboardEntry,
  TradingLeaderboardEntry,
  UserRank,
} from "@/types/leaderboard";

export const useGetTradingLeaderboard = (filters?: LeaderboardFilters) => {
  return useQuery({
    queryKey: ["leaderboard", "trading", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.timeRange) params.append("timeRange", filters.timeRange);
      if (filters?.limit) params.append("limit", filters.limit.toString());

      const response = await apiClient.get<
        ApiResponse<{ leaderboard: TradingLeaderboardEntry[] }>
      >(`/api/leaderboard/trading?${params.toString()}`);

      return response.data.data.leaderboard;
    },
  });
};

export const useGetPublicLeaderboard = (filters?: LeaderboardFilters) => {
  return useQuery({
    queryKey: ["leaderboard", "public", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.limit) params.append("limit", filters.limit.toString());

      const response = await apiClient.get<
        ApiResponse<{ leaderboard: PublicLeaderboardEntry[] }>
      >(`/api/leaderboard/public?${params.toString()}`);

      return response.data.data.leaderboard;
    },
  });
};

export const useGetUserRank = () => {
  return useQuery({
    queryKey: ["leaderboard", "user-rank"],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<UserRank>>(
        "/api/leaderboard/user-rank"
      );

      return response.data.data;
    },
  });
};

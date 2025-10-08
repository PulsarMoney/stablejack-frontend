import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";
import {
  mockPublicLeaderboard,
  mockTradingLeaderboard,
  mockUserRank,
  simulateApiDelay,
} from "@/lib/mock-data";
import type { ApiResponse } from "@/types/api";
import type {
  LeaderboardFilters,
  PublicLeaderboardEntry,
  TradingLeaderboardEntry,
  UserRank,
} from "@/types/leaderboard";

const USE_MOCK_DATA =
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" || false;

export const useGetTradingLeaderboard = (filters?: LeaderboardFilters) => {
  return useQuery({
    queryKey: ["leaderboard", "trading", filters],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await simulateApiDelay();

        // Apply limit filter if provided
        const limit = filters?.limit || mockTradingLeaderboard.length;

        return mockTradingLeaderboard.slice(0, limit);
      }

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
      if (USE_MOCK_DATA) {
        await simulateApiDelay();

        // Apply limit filter if provided
        const limit = filters?.limit || mockPublicLeaderboard.length;

        return mockPublicLeaderboard.slice(0, limit);
      }

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
      if (USE_MOCK_DATA) {
        await simulateApiDelay();

        return mockUserRank;
      }

      const response = await apiClient.get<ApiResponse<UserRank>>(
        "/api/leaderboard/user-rank"
      );

      return response.data.data;
    },
  });
};

import type { ApiResponse } from "@/types/api";
import type {
  LeaderboardFilters,
  PublicLeaderboardEntry,
  TradingLeaderboardEntry,
  UserRank,
  BackendVolumeLeaderboardResponse,
  BackendXpLeaderboardResponse,
} from "@/types/leaderboard";

import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";
import {
  transformVolumeLeaderboard,
  transformXpLeaderboard,
} from "@/lib/transform-leaderboard-data";
import { useAuth } from "@/hooks/useAuth";

export const useGetTradingLeaderboard = (filters?: LeaderboardFilters) => {
  const { address } = useAuth(); // Get user's wallet address from Privy

  return useQuery({
    queryKey: ["leaderboard", "trading", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      // Map frontend timeRange to backend period parameter
      const period = filters?.timeRange || "all-time";
      params.append("period", period);

      if (filters?.limit) params.append("limit", filters.limit.toString());
      if (filters?.page) params.append("page", filters.page.toString());

      const response = await apiClient.get<
        ApiResponse<BackendVolumeLeaderboardResponse>
      >(`/api/leaderboard/volume?${params.toString()}`);

      const { leaderboard, pagination } = response.data.data;

      // Calculate starting rank based on pagination
      const startRank = (pagination.page - 1) * pagination.limit + 1;

      // Find current user by matching wallet address in the leaderboard data
      const currentUserEntry = leaderboard.find(
        (entry: any) => entry.address?.toLowerCase() === address?.toLowerCase()
      );
      const currentUserId = currentUserEntry?.userId;

      return {
        data: transformVolumeLeaderboard(leaderboard, currentUserId, startRank),
        pagination,
      };
    },
  });
};

export const useGetPublicLeaderboard = (filters?: LeaderboardFilters) => {
  const { address } = useAuth(); // Get user's wallet address from Privy

  return useQuery({
    queryKey: ["leaderboard", "public", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.limit) params.append("limit", filters.limit.toString());
      if (filters?.page) params.append("page", filters.page.toString());

      const response = await apiClient.get<
        ApiResponse<BackendXpLeaderboardResponse>
      >(`/api/leaderboard/xp?${params.toString()}`);

      const { leaderboard, count } = response.data.data;

      // Calculate starting rank based on pagination
      const page = filters?.page || 1;
      const limit = filters?.limit || 20;
      const startRank = (page - 1) * limit + 1;

      // Find current user by matching wallet address in the leaderboard data
      const currentUserEntry = leaderboard.find(
        (entry: any) => entry.address?.toLowerCase() === address?.toLowerCase()
      );
      const currentUserId = currentUserEntry?.userId;

      // Calculate pagination metadata
      const totalPages = Math.ceil(count / limit);
      const pagination = {
        page,
        limit,
        totalItems: count,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      };

      return {
        data: transformXpLeaderboard(leaderboard, currentUserId, startRank),
        pagination,
      };
    },
  });
};

export const useGetUserRank = () => {
  return useQuery({
    queryKey: ["leaderboard", "user-rank"],
    queryFn: async () => {
      // Use /api/referral/me which has all the user's leaderboard data
      const response = await apiClient.get<ApiResponse<any>>("/api/referral/me");

      const leaderboardData = response.data.data.leaderboard;

      const userRank: UserRank = {
        publicRank: parseInt(leaderboardData.xp.place),
        totalXP: parseFloat(leaderboardData.xp.xp),
        level: leaderboardData.xp.level,
        tradingXPBreakdown: 0, // Not provided by /me endpoint
        referralXPBreakdown: 0, // Not provided by /me endpoint
        achievementXPBreakdown: 0, // Not provided by /me endpoint
        tradingRank: leaderboardData.volume.place,
        tradingVolume: parseFloat(leaderboardData.volume.volume),
      };

      return userRank;
    },
  });
};

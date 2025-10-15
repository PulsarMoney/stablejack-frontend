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
  const { user } = useAuth();
  const currentUserId = user?.id;

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

      return {
        data: transformVolumeLeaderboard(leaderboard, currentUserId, startRank),
        pagination,
      };
    },
  });
};

export const useGetPublicLeaderboard = (filters?: LeaderboardFilters) => {
  const { user } = useAuth();
  const currentUserId = user?.id;

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
  const { user } = useAuth();
  const currentUserId = user?.id;

  return useQuery({
    queryKey: ["leaderboard", "user-rank", currentUserId],
    queryFn: async () => {
      if (!currentUserId) {
        throw new Error("User not authenticated");
      }

      // Fetch both leaderboards to calculate user's rank (max 100 per request)
      const [xpResponse, volumeResponse] = await Promise.all([
        apiClient.get<ApiResponse<BackendXpLeaderboardResponse>>(
          "/api/leaderboard/xp?page=1&limit=100",
        ),
        apiClient.get<ApiResponse<BackendVolumeLeaderboardResponse>>(
          "/api/leaderboard/volume?period=all-time&page=1&limit=100",
        ),
      ]);

      const xpLeaderboard = xpResponse.data.data.leaderboard;
      const volumeLeaderboard = volumeResponse.data.data.leaderboard;

      // Find user's position in both leaderboards
      const xpIndex = xpLeaderboard.findIndex(
        (entry) => entry.userId === currentUserId,
      );
      const volumeIndex = volumeLeaderboard.findIndex(
        (entry) => entry.userId === currentUserId,
      );

      const userXpEntry = xpLeaderboard[xpIndex];
      const userVolumeEntry = volumeLeaderboard[volumeIndex];

      const userRank: UserRank = {
        publicRank: userXpEntry?.rank || (xpIndex >= 0 ? xpIndex + 1 : -1),
        totalXP: userXpEntry ? parseFloat(userXpEntry.totalXp) : 0,
        level: userXpEntry?.level || 1,
        tradingXPBreakdown: userXpEntry
          ? parseFloat(userXpEntry.tradingXp)
          : 0,
        referralXPBreakdown: userXpEntry
          ? parseFloat(userXpEntry.referralXp)
          : 0,
        achievementXPBreakdown: userXpEntry
          ? parseFloat(userXpEntry.taskXp) + parseFloat(userXpEntry.bonusXp)
          : 0,
        tradingRank: volumeIndex >= 0 ? volumeIndex + 1 : -1,
        tradingVolume: userVolumeEntry?.totalVolume || 0,
      };

      return userRank;
    },
    enabled: !!currentUserId,
  });
};

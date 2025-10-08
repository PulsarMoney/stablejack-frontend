import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";
import {
  getAchievementById,
  getAchievementsByCategory,
  getAchievementsByStatus,
  mockAchievementStats,
  simulateApiDelay,
} from "@/lib/mock-data";
import type { ApiResponse } from "@/types/api";
import type { Achievement, AchievementFilters } from "@/types/achievement";

const USE_MOCK_DATA =
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" || false;

export const useGetAchievements = (filters?: AchievementFilters) => {
  return useQuery({
    queryKey: ["achievements", filters],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await simulateApiDelay();

        let achievements = getAchievementsByStatus("all");

        // Apply status filter
        if (filters?.status && filters.status !== "all") {
          achievements = getAchievementsByStatus(filters.status);
        }

        // Apply category filter
        if (filters?.category && filters.category !== "all") {
          achievements = achievements.filter(
            (a) => a.category === filters.category
          );
        }

        return achievements;
      }

      const params = new URLSearchParams();

      if (filters?.status && filters.status !== "all") {
        params.append("status", filters.status);
      }
      if (filters?.category) {
        params.append("category", filters.category);
      }

      const response = await apiClient.get<
        ApiResponse<{ achievements: Achievement[] }>
      >(`/api/achievements?${params.toString()}`);

      return response.data.data.achievements;
    },
  });
};

export const useGetAchievementProgress = (achievementId: string) => {
  return useQuery({
    queryKey: ["achievement", "progress", achievementId],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await simulateApiDelay();

        const achievement = getAchievementById(achievementId);

        if (!achievement) {
          throw new Error(`Achievement ${achievementId} not found`);
        }

        return achievement;
      }

      const response = await apiClient.get<ApiResponse<Achievement>>(
        `/api/achievements/${achievementId}/progress`
      );

      return response.data.data;
    },
    enabled: !!achievementId,
  });
};

export const useGetAchievementStats = () => {
  return useQuery({
    queryKey: ["achievements", "stats"],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await simulateApiDelay();

        return mockAchievementStats;
      }

      const response = await apiClient.get<
        ApiResponse<{
          totalCompleted: number;
          totalXPEarned: number;
          completionRate: number;
        }>
      >("/api/achievements/stats");

      return response.data.data;
    },
  });
};

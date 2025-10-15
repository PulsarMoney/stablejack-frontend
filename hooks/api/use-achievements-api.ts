import type { ApiResponse } from "@/types/api";
import type {
  AchievementFilters,
  BackendAchievementsResponse,
} from "@/types/achievement";

import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";
import {
  filterAchievements,
  transformBackendAchievements,
} from "@/lib/transform-achievement-data";

export const useGetAchievements = (filters?: AchievementFilters) => {
  return useQuery({
    queryKey: ["achievements", filters],
    queryFn: async () => {
      // Fetch all achievements from backend
      const response = await apiClient.get<
        ApiResponse<BackendAchievementsResponse>
      >("/api/achievements/me");

      // Transform backend data to frontend format
      const achievements = transformBackendAchievements(response.data.data);

      // Apply frontend filters
      return filterAchievements(achievements, filters);
    },
  });
};

// Removed: useGetAchievementProgress - progress is included in main response

export const useGetAchievementStats = () => {
  return useQuery({
    queryKey: ["achievements", "stats"],
    queryFn: async () => {
      // Fetch achievements data
      const response = await apiClient.get<
        ApiResponse<BackendAchievementsResponse>
      >("/api/achievements/me");

      // Transform achievements
      const achievements = transformBackendAchievements(response.data.data);

      // Calculate and return stats
      const { calculateAchievementStats } = await import(
        "@/lib/transform-achievement-data"
      );

      return calculateAchievementStats(
        achievements,
        response.data.data.summary,
        response.data.data.totalXp,
        response.data.data.currentLevel,
      );
    },
  });
};

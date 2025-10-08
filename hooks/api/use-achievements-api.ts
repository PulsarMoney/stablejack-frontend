import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type { Achievement, AchievementFilters } from "@/types/achievement";

export const useGetAchievements = (filters?: AchievementFilters) => {
  return useQuery({
    queryKey: ["achievements", filters],
    queryFn: async () => {
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

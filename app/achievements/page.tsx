"use client";

import type { AchievementFilters } from "@/types/achievement";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AchievementCard } from "./components/achievement-card";
import { AchievementFiltersComponent } from "./components/achievement-filters";
import { AchievementStatsCard } from "./components/achievement-stats-card";

import {
  useGetAchievements,
  useGetAchievementStats,
} from "@/hooks/api/use-achievements-api";
import { useAuth } from "@/hooks/useAuth";

export default function AchievementsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [filters, setFilters] = useState<AchievementFilters>({
    status: "all",
  });

  const { data: achievements, isLoading: achievementsLoading } =
    useGetAchievements(filters);
  const { data: stats, isLoading: statsLoading } = useGetAchievementStats();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || achievementsLoading || statsLoading) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy mx-auto" />
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-burgundy mb-2">Achievements</h1>
        <p className="text-stable-gray">
          Complete tasks and milestones to earn XP rewards
        </p>
      </div>

      <div className="space-y-6">
        {/* Stats Card */}
        {stats && (
          <AchievementStatsCard
            completionRate={stats.completionRate}
            totalCompleted={stats.totalCompleted}
            totalXPEarned={stats.totalXPEarned}
          />
        )}

        {/* Filters */}
        <AchievementFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Achievements Grid */}
        {achievements && achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-burgundy mb-2">
              No Achievements Found
            </h3>
            <p className="text-stable-gray">
              {filters.status === "completed"
                ? "You haven't completed any achievements yet"
                : filters.status === "in-progress"
                  ? "No achievements in progress"
                  : "Start trading to unlock achievements"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

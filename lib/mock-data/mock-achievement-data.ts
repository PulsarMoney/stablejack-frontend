import type {
  Achievement,
  AchievementCategory,
  AchievementStats,
  AchievementStatus,
} from "@/types/achievement";

/**
 * Mock data for achievement system
 * Used when USE_MOCK_DATA=true
 */

export const mockAchievements: Achievement[] = [
  // Completed Achievements
  {
    id: "ach-001",
    title: "First Trade",
    description: "Complete your first trade on Stable Jack",
    category: "trade-count",
    xpReward: 100,
    status: "completed",
    completedAt: "2024-01-15T10:30:00Z",
    icon: "🎯",
  },
  {
    id: "ach-002",
    title: "Volume Starter",
    description: "Trade $1,000 in total volume",
    category: "volume-milestone",
    xpReward: 200,
    status: "completed",
    completedAt: "2024-01-18T14:20:00Z",
    icon: "💰",
  },
  {
    id: "ach-003",
    title: "Daily Trader",
    description: "Trade for 3 consecutive days",
    category: "daily-streak",
    xpReward: 150,
    status: "completed",
    completedAt: "2024-01-20T09:15:00Z",
    icon: "📅",
  },
  {
    id: "ach-004",
    title: "Referral Champion",
    description: "Refer your first trader",
    category: "referral",
    xpReward: 250,
    status: "completed",
    completedAt: "2024-02-01T16:45:00Z",
    icon: "👥",
  },
  {
    id: "ach-005",
    title: "Early Bird",
    description: "Complete within first month of launch",
    category: "time-bound",
    xpReward: 500,
    status: "completed",
    completedAt: "2024-02-10T11:30:00Z",
    icon: "🐦",
  },

  // In Progress Achievements
  {
    id: "ach-006",
    title: "Volume Expert",
    description: "Trade $100,000 in total volume",
    category: "volume-milestone",
    xpReward: 1000,
    status: "in-progress",
    progress: {
      current: 65000,
      target: 100000,
    },
    icon: "💎",
  },
  {
    id: "ach-007",
    title: "Week Warrior",
    description: "Trade for 7 consecutive days",
    category: "daily-streak",
    xpReward: 300,
    status: "in-progress",
    progress: {
      current: 5,
      target: 7,
    },
    icon: "⚔️",
  },
  {
    id: "ach-008",
    title: "Trade Master",
    description: "Complete 100 total trades",
    category: "trade-count",
    xpReward: 500,
    status: "in-progress",
    progress: {
      current: 73,
      target: 100,
    },
    icon: "🏆",
  },
  {
    id: "ach-009",
    title: "Winning Streak",
    description: "Win 5 trades in a row",
    category: "winning-streak",
    xpReward: 400,
    status: "in-progress",
    progress: {
      current: 3,
      target: 5,
    },
    icon: "🔥",
  },
  {
    id: "ach-010",
    title: "Referral Network",
    description: "Refer 10 active traders",
    category: "referral",
    xpReward: 1500,
    status: "in-progress",
    progress: {
      current: 6,
      target: 10,
    },
    icon: "🌐",
  },

  // Locked Achievements
  {
    id: "ach-011",
    title: "Volume Legend",
    description: "Trade $1,000,000 in total volume",
    category: "volume-milestone",
    xpReward: 5000,
    status: "locked",
    progress: {
      current: 65000,
      target: 1000000,
    },
    icon: "👑",
  },
  {
    id: "ach-012",
    title: "Monthly Dedication",
    description: "Trade for 30 consecutive days",
    category: "daily-streak",
    xpReward: 1000,
    status: "locked",
    progress: {
      current: 5,
      target: 30,
    },
    icon: "📆",
  },
  {
    id: "ach-013",
    title: "Trade Veteran",
    description: "Complete 1,000 total trades",
    category: "trade-count",
    xpReward: 3000,
    status: "locked",
    progress: {
      current: 73,
      target: 1000,
    },
    icon: "🎖️",
  },
  {
    id: "ach-014",
    title: "Perfect Week",
    description: "Win 10 trades in a row",
    category: "winning-streak",
    xpReward: 2000,
    status: "locked",
    progress: {
      current: 3,
      target: 10,
    },
    icon: "✨",
  },
  {
    id: "ach-015",
    title: "Referral Empire",
    description: "Refer 50 active traders",
    category: "referral",
    xpReward: 10000,
    status: "locked",
    progress: {
      current: 6,
      target: 50,
    },
    icon: "🏛️",
  },
  {
    id: "ach-016",
    title: "Volume Whale",
    description: "Trade $10,000,000 in total volume",
    category: "volume-milestone",
    xpReward: 25000,
    status: "locked",
    progress: {
      current: 65000,
      target: 10000000,
    },
    icon: "🐋",
  },
];

export const mockAchievementStats: AchievementStats = {
  totalCompleted: 5,
  totalInProgress: 5,
  totalLocked: 6,
  totalXpEarned: 1200,
  completionRate: 31.25, // 5 out of 16 total
};

// Helper functions for filtering
export const getAchievementsByStatus = (
  status: AchievementStatus | "all",
): Achievement[] => {
  if (status === "all") return mockAchievements;

  return mockAchievements.filter((a) => a.status === status);
};

export const getAchievementsByCategory = (
  category: AchievementCategory | "all",
): Achievement[] => {
  if (category === "all") return mockAchievements;

  return mockAchievements.filter((a) => a.category === category);
};

export const getAchievementById = (id: string): Achievement | undefined => {
  return mockAchievements.find((a) => a.id === id);
};

// Helper function to simulate API delay
export const simulateApiDelay = (ms: number = 500): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

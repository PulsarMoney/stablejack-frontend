export interface TradingLeaderboardEntry {
  rank: number;
  userId: string;
  email?: string;
  walletAddress: string;
  volume: number;
  dailyVolume?: number;
  weeklyVolume?: number;
  monthlyVolume?: number;
  xp: number;
  isCurrentUser?: boolean;
}

export type TimeRange = "daily" | "weekly" | "monthly" | "all-time";

export interface PublicLeaderboardEntry {
  rank: number;
  userId: string;
  email?: string;
  walletAddress: string;
  totalXP: number;
  tradingXP: number;
  referralXP: number;
  achievementXP: number;
  isCurrentUser?: boolean;
}

export interface LeaderboardFilters {
  timeRange?: "daily" | "weekly" | "monthly" | "all-time";
  limit?: number;
}

export interface UserRank {
  tradingRank: number;
  tradingVolume: number;
  tradingXP: number;
  publicRank: number;
  totalXP: number;
  tradingXPBreakdown: number;
  referralXPBreakdown: number;
  achievementXPBreakdown: number;
}

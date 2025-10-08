export interface TradingLeaderboardEntry {
  rank: number;
  userId: string;
  email?: string;
  walletAddress: string;
  volume: number;
  xp: number;
  isCurrentUser?: boolean;
}

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
  tradingXP: number;
  publicRank: number;
  publicXP: number;
}

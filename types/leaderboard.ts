// Backend response types
export interface BackendVolumeLeaderboardEntry {
  userId: string;
  username?: string; // Email/username if available
  address?: string; // Wallet address if available
  totalVolume: number;
  fillCount: number;
  realizedPnl: number;
  totalReferralVolume: number;
  totalCommissionEarned: number;
}

export interface BackendXpLeaderboardEntry {
  userId: string;
  totalXp: string;
  level: number;
  rank: number;
  tradingXp: string;
  referralXp: string;
  taskXp: string;
  bonusXp: string;
  username: string;
  address: string;
}

export interface BackendVolumeLeaderboardResponse {
  leaderboard: BackendVolumeLeaderboardEntry[];
  period: "day" | "week" | "month" | "all-time" | { custom: { startDate: string; endDate: string } };
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface BackendXpLeaderboardResponse {
  leaderboard: BackendXpLeaderboardEntry[];
  count: number;
}

// Frontend types
export interface TradingLeaderboardEntry {
  rank: number;
  userId: string;
  email?: string;
  walletAddress: string;
  volume: number;
  fillCount: number;
  realizedPnl: number;
  referralVolume: number;
  commissionEarned: number;
  isCurrentUser?: boolean;
}

export type TimeRange = "day" | "week" | "month" | "all-time";

export interface PublicLeaderboardEntry {
  rank: number;
  userId: string;
  email?: string;
  walletAddress: string;
  totalXP: number;
  level: number;
  tradingXP: number;
  referralXP: number;
  achievementXP: number;
  isCurrentUser?: boolean;
}

export interface LeaderboardFilters {
  timeRange?: TimeRange;
  limit?: number;
  page?: number;
}

export interface UserRank {
  tradingRank: number;
  tradingVolume: number;
  publicRank: number;
  totalXP: number;
  level: number;
  tradingXPBreakdown: number;
  referralXPBreakdown: number;
  achievementXPBreakdown: number;
}

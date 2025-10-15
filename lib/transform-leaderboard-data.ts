import type {
  BackendVolumeLeaderboardEntry,
  BackendXpLeaderboardEntry,
  TradingLeaderboardEntry,
  PublicLeaderboardEntry,
} from "@/types/leaderboard";

/**
 * Generate display address from userId
 * Format: first8...last6 characters
 */
export function generateDisplayAddress(userId: string): string {
  if (userId.length <= 14) return userId;

  return `${userId.slice(0, 8)}...${userId.slice(-6)}`;
}

/**
 * Transform backend volume leaderboard entry to frontend format
 */
export function transformVolumeEntry(
  entry: BackendVolumeLeaderboardEntry,
  rank: number,
  currentUserId?: string,
): TradingLeaderboardEntry {
  return {
    rank,
    userId: entry.userId,
    walletAddress: generateDisplayAddress(entry.userId),
    volume: entry.totalVolume,
    fillCount: entry.fillCount,
    realizedPnl: entry.realizedPnl,
    referralVolume: entry.totalReferralVolume,
    commissionEarned: entry.totalCommissionEarned,
    isCurrentUser: currentUserId ? entry.userId === currentUserId : false,
  };
}

/**
 * Transform backend XP leaderboard entry to frontend format
 */
export function transformXpEntry(
  entry: BackendXpLeaderboardEntry,
  rank: number,
  currentUserId?: string,
): PublicLeaderboardEntry {
  return {
    rank: entry.rank || rank,
    userId: entry.userId,
    email: entry.username || undefined,
    walletAddress: entry.address || generateDisplayAddress(entry.userId),
    totalXP: parseFloat(entry.totalXp),
    level: entry.level,
    tradingXP: parseFloat(entry.tradingXp),
    referralXP: parseFloat(entry.referralXp),
    achievementXP: parseFloat(entry.taskXp) + parseFloat(entry.bonusXp),
    isCurrentUser: currentUserId ? entry.userId === currentUserId : false,
  };
}

/**
 * Transform backend volume leaderboard array to frontend format
 */
export function transformVolumeLeaderboard(
  entries: BackendVolumeLeaderboardEntry[],
  currentUserId?: string,
  startRank: number = 1,
): TradingLeaderboardEntry[] {
  return entries.map((entry, index) =>
    transformVolumeEntry(entry, startRank + index, currentUserId),
  );
}

/**
 * Transform backend XP leaderboard array to frontend format
 */
export function transformXpLeaderboard(
  entries: BackendXpLeaderboardEntry[],
  currentUserId?: string,
  startRank: number = 1,
): PublicLeaderboardEntry[] {
  return entries.map((entry, index) =>
    transformXpEntry(entry, startRank + index, currentUserId),
  );
}

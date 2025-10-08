/**
 * Mock data exports
 * Used when USE_MOCK_DATA=true in environment
 */

// Referral mock data
export {
  getAchievementById,
  getAchievementsByCategory,
  getAchievementsByStatus,
  mockAchievements,
  mockAchievementStats,
} from "./mock-achievement-data";
// Leaderboard mock data
export {
  mockPublicLeaderboard,
  mockTradingLeaderboard,
  mockUserRank,
} from "./mock-leaderboard-data";
// Achievement mock data
export {
  mockReferralCode,
  mockReferralStats,
  mockReferralTree,
  mockReferredBy,
  simulateApiDelay,
} from "./mock-referral-data";

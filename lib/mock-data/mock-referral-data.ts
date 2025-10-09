import type {
  FeeMetrics,
  Referral,
  ReferralCode,
  ReferralStats,
  ReferralTree,
  ReferredBy,
  VolumeMetrics,
} from "@/types/referral";

/**
 * Mock data for referral system
 * Used when USE_MOCK_DATA=true
 */

export const mockReferralCode: ReferralCode = {
  code: "JACK2024",
  createdAt: "2024-01-15T10:30:00Z",
  usageCount: 12,
};

// Mock volume and fee metrics
const mockVolumeMetrics: VolumeMetrics = {
  daily: 2500,
  monthly: 45000,
  ytd: 125000,
  allTime: 125000,
};

const mockFeeMetrics: FeeMetrics = {
  daily: 250,
  monthly: 4500,
  ytd: 12500,
  allTime: 12500,
};

// Enhanced referrals with parent-child relationships and time metrics
const mockReferralsData: Referral[] = [
  // Tier 1 Referrals
  {
    userId: "user-001",
    email: "alice@example.com",
    walletAddress: "0x1234567890123456789012345678901234567890",
    tier: 1,
    joinedAt: "2024-02-01T14:20:00Z",
    volume: 15000,
    earnings: 150,
    dailyVolume: 500,
    monthlyVolume: 12000,
    ytdVolume: 15000,
    feeVolume: 1500,
    isActive: true,
    lastTradeDate: "2025-10-08T10:30:00Z",
  },
  {
    userId: "user-002",
    email: "bob@example.com",
    walletAddress: "0x2345678901234567890123456789012345678901",
    tier: 1,
    joinedAt: "2024-02-05T09:15:00Z",
    volume: 22000,
    earnings: 220,
    dailyVolume: 800,
    monthlyVolume: 15000,
    ytdVolume: 22000,
    feeVolume: 2200,
    isActive: true,
    lastTradeDate: "2025-10-09T14:20:00Z",
  },
  {
    userId: "user-003",
    walletAddress: "0x3456789012345678901234567890123456789012",
    tier: 1,
    joinedAt: "2024-02-10T16:45:00Z",
    volume: 18500,
    earnings: 185,
    dailyVolume: 600,
    monthlyVolume: 11000,
    ytdVolume: 18500,
    feeVolume: 1850,
    isActive: true,
    lastTradeDate: "2025-10-07T09:15:00Z",
  },
  {
    userId: "user-004",
    email: "charlie@example.com",
    walletAddress: "0x4567890123456789012345678901234567890123",
    tier: 1,
    joinedAt: "2024-02-15T11:30:00Z",
    volume: 12000,
    earnings: 120,
    dailyVolume: 300,
    monthlyVolume: 7000,
    ytdVolume: 12000,
    feeVolume: 1200,
    isActive: false,
    lastTradeDate: "2025-09-15T16:30:00Z",
  },
  {
    userId: "user-005",
    walletAddress: "0x5678901234567890123456789012345678901234",
    tier: 1,
    joinedAt: "2024-02-20T08:00:00Z",
    volume: 8500,
    earnings: 85,
    dailyVolume: 0,
    monthlyVolume: 0,
    ytdVolume: 8500,
    feeVolume: 850,
    isActive: false,
    lastTradeDate: "2025-08-20T11:00:00Z",
  },
  {
    userId: "user-006",
    email: "diana@example.com",
    walletAddress: "0x6789012345678901234567890123456789012345",
    tier: 1,
    joinedAt: "2024-02-25T13:20:00Z",
    volume: 5000,
    earnings: 50,
    dailyVolume: 200,
    monthlyVolume: 4000,
    ytdVolume: 5000,
    feeVolume: 500,
    isActive: true,
    lastTradeDate: "2025-10-08T18:45:00Z",
  },
  {
    userId: "user-007",
    walletAddress: "0x7890123456789012345678901234567890123456",
    tier: 1,
    joinedAt: "2024-03-01T10:10:00Z",
    volume: 3000,
    earnings: 30,
    dailyVolume: 100,
    monthlyVolume: 2500,
    ytdVolume: 3000,
    feeVolume: 300,
    isActive: true,
    lastTradeDate: "2025-10-06T12:00:00Z",
  },
  {
    userId: "user-008",
    email: "eve@example.com",
    walletAddress: "0x8901234567890123456789012345678901234567",
    tier: 1,
    joinedAt: "2024-03-05T15:50:00Z",
    volume: 1000,
    earnings: 10,
    dailyVolume: 0,
    monthlyVolume: 500,
    ytdVolume: 1000,
    feeVolume: 100,
    isActive: false,
    lastTradeDate: "2025-09-01T08:30:00Z",
  },
  // Tier 2 Referrals (children of user-001 and user-002)
  {
    userId: "user-009",
    walletAddress: "0x9012345678901234567890123456789012345678",
    tier: 2,
    parentId: "user-001", // Child of Alice
    joinedAt: "2024-03-08T12:30:00Z",
    volume: 12000,
    earnings: 120,
    dailyVolume: 400,
    monthlyVolume: 8000,
    ytdVolume: 12000,
    feeVolume: 1200,
    isActive: true,
    lastTradeDate: "2025-10-07T15:30:00Z",
  },
  {
    userId: "user-010",
    email: "frank@example.com",
    walletAddress: "0x0123456789012345678901234567890123456789",
    tier: 2,
    parentId: "user-001", // Child of Alice
    joinedAt: "2024-03-10T09:40:00Z",
    volume: 15000,
    earnings: 150,
    dailyVolume: 500,
    monthlyVolume: 10000,
    ytdVolume: 15000,
    feeVolume: 1500,
    isActive: true,
    lastTradeDate: "2025-10-09T11:20:00Z",
  },
  {
    userId: "user-011",
    walletAddress: "0xabcdef0123456789012345678901234567890123",
    tier: 2,
    parentId: "user-002", // Child of Bob
    joinedAt: "2024-03-15T14:15:00Z",
    volume: 8000,
    earnings: 80,
    dailyVolume: 250,
    monthlyVolume: 5500,
    ytdVolume: 8000,
    feeVolume: 800,
    isActive: true,
    lastTradeDate: "2025-10-08T16:45:00Z",
  },
  {
    userId: "user-012",
    email: "grace@example.com",
    walletAddress: "0xfedcba9876543210987654321098765432109876",
    tier: 2,
    parentId: "user-002", // Child of Bob
    joinedAt: "2024-03-20T11:25:00Z",
    volume: 5000,
    earnings: 50,
    dailyVolume: 0,
    monthlyVolume: 3500,
    ytdVolume: 5000,
    feeVolume: 500,
    isActive: false,
    lastTradeDate: "2025-09-25T10:00:00Z",
  },
];

export const mockReferralStats: ReferralStats = {
  totalReferrals: 12,
  tier1Referrals: 8,
  tier2Referrals: 4,
  totalVolume: 125000,
  tier1Volume: 85000,
  tier2Volume: 40000,
  totalEarnings: 1250,
  tier1Earnings: 850,
  tier2Earnings: 400,
  referrals: mockReferralsData,
  volumeMetrics: mockVolumeMetrics,
  feeMetrics: mockFeeMetrics,
  activeReferrals: 8, // 8 out of 12 traded in last 30 days
  referredBy: {
    userId: "referrer-001",
    email: "toptrader@example.com",
    walletAddress: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    referralCode: "TOPTRADER",
    referredAt: "2024-01-10T08:00:00Z",
  },
};

export const mockReferralTree: ReferralTree = {
  tier1: mockReferralStats.referrals.filter((r) => r.tier === 1),
  tier2: mockReferralStats.referrals.filter((r) => r.tier === 2),
};

export const mockReferredBy: ReferredBy = {
  userId: "referrer-001",
  email: "toptrader@example.com",
  walletAddress: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  referralCode: "TOPTRADER",
  referredAt: "2024-01-10T08:00:00Z",
};

// Helper function to group tier2 referrals by their tier1 parent
export const groupTier2ByParent = (
  referrals: Referral[],
): Map<string, Referral[]> => {
  const tier2ByParent = new Map<string, Referral[]>();

  referrals
    .filter((r) => r.tier === 2 && r.parentId)
    .forEach((tier2) => {
      const parentId = tier2.parentId!;
      const existing = tier2ByParent.get(parentId) || [];

      tier2ByParent.set(parentId, [...existing, tier2]);
    });

  return tier2ByParent;
};

// Helper function to simulate API delay
export const simulateApiDelay = (ms: number = 500): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

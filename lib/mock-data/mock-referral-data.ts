import type {
  ReferralCode,
  ReferralStats,
  ReferralTree,
  ReferredBy,
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
  referrals: [
    {
      userId: "user-001",
      email: "alice@example.com",
      walletAddress: "0x1234567890123456789012345678901234567890",
      tier: 1,
      joinedAt: "2024-02-01T14:20:00Z",
      volume: 15000,
      earnings: 150,
    },
    {
      userId: "user-002",
      email: "bob@example.com",
      walletAddress: "0x2345678901234567890123456789012345678901",
      tier: 1,
      joinedAt: "2024-02-05T09:15:00Z",
      volume: 22000,
      earnings: 220,
    },
    {
      userId: "user-003",
      walletAddress: "0x3456789012345678901234567890123456789012",
      tier: 1,
      joinedAt: "2024-02-10T16:45:00Z",
      volume: 18500,
      earnings: 185,
    },
    {
      userId: "user-004",
      email: "charlie@example.com",
      walletAddress: "0x4567890123456789012345678901234567890123",
      tier: 1,
      joinedAt: "2024-02-15T11:30:00Z",
      volume: 12000,
      earnings: 120,
    },
    {
      userId: "user-005",
      walletAddress: "0x5678901234567890123456789012345678901234",
      tier: 1,
      joinedAt: "2024-02-20T08:00:00Z",
      volume: 8500,
      earnings: 85,
    },
    {
      userId: "user-006",
      email: "diana@example.com",
      walletAddress: "0x6789012345678901234567890123456789012345",
      tier: 1,
      joinedAt: "2024-02-25T13:20:00Z",
      volume: 5000,
      earnings: 50,
    },
    {
      userId: "user-007",
      walletAddress: "0x7890123456789012345678901234567890123456",
      tier: 1,
      joinedAt: "2024-03-01T10:10:00Z",
      volume: 3000,
      earnings: 30,
    },
    {
      userId: "user-008",
      email: "eve@example.com",
      walletAddress: "0x8901234567890123456789012345678901234567",
      tier: 1,
      joinedAt: "2024-03-05T15:50:00Z",
      volume: 1000,
      earnings: 10,
    },
    {
      userId: "user-009",
      walletAddress: "0x9012345678901234567890123456789012345678",
      tier: 2,
      joinedAt: "2024-03-08T12:30:00Z",
      volume: 12000,
      earnings: 120,
    },
    {
      userId: "user-010",
      email: "frank@example.com",
      walletAddress: "0x0123456789012345678901234567890123456789",
      tier: 2,
      joinedAt: "2024-03-10T09:40:00Z",
      volume: 15000,
      earnings: 150,
    },
    {
      userId: "user-011",
      walletAddress: "0xabcdef0123456789012345678901234567890123",
      tier: 2,
      joinedAt: "2024-03-15T14:15:00Z",
      volume: 8000,
      earnings: 80,
    },
    {
      userId: "user-012",
      email: "grace@example.com",
      walletAddress: "0xfedcba9876543210987654321098765432109876",
      tier: 2,
      joinedAt: "2024-03-20T11:25:00Z",
      volume: 5000,
      earnings: 50,
    },
  ],
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

// Helper function to simulate API delay
export const simulateApiDelay = (ms: number = 500): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

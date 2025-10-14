/**
 * Referral system types
 */

export interface ReferralCode {
  code: string;
  createdAt: string;
  usageCount: number;
}

// Backend response types
export interface BackendTreeUser {
  userId: string;
  joinedAt: string;
  volume: {
    daily: string;
    monthly: string;
    yearly: string;
    total: string;
  };
  commission: {
    daily: string;
    monthly: string;
    yearly: string;
    total: string;
  };
  builderFees: {
    daily: string;
    monthly: string;
    yearly: string;
    total: string;
  };
  subReferrals: BackendTreeUser[];
}

export interface BackendReferralTree {
  [userId: string]: BackendTreeUser;
}

export interface BackendUserReferralData {
  referralCode?: string;
  referrer?: {
    id: string;
    code: string;
    email: string;
    address: string;
    isActive: boolean;
  };
  leaderboard: {
    xp: {
      place: number;
      xp: string;
      level: number;
    };
    volume: {
      place: number;
      volume: string;
    };
  };
}

// Frontend types
export interface Referral {
  userId: string;
  email?: string;
  walletAddress: string;
  tier: 1 | 2;
  joinedAt: string;
  volume: number;
  commission: number; // Commission paid to user for referring
  parentId?: string; // For tier2: references their tier1 parent
  dailyVolume?: number;
  monthlyVolume?: number;
  ytdVolume?: number;
  feeVolume?: number; // Total fees paid by referred users to StableJack
  isActive?: boolean; // monthlyVolume > 0
}

export interface ReferralWithChildren extends Referral {
  tier2Referrals: Referral[];
  tier2Count: number;
  tier2TotalVolume: number;
  tier2TotalCommission: number;
}

export interface ReferredBy {
  userId: string;
  email?: string;
  walletAddress: string;
  referralCode: string;
  referredAt: string;
}

export interface VolumeMetrics {
  daily: number;
  monthly: number;
  ytd: number;
  allTime: number;
}

export interface FeeMetrics {
  daily: number;
  monthly: number;
  ytd: number;
  allTime: number;
}

export interface CommissionMetrics {
  daily: number;
  monthly: number;
  ytd: number;
  allTime: number;
}

export interface ReferralStats {
  totalReferrals: number;
  tier1Referrals: number;
  tier2Referrals: number;
  totalVolume: number;
  tier1Volume: number;
  tier2Volume: number;
  totalCommission: number; // Total commission paid to user
  tier1Commission: number;
  tier2Commission: number;
  referrals: Referral[];
  referredBy?: ReferredBy;
  volumeMetrics?: VolumeMetrics;
  feeMetrics?: FeeMetrics;
  commissionMetrics?: CommissionMetrics;
  activeReferrals?: number; // Users who traded in last 30 days
}

export interface ReferralTree {
  tier1: Referral[];
  tier2: Referral[];
}

export type ReferralSortBy =
  | "volume"
  | "commission"
  | "date"
  | "tier2Count"
  | "active";
export type ReferralSortOrder = "asc" | "desc";

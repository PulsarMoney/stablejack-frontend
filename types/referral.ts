/**
 * Referral system types
 */

export interface ReferralCode {
  code: string;
  createdAt: string;
  usageCount: number;
}

export interface Referral {
  userId: string;
  email?: string;
  walletAddress: string;
  tier: 1 | 2;
  joinedAt: string;
  volume: number;
  earnings: number;
  parentId?: string; // For tier2: references their tier1 parent
  dailyVolume?: number;
  monthlyVolume?: number;
  ytdVolume?: number;
  feeVolume?: number; // Total fees generated
  isActive?: boolean; // Traded in last 7 days
  lastTradeDate?: string;
}

export interface ReferralWithChildren extends Referral {
  tier2Referrals: Referral[];
  tier2Count: number;
  tier2TotalVolume: number;
  tier2TotalEarnings: number;
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

export interface ReferralStats {
  totalReferrals: number;
  tier1Referrals: number;
  tier2Referrals: number;
  totalVolume: number;
  tier1Volume: number;
  tier2Volume: number;
  totalEarnings: number;
  tier1Earnings: number;
  tier2Earnings: number;
  referrals: Referral[];
  referredBy?: ReferredBy;
  volumeMetrics?: VolumeMetrics;
  feeMetrics?: FeeMetrics;
  activeReferrals?: number; // Users who traded in last 30 days
}

export interface ReferralTree {
  tier1: Referral[];
  tier2: Referral[];
}

export type ReferralSortBy =
  | "volume"
  | "earnings"
  | "date"
  | "tier2Count"
  | "active";
export type ReferralSortOrder = "asc" | "desc";

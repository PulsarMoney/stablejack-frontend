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
}

export interface ReferredBy {
  userId: string;
  email?: string;
  walletAddress: string;
  referralCode: string;
  referredAt: string;
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
}

export interface ReferralTree {
  tier1: Referral[];
  tier2: Referral[];
}

import type {
  BackendReferralTree,
  BackendTreeUser,
  CommissionMetrics,
  FeeMetrics,
  Referral,
  ReferralStats,
  VolumeMetrics,
} from "@/types/referral";

/**
 * Generates a display wallet address from userId
 * Takes first 8 and last 6 characters
 */
export function generateDisplayAddress(userId: string): string {
  if (userId.length <= 14) return userId;

  return `${userId.slice(0, 8)}...${userId.slice(-6)}`;
}

/**
 * Determines if a referral is active based on monthly volume
 */
export function calculateIsActive(monthlyVolume: number): boolean {
  return monthlyVolume > 0;
}

/**
 * Converts a backend TreeUser to a frontend Referral
 */
function convertTreeUserToReferral(
  treeUser: BackendTreeUser,
  tier: 1 | 2,
  parentId?: string,
): Referral {
  const dailyVolume = parseFloat(treeUser.volume.daily);
  const monthlyVolume = parseFloat(treeUser.volume.monthly);
  const ytdVolume = parseFloat(treeUser.volume.yearly);
  const totalVolume = parseFloat(treeUser.volume.total);

  return {
    userId: treeUser.userId,
    email: treeUser.username || undefined,
    // Use real wallet address if available, otherwise use userId as fallback
    walletAddress: treeUser.walletAddress || generateDisplayAddress(treeUser.userId),
    tier,
    joinedAt: treeUser.joinedAt,
    volume: totalVolume,
    commission: parseFloat(treeUser.commission.total),
    parentId,
    dailyVolume,
    monthlyVolume,
    ytdVolume,
    feeVolume: parseFloat(treeUser.builderFees.total),
    isActive: calculateIsActive(monthlyVolume),
  };
}

/**
 * Transforms backend referral tree structure to flat array of Referrals
 */
export function transformTreeToReferrals(
  tree: BackendReferralTree,
): Referral[] {
  const referrals: Referral[] = [];

  // Process each tier 1 user
  Object.values(tree).forEach((tier1User) => {
    // Add tier 1 referral
    const tier1Referral = convertTreeUserToReferral(tier1User, 1);

    referrals.push(tier1Referral);

    // Add all tier 2 sub-referrals
    tier1User.subReferrals.forEach((tier2User) => {
      const tier2Referral = convertTreeUserToReferral(
        tier2User,
        2,
        tier1User.userId,
      );

      referrals.push(tier2Referral);
    });
  });

  return referrals;
}

/**
 * Calculates aggregate volume metrics from referrals array
 */
export function calculateVolumeMetrics(referrals: Referral[]): VolumeMetrics {
  return {
    daily: referrals.reduce((sum, r) => sum + (r.dailyVolume || 0), 0),
    monthly: referrals.reduce((sum, r) => sum + (r.monthlyVolume || 0), 0),
    ytd: referrals.reduce((sum, r) => sum + (r.ytdVolume || 0), 0),
    allTime: referrals.reduce((sum, r) => sum + r.volume, 0),
  };
}

/**
 * Calculates aggregate commission metrics from referrals array
 */
export function calculateCommissionMetrics(
  referrals: Referral[],
): CommissionMetrics {
  // Commission is only tracked as total, so we use volume ratios for time periods
  const totalCommission = referrals.reduce((sum, r) => sum + r.commission, 0);
  const totalVolume = referrals.reduce((sum, r) => sum + r.volume, 0);

  if (totalVolume === 0) {
    return { daily: 0, monthly: 0, ytd: 0, allTime: 0 };
  }

  const dailyVolume = referrals.reduce(
    (sum, r) => sum + (r.dailyVolume || 0),
    0,
  );
  const monthlyVolume = referrals.reduce(
    (sum, r) => sum + (r.monthlyVolume || 0),
    0,
  );
  const ytdVolume = referrals.reduce((sum, r) => sum + (r.ytdVolume || 0), 0);

  // Estimate commission based on volume proportion
  const commissionRate = totalCommission / totalVolume;

  return {
    daily: dailyVolume * commissionRate,
    monthly: monthlyVolume * commissionRate,
    ytd: ytdVolume * commissionRate,
    allTime: totalCommission,
  };
}

/**
 * Calculates aggregate fee metrics from referrals array
 */
export function calculateFeeMetrics(referrals: Referral[]): FeeMetrics {
  // Fees are tracked as builderFees.total, estimate time periods from volume
  const totalFees = referrals.reduce((sum, r) => sum + (r.feeVolume || 0), 0);
  const totalVolume = referrals.reduce((sum, r) => sum + r.volume, 0);

  if (totalVolume === 0) {
    return { daily: 0, monthly: 0, ytd: 0, allTime: 0 };
  }

  const dailyVolume = referrals.reduce(
    (sum, r) => sum + (r.dailyVolume || 0),
    0,
  );
  const monthlyVolume = referrals.reduce(
    (sum, r) => sum + (r.monthlyVolume || 0),
    0,
  );
  const ytdVolume = referrals.reduce((sum, r) => sum + (r.ytdVolume || 0), 0);

  const feeRate = totalFees / totalVolume;

  return {
    daily: dailyVolume * feeRate,
    monthly: monthlyVolume * feeRate,
    ytd: ytdVolume * feeRate,
    allTime: totalFees,
  };
}

/**
 * Calculates all aggregate stats from referrals array
 */
export function calculateAggregateStats(referrals: Referral[]): {
  totalReferrals: number;
  tier1Referrals: number;
  tier2Referrals: number;
  totalVolume: number;
  tier1Volume: number;
  tier2Volume: number;
  totalCommission: number;
  tier1Commission: number;
  tier2Commission: number;
  activeReferrals: number;
} {
  const tier1 = referrals.filter((r) => r.tier === 1);
  const tier2 = referrals.filter((r) => r.tier === 2);

  return {
    totalReferrals: referrals.length,
    tier1Referrals: tier1.length,
    tier2Referrals: tier2.length,
    totalVolume: referrals.reduce((sum, r) => sum + r.volume, 0),
    tier1Volume: tier1.reduce((sum, r) => sum + r.volume, 0),
    tier2Volume: tier2.reduce((sum, r) => sum + r.volume, 0),
    totalCommission: referrals.reduce((sum, r) => sum + r.commission, 0),
    tier1Commission: tier1.reduce((sum, r) => sum + r.commission, 0),
    tier2Commission: tier2.reduce((sum, r) => sum + r.commission, 0),
    activeReferrals: referrals.filter((r) => r.isActive).length,
  };
}

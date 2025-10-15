import type { ApiResponse } from "@/types/api";
import type {
  BackendReferralTree,
  BackendUserReferralData,
  ReferralCode,
  ReferralStats,
} from "@/types/referral";

import { useMutation, useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";
import {
  calculateAggregateStats,
  calculateCommissionMetrics,
  calculateFeeMetrics,
  calculateVolumeMetrics,
  transformTreeToReferrals,
} from "@/lib/transform-referral-data";
import { queryClient } from "@/lib/queryClient";

interface ChangeCodeData {
  newCode: string;
}

interface ApplyCodeData {
  code: string;
}

export const useGetReferralCode = () => {
  return useQuery({
    queryKey: ["referral", "code"],
    queryFn: async () => {
      const response =
        await apiClient.get<ApiResponse<ReferralCode>>("/api/referral/code");

      return response.data.data;
    },
  });
};

export const useChangeReferralCode = () => {
  return useMutation({
    mutationFn: async (data: ChangeCodeData) => {
      const response = await apiClient.put<ApiResponse<ReferralCode>>(
        "/api/referral/code",
        data,
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referral", "code"] });
    },
  });
};

export const useApplyReferralCode = () => {
  return useMutation({
    mutationFn: async (data: ApplyCodeData) => {
      const response = await apiClient.post<ApiResponse<{ message: string }>>(
        "/api/referral/apply",
        data,
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referral"] });
    },
  });
};

export const useGetReferralStats = () => {
  return useQuery({
    queryKey: ["referral", "stats"],
    queryFn: async () => {
      // Fetch referral tree with full metrics
      const treeResponse = await apiClient.get<
        ApiResponse<BackendReferralTree>
      >("/api/referral/tree");

      // Fetch user's referral data (referrer info, leaderboard)
      const meResponse = await apiClient.get<
        ApiResponse<BackendUserReferralData>
      >("/api/referral/me");

      // Transform backend tree to frontend referrals array
      const referrals = transformTreeToReferrals(treeResponse.data.data);

      // Calculate aggregate statistics
      const aggregates = calculateAggregateStats(referrals);

      // Build complete ReferralStats object
      const stats: ReferralStats = {
        ...aggregates,
        referrals,
        referredBy: meResponse.data.data.referrer
          ? {
              userId: meResponse.data.data.referrer.id,
              walletAddress: meResponse.data.data.referrer.address,
              email: meResponse.data.data.referrer.email,
              referralCode: meResponse.data.data.referrer.code,
              referredAt: new Date().toISOString(), // Backend doesn't provide this
            }
          : undefined,
        volumeMetrics: calculateVolumeMetrics(referrals),
        feeMetrics: calculateFeeMetrics(referrals),
        commissionMetrics: calculateCommissionMetrics(referrals),
      };

      return stats;
    },
  });
};

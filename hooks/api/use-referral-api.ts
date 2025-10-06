import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { queryClient } from "@/lib/queryClient";
import type { ApiResponse } from "@/types/api";

interface ReferralCode {
  code: string;
  userId: string;
}

interface ChangeCodeData {
  newCode: string;
}

interface ApplyCodeData {
  code: string;
}

interface ReferralStats {
  totalReferrals: number;
  tier1Referrals: number;
  tier2Referrals: number;
  totalVolume: number;
  tier1Volume: number;
  tier2Volume: number;
  totalEarnings: number;
  tier1Earnings: number;
  tier2Earnings: number;
  referrals: Array<{
    id: string;
    email: string;
    tier: 1 | 2;
    volume: number;
    earnings: number;
    joinedAt: string;
  }>;
  referredBy?: {
    id: string;
    email: string;
    code: string;
  };
}

export const useGetReferralCode = () => {
  return useQuery({
    queryKey: ["referral", "code"],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<ReferralCode>>(
        "/api/referral/code"
      );
      return response.data.data;
    },
  });
};

export const useChangeReferralCode = () => {
  return useMutation({
    mutationFn: async (data: ChangeCodeData) => {
      const response = await apiClient.put<ApiResponse<ReferralCode>>(
        "/api/referral/code",
        data
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
        data
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
      const response = await apiClient.get<ApiResponse<ReferralStats>>(
        "/api/referral/stats"
      );
      return response.data.data;
    },
  });
};

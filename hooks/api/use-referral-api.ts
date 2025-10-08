import type { ApiResponse } from "@/types/api";
import type { ReferralCode, ReferralStats } from "@/types/referral";

import { useMutation, useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";
import {
  mockReferralCode,
  mockReferralStats,
  simulateApiDelay,
} from "@/lib/mock-data";
import { queryClient } from "@/lib/queryClient";

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" || false;

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
      if (USE_MOCK_DATA) {
        await simulateApiDelay();

        return mockReferralCode;
      }

      const response =
        await apiClient.get<ApiResponse<ReferralCode>>("/api/referral/code");

      return response.data.data;
    },
  });
};

export const useChangeReferralCode = () => {
  return useMutation({
    mutationFn: async (data: ChangeCodeData) => {
      if (USE_MOCK_DATA) {
        await simulateApiDelay();

        return {
          success: true,
          data: {
            ...mockReferralCode,
            code: data.newCode,
          },
        };
      }

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
      if (USE_MOCK_DATA) {
        await simulateApiDelay();

        return {
          success: true,
          data: {
            message: `Successfully applied referral code: ${data.code}`,
          },
        };
      }

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
      if (USE_MOCK_DATA) {
        await simulateApiDelay();

        return mockReferralStats;
      }

      const response = await apiClient.get<ApiResponse<ReferralStats>>(
        "/api/referral/stats",
      );

      return response.data.data;
    },
  });
};

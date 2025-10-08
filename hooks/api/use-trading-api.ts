import type { ApiResponse } from "@/types/api";

import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";

interface TradeFilters {
  user: string;
  markets?: string;
  venues?: string;
  directions?: string;
  timeRange?: string;
  fromTimestamp?: number;
  toTimestamp?: number;
  minSize?: number;
  maxSize?: number;
  minNotional?: number;
  maxNotional?: number;
  minClosedPnl?: number;
  maxClosedPnl?: number;
  limit?: number;
}

interface Trade {
  time: string;
  coin: string;
  side: string;
  px: string;
  sz: string;
  hash: string;
  fee: string;
  feeToken: string;
  closedPnl: string;
  dir: string;
  tid: string;
  oid: string;
  crossed: boolean;
  startPosition: string;
  venue: string;
}

interface TradingStats {
  totalTrades: number;
  totalVolume: number;
  totalPnl: number;
  winRate: number;
  avgTradeSize: number;
  profitableTrades: number;
  unprofitableTrades: number;
  totalFees: number;
  markets: Array<{
    market: string;
    trades: number;
    volume: number;
    pnl: number;
  }>;
}

interface Market {
  name: string;
  venue: string;
  trades: number;
}

export const useGetTrades = (filters: TradeFilters) => {
  return useQuery({
    queryKey: ["trades", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
      const response = await apiClient.get<
        ApiResponse<{ trades: Trade[]; meta: any }>
      >(`/api/trades?${params.toString()}`);

      return response.data.data;
    },
    enabled: !!filters.user,
  });
};

export const useGetTradingStats = (filters: Omit<TradeFilters, "limit">) => {
  return useQuery({
    queryKey: ["trading", "stats", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
      const response = await apiClient.get<ApiResponse<TradingStats>>(
        `/api/stats?${params.toString()}`,
      );

      return response.data.data;
    },
    enabled: !!filters.user,
  });
};

export const useGetMarkets = (user: string) => {
  return useQuery({
    queryKey: ["markets", user],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<{ markets: Market[] }>>(
        `/api/markets?user=${user}`,
      );

      return response.data.data.markets;
    },
    enabled: !!user,
  });
};

export const useExportTradesCSV = (filters: TradeFilters) => {
  return useQuery({
    queryKey: ["trades", "export", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
      const response = await apiClient.get(
        `/api/export/csv?${params.toString()}`,
        {
          responseType: "blob",
        },
      );

      return response.data;
    },
    enabled: false, // Only run when manually triggered
  });
};

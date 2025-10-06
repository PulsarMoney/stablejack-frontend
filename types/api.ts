/**
 * API-related type definitions
 */

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * API error response
 */
export interface ApiError {
  message: string;
  code?: string;
  statusCode: number;
  details?: Record<string, any>;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Market data types (example for StableJack)
 */
export interface Market {
  id: string;
  asset: string;
  chain: string;
  tvl: string;
  apy: string;
  userDeposit?: string;
  logo?: string;
  chainLogo?: string;
}

/**
 * Staking data types
 */
export interface StakingPool {
  id: string;
  name: string;
  apr: string;
  tvl: string;
  userStaked?: string;
  rewardsEarned?: string;
}

/**
 * User portfolio data
 */
export interface UserPortfolio {
  totalDeposited: string;
  totalEarned: string;
  activePositions: number;
  markets: Market[];
}

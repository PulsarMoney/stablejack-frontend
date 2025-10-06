/**
 * Authentication-related type definitions
 */

/**
 * User information from Privy
 */
export interface User {
  id: string;
  email?: {
    address: string;
  };
  wallet?: {
    address: string;
    chainId?: string;
  };
  createdAt: string;
}

/**
 * Wallet information
 */
export interface Wallet {
  address: string;
  chainId: string;
  walletClient?: string;
  connectorType?: string;
}

/**
 * Authentication state
 */
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
}

/**
 * Auth hook return type
 */
export interface UseAuthReturn {
  // User data
  user: User | undefined;
  email: string | undefined;
  address: string;
  userName: string;

  // Authentication state
  isAuthenticated: boolean;
  isSignedIn: boolean;
  isLoading: boolean;

  // Wallet data
  primaryWallet: Wallet | undefined;
  wallets: Wallet[];

  // Auth methods
  login: () => Promise<void>;
  logout: () => Promise<void>;
  linkEmail: () => Promise<void>;
  linkWallet: () => Promise<void>;
  unlinkEmail: (email: string) => Promise<void>;
  unlinkWallet: (address: string) => Promise<void>;
  openConnectModal: () => Promise<void>;
  token: string | null;

  // Helper methods
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  switchWallet: () => Promise<void>;
  getSigner: () => Promise<any>;
  signMessage: (message: string) => Promise<string>;
}

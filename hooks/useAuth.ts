import { useIdentityToken, usePrivy, useWallets } from "@privy-io/react-auth";

export const useAuth = () => {
  const {
    ready,
    authenticated,
    user,
    login,
    logout,
    linkEmail,
    linkWallet,
    unlinkEmail,
    unlinkWallet,
  } = usePrivy();

  const { wallets } = useWallets();

  // Get the primary wallet (first connected wallet)
  const primaryWallet = wallets[0];

  const { identityToken } = useIdentityToken();

  const address = primaryWallet?.address || "";

  return {
    // User data
    user,
    email: user?.email?.address,
    address,
    userName: user?.email?.address || address || "Anonymous", // For backward compatibility

    // Authentication state
    isAuthenticated: authenticated,
    isSignedIn: authenticated,
    isLoading: !ready,

    // Wallet data
    primaryWallet,
    wallets,

    // Auth methods
    login,
    logout,
    linkEmail,
    linkWallet,
    unlinkEmail,
    unlinkWallet,
    openConnectModal: login, // For backward compatibility
    token: identityToken,

    // Helper methods for common operations
    connectWallet: async () => {
      if (!authenticated) {
        await login();
      } else if (!primaryWallet) {
        await linkWallet();
      }
    },

    disconnectWallet: async () => {
      if (primaryWallet) {
        await unlinkWallet(primaryWallet.address);
      }
      await logout();
    },

    // Additional helper methods for compatibility
    switchWallet: async () => {
      // Privy doesn't have direct wallet switching, but we can unlink current and link new
      if (primaryWallet) {
        await unlinkWallet(primaryWallet.address);
      }
      await linkWallet();
    },

    getSigner: async () => {
      // This would need to be implemented based on your specific needs
      // For now, return null or implement based on wallet provider
      return null;
    },

    signMessage: async (_message: string) => {
      // This would need wallet-specific implementation
      // For now, return empty string or implement based on wallet provider
      return "";
    },
  };
};

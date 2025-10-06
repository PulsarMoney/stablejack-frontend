"use client";

import { PrivyProvider } from "@privy-io/react-auth";

interface PrivyProviderWrapperProps {
  children: React.ReactNode;
}

/**
 * Privy authentication provider wrapper
 * Configures Privy with app settings and theme
 */
export function PrivyProviderWrapper({
  children,
}: PrivyProviderWrapperProps) {
  // Get Privy App ID directly from environment
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  // Debug logging
  if (typeof window !== "undefined") {
    console.log("[PRIVY] Checking env vars:");
    console.log("[PRIVY] NEXT_PUBLIC_PRIVY_APP_ID:", privyAppId);
    console.log(
      "[PRIVY] All NEXT_PUBLIC vars:",
      Object.keys(process.env).filter((k) => k.startsWith("NEXT_PUBLIC"))
    );
  }

  // If no app ID, show error message instead of crashing
  if (!privyAppId) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h2>❌ Privy Configuration Error</h2>
        <p>
          <strong>NEXT_PUBLIC_PRIVY_APP_ID</strong> is not set.
        </p>
        <p>Steps to fix:</p>
        <ol>
          <li>
            Make sure <code>.env.local</code> exists in the project root
          </li>
          <li>
            Add: <code>NEXT_PUBLIC_PRIVY_APP_ID=your_app_id_here</code>
          </li>
          <li>Restart the dev server completely (stop and start again)</li>
        </ol>
        <p>
          Available env vars:{" "}
          {Object.keys(process.env)
            .filter((k) => k.startsWith("NEXT_PUBLIC"))
            .join(", ") || "None found"}
        </p>
      </div>
    );
  }

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        // Appearance configuration matching StableJack design
        appearance: {
          theme: "light",
          accentColor: "#6B2C2C", // Burgundy primary color
          logo: "/logo.png", // Update with your logo path
        },

        // Login methods
        loginMethods: ["wallet", "email"],
      }}
    >
      {children}
    </PrivyProvider>
  );
}

/**
 * Environment variable validation and type-safe access
 * Ensures all required environment variables are present
 */

/**
 * Get environment variable with type safety
 * Throws error if required variable is missing
 * Note: In Next.js, only variables prefixed with NEXT_PUBLIC_ are available in the browser
 */
function getEnvVar(key: string, required: boolean = true): string {
  const value = process.env[key];

  if (required && !value) {
    console.error(`[ENV ERROR] Missing: ${key}`);
    console.error(
      `[ENV] Available env vars:`,
      Object.keys(process.env).filter((k) => k.startsWith("NEXT_PUBLIC"))
    );
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value || "";
}

/**
 * Environment configuration
 * All environment variables are validated on import
 */
export const env = {
  // Privy Configuration
  privyAppId: getEnvVar("NEXT_PUBLIC_PRIVY_APP_ID"),

  // API Configuration
  apiUrl:
    getEnvVar("NEXT_PUBLIC_API_URL", false) || "http://localhost:3001/api",

  // App Configuration
  nodeEnv: process.env.NODE_ENV || "development",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",

  // Optional: Chain Configuration (if needed for web3)
  defaultChainId: getEnvVar("NEXT_PUBLIC_DEFAULT_CHAIN_ID", false) || "1",
} as const;

// Validate on module load in client-side code
if (typeof window !== "undefined") {
  console.log("[ENV] Environment variables loaded:", {
    apiUrl: env.apiUrl,
    nodeEnv: env.nodeEnv,
    privyConfigured: !!env.privyAppId,
    privyAppIdPreview: env.privyAppId
      ? env.privyAppId.slice(0, 10) + "..."
      : "NOT SET",
  });
}

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

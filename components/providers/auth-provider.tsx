"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { apiClient } from "@/lib/axios";
import { queryClient } from "@/lib/queryClient";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, token } = useAuth();

  const handleAuthChange = async () => {
    if (isAuthenticated) {
      try {
        // Get Privy access token
        if (token) {
          console.log("[AUTH] Setting token", token.slice(0, 10));
          apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("[AUTH] Failed to get access token:", error);
      }
    } else {
      // Clear token from headers on logout
      console.log("[AUTH] Clearing token");
      delete apiClient.defaults.headers["Authorization"];
    }

    // Wait for a moment to avoid race conditions
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Invalidate all queries
    queryClient.invalidateQueries({
      queryKey: [],
    });
    console.log("[AUTH] Invalidating queries");

    // Clear all cache on logout for clean state
    if (!isAuthenticated) {
      queryClient.clear();
    }
  };

  useEffect(() => {
    handleAuthChange();
  }, [isAuthenticated]);

  return <>{children}</>;
};

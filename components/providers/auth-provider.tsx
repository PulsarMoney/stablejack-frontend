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
          apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
        }
      } catch {
        // Error handling for token setting
      }
    } else {
      // Clear token from headers on logout
      delete apiClient.defaults.headers["Authorization"];
    }

    // Wait for a moment to avoid race conditions
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Invalidate all queries
    queryClient.invalidateQueries({
      queryKey: [],
    });

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

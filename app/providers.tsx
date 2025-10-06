"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryProvider } from "@/components/providers/query-provider";
import { PrivyProviderWrapper } from "@/components/providers/privy-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <QueryProvider>
      <PrivyProviderWrapper>
        <AuthProvider>
          <HeroUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </HeroUIProvider>
        </AuthProvider>
      </PrivyProviderWrapper>
    </QueryProvider>
  );
}

"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

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
    <HeroUIProvider
      navigate={router.push}
      defaultVariants={{
        button: {
          variant: "solid",
          color: "primary",
          radius: "full",
          size: "md",
        },
        card: {
          shadow: "sm",
          radius: "lg",
        },
        input: {
          variant: "bordered",
          radius: "lg",
        },
        table: {
          variant: "striped",
          color: "default",
        },
        modal: {
          backdrop: "opaque",
          radius: "lg",
        },
      }}
    >
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  );
}

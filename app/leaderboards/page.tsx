"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Card, CardBody } from "@heroui/card";

import { useAuth } from "@/hooks/useAuth";
import {
  useGetPublicLeaderboard,
  useGetTradingLeaderboard,
  useGetUserRank,
} from "@/hooks/api/use-leaderboard-api";

import { LeaderboardTabs } from "./components/leaderboard-tabs";
import { PublicXPTable } from "./components/public-xp-table";
import { TradingVolumeTable } from "./components/trading-volume-table";
import { UserPositionCard } from "./components/user-position-card";

export default function LeaderboardsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"trading" | "public">(
    "trading"
  );

  const { data: tradingData, isLoading: tradingLoading } =
    useGetTradingLeaderboard({ limit: 100 });
  const { data: publicData, isLoading: publicLoading } =
    useGetPublicLeaderboard({ limit: 100 });
  const { data: userRank, isLoading: rankLoading } = useGetUserRank();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || tradingLoading || publicLoading || rankLoading) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy mx-auto" />
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-burgundy mb-2">Leaderboards</h1>
        <p className="text-stable-gray">
          Compete with traders and climb the rankings
        </p>
      </div>

      <div className="space-y-6">
        {/* User Position Card */}
        {userRank && (
          <UserPositionCard selectedTab={selectedTab} userRank={userRank} />
        )}

        {/* Tabs */}
        <LeaderboardTabs
          selected={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as "trading" | "public")}
        />

        {/* Tables */}
        <Card className="border-2 border-burgundy/20">
          <CardBody className="p-6">
            {selectedTab === "trading" && tradingData && (
              <TradingVolumeTable data={tradingData} />
            )}
            {selectedTab === "public" && publicData && (
              <PublicXPTable data={publicData} />
            )}
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

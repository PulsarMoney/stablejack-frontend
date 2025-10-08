"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { EmptyState } from "./components/empty-state";
import { QuickActions } from "./components/quick-actions";
import { RecentReferrals } from "./components/recent-referrals";
import { StatsOverview } from "./components/stats-overview";

import { useGetReferralStats } from "@/hooks/api/use-referral-api";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { isAuthenticated, isLoading, address, email } = useAuth();
  const router = useRouter();

  const { data: referralStats, isLoading: statsLoading } =
    useGetReferralStats();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || statsLoading) {
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
        <h1 className="text-4xl font-bold text-burgundy mb-2">Dashboard</h1>
        <p className="text-stable-gray">
          Welcome back,{" "}
          {email || `${address.slice(0, 6)}...${address.slice(-4)}`}
        </p>
      </div>

      <div className="mb-8">
        <StatsOverview stats={referralStats} />
      </div>

      <div className="mb-8">
        <QuickActions />
      </div>

      {referralStats?.referrals && referralStats.referrals.length > 0 ? (
        <RecentReferrals referrals={referralStats.referrals} />
      ) : (
        <EmptyState />
      )}
    </section>
  );
}

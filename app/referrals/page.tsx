"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";

import { ApplyCodeModal } from "./components/apply-code-modal";
import { ReferralCodeCard } from "./components/referral-code-card";
import { ReferralDetailModal } from "./components/referral-detail-modal";
import { ReferralStatsGrid } from "./components/referral-stats-grid";
import { ReferralTimeMetrics } from "./components/referral-time-metrics";
import { ReferralTreeEnhanced } from "./components/referral-tree-enhanced";
import { ReferredByBanner } from "./components/referred-by-banner";

import { useGetReferralStats } from "@/hooks/api/use-referral-api";
import { useAuth } from "@/hooks/useAuth";

import type { Referral } from "@/types/referral";

export default function ReferralsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(
    null
  );

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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-burgundy mb-2">Referrals</h1>
          <p className="text-stable-gray">
            Share your code and earn from your network&apos;s trading fees
          </p>
        </div>
        {!referralStats?.referredBy && (
          <Button color="primary" variant="bordered" onPress={onOpen}>
            Apply Referral Code
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Referred By Banner */}
        {referralStats?.referredBy && (
          <ReferredByBanner referredBy={referralStats.referredBy} />
        )}

        {/* Referral Code Card */}
        <ReferralCodeCard />

        {/* Stats Grid */}
        {referralStats && <ReferralStatsGrid stats={referralStats} />}

        {/* Time-based Metrics */}
        {referralStats?.volumeMetrics && referralStats?.feeMetrics && (
          <ReferralTimeMetrics
            feeMetrics={referralStats.feeMetrics}
            volumeMetrics={referralStats.volumeMetrics}
          />
        )}

        {/* Enhanced Referral Tree */}
        {referralStats?.referrals && (
          <ReferralTreeEnhanced
            referrals={referralStats.referrals}
            onReferralClick={setSelectedReferral}
          />
        )}
      </div>

      {/* Apply Code Modal */}
      <ApplyCodeModal isOpen={isOpen} onClose={onClose} />

      {/* Referral Detail Modal */}
      <ReferralDetailModal
        isOpen={!!selectedReferral}
        referral={selectedReferral}
        tier2Count={
          selectedReferral?.tier === 1
            ? referralStats?.referrals.filter(
                (r) => r.tier === 2 && r.parentId === selectedReferral.userId
              ).length || 0
            : 0
        }
        onClose={() => setSelectedReferral(null)}
      />
    </section>
  );
}

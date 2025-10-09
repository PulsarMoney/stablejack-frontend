import type { ReferralStats } from "@/types/referral";

import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";

interface ReferralStatsGridProps {
  stats: ReferralStats;
}

export function ReferralStatsGrid({ stats }: ReferralStatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Total Referrals */}
      <Card className="border-2 border-burgundy/20">
        <CardBody className="p-6">
          <p className="text-sm text-stable-gray mb-1">Total Referrals</p>
          <p className="text-3xl font-bold text-burgundy mb-3">
            {stats.totalReferrals}
          </p>
          <div className="flex gap-2 flex-wrap">
            <Chip color="primary" size="sm" variant="flat">
              T1: {stats.tier1Referrals}
            </Chip>
            <Chip color="secondary" size="sm" variant="flat">
              T2: {stats.tier2Referrals}
            </Chip>
          </div>
        </CardBody>
      </Card>

      {/* Referral Volume */}
      <Card className="border-2 border-burgundy/20">
        <CardBody className="p-6">
          <p className="text-sm text-stable-gray mb-1">Referral Volume</p>
          <p className="text-3xl font-bold text-burgundy mb-1">
            ${stats.totalVolume.toLocaleString()}
          </p>
          <p className="text-xs text-stable-gray">
            T1: ${stats.tier1Volume.toLocaleString()}
          </p>
          <p className="text-xs text-stable-gray">
            T2: ${stats.tier2Volume.toLocaleString()}
          </p>
        </CardBody>
      </Card>

      {/* Total Earnings */}
      <Card className="border-2 border-burgundy/20">
        <CardBody className="p-6">
          <p className="text-sm text-stable-gray mb-1">Total Earnings</p>
          <p className="text-3xl font-bold text-warm-red mb-1">
            ${stats.totalEarnings.toFixed(2)}
          </p>
          <p className="text-xs text-stable-gray">
            T1: ${stats.tier1Earnings.toFixed(2)}
          </p>
          <p className="text-xs text-stable-gray">
            T2: ${stats.tier2Earnings.toFixed(2)}
          </p>
        </CardBody>
      </Card>

      {/* Active Referrals */}
      <Card className="border-2 border-burgundy/20">
        <CardBody className="p-6">
          <p className="text-sm text-stable-gray mb-1">Active Users</p>
          <p className="text-3xl font-bold text-burgundy mb-1">
            {stats.activeReferrals || 0}
          </p>
          <p className="text-xs text-stable-gray">
            Traded in last 30 days
          </p>
          {stats.activeReferrals && stats.totalReferrals && (
            <Chip color="success" size="sm" variant="flat">
              {((stats.activeReferrals / stats.totalReferrals) * 100).toFixed(0)}% active
            </Chip>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

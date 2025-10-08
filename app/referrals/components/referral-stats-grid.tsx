import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";

interface ReferralStatsGridProps {
  stats: {
    totalReferrals: number;
    tier1Referrals: number;
    tier2Referrals: number;
    totalVolume: number;
    tier1Volume: number;
    tier2Volume: number;
    totalEarnings: number;
    tier1Earnings: number;
    tier2Earnings: number;
  };
}

export function ReferralStatsGrid({ stats }: ReferralStatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-2 border-burgundy/20">
        <CardBody className="p-6">
          <p className="text-sm text-stable-gray mb-1">Total Referrals</p>
          <p className="text-3xl font-bold text-burgundy mb-3">
            {stats.totalReferrals}
          </p>
          <div className="flex gap-2">
            <Chip color="primary" size="sm" variant="flat">
              Tier 1: {stats.tier1Referrals}
            </Chip>
            <Chip color="secondary" size="sm" variant="flat">
              Tier 2: {stats.tier2Referrals}
            </Chip>
          </div>
        </CardBody>
      </Card>

      <Card className="border-2 border-burgundy/20">
        <CardBody className="p-6">
          <p className="text-sm text-stable-gray mb-1">Referral Volume</p>
          <p className="text-3xl font-bold text-burgundy mb-1">
            ${stats.totalVolume.toLocaleString()}
          </p>
          <p className="text-xs text-stable-gray">
            T1: ${stats.tier1Volume.toLocaleString()} | T2: $
            {stats.tier2Volume.toLocaleString()}
          </p>
        </CardBody>
      </Card>

      <Card className="border-2 border-burgundy/20">
        <CardBody className="p-6">
          <p className="text-sm text-stable-gray mb-1">Total Earnings</p>
          <p className="text-3xl font-bold text-warm-red mb-1">
            ${stats.totalEarnings.toFixed(2)}
          </p>
          <p className="text-xs text-stable-gray">
            T1: ${stats.tier1Earnings.toFixed(2)} | T2: $
            {stats.tier2Earnings.toFixed(2)}
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

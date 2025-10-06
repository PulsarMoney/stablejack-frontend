import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";

interface ReferralStats {
  totalReferrals: number;
  tier1Referrals: number;
  tier2Referrals: number;
  totalVolume: number;
  tier1Volume: number;
  tier2Volume: number;
  totalEarnings: number;
  tier1Earnings: number;
  tier2Earnings: number;
}

interface StatsOverviewProps {
  stats: ReferralStats | undefined;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-2 border-burgundy/20">
        <CardBody className="p-6">
          <p className="text-sm text-stable-gray mb-1">Total Referrals</p>
          <p className="text-3xl font-bold text-burgundy">
            {stats?.totalReferrals || 0}
          </p>
          <div className="flex gap-2 mt-2">
            <Chip color="primary" size="sm" variant="flat">
              Tier 1: {stats?.tier1Referrals || 0}
            </Chip>
            <Chip color="secondary" size="sm" variant="flat">
              Tier 2: {stats?.tier2Referrals || 0}
            </Chip>
          </div>
        </CardBody>
      </Card>

      <Card className="border-2 border-burgundy/20">
        <CardBody className="p-6">
          <p className="text-sm text-stable-gray mb-1">Total Volume</p>
          <p className="text-3xl font-bold text-burgundy">
            ${stats?.totalVolume.toLocaleString() || 0}
          </p>
          <p className="text-xs text-stable-gray mt-2">
            Tier 1: ${stats?.tier1Volume.toLocaleString() || 0} | Tier 2: $
            {stats?.tier2Volume.toLocaleString() || 0}
          </p>
        </CardBody>
      </Card>

      <Card className="border-2 border-burgundy/20">
        <CardBody className="p-6">
          <p className="text-sm text-stable-gray mb-1">Total Earnings</p>
          <p className="text-3xl font-bold text-warm-red">
            ${stats?.totalEarnings.toFixed(2) || "0.00"}
          </p>
          <p className="text-xs text-stable-gray mt-2">
            Tier 1: ${stats?.tier1Earnings.toFixed(2) || "0.00"} | Tier 2: $
            {stats?.tier2Earnings.toFixed(2) || "0.00"}
          </p>
        </CardBody>
      </Card>

      <Card className="border-2 border-burgundy/20">
        <CardBody className="p-6">
          <p className="text-sm text-stable-gray mb-1">Your XP</p>
          <p className="text-3xl font-bold text-burgundy">
            {stats?.totalVolume || 0}
          </p>
          <p className="text-xs text-stable-gray mt-2">1 USD = 1 XP</p>
        </CardBody>
      </Card>
    </div>
  );
}

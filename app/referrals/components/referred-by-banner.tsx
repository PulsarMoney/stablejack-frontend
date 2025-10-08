import type { ReferredBy } from "@/types/referral";

import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";

interface ReferredByBannerProps {
  referredBy?: ReferredBy;
}

export function ReferredByBanner({ referredBy }: ReferredByBannerProps) {
  if (!referredBy) return null;

  const displayName =
    referredBy.email ||
    `${referredBy.walletAddress.slice(0, 6)}...${referredBy.walletAddress.slice(-4)}`;

  return (
    <Card className="border-2 border-burgundy/20 bg-burgundy/5">
      <CardBody className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-stable-gray mb-1">Referred by</p>
            <p className="text-lg font-semibold text-burgundy">{displayName}</p>
            <p className="text-xs text-stable-gray mt-1">
              Code: {referredBy.referralCode}
            </p>
          </div>
          <Chip color="primary" variant="flat">
            Active
          </Chip>
        </div>
      </CardBody>
    </Card>
  );
}

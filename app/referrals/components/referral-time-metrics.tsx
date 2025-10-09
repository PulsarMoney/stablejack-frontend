import type { FeeMetrics, VolumeMetrics } from "@/types/referral";

import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";

interface ReferralTimeMetricsProps {
  volumeMetrics: VolumeMetrics;
  feeMetrics: FeeMetrics;
}

export function ReferralTimeMetrics({
  feeMetrics,
  volumeMetrics,
}: ReferralTimeMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Today */}
      <Card className="border border-burgundy/20">
        <CardBody className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-stable-gray">Today</p>
            <Chip color="success" size="sm" variant="dot">
              Active
            </Chip>
          </div>
          <p className="text-2xl font-bold text-burgundy mb-1">
            ${volumeMetrics.daily.toLocaleString()}
          </p>
          <p className="text-xs text-stable-gray">
            Fees: ${feeMetrics.daily.toLocaleString()}
          </p>
        </CardBody>
      </Card>

      {/* This Month */}
      <Card className="border border-burgundy/20">
        <CardBody className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-stable-gray">This Month</p>
            <Chip color="primary" size="sm" variant="flat">
              MTD
            </Chip>
          </div>
          <p className="text-2xl font-bold text-burgundy mb-1">
            ${volumeMetrics.monthly.toLocaleString()}
          </p>
          <p className="text-xs text-stable-gray">
            Fees: ${feeMetrics.monthly.toLocaleString()}
          </p>
        </CardBody>
      </Card>

      {/* Year to Date */}
      <Card className="border border-burgundy/20">
        <CardBody className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-stable-gray">Year to Date</p>
            <Chip color="secondary" size="sm" variant="flat">
              YTD
            </Chip>
          </div>
          <p className="text-2xl font-bold text-burgundy mb-1">
            ${volumeMetrics.ytd.toLocaleString()}
          </p>
          <p className="text-xs text-stable-gray">
            Fees: ${feeMetrics.ytd.toLocaleString()}
          </p>
        </CardBody>
      </Card>

      {/* All Time */}
      <Card className="border border-burgundy/20">
        <CardBody className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-stable-gray">All Time</p>
            <Chip color="warning" size="sm" variant="flat">
              Total
            </Chip>
          </div>
          <p className="text-2xl font-bold text-burgundy mb-1">
            ${volumeMetrics.allTime.toLocaleString()}
          </p>
          <p className="text-xs text-stable-gray">
            Fees: ${feeMetrics.allTime.toLocaleString()}
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

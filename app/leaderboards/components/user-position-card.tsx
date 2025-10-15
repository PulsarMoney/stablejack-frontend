import type { UserRank } from "@/types/leaderboard";

import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";

interface UserPositionCardProps {
  userRank: UserRank;
  selectedTab: "trading" | "public";
}

export function UserPositionCard({
  userRank,
  selectedTab,
}: UserPositionCardProps) {
  if (!userRank) {
    return null;
  }

  const rank =
    selectedTab === "trading" ? userRank.tradingRank : userRank.publicRank;

  return (
    <Card className="border-2 border-burgundy bg-burgundy/5">
      <CardBody className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-stable-gray mb-1">Your Position</p>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold text-burgundy">#{rank}</p>
              {selectedTab === "public" && (
                <Chip color="primary" variant="flat">
                  {userRank.totalXP?.toLocaleString() || 0} XP
                </Chip>
              )}
              {selectedTab === "trading" && (
                <Chip color="primary" variant="flat">
                  ${userRank.tradingVolume?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
                </Chip>
              )}
            </div>
          </div>
          <div className="text-4xl">
            {rank <= 3 ? "🏆" : rank <= 10 ? "🥇" : "📊"}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

import { Card, CardBody } from "@heroui/card";
import { Progress } from "@heroui/progress";

interface AchievementStatsCardProps {
  totalCompleted: number;
  totalXPEarned: number;
  completionRate: number;
}

export function AchievementStatsCard({
  totalCompleted = 0,
  totalXPEarned = 0,
  completionRate = 0,
}: AchievementStatsCardProps) {
  return (
    <Card className="border-2 border-burgundy/20 bg-burgundy/5">
      <CardBody className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-stable-gray mb-1">
              Achievements Completed
            </p>
            <p className="text-3xl font-bold text-burgundy">{totalCompleted}</p>
          </div>

          <div>
            <p className="text-sm text-stable-gray mb-1">Total XP Earned</p>
            <p className="text-3xl font-bold text-warm-red">
              {totalXPEarned?.toLocaleString() || 0}
            </p>
          </div>

          <div>
            <p className="text-sm text-stable-gray mb-2">Completion Rate</p>
            <Progress
              color="success"
              size="md"
              value={completionRate || 0}
              aria-label="Completion rate"
            />
            <p className="text-sm font-semibold text-burgundy mt-1">
              {completionRate?.toFixed(1) || 0}%
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

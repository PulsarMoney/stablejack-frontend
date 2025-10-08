import type { Achievement } from "@/types/achievement";

import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const getStatusColor = () => {
    switch (achievement.status) {
      case "completed":
        return "success";
      case "in-progress":
        return "primary";
      default:
        return "default";
    }
  };

  const getStatusIcon = () => {
    switch (achievement.status) {
      case "completed":
        return "✓";
      case "in-progress":
        return "⏳";
      default:
        return "🔒";
    }
  };

  const progressPercentage = achievement.progress
    ? (achievement.progress.current / achievement.progress.target) * 100
    : 0;

  return (
    <Card
      className={`border-2 transition-all ${
        achievement.status === "completed"
          ? "border-success/50 bg-success/5"
          : achievement.status === "in-progress"
            ? "border-burgundy/30 hover:border-burgundy/50"
            : "border-burgundy/10 opacity-60"
      }`}
    >
      <CardBody className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="text-3xl">{achievement.icon || getStatusIcon()}</div>
          <Chip color={getStatusColor()} size="sm" variant="flat">
            {achievement.status === "completed"
              ? "Completed"
              : achievement.status === "in-progress"
                ? "In Progress"
                : "Locked"}
          </Chip>
        </div>

        <h3 className="text-lg font-bold text-burgundy mb-2">
          {achievement.title}
        </h3>
        <p className="text-sm text-stable-gray mb-4">
          {achievement.description}
        </p>

        {achievement.progress && achievement.status !== "completed" && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-stable-gray mb-1">
              <span>Progress</span>
              <span>
                {achievement.progress.current} / {achievement.progress.target}
              </span>
            </div>
            <Progress
              aria-label="Achievement progress"
              color="primary"
              size="sm"
              value={progressPercentage}
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <Chip color="warning" size="sm" variant="flat">
            +{achievement.xpReward} XP
          </Chip>
          {achievement.completedAt && (
            <span className="text-xs text-stable-gray">
              Completed {new Date(achievement.completedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

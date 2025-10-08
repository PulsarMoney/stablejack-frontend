import { Tabs, Tab } from "@heroui/tabs";

interface LeaderboardTabsProps {
  selected: string;
  onSelectionChange: (key: string) => void;
}

export function LeaderboardTabs({
  selected,
  onSelectionChange,
}: LeaderboardTabsProps) {
  return (
    <Tabs
      aria-label="Leaderboard types"
      color="primary"
      selectedKey={selected}
      size="lg"
      onSelectionChange={(key) => onSelectionChange(key as string)}
    >
      <Tab key="trading" title="Trading Volume" />
      <Tab key="public" title="Public XP" />
    </Tabs>
  );
}

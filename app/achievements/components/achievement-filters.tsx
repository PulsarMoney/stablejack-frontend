import { Tabs, Tab } from "@heroui/tabs";

import type { AchievementFilters } from "@/types/achievement";

interface AchievementFiltersProps {
  filters: AchievementFilters;
  onFiltersChange: (filters: AchievementFilters) => void;
}

export function AchievementFiltersComponent({
  filters,
  onFiltersChange,
}: AchievementFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <Tabs
        aria-label="Achievement status filter"
        color="primary"
        selectedKey={filters.status || "all"}
        onSelectionChange={(key) =>
          onFiltersChange({ ...filters, status: key as AchievementFilters["status"] })
        }
      >
        <Tab key="all" title="All" />
        <Tab key="in-progress" title="In Progress" />
        <Tab key="completed" title="Completed" />
        <Tab key="locked" title="Locked" />
      </Tabs>
    </div>
  );
}

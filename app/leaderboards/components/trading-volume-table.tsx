import type { TimeRange, TradingLeaderboardEntry } from "@/types/leaderboard";

import { useMemo, useState } from "react";
import { Chip } from "@heroui/chip";
import { Select, SelectItem } from "@heroui/select";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

interface TradingVolumeTableProps {
  data: TradingLeaderboardEntry[];
}

export function TradingVolumeTable({ data }: TradingVolumeTableProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("all-time");

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";

    return rank;
  };

  // Get volume based on selected time range
  const getVolumeForTimeRange = (entry: TradingLeaderboardEntry): number => {
    switch (timeRange) {
      case "daily":
        return entry.dailyVolume || 0;
      case "weekly":
        return entry.weeklyVolume || 0;
      case "monthly":
        return entry.monthlyVolume || 0;
      case "all-time":
      default:
        return entry.volume;
    }
  };

  // Sort data based on selected time range volume
  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const volumeA = getVolumeForTimeRange(a);
      const volumeB = getVolumeForTimeRange(b);

      return volumeB - volumeA;
    });

    // Re-assign ranks based on new sorting
    return sorted.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
  }, [data, timeRange]);

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case "daily":
        return "Today";
      case "weekly":
        return "This Week";
      case "monthly":
        return "This Month";
      case "all-time":
      default:
        return "All Time";
    }
  };

  return (
    <div className="space-y-4">
      {/* Time Range Filter */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-burgundy">
          Trading Volume - {getTimeRangeLabel()}
        </h3>
        <Select
          className="max-w-[200px]"
          label="Time Range"
          selectedKeys={[timeRange]}
          size="sm"
          onChange={(e) => setTimeRange(e.target.value as TimeRange)}
        >
          <SelectItem key="daily">Daily</SelectItem>
          <SelectItem key="weekly">Weekly</SelectItem>
          <SelectItem key="monthly">Monthly</SelectItem>
          <SelectItem key="all-time">All Time</SelectItem>
        </Select>
      </div>

      {/* Table */}
      <Table aria-label="Trading volume leaderboard">
        <TableHeader>
          <TableColumn>RANK</TableColumn>
          <TableColumn>USER</TableColumn>
          <TableColumn>VOLUME</TableColumn>
          <TableColumn>XP</TableColumn>
        </TableHeader>
        <TableBody>
          {sortedData.map((entry) => (
            <TableRow
              key={entry.userId}
              className={entry.isCurrentUser ? "bg-burgundy/5" : ""}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">
                    {getRankBadge(entry.rank)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {entry.email ||
                      `${entry.walletAddress.slice(0, 6)}...${entry.walletAddress.slice(-4)}`}
                  </span>
                  {entry.isCurrentUser && (
                    <Chip color="primary" size="sm" variant="flat">
                      You
                    </Chip>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-burgundy">
                  ${getVolumeForTimeRange(entry).toLocaleString()}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-semibold">
                  {entry.xp.toLocaleString()}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

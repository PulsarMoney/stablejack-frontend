import type { TradingLeaderboardEntry } from "@/types/leaderboard";

import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
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
  page?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
  onPageChange?: (newPage: number) => void;
}

export function TradingVolumeTable({
  data,
  page = 1,
  hasNext = false,
  hasPrevious = false,
  onPageChange,
}: TradingVolumeTableProps) {
  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";

    return rank;
  };

  const formatNumber = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return "0.00";
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <Table aria-label="Trading volume leaderboard">
        <TableHeader>
          <TableColumn>RANK</TableColumn>
          <TableColumn>USER</TableColumn>
          <TableColumn>VOLUME</TableColumn>
          <TableColumn>TRADES</TableColumn>
          <TableColumn>PNL</TableColumn>
          <TableColumn>REFERRAL VOLUME</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((entry) => (
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
                    {entry.email || entry.walletAddress}
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
                  ${formatNumber(entry.volume)}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-semibold">
                  {entry.fillCount?.toLocaleString() || "0"}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`font-semibold ${(entry.realizedPnl || 0) >= 0 ? "text-success" : "text-danger"}`}
                >
                  ${formatNumber(entry.realizedPnl)}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-secondary">
                  ${formatNumber(entry.referralVolume)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {onPageChange && (
        <div className="flex items-center justify-between">
          <Button
            color="primary"
            isDisabled={!hasPrevious}
            size="sm"
            variant="flat"
            onPress={() => onPageChange(page - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-stable-gray">Page {page}</span>
          <Button
            color="primary"
            isDisabled={!hasNext}
            size="sm"
            variant="flat"
            onPress={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

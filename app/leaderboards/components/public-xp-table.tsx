import type { PublicLeaderboardEntry } from "@/types/leaderboard";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";

interface PublicXPTableProps {
  data: PublicLeaderboardEntry[];
  page?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
  onPageChange?: (newPage: number) => void;
}

export function PublicXPTable({
  data,
  page = 1,
  hasNext = false,
  hasPrevious = false,
  onPageChange,
}: PublicXPTableProps) {
  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";

    return rank;
  };

  return (
    <div className="space-y-4">
      <Table aria-label="Public XP leaderboard">
        <TableHeader>
          <TableColumn>RANK</TableColumn>
          <TableColumn>USER</TableColumn>
          <TableColumn>LEVEL</TableColumn>
          <TableColumn>TOTAL XP</TableColumn>
          <TableColumn>TRADING</TableColumn>
          <TableColumn>REFERRALS</TableColumn>
          <TableColumn>TASKS</TableColumn>
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
                  {entry.level}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-burgundy text-lg">
                  {Math.floor(entry.totalXP).toLocaleString()}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-primary">
                  {Math.floor(entry.tradingXP).toLocaleString()}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-secondary">
                  {Math.floor(entry.referralXP).toLocaleString()}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-success">
                  {Math.floor(entry.achievementXP).toLocaleString()}
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

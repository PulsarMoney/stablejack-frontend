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

interface PublicXPTableProps {
  data: PublicLeaderboardEntry[];
}

export function PublicXPTable({ data }: PublicXPTableProps) {
  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";

    return rank;
  };

  return (
    <Table aria-label="Public XP leaderboard">
      <TableHeader>
        <TableColumn>RANK</TableColumn>
        <TableColumn>USER</TableColumn>
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
              <span className="font-semibold text-burgundy text-lg">
                {entry.totalXP.toLocaleString()}
              </span>
            </TableCell>
            <TableCell>
              <span className="font-semibold text-primary">
                {entry.tradingXP.toLocaleString()}
              </span>
            </TableCell>
            <TableCell>
              <span className="font-semibold text-secondary">
                {entry.referralXP.toLocaleString()}
              </span>
            </TableCell>
            <TableCell>
              <span className="font-semibold text-success">
                {entry.achievementXP.toLocaleString()}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

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
        <TableColumn>BREAKDOWN</TableColumn>
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
              <div className="flex gap-1 flex-wrap">
                <Chip color="primary" size="sm" variant="flat">
                  Trading: {entry.tradingXP.toLocaleString()}
                </Chip>
                <Chip color="secondary" size="sm" variant="flat">
                  Referrals: {entry.referralXP.toLocaleString()}
                </Chip>
                <Chip color="success" size="sm" variant="flat">
                  Tasks: {entry.achievementXP.toLocaleString()}
                </Chip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

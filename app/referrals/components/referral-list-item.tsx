import type { Referral } from "@/types/referral";

import { Chip } from "@heroui/chip";

interface ReferralListItemProps {
  referral: Referral;
  onDetailClick?: (referral: Referral) => void;
  showActivity?: boolean;
  hasTier2?: boolean;
  isExpanded?: boolean;
  tier2Count?: number;
  onExpandToggle?: () => void;
}

export function ReferralListItem({
  onDetailClick,
  referral,
  showActivity = true,
  hasTier2 = false,
  isExpanded = false,
  tier2Count = 0,
  onExpandToggle,
}: ReferralListItemProps) {
  const displayName =
    referral.email ||
    `${referral.walletAddress.slice(0, 6)}...${referral.walletAddress.slice(-4)}`;

  const activityColor = referral.isActive ? "success" : "default";

  return (
    <div
      className={`grid grid-cols-[1fr_auto_auto_auto_auto_auto_auto] gap-4 p-4 items-center border-b border-burgundy/10 transition-all ${
        referral.tier === 1
          ? "bg-beige/50 hover:bg-beige/70"
          : "bg-beige/30 hover:bg-beige/50"
      } ${onDetailClick ? "cursor-pointer" : ""}`}
      onClick={() => onDetailClick?.(referral)}
      role={onDetailClick ? "button" : undefined}
      tabIndex={onDetailClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onDetailClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onDetailClick(referral);
        }
      }}
    >
      {/* Username with Avatar and Tier 2 Expand */}
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            referral.tier === 1 ? "bg-burgundy/20" : "bg-burgundy/10"
          }`}
        >
          <span className="text-burgundy font-bold text-sm">
            {referral.email
              ? referral.email.charAt(0).toUpperCase()
              : referral.walletAddress.slice(2, 3).toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-1">
          <p className="font-semibold text-sm">{displayName}</p>
          {hasTier2 && (
            <button
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-burgundy/10 hover:bg-burgundy/20 transition-colors text-xs font-medium text-burgundy border border-burgundy/30"
              onClick={(e) => {
                e.stopPropagation();
                onExpandToggle?.();
              }}
              aria-label={isExpanded ? "Collapse tier 2 referrals" : "Expand tier 2 referrals"}
            >
              <span className="font-bold">{isExpanded ? "▼" : "▶"}</span>
              <span>{tier2Count} Tier 2</span>
            </button>
          )}
        </div>
      </div>

      {/* Tier */}
      <div className="text-center min-w-[80px]">
        <Chip
          color={referral.tier === 1 ? "primary" : "secondary"}
          size="sm"
          variant="flat"
        >
          Tier {referral.tier}
        </Chip>
      </div>

      {/* Joined */}
      <div className="text-sm text-stable-gray min-w-[100px]">
        {new Date(referral.joinedAt).toLocaleDateString()}
      </div>

      {/* Total Volume */}
      <div className="text-right min-w-[120px]">
        <p className="font-semibold text-burgundy">
          ${referral.volume.toLocaleString()}
        </p>
      </div>

      {/* Total Fees */}
      <div className="text-right min-w-[100px]">
        <p className="font-semibold text-burgundy">
          ${referral.feeVolume?.toLocaleString() || 0}
        </p>
      </div>

      {/* Total Commission */}
      <div className="text-right min-w-[140px]">
        <p className="font-semibold text-warm-red">
          ${referral.commission.toFixed(2)}
        </p>
      </div>

      {/* Status */}
      <div className="text-center min-w-[100px]">
        <Chip color={activityColor} size="sm" variant="dot">
          {referral.isActive ? "Active" : "Inactive"}
        </Chip>
      </div>
    </div>
  );
}

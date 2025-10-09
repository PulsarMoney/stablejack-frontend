import type { Referral } from "@/types/referral";

import { Chip } from "@heroui/chip";

interface ReferralListItemProps {
  referral: Referral;
  onDetailClick?: (referral: Referral) => void;
  showActivity?: boolean;
}

export function ReferralListItem({
  onDetailClick,
  referral,
  showActivity = true,
}: ReferralListItemProps) {
  const displayName =
    referral.email ||
    `${referral.walletAddress.slice(0, 6)}...${referral.walletAddress.slice(-4)}`;

  const activityStatus = referral.isActive ? "active" : "inactive";
  const activityColor = referral.isActive ? "success" : "default";

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
        referral.tier === 1
          ? "bg-beige/50 border-burgundy/10 hover:border-burgundy/30"
          : "bg-beige/30 border-burgundy/5 hover:border-burgundy/20"
      } ${onDetailClick ? "cursor-pointer" : ""}`}
      role={onDetailClick ? "button" : undefined}
      tabIndex={onDetailClick ? 0 : undefined}
      onClick={() => onDetailClick?.(referral)}
      onKeyDown={(e) => {
        if (onDetailClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onDetailClick(referral);
        }
      }}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            referral.tier === 1 ? "bg-burgundy/20" : "bg-burgundy/10"
          }`}
        >
          <span className="text-burgundy font-bold">
            {referral.email
              ? referral.email.charAt(0).toUpperCase()
              : referral.walletAddress.slice(2, 3).toUpperCase()}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold">{displayName}</p>
            {showActivity && (
              <Chip color={activityColor} size="sm" variant="dot">
                {activityStatus}
              </Chip>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-stable-gray">
            <span>
              Joined {new Date(referral.joinedAt).toLocaleDateString()}
            </span>
            <span>•</span>
            <span>Tier {referral.tier}</span>
            {referral.lastTradeDate && (
              <>
                <span>•</span>
                <span>
                  Last trade:{" "}
                  {new Date(referral.lastTradeDate).toLocaleDateString()}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 text-right">
        <div>
          <p className="text-xs text-stable-gray mb-1">Volume</p>
          <p className="font-semibold text-burgundy">
            ${referral.volume.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-stable-gray mb-1">Earned</p>
          <p className="font-semibold text-burgundy">
            ${referral.earnings.toFixed(2)}
          </p>
        </div>
        {referral.feeVolume !== undefined && (
          <div>
            <p className="text-xs text-stable-gray mb-1">Fees</p>
            <p className="font-semibold text-burgundy">
              ${referral.feeVolume.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

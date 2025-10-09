import type { Referral } from "@/types/referral";

import { Chip } from "@heroui/chip";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";

interface ReferralDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  referral: Referral | null;
  tier2Count?: number;
}

export function ReferralDetailModal({
  isOpen,
  onClose,
  referral,
  tier2Count = 0,
}: ReferralDetailModalProps) {
  if (!referral) return null;

  const displayName =
    referral.email ||
    `${referral.walletAddress.slice(0, 6)}...${referral.walletAddress.slice(-4)}`;

  const activityColor = referral.isActive ? "success" : "default";

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    referral.tier === 1 ? "bg-burgundy/20" : "bg-burgundy/10"
                  }`}
                >
                  <span className="text-burgundy font-bold text-lg">
                    {referral.email
                      ? referral.email.charAt(0).toUpperCase()
                      : referral.walletAddress.slice(2, 3).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{displayName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Chip
                      color={referral.tier === 1 ? "primary" : "secondary"}
                      size="sm"
                      variant="flat"
                    >
                      Tier {referral.tier}
                    </Chip>
                    <Chip color={activityColor} size="sm" variant="dot">
                      {referral.isActive ? "Active" : "Inactive"}
                    </Chip>
                  </div>
                </div>
              </div>
            </ModalHeader>

            <ModalBody>
              {/* User Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-stable-gray mb-2">
                    User Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-stable-gray">Wallet Address</p>
                      <p className="font-mono text-sm">
                        {referral.walletAddress.slice(0, 10)}...
                        {referral.walletAddress.slice(-8)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-stable-gray">Joined Date</p>
                      <p className="text-sm">
                        {new Date(referral.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                    {referral.email && (
                      <div>
                        <p className="text-xs text-stable-gray">Email</p>
                        <p className="text-sm">{referral.email}</p>
                      </div>
                    )}
                    {referral.lastTradeDate && (
                      <div>
                        <p className="text-xs text-stable-gray">Last Trade</p>
                        <p className="text-sm">
                          {new Date(referral.lastTradeDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Volume Metrics */}
                <div>
                  <h4 className="font-semibold text-sm text-stable-gray mb-2">
                    Volume Breakdown
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-beige/50 rounded-lg">
                      <p className="text-xs text-stable-gray mb-1">Daily</p>
                      <p className="text-lg font-bold text-burgundy">
                        ${referral.dailyVolume?.toLocaleString() || 0}
                      </p>
                    </div>
                    <div className="p-3 bg-beige/50 rounded-lg">
                      <p className="text-xs text-stable-gray mb-1">Monthly</p>
                      <p className="text-lg font-bold text-burgundy">
                        ${referral.monthlyVolume?.toLocaleString() || 0}
                      </p>
                    </div>
                    <div className="p-3 bg-beige/50 rounded-lg">
                      <p className="text-xs text-stable-gray mb-1">YTD</p>
                      <p className="text-lg font-bold text-burgundy">
                        ${referral.ytdVolume?.toLocaleString() || 0}
                      </p>
                    </div>
                    <div className="p-3 bg-beige/50 rounded-lg">
                      <p className="text-xs text-stable-gray mb-1">All Time</p>
                      <p className="text-lg font-bold text-burgundy">
                        ${referral.volume.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Earnings & Fees */}
                <div>
                  <h4 className="font-semibold text-sm text-stable-gray mb-2">
                    Financial Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-warm-red/5 rounded-lg border border-warm-red/20">
                      <p className="text-xs text-stable-gray mb-1">
                        Your Earnings
                      </p>
                      <p className="text-2xl font-bold text-warm-red">
                        ${referral.earnings.toFixed(2)}
                      </p>
                    </div>
                    {referral.feeVolume !== undefined && (
                      <div className="p-4 bg-burgundy/5 rounded-lg border border-burgundy/20">
                        <p className="text-xs text-stable-gray mb-1">
                          Fee Volume Generated
                        </p>
                        <p className="text-2xl font-bold text-burgundy">
                          ${referral.feeVolume.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tier 2 Network (if tier1) */}
                {referral.tier === 1 && tier2Count > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-stable-gray mb-2">
                      Tier 2 Network
                    </h4>
                    <div className="p-4 bg-burgundy/5 rounded-lg border border-burgundy/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-stable-gray">
                            Total Tier 2 Referrals
                          </p>
                          <p className="text-2xl font-bold text-burgundy">
                            {tier2Count}
                          </p>
                        </div>
                        <Chip color="secondary" variant="flat">
                          Indirect Network
                        </Chip>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ModalBody>

            <ModalFooter>
              <p className="text-xs text-stable-gray mr-auto">
                User ID: {referral.userId}
              </p>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

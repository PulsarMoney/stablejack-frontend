import type { Referral } from "@/types/referral";

import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useState } from "react";

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
  const [copied, setCopied] = useState(false);

  if (!referral) return null;

  // Display email first, then wallet address (if it looks like a real address), then userId
  const displayName =
    referral.email ||
    (referral.walletAddress.startsWith("0x")
      ? referral.walletAddress
      : `${referral.userId.slice(0, 8)}...${referral.userId.slice(-6)}`);

  const activityColor = referral.isActive ? "success" : "default";

  const copyAddress = () => {
    // Copy real wallet address if available, otherwise userId
    const textToCopy = referral.walletAddress.startsWith("0x")
      ? referral.walletAddress
      : referral.userId;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalContent>
        {() => (
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
                      : referral.walletAddress.startsWith("0x")
                        ? referral.walletAddress.slice(2, 4).toUpperCase()
                        : referral.userId.slice(0, 2).toUpperCase()}
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
                      <p className="text-xs text-stable-gray mb-1">
                        {referral.walletAddress.startsWith("0x")
                          ? "Wallet Address"
                          : "User ID"}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-sm break-all">
                          {referral.walletAddress.startsWith("0x")
                            ? referral.walletAddress
                            : referral.userId}
                        </p>
                        <Button
                          isIconOnly
                          color="primary"
                          size="sm"
                          variant="light"
                          onPress={copyAddress}
                        >
                          {copied ? "✓" : "📋"}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-stable-gray">Joined Date</p>
                      <p className="text-sm">
                        {new Date(referral.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                    {referral.email && (
                      <div className="col-span-2">
                        <p className="text-xs text-stable-gray">Email</p>
                        <p className="text-sm">{referral.email}</p>
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

                {/* Commission & Fees */}
                <div>
                  <h4 className="font-semibold text-sm text-stable-gray mb-2">
                    Financial Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-warm-red/5 rounded-lg border border-warm-red/20">
                      <p className="text-xs text-stable-gray mb-1">
                        Your Commission
                      </p>
                      <p className="text-2xl font-bold text-warm-red">
                        ${referral.commission.toFixed(2)}
                      </p>
                    </div>
                    {referral.feeVolume !== undefined && (
                      <div className="p-4 bg-burgundy/5 rounded-lg border border-burgundy/20">
                        <p className="text-xs text-stable-gray mb-1">
                          Total Fees
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
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

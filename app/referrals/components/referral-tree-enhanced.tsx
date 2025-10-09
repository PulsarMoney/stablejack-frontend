"use client";

import type { Referral, ReferralSortBy, ReferralSortOrder } from "@/types/referral";

import { useState, useMemo } from "react";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

import { groupTier2ByParent } from "@/lib/mock-data/mock-referral-data";

import { ReferralListItem } from "./referral-list-item";

interface ReferralTreeEnhancedProps {
  referrals: Referral[];
  onReferralClick?: (referral: Referral) => void;
}

export function ReferralTreeEnhanced({
  onReferralClick,
  referrals,
}: ReferralTreeEnhancedProps) {
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<ReferralSortBy>("volume");
  const [sortOrder, setSortOrder] = useState<ReferralSortOrder>("desc");

  // Group tier2 referrals by their parent
  const tier2ByParent = useMemo(
    () => groupTier2ByParent(referrals),
    [referrals]
  );

  // Get tier1 referrals and enrich with tier2 data
  const tier1Referrals = useMemo(() => {
    return referrals
      .filter((r) => r.tier === 1)
      .map((tier1) => {
        const tier2Children = tier2ByParent.get(tier1.userId) || [];

        return {
          ...tier1,
          tier2Count: tier2Children.length,
          tier2TotalVolume: tier2Children.reduce((sum, t2) => sum + t2.volume, 0),
          tier2TotalEarnings: tier2Children.reduce(
            (sum, t2) => sum + t2.earnings,
            0
          ),
        };
      });
  }, [referrals, tier2ByParent]);

  // Filter and sort tier1 referrals
  const filteredAndSortedTier1 = useMemo(() => {
    let filtered = tier1Referrals;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();

      filtered = filtered.filter(
        (r) =>
          r.email?.toLowerCase().includes(query) ||
          r.walletAddress.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "volume":
          comparison = a.volume - b.volume;
          break;
        case "earnings":
          comparison = a.earnings - b.earnings;
          break;
        case "date":
          comparison =
            new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
          break;
        case "tier2Count":
          comparison = a.tier2Count - b.tier2Count;
          break;
        case "active":
          comparison = (a.isActive ? 1 : 0) - (b.isActive ? 1 : 0);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

    return sorted;
  }, [tier1Referrals, searchQuery, sortBy, sortOrder]);

  const toggleExpand = (userId: string) => {
    const newExpanded = new Set(expandedUsers);

    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedUsers(newExpanded);
  };

  const expandAll = () => {
    setExpandedUsers(new Set(tier1Referrals.map((r) => r.userId)));
  };

  const collapseAll = () => {
    setExpandedUsers(new Set());
  };

  if (referrals.length === 0) {
    return (
      <Card className="border-2 border-burgundy/20">
        <CardHeader className="pb-0 pt-6 px-6">
          <h2 className="text-2xl font-bold text-burgundy">Your Referrals</h2>
        </CardHeader>
        <CardBody className="p-12 text-center">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-bold text-burgundy mb-2">
            No Referrals Yet
          </h3>
          <p className="text-stable-gray">
            Share your referral code to start building your network
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-burgundy/20">
      <CardHeader className="pb-0 pt-6 px-6">
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-2xl font-bold text-burgundy mb-1">
              Your Referral Network
            </h2>
            <p className="text-sm text-stable-gray">
              {tier1Referrals.length} direct • {tier2ByParent.size} with tier 2
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="flat" onPress={expandAll}>
              Expand All
            </Button>
            <Button size="sm" variant="flat" onPress={collapseAll}>
              Collapse All
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardBody className="p-6">
        {/* Controls */}
        <div className="flex gap-4 mb-6">
          <Input
            className="max-w-xs"
            placeholder="Search by email or wallet..."
            size="sm"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Select
            className="max-w-xs"
            label="Sort by"
            selectedKeys={[sortBy]}
            size="sm"
            onChange={(e) => setSortBy(e.target.value as ReferralSortBy)}
          >
            <SelectItem key="volume" value="volume">
              Volume
            </SelectItem>
            <SelectItem key="earnings" value="earnings">
              Earnings
            </SelectItem>
            <SelectItem key="date" value="date">
              Date Joined
            </SelectItem>
            <SelectItem key="tier2Count" value="tier2Count">
              Tier 2 Count
            </SelectItem>
            <SelectItem key="active" value="active">
              Activity
            </SelectItem>
          </Select>

          <Select
            className="max-w-[120px]"
            label="Order"
            selectedKeys={[sortOrder]}
            size="sm"
            onChange={(e) => setSortOrder(e.target.value as ReferralSortOrder)}
          >
            <SelectItem key="desc" value="desc">
              Descending
            </SelectItem>
            <SelectItem key="asc" value="asc">
              Ascending
            </SelectItem>
          </Select>
        </div>

        {/* Referral List */}
        <div className="space-y-4">
          {filteredAndSortedTier1.map((tier1) => {
            const isExpanded = expandedUsers.has(tier1.userId);
            const tier2Children = tier2ByParent.get(tier1.userId) || [];
            const hasTier2 = tier2Children.length > 0;

            return (
              <div key={tier1.userId} className="space-y-2">
                {/* Tier 1 Card */}
                {hasTier2 ? (
                  // Custom card for tier1 with tier2
                  <div className="flex flex-col p-4 rounded-lg border transition-all bg-beige/50 border-burgundy/10 hover:border-burgundy/30">
                    {/* Main row with avatar, info, and metrics */}
                    <div
                      className={`flex items-start justify-between ${
                        onReferralClick ? "cursor-pointer" : ""
                      }`}
                      onClick={() => onReferralClick?.(tier1)}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-burgundy/20">
                          <span className="text-burgundy font-bold">
                            {tier1.email
                              ? tier1.email.charAt(0).toUpperCase()
                              : tier1.walletAddress.slice(2, 3).toUpperCase()}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">
                              {tier1.email ||
                                `${tier1.walletAddress.slice(0, 6)}...${tier1.walletAddress.slice(-4)}`}
                            </p>
                            <Chip
                              color={tier1.isActive ? "success" : "default"}
                              size="sm"
                              variant="dot"
                            >
                              {tier1.isActive ? "active" : "inactive"}
                            </Chip>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-stable-gray">
                            <span>
                              Joined{" "}
                              {new Date(tier1.joinedAt).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span>Tier 1</span>
                            {tier1.lastTradeDate && (
                              <>
                                <span>•</span>
                                <span>
                                  Last trade:{" "}
                                  {new Date(
                                    tier1.lastTradeDate
                                  ).toLocaleDateString()}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 text-right">
                        <div>
                          <p className="text-xs text-stable-gray mb-1">
                            Volume
                          </p>
                          <p className="font-semibold text-burgundy">
                            ${tier1.volume.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-stable-gray mb-1">
                            Earned
                          </p>
                          <p className="font-semibold text-burgundy">
                            ${tier1.earnings.toFixed(2)}
                          </p>
                        </div>
                        {tier1.feeVolume !== undefined && (
                          <div>
                            <p className="text-xs text-stable-gray mb-1">
                              Fees
                            </p>
                            <p className="font-semibold text-burgundy">
                              ${tier1.feeVolume.toLocaleString()}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tier 2 summary row */}
                    {!isExpanded && (
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-burgundy/10">
                        <div className="flex gap-2">
                          <Chip color="secondary" size="sm" variant="flat">
                            T2 Volume: $
                            {tier1.tier2TotalVolume.toLocaleString()}
                          </Chip>
                          <Chip color="secondary" size="sm" variant="flat">
                            T2 Earnings: ${tier1.tier2TotalEarnings.toFixed(2)}
                          </Chip>
                        </div>
                        <Button
                          color="primary"
                          size="sm"
                          variant="light"
                          onPress={() => toggleExpand(tier1.userId)}
                        >
                          ▼ {tier2Children.length} Tier 2
                        </Button>
                      </div>
                    )}

                    {/* Expand button when expanded */}
                    {isExpanded && (
                      <div className="flex justify-end mt-3 pt-3 border-t border-burgundy/10">
                        <Button
                          color="primary"
                          size="sm"
                          variant="light"
                          onPress={() => toggleExpand(tier1.userId)}
                        >
                          ▲ Collapse {tier2Children.length} Tier 2
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  // Standard card for tier1 without tier2
                  <ReferralListItem
                    referral={tier1}
                    onDetailClick={onReferralClick}
                  />
                )}

                {/* Expanded Tier 2 Children */}
                {isExpanded && hasTier2 && (
                  <div className="ml-12 pl-4 border-l-2 border-burgundy/20 space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Chip color="secondary" variant="flat">
                        Tier 2 Referrals ({tier2Children.length})
                      </Chip>
                      <span className="text-xs text-stable-gray">
                        Total Volume: ${tier1.tier2TotalVolume.toLocaleString()} • Earnings: $
                        {tier1.tier2TotalEarnings.toFixed(2)}
                      </span>
                    </div>
                    {tier2Children.map((tier2) => (
                      <ReferralListItem
                        key={tier2.userId}
                        referral={tier2}
                        onDetailClick={onReferralClick}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredAndSortedTier1.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stable-gray">
              No referrals match your search criteria
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

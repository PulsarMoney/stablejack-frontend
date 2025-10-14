"use client";

import type {
  Referral,
  ReferralSortBy,
  ReferralSortOrder,
} from "@/types/referral";

import { useMemo, useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

import { ReferralListItem } from "./referral-list-item";

import { groupTier2ByParent } from "@/lib/mock-data/mock-referral-data";

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
    [referrals],
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
          tier2TotalVolume: tier2Children.reduce(
            (sum, t2) => sum + t2.volume,
            0,
          ),
          tier2TotalCommission: tier2Children.reduce(
            (sum, t2) => sum + t2.commission,
            0,
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
          r.userId.toLowerCase().includes(query),
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "volume":
          comparison = a.volume - b.volume;
          break;
        case "commission":
          comparison = a.commission - b.commission;
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
            placeholder="Search by email or user ID..."
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
            <SelectItem key="volume">Volume</SelectItem>
            <SelectItem key="commission">Commission</SelectItem>
            <SelectItem key="date">Date Joined</SelectItem>
            <SelectItem key="tier2Count">Tier 2 Count</SelectItem>
            <SelectItem key="active">Activity</SelectItem>
          </Select>

          <Select
            className="max-w-[120px]"
            label="Order"
            selectedKeys={[sortOrder]}
            size="sm"
            onChange={(e) => setSortOrder(e.target.value as ReferralSortOrder)}
          >
            <SelectItem key="desc">Descending</SelectItem>
            <SelectItem key="asc">Ascending</SelectItem>
          </Select>
        </div>

        {/* Referral Table */}
        <div className="border-2 border-burgundy/20 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto_auto_auto] gap-4 p-4 bg-burgundy/10 font-semibold text-sm text-burgundy border-b-2 border-burgundy/20">
            <div>Username</div>
            <div className="text-center min-w-[80px]">Tier</div>
            <div className="min-w-[100px]">Joined</div>
            <div className="text-right min-w-[120px]">Total Volume</div>
            <div className="text-right min-w-[100px]">Total Fees</div>
            <div className="text-right min-w-[140px]">Total Commission</div>
            <div className="text-center min-w-[100px]">Status</div>
          </div>

          {/* Table Body */}
          {filteredAndSortedTier1.map((tier1) => {
            const isExpanded = expandedUsers.has(tier1.userId);
            const tier2Children = tier2ByParent.get(tier1.userId) || [];
            const hasTier2 = tier2Children.length > 0;

            return (
              <div key={tier1.userId}>
                {/* Tier 1 Row */}
                <ReferralListItem
                  hasTier2={hasTier2}
                  isExpanded={isExpanded}
                  referral={tier1}
                  tier2Count={tier2Children.length}
                  onDetailClick={onReferralClick}
                  onExpandToggle={() => toggleExpand(tier1.userId)}
                />

                {/* Expanded Tier 2 Children */}
                {isExpanded && hasTier2 && (
                  <div className="bg-burgundy/10">
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

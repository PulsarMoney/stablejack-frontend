import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { useRouter } from "next/navigation";

interface Referral {
  id: string;
  email: string;
  tier: 1 | 2;
  volume: number;
  earnings: number;
  joinedAt: string;
}

interface RecentReferralsProps {
  referrals: Referral[];
}

export function RecentReferrals({ referrals }: RecentReferralsProps) {
  const router = useRouter();

  if (!referrals || referrals.length === 0) {
    return null;
  }

  return (
    <Card className="border-2 border-burgundy/20">
      <CardHeader className="pb-0 pt-6 px-6">
        <h2 className="text-2xl font-bold text-burgundy">Recent Referrals</h2>
      </CardHeader>
      <CardBody className="p-6">
        <div className="space-y-4">
          {referrals.slice(0, 5).map((referral) => (
            <div
              key={referral.id}
              className="flex items-center justify-between p-4 bg-beige/50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <Chip
                  color={referral.tier === 1 ? "primary" : "secondary"}
                  size="sm"
                  variant="flat"
                >
                  Tier {referral.tier}
                </Chip>
                <div>
                  <p className="font-semibold">{referral.email}</p>
                  <p className="text-xs text-stable-gray">
                    Joined {new Date(referral.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-burgundy">
                  ${referral.volume.toLocaleString()}
                </p>
                <p className="text-xs text-stable-gray">
                  Earned: ${referral.earnings.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        {referrals.length > 5 && (
          <Button
            className="w-full mt-4"
            color="primary"
            variant="flat"
            onPress={() => router.push("/referrals")}
          >
            View All Referrals
          </Button>
        )}
      </CardBody>
    </Card>
  );
}

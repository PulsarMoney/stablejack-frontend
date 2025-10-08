import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";

interface Referral {
  id: string;
  email: string;
  tier: 1 | 2;
  volume: number;
  earnings: number;
  joinedAt: string;
}

interface ReferralTreeProps {
  referrals: Referral[];
}

export function ReferralTree({ referrals }: ReferralTreeProps) {
  const tier1Referrals = referrals.filter((r) => r.tier === 1);
  const tier2Referrals = referrals.filter((r) => r.tier === 2);

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
        <h2 className="text-2xl font-bold text-burgundy">Your Referrals</h2>
      </CardHeader>
      <CardBody className="p-6">
        {/* Tier 1 Referrals */}
        {tier1Referrals.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Chip color="primary" variant="flat">
                Tier 1
              </Chip>
              <span className="text-sm text-stable-gray">
                Direct Referrals ({tier1Referrals.length})
              </span>
            </div>
            <div className="space-y-3">
              {tier1Referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-4 bg-beige/50 rounded-lg border border-burgundy/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-burgundy/20 flex items-center justify-center">
                      <span className="text-burgundy font-bold">
                        {referral.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{referral.email}</p>
                      <p className="text-xs text-stable-gray">
                        Joined{" "}
                        {new Date(referral.joinedAt).toLocaleDateString()}
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
          </div>
        )}

        {/* Tier 2 Referrals */}
        {tier2Referrals.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Chip color="secondary" variant="flat">
                Tier 2
              </Chip>
              <span className="text-sm text-stable-gray">
                Indirect Referrals ({tier2Referrals.length})
              </span>
            </div>
            <div className="space-y-3 pl-6 border-l-2 border-burgundy/20">
              {tier2Referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-4 bg-beige/30 rounded-lg border border-burgundy/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center">
                      <span className="text-burgundy font-bold">
                        {referral.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{referral.email}</p>
                      <p className="text-xs text-stable-gray">
                        Joined{" "}
                        {new Date(referral.joinedAt).toLocaleDateString()}
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
          </div>
        )}
      </CardBody>
    </Card>
  );
}

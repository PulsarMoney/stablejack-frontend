import { Card, CardBody } from "@heroui/card";
import { useRouter } from "next/navigation";

export function QuickActions() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-2 border-burgundy/10 hover:border-burgundy/30 transition-colors cursor-pointer">
        <CardBody
          className="p-6 flex flex-col items-center text-center gap-4"
          onClick={() => router.push("/referrals")}
        >
          <div className="text-4xl">👥</div>
          <div>
            <h3 className="text-xl font-bold text-burgundy mb-2">Referrals</h3>
            <p className="text-sm text-stable-gray">
              Manage your referral code and view your referral tree
            </p>
          </div>
        </CardBody>
      </Card>

      <Card className="border-2 border-burgundy/10 hover:border-burgundy/30 transition-colors cursor-pointer">
        <CardBody
          className="p-6 flex flex-col items-center text-center gap-4"
          onClick={() => router.push("/leaderboards")}
        >
          <div className="text-4xl">🏆</div>
          <div>
            <h3 className="text-xl font-bold text-burgundy mb-2">
              Leaderboards
            </h3>
            <p className="text-sm text-stable-gray">
              Check your ranking and compete with other traders
            </p>
          </div>
        </CardBody>
      </Card>

      <Card className="border-2 border-burgundy/10 hover:border-burgundy/30 transition-colors cursor-pointer">
        <CardBody
          className="p-6 flex flex-col items-center text-center gap-4"
          onClick={() => router.push("/achievements")}
        >
          <div className="text-4xl">🎯</div>
          <div>
            <h3 className="text-xl font-bold text-burgundy mb-2">
              Achievements
            </h3>
            <p className="text-sm text-stable-gray">
              Track your progress and unlock milestones
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

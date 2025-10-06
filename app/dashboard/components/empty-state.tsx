import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

export function EmptyState() {
  const router = useRouter();

  return (
    <Card className="border-2 border-burgundy/20">
      <CardBody className="p-12 text-center">
        <div className="text-6xl mb-4">👋</div>
        <h3 className="text-2xl font-bold text-burgundy mb-2">
          Start Referring!
        </h3>
        <p className="text-stable-gray mb-6">
          You haven&apos;t referred anyone yet. Share your referral code to
          start earning rewards.
        </p>
        <Button
          color="primary"
          size="lg"
          onPress={() => router.push("/referrals")}
        >
          Get Your Referral Code
        </Button>
      </CardBody>
    </Card>
  );
}

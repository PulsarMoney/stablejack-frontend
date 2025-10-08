"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";

import { subtitle, title } from "@/components/primitives";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-12 py-16 md:py-24 px-4">
      <div className="inline-block max-w-3xl text-center">
        <span className={title({ size: "lg" })}>StableJack&nbsp;</span>
        <span className={title({ size: "lg", color: "burgundy" })}>
          Referral & Rewards
        </span>
        <div className={subtitle({ class: "mt-6 max-w-2xl mx-auto" })}>
          Earn rewards by referring traders and climbing the leaderboards. Track
          your referrals, monitor your trading volume, and unlock achievements.
        </div>
      </div>

      <Button
        className="text-lg px-8 py-6 shadow-lg"
        color="primary"
        size="lg"
        onPress={() => login()}
      >
        Connect Wallet to Get Started
      </Button>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full mt-8">
        <Card className="border-2 border-burgundy/10 hover:border-burgundy/30 transition-colors">
          <CardBody className="p-6">
            <h3 className="text-xl font-bold text-burgundy mb-3">
              2-Tier Referrals
            </h3>
            <p className="text-stable-gray">
              Earn from direct referrals (Tier 1) and their referrals (Tier 2).
              Build your network and maximize your earnings.
            </p>
          </CardBody>
        </Card>

        <Card className="border-2 border-burgundy/10 hover:border-burgundy/30 transition-colors">
          <CardBody className="p-6">
            <h3 className="text-xl font-bold text-burgundy mb-3">
              XP Leaderboards
            </h3>
            <p className="text-stable-gray">
              Compete on trading volume and public XP leaderboards. 1 USD traded
              = 1 XP earned.
            </p>
          </CardBody>
        </Card>

        <Card className="border-2 border-burgundy/10 hover:border-burgundy/30 transition-colors">
          <CardBody className="p-6">
            <h3 className="text-xl font-bold text-burgundy mb-3">
              Achievements
            </h3>
            <p className="text-stable-gray">
              Complete tasks automatically and track your progress. Unlock
              milestones as you grow.
            </p>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";

import {
  useChangeReferralCode,
  useGetReferralCode,
} from "@/hooks/api/use-referral-api";

export function ReferralCodeCard() {
  const { data: referralData, isLoading } = useGetReferralCode();
  const changeCodeMutation = useChangeReferralCode();

  const [isEditing, setIsEditing] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const referralCode = referralData?.code || "";
  const referralLink = `${window.location.origin}?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleChangeCode = async () => {
    if (!newCode.trim()) return;

    try {
      await changeCodeMutation.mutateAsync({ newCode: newCode.trim() });
      setIsEditing(false);
      setNewCode("");
    } catch {
      // Error handling - mutation already tracks error state
    }
  };

  if (isLoading) {
    return (
      <Card className="border-2 border-burgundy/20">
        <CardBody className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-burgundy/10 rounded w-1/3 mb-4" />
            <div className="h-10 bg-burgundy/10 rounded mb-2" />
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-burgundy/20">
      <CardHeader className="pb-0 pt-6 px-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-burgundy">Your Referral Code</h2>
        {copySuccess && (
          <Chip color="success" size="sm" variant="flat">
            Copied!
          </Chip>
        )}
      </CardHeader>
      <CardBody className="p-6">
        {!isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Input
                readOnly
                className="flex-1"
                size="lg"
                value={referralCode}
              />
              <Button color="primary" variant="flat" onPress={handleCopy}>
                Copy Link
              </Button>
              <Button
                color="primary"
                variant="bordered"
                onPress={() => setIsEditing(true)}
              >
                Change Code
              </Button>
            </div>
            <p className="text-sm text-stable-gray">
              Share this code with friends to earn rewards from their trading
              fees
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              placeholder="Enter new referral code"
              size="lg"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
            />
            <div className="flex gap-3">
              <Button
                color="primary"
                isLoading={changeCodeMutation.isPending}
                onPress={handleChangeCode}
              >
                Save
              </Button>
              <Button
                variant="flat"
                onPress={() => {
                  setIsEditing(false);
                  setNewCode("");
                }}
              >
                Cancel
              </Button>
            </div>
            {changeCodeMutation.isError && (
              <p className="text-sm text-danger">
                Failed to change code. It may already be taken.
              </p>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}

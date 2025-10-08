import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";

interface ReferredByBannerProps {
  referredBy?: {
    id: string;
    email: string;
    code: string;
  };
}

export function ReferredByBanner({ referredBy }: ReferredByBannerProps) {
  if (!referredBy) return null;

  return (
    <Card className="border-2 border-burgundy/20 bg-burgundy/5">
      <CardBody className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-stable-gray mb-1">Referred by</p>
            <p className="text-lg font-semibold text-burgundy">
              {referredBy.email || referredBy.code}
            </p>
          </div>
          <Chip color="primary" variant="flat">
            Active
          </Chip>
        </div>
      </CardBody>
    </Card>
  );
}

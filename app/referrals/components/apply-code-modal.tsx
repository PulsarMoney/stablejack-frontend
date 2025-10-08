import { useState } from "react";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

import { useApplyReferralCode } from "@/hooks/api/use-referral-api";

interface ApplyCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApplyCodeModal({ isOpen, onClose }: ApplyCodeModalProps) {
  const applyCodeMutation = useApplyReferralCode();
  const [code, setCode] = useState("");

  const handleApply = async () => {
    if (!code.trim()) return;

    try {
      await applyCodeMutation.mutateAsync({ code: code.trim() });
      setCode("");
      onClose();
    } catch (error) {
      console.error("Failed to apply code:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Apply Referral Code
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Referral Code"
                placeholder="Enter referral code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              {applyCodeMutation.isError && (
                <p className="text-sm text-danger">
                  Failed to apply code. Please check if it&apos;s valid.
                </p>
              )}
              {applyCodeMutation.isSuccess && (
                <p className="text-sm text-success">
                  Referral code applied successfully!
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                isLoading={applyCodeMutation.isPending}
                onPress={handleApply}
              >
                Apply
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

import { MdOutlineLogin } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({ open, onClose }: ForgotPasswordModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader className="!text-center">
          <DialogTitle className="text-primary">Quên mật khẩu</DialogTitle>
          <div className="w-max mx-auto">
            <DialogDescription className="animate-typing overflow-hidden whitespace-nowrap">
              Chào mừng đến với thế giới từ vựng của{" "}
              <span className="text-secondary font-semibold">LexiBoost</span>
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="email" className="">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Nhập email của bạn để lấy lại mật khẩu"
              className="w-full"
              type="email"
            />
          </div>
        </div>
        <DialogFooter className="flex !flex-col !items-center gap-2">
          <Button
            type="button"
            variant="default"
            className="text-white flex items-center gap-1"
          >
            <p className="mt-[-3px]">Gửi</p>
            <MdOutlineLogin className="inline-block" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

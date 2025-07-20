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

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
  onForgotPassword: () => void;
}

export function RegisterModal({
  open,
  onClose,
  onLogin,
  onForgotPassword,
}: RegisterModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader className="!text-center">
          <DialogTitle className="text-primary">Đăng ký</DialogTitle>
          <div className="w-max mx-auto">
            <DialogDescription className="animate-typing overflow-hidden whitespace-nowrap">
              Chào mừng đến với thế giới việc làm của{" "}
              <span className="text-primary font-semibold">HireMe</span>
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
              placeholder="Nhập email của bạn"
              className="w-full focus:border-primary focus:ring-primary"
              type="email"
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="name" className="">
              Tên
            </Label>
            <Input
              id="name"
              placeholder="Nhập tên của bạn"
              className="w-full focus:border-primary focus:ring-primary"
              type="name"
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="password" className="">
              Mật khẩu
            </Label>
            <Input
              id="password"
              placeholder="Nhập mật khẩu của bạn"
              className="w-full focus:border-primary focus:ring-primary"
              type="password"
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="password" className="">
              Nhập lại mật khẩu
            </Label>
            <Input
              id="password"
              placeholder="Nhập mật khẩu của bạn"
              className="w-full focus:border-primary focus:ring-primary"
              type="password"
            />
          </div>
        </div>
        <DialogFooter className="flex !flex-col !items-center gap-2">
          <Button
            type="button"
            variant="default"
            className="text-white flex items-center gap-1"
          >
            <p className="mt-[-3px] hover:cursor-pointer">Đăng ký</p>
            <MdOutlineLogin className="inline-block rotate-180" />
          </Button>
          <div className="w-full flex gap-2 items-center !ml-0">
            <div className="w-full border-t border-gray-300 my-2"></div>
            <p className="text-gray-500 text-xs">hoặc</p>
            <div className="w-full border-t border-gray-300 my-2"></div>
          </div>
          <p className="text-xs text-gray-700 mt-3">
            Nếu đã có tài khoản,{" "}
            <span
              className="text-black font-medium hover:text-primary hover:cursor-pointer"
              onClick={onLogin}
            >
              đăng nhập
            </span>{" "}
            tại đây!
          </p>
          <p className="text-xs text-gray-700">
            Bạn quên mật khẩu?{" "}
            <span
              className="text-black font-medium hover:text-primary hover:cursor-pointer underline"
              onClick={onForgotPassword}
            >
              Lấy lại mật khẩu!
            </span>{" "}
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

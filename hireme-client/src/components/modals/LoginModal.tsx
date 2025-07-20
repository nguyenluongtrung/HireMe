import { MdOutlineLogin } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

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

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onRegister: () => void;
  onForgotPassword: () => void;
}

export function LoginModal({
  open,
  onClose,
  onRegister,
  onForgotPassword,
}: LoginModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader className="!text-center">
          <DialogTitle className="text-primary">Đăng nhập</DialogTitle>
          <div className="w-max mx-auto">
            <DialogDescription className="animate-typing overflow-hidden whitespace-nowrap">
              Chào mừng đến với thế giới việc làm của{" "}
              <span className="text-secondary font-semibold">HireMe</span>
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
        </div>
        <DialogFooter className="flex !flex-col !items-center gap-2">
          <Button
            type="button"
            variant="default"
            className="text-white flex items-center gap-1"
          >
            <p className="mt-[-3px] hover:cursor-pointer">Đăng nhập</p>
            <MdOutlineLogin className="inline-block" />
          </Button>
          <div className="w-full flex gap-2 items-center !ml-0">
            <div className="w-full border-t border-gray-300 my-2"></div>
            <p className="text-gray-500 text-xs">hoặc</p>
            <div className="w-full border-t border-gray-300 my-2"></div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="flex gap-2 items-center"
          >
            <FcGoogle className="w-5 h-5" />
            <p className="text-sm hover:cursor-pointer">
              Đăng nhập nhanh với tài khoản Google
            </p>
          </Button>

          <p className="text-xs text-gray-700 mt-3">
            Nếu chưa có tài khoản,{" "}
            <span
              className="text-black font-medium hover:text-primary hover:cursor-pointer"
              onClick={onRegister}
            >
              đăng ký
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

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { useRegister } from "@/hooks/auth/register/useRegister";

import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  REGISTER_VALIDATE_MESSAGE,
} from "@/lib/validators";

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
  const {
    form,
    control,
    isSubmitting,
    handleSubmit,
    onSubmit,
    formState: { errors },
  } = useRegister({
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <Form {...form}>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
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
              <FormField
                control={control}
                name="name"
                rules={REGISTER_VALIDATE_MESSAGE.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Nhập tên của bạn"
                        className={`w-full focus:border-primary focus:ring-primary ${
                          errors.name &&
                          "border-error focus:border-error focus:ring-error"
                        }`}
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-error" />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                rules={EMAIL_VALIDATION}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="Nhập email của bạn"
                        className={`w-full focus:border-primary focus:ring-primary ${
                          errors.email &&
                          "border-error focus:border-error focus:ring-error"
                        }`}
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-error" />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                rules={PASSWORD_VALIDATION}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="Nhập mật khẩu của bạn"
                        className={`w-full focus:border-primary focus:ring-primary ${
                          errors.password &&
                          "border-error focus:border-error focus:ring-error"
                        }`}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-error" />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="confirmPassword"
                rules={PASSWORD_VALIDATION}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Xác nhận lại mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        id="confirmPassword"
                        placeholder="Xác nhận lại mật khẩu của bạn"
                        className={`w-full focus:border-primary focus:ring-primary ${
                          errors.confirmPassword &&
                          "border-error focus:border-error focus:ring-error"
                        }`}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-error" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex !flex-col !items-center gap-2">
              <Button
                type="submit"
                variant="default"
                disabled={isSubmitting}
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

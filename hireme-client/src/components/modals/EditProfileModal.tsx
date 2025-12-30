"use client";

import React, { ChangeEvent, useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import useUserProfile from "@/hooks/auth/me/useUserProfile";

import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/contants";

interface EditProfileModalProps {
  open: boolean;
  profile: {
    name: string;
    email: string;
    phoneNumber?: string;
    avatarUrl?: string;
  };
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  profile,
  onClose,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    form,
    control,
    isUpdating,
    handleSubmit,
    onSubmit,
    formState: { errors },
  } = useUserProfile({
    onSuccess: () => {
      onClose();
    },
  });

  const [previewAvatarUrl, setPreviewAvatarUrl] = useState<string | null>(null);
  const [avatarImgFile, setAvatarImgFile] = useState<File | null>(null);
  const [uploadFileError, setUploadFileError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setUploadFileError("Kích thước file quá 10MB.");
      return;
    }

    const newFile = new File([file], file.name, {
      type: file.type,
    });

    setAvatarImgFile(newFile);

    const url = URL.createObjectURL(newFile);
    setPreviewAvatarUrl(url);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="!text-[28px] text-primary font-semibold text-center">
            Chỉnh sửa hồ sơ cá nhân
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            noValidate
            onSubmit={handleSubmit((data) =>
              onSubmit({
                ...data,
                avatar: avatarImgFile,
              })
            )}
            className="space-y-4"
          >
            <div className="flex items-center gap-5">
              <div>
                <Avatar className="h-20 w-20">
                  <input
                    type="file"
                    accept={ALLOWED_IMAGE_TYPES.join(",")}
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => {
                      handleFileChange(e);
                    }}
                  />
                  <AvatarImage
                    className="object-cover"
                    src={previewAvatarUrl || profile?.avatarUrl}
                    alt={profile.name}
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                    {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs bg-[#6581a1] opacity-90 w-[60px] h-5 flex items-center justify-center rounded-[3px] hover:cursor-pointer"
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                  >
                    Thay đổi
                  </div>
                </Avatar>
                {uploadFileError && (
                  <div className="text-error text-xs mt-1">
                    {uploadFileError}
                  </div>
                )}
              </div>

              <div className="space-y-3 flex-1">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex items-center w-full">
                      <FormLabel className="w-[60px] text-sm font-medium">
                        Tên
                      </FormLabel>

                      <FormControl className="!w-[220px]">
                        <Input
                          id="name"
                          placeholder="Nhập tên của bạn"
                          className={`
                                w-full
                                rounded-none
                                border-0
                                border-b
                                border-muted-foreground/30
                                focus-visible:ring-0
                                focus:border-primary
                                text-sm
                                px-0
                                shadow-none
                                ${
                                  errors.name
                                    ? "border-error focus:border-error"
                                    : ""
                                }
                            `}
                          type="text"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage className="text-error text-xs ml-2" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex items-center !w-full">
                      <FormLabel className="w-[60px] text-sm font-medium">
                        Email
                      </FormLabel>
                      <FormControl className="!w-[220px]">
                        <Input
                          id="email"
                          placeholder="Nhập email của bạn"
                          className={`
                                w-full
                                rounded-none
                                border-0
                                border-b
                                border-muted-foreground/30
                                focus-visible:ring-0
                                focus:border-primary
                                text-sm
                                px-0
                                shadow-none
                                ${
                                  errors.email
                                    ? "border-error focus:border-error"
                                    : ""
                                }
                            `}
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
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex items-center !w-full">
                      <FormLabel className="w-[60px] text-sm font-medium">
                        SĐT
                      </FormLabel>
                      <FormControl className="!w-[220px]">
                        <Input
                          id="phoneNumber"
                          placeholder="Nhập số điện thoại của bạn"
                          className={`
                                w-full
                                rounded-none
                                border-0
                                border-b
                                border-muted-foreground/30
                                focus-visible:ring-0
                                focus:border-primary
                                text-sm
                                px-0
                                shadow-none
                                ${
                                  errors.phoneNumber
                                    ? "border-error focus:border-error"
                                    : ""
                                }
                            `}
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-error" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-5 justify-center">
              <Button
                variant={"gray"}
                onClick={onClose}
                className="!w-[100px] text-black"
              >
                Huỷ
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="!w-[100px] text-white"
              >
                Chỉnh sửa
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

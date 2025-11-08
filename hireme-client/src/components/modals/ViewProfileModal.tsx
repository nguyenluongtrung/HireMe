"use client";

import React from "react";
import { Mail, Phone } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";

interface ViewProfileModalProps {
  open: boolean;
  onClose: () => void;
  onOpenEditModal: () => void;
  profile: {
    name: string;
    email: string;
    phoneNumber?: string;
    avatarUrl?: string;
  };
}

export const ViewProfileModal: React.FC<ViewProfileModalProps> = ({
  open,
  onClose,
  onOpenEditModal,
  profile,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="!text-[28px] text-primary font-semibold text-center">
            Hồ sơ cá nhân
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-5">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={profile?.avatarUrl}
              alt={profile.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
              {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-3">
            <p className="text-base font-semibold leading-[1]">
              {profile.name}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="leading-[1]">{profile.email}</span>
            </div>
            {profile.phoneNumber ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="leading-[1]">{profile.phoneNumber}</span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <Button
          onClick={onOpenEditModal}
          className="w-[100px] text-white mx-auto"
        >
          Chỉnh sửa
        </Button>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import useUserProfile from "@/hooks/auth/me/useUserProfile";

export default function SettingsPage() {
    const { profile: userProfile } = useUserProfile();

    return (
        <div className="min-h-full w-full bg-[#0f1117] text-slate-200 font-sans relative flex flex-col">
            <div className="p-6 md:p-8 flex-1">
                {/* Header */}
                <div className="mb-8 space-y-2">
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Cài đặt
                    </h1>
                    <p className="text-slate-400 max-w-2xl">
                        Quản lý thông tin cá nhân để có được trải nghiệm tốt nhất trong quá trình tìm việc.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="mb-8 rounded-2xl bg-[#151b28] border border-slate-800/50 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-lg shadow-black/20">
                    <div className="relative">
                        <Avatar className="h-24 w-24 border-4 border-[#151b28] shadow-xl">
                            <AvatarImage
                                src={userProfile?.avatarUrl || "/images/avatar-placeholder.jpg"}
                                alt={userProfile?.name || "User"}
                            />
                            <AvatarFallback className="bg-slate-700 text-slate-200 text-2xl font-bold">
                                {userProfile?.name?.slice(0, 2).toUpperCase() || "AJ"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-[3px] border-[#151b28] bg-green-500"></div>
                    </div>

                    <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-white">
                                {userProfile?.name || ""}
                            </h2>
                            <Badge className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border-0 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide">
                                Pro
                            </Badge>
                        </div>
                        <p className="text-slate-400 flex items-center gap-2 text-sm">
                            {/* {userProfile?.jobTitle || ""} <span className="text-slate-600">•</span> {userProfile?.location || ""} */}
                        </p>
                        <p className="text-slate-500 text-xs font-medium pt-1">
                            {/* Ngày tạo: {userProfile?.createdAt || ""} */}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                        <Button
                            variant="outline"
                            className="flex-1 md:flex-none border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white"
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            Cập nhật ảnh
                        </Button>
                        <Button
                            variant="ghost"
                            className="flex-1 md:flex-none text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                            Xoá
                        </Button>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="mb-10">
                    <h3 className="text-lg font-semibold text-white mb-6">
                        Thông tin cá nhân
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                Họ và tên
                            </Label>
                            <Input
                                id="fullName"
                                defaultValue={userProfile?.name || ""}
                                className="bg-[#0f1117] border-slate-800 text-slate-200 focus:border-blue-500/50 focus:ring-blue-500/20 h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="jobTitle" className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                Chức vụ
                            </Label>
                            <Input
                                id="jobTitle"
                                defaultValue="Senior Product Designer"
                                className="bg-[#0f1117] border-slate-800 text-slate-200 focus:border-blue-500/50 focus:ring-blue-500/20 h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                defaultValue={userProfile?.email || ""}
                                className="bg-[#0f1117] border-slate-800 text-slate-200 focus:border-blue-500/50 focus:ring-blue-500/20 h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                Địa chỉ
                            </Label>
                            <Input
                                id="location"
                                defaultValue="San Francisco, CA"
                                className="bg-[#0f1117] border-slate-800 text-slate-200 focus:border-blue-500/50 focus:ring-blue-500/20 h-11"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio" className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                            Mô tả
                        </Label>
                        <textarea
                            id="bio"
                            rows={4}
                            className="flex w-full rounded-md border border-slate-800 bg-[#0f1117] px-4 py-3 text-sm text-slate-200 ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[120px]"
                            defaultValue="Experienced Product Designer with over 7 years in SaaS applications, specializing in user-centered design and design systems."
                        />
                    </div>
                </div>

                <div className="h-px bg-slate-800/50 w-full mb-8" />
            </div>

            {/* Sticky Footer */}
            <div className="sticky bottom-0 w-full bg-[#0f1117]/80 backdrop-blur-xl border-t border-slate-800 p-4 md:px-8 flex justify-end items-center gap-4 z-10">
                <Button
                    variant="ghost"
                    className="text-slate-400 hover:text-white hover:bg-white/5"
                >
                    Hủy
                </Button>
                <Button
                    className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                >
                    Lưu thay đổi
                </Button>
            </div>
        </div>
    );
}
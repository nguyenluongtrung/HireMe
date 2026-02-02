'use client'
import { useContext, useMemo, useState } from "react";
import { Session } from "next-auth";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    Bot,
    LogOut,
    LogIn,
    Sparkles,
} from "lucide-react";

import { useLogout } from "@/hooks/auth/logout/useLogout";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SidebarMenuItem from "./SidebarMenuItem";

import { cn } from "@/lib/utils";

import { MAIN_MENU } from "@/contants/routers";

import { GlobalStateContext } from "@/providers/GlobalStateProvider";

const LoginModal = dynamic(
    () => import("@/components/modals/LoginModal").then(m => m.LoginModal),
    { ssr: false }
);

const RegisterModal = dynamic(
    () => import("@/components/modals/RegisterModal").then(m => m.RegisterModal),
    { ssr: false }
);

const ForgotPasswordModal = dynamic(
    () => import("@/components/modals/ForgotPasswordModal").then(m => m.ForgotPasswordModal),
    { ssr: false }
);


export default function SidebarClient({ session, className }: {
    session: Session | null
    className?: string;
}) {
    const { handleSignOut } = useLogout();
    const { isSidebarCollapsed, setIsSidebarCollapsed } = useContext(GlobalStateContext);

    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);

    const menu = useMemo(() => MAIN_MENU, []);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <>
            <aside
                className={cn(
                    "relative flex h-full flex-col bg-[#0f172a] text-slate-300 border-r border-slate-800 transition-all duration-300 ease-in-out",
                    isSidebarCollapsed ? "w-[80px]" : "w-full md:w-[250px]",
                    className
                )}
            >
                {/* Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="absolute -right-3 top-9 z-50 rounded-full border border-slate-700 bg-[#0f172a] p-1.5 text-slate-400 hover:text-white hover:cursor-pointer md:block hidden"
                >
                    {isSidebarCollapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <ChevronLeft className="h-4 w-4" />
                    )}
                </button>

                {/* Header / Logo */}
                <div className={cn("flex h-16 items-center", isSidebarCollapsed ? "justify-center px-0" : "px-6")}>
                    <div className="flex items-center gap-2 font-bold text-xl text-white">
                        <Bot className="h-8 w-8 text-blue-500" />
                        {!isSidebarCollapsed && <span>Hire Me</span>}
                    </div>
                </div>

                {/* Subtitle */}
                {!isSidebarCollapsed && (
                    <div className="px-6 pb-6 pt-2">
                        <p className="text-xs text-slate-500 font-medium tracking-wider uppercase">
                            Career Assistant v2.0
                        </p>
                    </div>
                )}

                {/* Navigation */}
                <nav className={cn("flex-1 px-3 space-y-1", isSidebarCollapsed && "mt-4")}>
                    {menu.map((item) => (
                        <SidebarMenuItem
                            key={item.href}
                            item={item}
                            collapsed={isSidebarCollapsed}
                        />
                    ))}
                </nav>

                {/* Bottom Section */}
                <div className="p-3 mt-auto space-y-4">
                    {session ? (
                        <div
                            className={cn(
                                "flex items-center gap-3 rounded-xl border border-slate-800 p-3 hover:bg-slate-800/50 transition-colors group",
                                isSidebarCollapsed ? "justify-center border-0 p-0 hover:bg-transparent" : ""
                            )}
                        >
                            <Avatar className="h-10 w-10 border border-slate-700">
                                <AvatarImage
                                    src={session?.user?.avatarUrl || ""}
                                    alt={session?.user?.name || "User"}
                                />
                                <AvatarFallback className="bg-blue-900 text-blue-200">
                                    {session?.user?.name?.slice(0, 2).toUpperCase() || "CN"}
                                </AvatarFallback>
                            </Avatar>
                            {!isSidebarCollapsed && (
                                <>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="truncate text-sm font-medium text-white">
                                            {session?.user?.name || "Alex Lawson"}
                                        </p>
                                        <p className="truncate text-xs text-slate-500">
                                            {session?.user?.email || "alex@example.com"}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleSignOut()}
                                        className="p-2 rounded-lg text-slate-400 hover:cursor-pointer hover:text-white hover:bg-slate-700/50 transition-all opacity-0 group-hover:opacity-100"
                                        title="Sign out"
                                    >
                                        <LogOut className="h-4 w-4" />
                                    </button>
                                </>
                            )}
                        </div>
                    ) : (
                        <div
                            className={cn(
                                "flex flex-col gap-3 transition-all",
                                !isSidebarCollapsed &&
                                "rounded-xl border border-slate-800 bg-slate-900/50 p-4"
                            )}
                        >
                            {!isSidebarCollapsed && (
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                        <Sparkles className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white">
                                            Sẵn sàng để bắt đầu
                                        </p>
                                        <p className="text-xs text-slate-500">Tham gia cộng đồng</p>
                                    </div>
                                </div>
                            )}

                            <Button
                                variant={isSidebarCollapsed ? "ghost" : "default"}
                                className={cn(
                                    "w-full hover:cursor-pointer transition-all",
                                    !isSidebarCollapsed
                                        ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/20"
                                        : "h-10 w-10 p-0 rounded-lg justify-center hover:bg-slate-800 text-slate-400 hover:text-white"
                                )}
                                onClick={() => setOpenLoginModal(true)}
                            >
                                <LogIn className={cn("h-4 w-4", !isSidebarCollapsed && "mr-2")} />
                                {!isSidebarCollapsed && "Đăng nhập"}
                            </Button>
                        </div>
                    )}
                </div>
            </aside>

            {openLoginModal && (
                <LoginModal
                    open={openLoginModal}
                    onClose={() => setOpenLoginModal(false)}
                    onRegister={() => {
                        setOpenLoginModal(false);
                        setOpenRegisterModal(true);
                    }}
                    onForgotPassword={() => {
                        setOpenLoginModal(false);
                        setOpenForgotPasswordModal(true);
                    }}
                />
            )}

            {openRegisterModal && (
                <RegisterModal
                    open={openRegisterModal}
                    onClose={() => setOpenRegisterModal(false)}
                    onLogin={() => {
                        setOpenRegisterModal(false);
                        setOpenLoginModal(true);
                    }}
                    onForgotPassword={() => {
                        setOpenRegisterModal(false);
                        setOpenForgotPasswordModal(true);
                    }}
                />
            )}

            {openForgotPasswordModal && (
                <ForgotPasswordModal
                    open={openForgotPasswordModal}
                    onClose={() => setOpenForgotPasswordModal(false)}
                />
            )}
        </>
    );
}
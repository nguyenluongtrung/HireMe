"use client";

import { useContext } from "react";

import { cn } from "@/lib/utils";

import { GlobalStateContext } from "@/providers/GlobalStateProvider";

export default function DesktopSidebar({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isSidebarCollapsed } = useContext(GlobalStateContext);

    return (
        <div
            className={cn(
                "hidden md:block h-full shrink-0 transition-all duration-300 ease-in-out",
                isSidebarCollapsed ? "w-[80px]" : "w-[250px]"
            )}
        >
            {children}
        </div>
    );
}

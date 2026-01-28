// SidebarMenuItem.tsx
"use client";

import Link from "next/link";
import { memo } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
    item: {
        name: string;
        href: string;
        icon: React.ComponentType<{ className?: string }>;
    };
    collapsed: boolean;
};

const SidebarMenuItem = memo(({ item, collapsed }: Props) => {
    const pathname = usePathname();
    const isActive = pathname === item.href;

    return (
        <Link
            href={item.href}
            prefetch
            className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-slate-800",
                isActive ? "bg-slate-800 text-blue-400" : "text-slate-400",
                collapsed && "justify-center px-0"
            )}
        >
            <item.icon
                className={cn(
                    "h-5 w-5 shrink-0",
                    isActive ? "text-blue-500" : "text-slate-500 group-hover:text-slate-300"
                )}
            />
            {!collapsed && <span>{item.name}</span>}
        </Link>
    );
});

SidebarMenuItem.displayName = "SidebarMenuItem";

export default SidebarMenuItem;

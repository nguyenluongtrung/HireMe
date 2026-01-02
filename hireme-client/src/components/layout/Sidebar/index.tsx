"use client";

import { useContext } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Bot,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

import { MAIN_MENU } from "@/contants/routers";

import { GlobalStateContext } from "@/providers/GlobalStateProvider";

type Props = {
  className?: string;
};

const Sidebar = ({ className }: Props) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useContext(GlobalStateContext);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col bg-[#0f172a] text-slate-300 border-r border-slate-800 transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "w-[80px]" : "w-full md:w-72",
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
          {!isSidebarCollapsed && <span>CV Builder AI</span>}
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
        {MAIN_MENU.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-slate-800",
                isActive ? "bg-slate-800 text-blue-400" : "text-slate-400",
                isSidebarCollapsed && "justify-center px-0"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive
                    ? "text-blue-500"
                    : "text-slate-500 group-hover:text-slate-300"
                )}
              />
              {!isSidebarCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 mt-auto space-y-4">
        {/* Subscription Card */}
        {!isSidebarCollapsed && (
          <div className="rounded-xl bg-slate-800/50 p-4 border border-slate-700/50">
            <div className="mb-3">
              <p className="text-xs font-semibold text-slate-400 uppercase">
                Subscription
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="font-bold text-white">Pro Plan</span>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">
                  Active
                </span>
              </div>
            </div>
          </div>
        )}

        {/* User Profile */}
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl border border-slate-800 p-3 hover:bg-slate-800/50 transition-colors cursor-pointer",
            isSidebarCollapsed ? "justify-center border-0 p-0 hover:bg-transparent" : ""
          )}
        >
          <Avatar className="h-10 w-10 border border-slate-700">
            <AvatarImage
              src={session?.user?.image || ""}
              alt={session?.user?.name || "User"}
            />
            <AvatarFallback className="bg-blue-900 text-blue-200">
              {session?.user?.name?.slice(0, 2).toUpperCase() || "CN"}
            </AvatarFallback>
          </Avatar>
          {!isSidebarCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-white">
                {session?.user?.name || "Alex Lawson"}
              </p>
              <p className="truncate text-xs text-slate-500">
                {session?.user?.email || "alex@example.com"}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

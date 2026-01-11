"use client";

import { useContext } from "react";

import { cn } from "@/lib/utils";

import Sidebar from "@/components/layout/Sidebar";

import { GlobalStateContext } from "@/providers/GlobalStateProvider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { openHamburgerMenu, isSidebarCollapsed } = useContext(GlobalStateContext);

  return (
    <div className="flex h-screen w-full bg-[#f8fafc]">
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden md:block h-full shrink-0 transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "w-[80px]" : "w-[250px]"
      )}>
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col h-full overflow-hidden">
        {/* Mobile Menu Content (replaces main when open) */}
        {openHamburgerMenu && (
          <div className="flex-1 bg-white overflow-y-auto no-scrollbar md:hidden">
            <Sidebar className="!w-full !rounded-none" />
          </div>
        )}

        <main
          className={`flex-1 overflow-y-auto no-scrollbar lg:custom-scrollbar ${openHamburgerMenu ? "hidden md:block" : ""
            }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

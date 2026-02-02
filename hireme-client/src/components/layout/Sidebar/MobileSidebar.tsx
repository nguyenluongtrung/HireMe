'use client'

import { useContext } from "react";

import { GlobalStateContext } from "@/providers/GlobalStateProvider";

export default function MobileSidebar({
    children,
}: {
    children: React.ReactNode;
}) {
    const { openHamburgerMenu } = useContext(GlobalStateContext);

    if (!openHamburgerMenu) return null;

    return (
        <div className="flex-1 bg-white overflow-y-auto no-scrollbar md:hidden">
            {children}
        </div>
    );
}
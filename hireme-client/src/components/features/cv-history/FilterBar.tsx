'use client'

import { useState } from "react";
import { ChevronDown, LayoutGrid, List, Search } from "lucide-react"

import { Input } from "@/components/ui/input"

import { cn } from "@/lib/utils"

export const FilterBar = () => {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    return (
        <div className="bg-[#1e293b] p-2 rounded-xl border border-slate-700/50 mb-8 flex flex-col md:flex-row gap-2 items-center">
            <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                    placeholder="Tìm kiếm theo tên..."
                    className="pl-9 bg-transparent border-none text-white placeholder:text-slate-500 focus-visible:ring-0"
                />
            </div>

            <div className="h-6 w-px bg-slate-700 hidden md:block" />

            <div className="flex items-center gap-2 w-full md:w-auto justify-end px-2">
                <span className="text-sm text-slate-500 hidden md:inline-block">Sắp xếp:</span>
                <button className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white px-2 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                    Mới nhất
                    <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <div className="flex bg-slate-800/50 p-1 rounded-lg ml-2">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={cn("p-1.5 rounded transition-colors", viewMode === "grid" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200")}
                    >
                        <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={cn("p-1.5 rounded transition-colors", viewMode === "list" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200")}
                    >
                        <List className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
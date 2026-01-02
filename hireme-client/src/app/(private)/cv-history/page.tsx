"use client";

import React from "react";
import {
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/features/cv-history/FilterBar";
import { StatsCards } from "@/components/features/cv-history/StatsCards";
import { ResumeCards } from "@/components/features/cv-history/ResumeCards";

export default function CVHistoryPage() {
  return (
    <div className="min-h-full bg-[#0B1120] text-slate-300 p-6 md:p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">CV Của Tôi</h1>
          <p className="text-slate-400">
            Quản lý, phân tích và cải thiện các phiên bản CV của bạn với sự hỗ trợ của AI.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2 shadow-lg shadow-blue-900/20">
          <Plus className="h-4 w-4" />
          Tải CV Mới
        </Button>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Filter Bar */}
      <FilterBar />

      {/* Grid Content */}
      <ResumeCards />

    </div>
  );
}
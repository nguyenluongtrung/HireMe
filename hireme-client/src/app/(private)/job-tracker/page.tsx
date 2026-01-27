"use client";

import { Suspense, useState } from "react";

import { StatsOverview } from "@/components/features/job-tracker/StatsOverview";
import { TrackerFilters } from "@/components/features/job-tracker/TrackerFilters";
import { ApplicationsTable } from "@/components/features/job-tracker/ApplicationsTable";

import useDebounceText from "@/hooks/debounce/useDebounceText";

export default function JobTrackerPage() {
    const [searchInput, setSearchInput] = useState("");
    const searchDebounce = useDebounceText(searchInput, 500);
    const [date, setDate] = useState<Date | undefined>(undefined);

    return (
        <div className="min-h-full bg-[#0B1120] text-slate-300 p-6 md:p-8 font-sans">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Theo Dõi Ứng Tuyển</h1>
                <p className="text-slate-400">
                    Theo dõi, quản lý và tối ưu hóa tiến trình tìm việc của bạn với thông tin chi tiết từ AI.
                </p>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <StatsOverview />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <TrackerFilters date={date} setSearchInput={setSearchInput} setDate={setDate} />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <ApplicationsTable searchDebounce={searchDebounce} date={date} />
            </Suspense>
        </div>
    );
}
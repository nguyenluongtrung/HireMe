"use client";

import { StatsOverview } from "@/components/features/job-tracker/StatsOverview";
import { TrackerFilters } from "@/components/features/job-tracker/TrackerFilters";
import { ApplicationsTable } from "@/components/features/job-tracker/ApplicationsTable";

export default function JobTrackerPage() {
    return (
        <div className="min-h-full bg-[#0B1120] text-slate-300 p-6 md:p-8 font-sans">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Theo Dõi Ứng Tuyển</h1>
                <p className="text-slate-400">
                    Theo dõi, quản lý và tối ưu hóa tiến trình tìm việc của bạn với thông tin chi tiết từ AI.
                </p>
            </div>

            <StatsOverview />
            <TrackerFilters />
            <ApplicationsTable />
        </div>
    );
}
import { Send, Users, Trophy, Ban } from "lucide-react";

import useApplicationStatistics from "@/hooks/applications/useApplicationStatistics";

import { cn } from "@/lib/utils";

export const StatsOverview = () => {
    const { data: statsData, isLoading } = useApplicationStatistics();

    const stats = [
        {
            label: "Đã Ứng Tuyển",
            value: statsData?.applied || 0,
            trend: "Tổng quan",
            trendColor: "text-emerald-400",
            icon: Send,
            iconColor: "text-blue-400",
            borderColor: "border-slate-700/50",
        },
        {
            label: "Phỏng Vấn",
            value: statsData?.interviewed || 0,
            trend: "Đang diễn ra",
            trendColor: "text-emerald-400",
            icon: Users,
            iconColor: "text-purple-400",
            borderColor: "border-slate-700/50",
        },
        {
            label: "Đề Nghị",
            value: statsData?.accepted || 0,
            subtext: "Cần hành động",
            trendColor: "text-white",
            icon: Trophy,
            iconColor: "text-blue-500",
            borderColor: "border-slate-700/50",
        },
        {
            label: "Từ Chối",
            value: statsData?.rejected || 0,
            subtext: "Cố lên nhé!",
            trendColor: "text-slate-400",
            icon: Ban,
            iconColor: "text-red-400",
            borderColor: "border-slate-700/50",
        },
    ];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-[#1e293b] h-32 rounded-xl animate-pulse border border-slate-700/50" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={cn(
                        "bg-[#1e293b] rounded-xl p-5 border flex flex-col justify-between relative overflow-hidden transition-colors hover:-translate-y-1 hover:shadow-xl hover:cursor-pointer hover:shadow-black/20 transition-all duration-300 hover:border-slate-600",
                        stat.borderColor
                    )}
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            {stat.label}
                        </span>
                        <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
                    </div>
                    <div>
                        <span className="text-3xl font-bold text-white mr-3">
                            {stat.value}
                        </span>
                        <span className={cn("text-xs font-medium", stat.trendColor)}>
                            {stat.trend || stat.subtext}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

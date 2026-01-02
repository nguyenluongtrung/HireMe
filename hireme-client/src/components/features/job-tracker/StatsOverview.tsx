import { Send, Users, Trophy, Ban } from "lucide-react";

import { cn } from "@/lib/utils";

export const StatsOverview = () => {
    const stats = [
        {
            label: "Đã Ứng Tuyển",
            value: "12",
            trend: "+2 tuần này",
            trendColor: "text-emerald-400",
            icon: Send,
            iconColor: "text-blue-400",
            borderColor: "border-slate-700/50",
        },
        {
            label: "Phỏng Vấn",
            value: "3",
            trend: "+1 tuần này",
            trendColor: "text-emerald-400",
            icon: Users,
            iconColor: "text-purple-400",
            borderColor: "border-slate-700/50",
        },
        {
            label: "Đề Nghị",
            value: "1",
            subtext: "Cần hành động",
            trendColor: "text-white",
            icon: Trophy,
            iconColor: "text-blue-500",
            borderColor: "border-blue-500/30 bg-blue-900/10", // Highlighted card
        },
        {
            label: "Từ Chối",
            value: "5",
            subtext: "Cố lên nhé!",
            trendColor: "text-slate-400",
            icon: Ban,
            iconColor: "text-red-400",
            borderColor: "border-slate-700/50",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={cn(
                        "bg-[#1e293b] rounded-xl p-5 border flex flex-col justify-between relative overflow-hidden transition-colors",
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

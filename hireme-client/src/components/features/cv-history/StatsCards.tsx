import { cn } from "@/lib/utils";
import { FileText, Send, Sparkles } from "lucide-react";

export const StatsCards = () => {
    // Mock Data
    const stats = [
        {
            label: "CV Đang Hoạt Động",
            value: "3",
            trend: "+1 tuần này",
            trendColor: "text-emerald-400",
            icon: FileText,
            iconColor: "text-blue-400",
        },
        {
            label: "Điểm AI Trung Bình",
            value: "78",
            trend: "+5% cải thiện",
            trendColor: "text-emerald-400",
            icon: Sparkles,
            iconColor: "text-purple-400",
        },
        {
            label: "Đã Ứng Tuyển",
            value: "12",
            trend: "30 ngày qua",
            trendColor: "text-slate-400",
            icon: Send,
            iconColor: "text-orange-400",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-[#1e293b] rounded-xl p-5 border border-slate-700/50 flex flex-col justify-between relative overflow-hidden group hover:border-slate-600 transition-colors"
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                        <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
                    </div>
                    <div>
                        <span className="text-3xl font-bold text-white mr-3">{stat.value}</span>
                        <span className={cn("text-xs font-medium px-2 py-1 rounded-full bg-slate-800", stat.trendColor)}>
                            {stat.trend}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}
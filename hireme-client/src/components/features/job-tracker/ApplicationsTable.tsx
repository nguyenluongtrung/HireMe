import { MoreHorizontal, Eye, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export const ApplicationsTable = () => {
    const applications = [
        {
            id: 1,
            company: "Google",
            source: "Referral",
            logo: "G",
            logoBg: "bg-white text-slate-900",
            position: "Senior Designer",
            match: "95% Phù hợp",
            date: "24 Th10, 2023",
            status: "Interview",
            statusColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
            note: "Referral từ Sarah. Chuẩn bị portfolio...",
        },
        {
            id: 2,
            company: "Spotify",
            source: "LinkedIn",
            logo: "S",
            logoBg: "bg-green-500 text-white",
            position: "Product Manager",
            match: "72% Phù hợp",
            date: "20 Th10, 2023",
            status: "Rejected",
            statusColor: "bg-red-500/10 text-red-400 border-red-500/20",
            note: "Thử lại sau 6 tháng.",
        },
        {
            id: 3,
            company: "Stripe",
            source: "Recruiter",
            logo: "S",
            logoBg: "bg-indigo-500 text-white",
            position: "Frontend Developer",
            match: "88% Phù hợp",
            date: "18 Th10, 2023",
            status: "Offer",
            statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            note: "Đang đàm phán lương.",
            highlight: true,
        },
        {
            id: 4,
            company: "Airbnb",
            source: "Direct Apply",
            logo: "A",
            logoBg: "bg-rose-500 text-white",
            position: "UX Engineer",
            match: "Analyzing...",
            date: "15 Th10, 2023",
            status: "Applied",
            statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            note: "-",
        },
        {
            id: 5,
            company: "Notion",
            source: "Direct Apply",
            logo: "N",
            logoBg: "bg-black text-white border border-slate-700",
            position: "Marketing Lead",
            match: "91% Phù hợp",
            date: "12 Th10, 2023",
            status: "Applied",
            statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            note: "Cover letter được viết riêng.",
        },
    ];

    return (
        <div className="bg-[#1e293b] rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-[#0f172a]/50 text-xs uppercase font-semibold text-slate-500">
                        <tr>
                            <th className="px-6 py-4">Công ty</th>
                            <th className="px-6 py-4">Vị trí</th>
                            <th className="px-6 py-4">Ngày Ứng Tuyển</th>
                            <th className="px-6 py-4">Trạng Thái</th>
                            <th className="px-6 py-4">Ghi Chú</th>
                            <th className="px-6 py-4 text-right">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        {applications.map((app) => (
                            <tr
                                key={app.id}
                                className={cn(
                                    "hover:bg-slate-800/50 transition-colors group",
                                    app.highlight && "bg-blue-500/5 hover:bg-blue-500/10"
                                )}
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={cn(
                                                "h-10 w-10 rounded-lg flex items-center justify-center font-bold text-lg shrink-0",
                                                app.logoBg
                                            )}
                                        >
                                            {app.logo}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white">
                                                {app.company}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {app.source}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-200">
                                        {app.position}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-blue-400 mt-1">
                                        <Sparkles className="h-3 w-3" />
                                        {app.match}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{app.date}</td>
                                <td className="px-6 py-4">
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "rounded-full px-2.5 py-0.5 text-xs font-medium border",
                                            app.statusColor
                                        )}
                                    >
                                        {app.status === "Interview" && "Phỏng Vấn"}
                                        {app.status === "Rejected" && "Bị Từ Chối"}
                                        {app.status === "Offer" && "Đề Nghị"}
                                        {app.status === "Applied" && "Đã Nộp"}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 max-w-[200px] truncate">
                                    {app.note}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {app.highlight ? (
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400 bg-blue-400/10 hover:bg-blue-400/20">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-white hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-6 py-4 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <div>Hiển thị <span className="text-white font-medium">1</span> đến <span className="text-white font-medium">5</span> của <span className="text-white font-medium">12</span> kết quả</div>

                <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8 border-slate-700 bg-slate-800 text-slate-400 hover:text-white disabled:opacity-50" disabled>
                        &lt;
                    </Button>
                    <Button variant="default" size="icon" className="h-8 w-8 bg-blue-600 text-white hover:bg-blue-500">
                        1
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800">
                        2
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800">
                        3
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 border-slate-700 bg-slate-800 text-slate-400 hover:text-white">
                        &gt;
                    </Button>
                </div>
            </div>
        </div>
    );
};

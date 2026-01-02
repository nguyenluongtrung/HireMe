import { Clock, Download, Edit, FileText, Plus, RotateCcw, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export const ResumeCards = () => {
    const resumes = [
        {
            id: 1,
            title: "Lập trình viên Frontend - V4",
            role: "Senior React Roles",
            status: "Active",
            score: 92,
            lastEdited: "2 giờ trước",
            versions: 4,
            thumbnailBg: "bg-slate-800",
            hasAiSuggestion: false,
        },
        {
            id: 2,
            title: "CV Quản Lý Dự Án",
            role: "Quản lý cấp cao",
            status: "Review",
            score: 78,
            lastEdited: "2 ngày trước",
            versions: 1,
            thumbnailBg: "bg-slate-800",
            hasAiSuggestion: true,
            aiSuggestion: "Thêm các chỉ số định lượng vào vai trò gần nhất.",
        },
        {
            id: 3,
            title: "Thiết kế Sản phẩm (Nháp)",
            role: "UI/UX Designer",
            status: "Draft",
            score: null,
            lastEdited: "Vừa tạo xong",
            versions: 0,
            thumbnailBg: "bg-slate-900", // Darker for draft
            isDraft: true,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">

            {/* Resume Cards */}
            {resumes.map((resume) => (
                <div key={resume.id} className="bg-[#1e293b] rounded-xl border border-slate-700/50 overflow-hidden group hover:shadow-xl hover:shadow-black/20 hover:border-slate-600 transition-all duration-300 flex flex-col">

                    <div className="flex flex-1 p-5 gap-5">
                        {/* Thumbnail / Left Side */}
                        <div className="w-24 shrink-0 flex flex-col gap-3">
                            <div className={cn("aspect-[3/4] rounded-lg shadow-inner border border-white/5 relative group/thumb cursor-pointer overflow-hidden", resume.thumbnailBg)}>
                                {/* Mock lines for thumbnail */}
                                <div className="absolute top-3 left-3 right-3 h-2 bg-slate-700/50 rounded-sm" />
                                <div className="absolute top-7 left-3 w-1/2 h-1.5 bg-slate-700/30 rounded-sm" />
                                <div className="absolute top-12 left-3 right-3 h-1 bg-slate-700/20 rounded-sm" />
                                <div className="absolute top-15 left-3 right-3 h-1 bg-slate-700/20 rounded-sm" />
                                <div className="absolute bottom-3 right-3 h-6 w-6 bg-slate-700/50 rounded-full" />

                                {!resume.isDraft && (
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button size="sm" variant="secondary" className="h-7 text-xs bg-white text-slate-900 hover:bg-slate-100">
                                            Xem
                                        </Button>
                                    </div>
                                )}

                                {resume.isDraft && (
                                    <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 p-2 text-center">
                                        <FileText className="h-6 w-6 text-slate-600" />
                                        <span className="text-[10px] text-slate-500 leading-tight">Chưa có bản xem trước</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content / Right Side */}
                        <div className="flex-1 min-w-0 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "border-0 text-[10px] px-2 py-0.5 font-semibold",
                                        resume.status === "Active" ? "bg-emerald-500/10 text-emerald-500" :
                                            resume.status === "Draft" ? "bg-slate-700 text-slate-400" :
                                                "bg-amber-500/10 text-amber-500"
                                    )}
                                >
                                    {resume.status === "Active" ? "HOẠT ĐỘNG" :
                                        resume.status === "Draft" ? "BẢN NHÁP" :
                                            "ĐÁNH GIÁ"}
                                </Badge>

                                {resume.score !== null ? (
                                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-inset",
                                        resume.score >= 80 ? "ring-emerald-500/20 text-emerald-500 bg-emerald-500/10" : "ring-amber-500/20 text-amber-500 bg-amber-500/10"
                                    )}>
                                        {resume.score}
                                    </div>
                                ) : (
                                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold bg-slate-800 text-slate-500">
                                        --
                                    </div>
                                )}
                            </div>

                            <h3 className="font-bold text-white text-lg truncate mb-1" title={resume.title}>{resume.title}</h3>
                            <p className="text-xs text-slate-400 mb-4 line-clamp-2">Mục tiêu: <span className="text-slate-300">{resume.role}</span></p>

                            {/* AI Suggestion Box */}
                            {resume.hasAiSuggestion && (
                                <div className="mb-4 bg-amber-500/5 border border-amber-500/10 rounded-lg p-3">
                                    <p className="text-xs text-amber-500/90 leading-relaxed">
                                        <span className="font-bold text-amber-500">Gợi ý AI:</span> {resume.aiSuggestion}
                                    </p>
                                </div>
                            )}

                            <div className="mt-auto flex items-center gap-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> {resume.lastEdited}
                                </span>
                                {!resume.isDraft && (
                                    <span className="flex items-center gap-1">
                                        <RotateCcw className="h-3 w-3" /> {resume.versions} phiên bản
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions Footer */}
                    {!resume.isDraft ? (
                        <div className="border-t border-slate-700/50 p-3 bg-slate-800/30 flex items-center justify-between gap-2">
                            <Button className="flex-1 bg-blue-600 hover:bg-blue-500 h-9 text-xs font-medium">
                                <Edit className="h-3.5 w-3.5 mr-2" />
                                Chỉnh sửa
                            </Button>
                            <Button size="icon" variant="ghost" className="h-9 w-9 text-slate-400 hover:text-white hover:bg-slate-700">
                                <Download className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-9 w-9 text-slate-400 hover:text-red-400 hover:bg-slate-700">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="border-t border-slate-700/50 p-3 bg-slate-800/30 flex items-center justify-between gap-2">
                            <Button variant="ghost" className="flex-1 bg-slate-700/50 hover:bg-slate-700 hover:text-white h-9 text-xs font-medium text-blue-400 justify-start px-4">
                                Tiếp tục chỉnh sửa
                            </Button>
                            <Button size="icon" variant="ghost" className="h-9 w-9 text-slate-400 hover:text-red-400 hover:bg-slate-700">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            ))}

            {/* Create New Placeholder Card */}
            <button className="border-2 border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-center hover:bg-slate-800/30 hover:border-blue-500/50 group transition-all h-full min-h-[300px]">
                <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:text-blue-500 transition-colors">
                    <Plus className="h-8 w-8 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="space-y-1">
                    <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">Tạo Phiên Bản Mới</h3>
                    <p className="text-sm text-slate-400 max-w-[200px] mx-auto">
                        Bắt đầu từ trang trắng hoặc nhập từ CV hiện có của bạn
                    </p>
                </div>
            </button>

        </div>
    )
}
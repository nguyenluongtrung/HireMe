"use client";

import { BookOpen, FolderOpen } from "lucide-react";

export default function KnowledgeHubPage() {
    return (
        <div className="flex items-center justify-center h-full min-h-screen bg-[#0B1120]">
            <div className="text-center max-w-md px-6">
                {/* Icon cluster */}
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4">
                        <FolderOpen className="h-8 w-8 text-blue-400" />
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/30 rounded-2xl p-4">
                        <BookOpen className="h-8 w-8 text-slate-400" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3">
                    Chào mừng đến Knowledge Hub
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Chọn một ghi chú từ thanh bên để bắt đầu đọc hoặc chỉnh sửa,
                    hoặc tạo một thư mục mới để tổ chức kiến thức của bạn.
                </p>
            </div>
        </div>
    );
}

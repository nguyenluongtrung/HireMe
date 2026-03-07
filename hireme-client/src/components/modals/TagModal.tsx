"use client";

import { useState } from "react";
import { Tag as TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { KnowledgeItemTag } from "@/interfaces/knowledge-item";

interface TagModalProps {
    isOpen: boolean;
    tagDetail: KnowledgeItemTag | null
    onClose: () => void;
    onSave: ({ name }: { name: string }) => void;
}

const TAG_COLORS = [
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
    { name: "Green", value: "#10b981" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Purple", value: "#a855f7" },
    { name: "Pink", value: "#ec4899" },
    { name: "Gray", value: "#6b7280" },
];

export const TagModal = ({ isOpen, tagDetail, onClose, onSave }: TagModalProps) => {
    const TAG_COLOR = '#6366F1'
    const [tagName, setTagName] = useState(tagDetail?.name || "");

    const handleSave = () => {
        if (tagName.trim()) {
            onSave({ name: tagName.trim() });
            handleClose();
        }
    };

    const handleClose = () => {
        setTagName("");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-[#1a2332] border border-slate-700/50 text-white w-[400px] p-0 gap-0">
                {/* Header */}
                <DialogHeader className="px-6 py-4 border-b border-slate-700/50">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
                            <div className="bg-blue-600/20 p-1.5 rounded">
                                <TagIcon className="h-4 w-4 text-blue-400" />
                            </div>
                            {tagDetail ? "Chỉnh sửa tag" : "Thêm tag"}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                {/* Content */}
                <div className="px-6 py-5 space-y-5">
                    {/* Tag Name Input */}
                    <div className="space-y-2 space-x-1.5">
                        <label className="text-sm font-medium text-slate-300">
                            Tên tag
                        </label>
                        <input
                            type="text"
                            value={tagName}
                            onChange={(e) => setTagName(e.target.value)}
                            placeholder="e.g. Work Experience, Python, Side Project"
                            className="w-[280px] px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                            autoFocus
                        />
                    </div>

                    {/* Preview */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                                Xem trước:
                            </span>
                            {tagName.trim() && (
                                <span
                                    className="text-sm px-3 py-1 rounded-full font-medium max-w-[280px] truncate"
                                    style={{
                                        backgroundColor: `${TAG_COLOR}33`,
                                        color: TAG_COLOR,
                                        border: `1px solid ${TAG_COLOR}66`,
                                    }}
                                >
                                    {tagName}
                                </span>
                            )}
                            {!tagName.trim() && (
                                <span className="text-sm text-slate-500 italic">
                                    Nhập tên tag để xem trước
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-700/50 flex items-center justify-end gap-3">
                    <Button
                        variant="ghost"
                        onClick={handleClose}
                        className="text-slate-400 hover:text-white hover:bg-slate-800/50"
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!tagName.trim()}
                        className={`${tagName.trim()
                            ? "bg-blue-600 hover:bg-blue-500 text-white"
                            : "bg-slate-800 text-slate-500 cursor-not-allowed"
                            } shadow-lg`}
                    >
                        {tagDetail ? "Lưu thay đổi" : "Tạo tag"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

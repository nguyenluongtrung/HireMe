"use client";

import { useState } from "react";
import { X, Tag as TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface TagModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (tagName: string, color: string) => void;
    initialTag?: {
        name: string;
        color: string;
    };
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

export const TagModal = ({ isOpen, onClose, onSave, initialTag }: TagModalProps) => {
    const [tagName, setTagName] = useState(initialTag?.name || "");
    const [selectedColor, setSelectedColor] = useState(initialTag?.color || TAG_COLORS[3].value);

    const handleSave = () => {
        if (tagName.trim()) {
            onSave(tagName.trim(), selectedColor);
            handleClose();
        }
    };

    const handleClose = () => {
        setTagName("");
        setSelectedColor(TAG_COLORS[3].value);
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
                            {initialTag ? "Edit Tag" : "New Tag"}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                {/* Content */}
                <div className="px-6 py-5 space-y-5">
                    {/* Tag Name Input */}
                    <div className="space-y-2 space-x-1.5">
                        <label className="text-sm font-medium text-slate-300">
                            Tag Name
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

                    {/* Categorization Color */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-300">
                            Categorization Color
                        </label>
                        <div className="flex items-center gap-2 flex-wrap !mt-4">
                            {TAG_COLORS.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => setSelectedColor(color.value)}
                                    className={`w-8 h-8 rounded-full transition-all ${selectedColor === color.value
                                        ? "ring-2 ring-white ring-offset-2 ring-offset-[#1a2332] scale-110"
                                        : "hover:scale-105"
                                        }`}
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                                Preview:
                            </span>
                            {tagName.trim() && (
                                <span
                                    className="text-sm px-3 py-1 rounded-full font-medium max-w-[280px] truncate"
                                    style={{
                                        backgroundColor: `${selectedColor}33`,
                                        color: selectedColor,
                                        border: `1px solid ${selectedColor}66`,
                                    }}
                                >
                                    {tagName}
                                </span>
                            )}
                            {!tagName.trim() && (
                                <span className="text-sm text-slate-500 italic">
                                    Enter a tag name to see preview
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
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!tagName.trim()}
                        className={`${tagName.trim()
                            ? "bg-blue-600 hover:bg-blue-500 text-white"
                            : "bg-slate-800 text-slate-500 cursor-not-allowed"
                            } shadow-lg`}
                    >
                        {initialTag ? "Save Changes" : "Create Tag"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

import { useState } from "react";
import { Calendar, Tag, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TagModal } from "./TagModal";

interface NoteHeaderProps {
    title: string;
    createdDate: string;
    tags: string[];
}

export const NoteHeader = ({ title, createdDate, tags }: NoteHeaderProps) => {
    const [isTagModalOpen, setIsTagModalOpen] = useState(false);
    return (
        <div className="border-b border-slate-800/50 pb-6 mb-6">
            {/* Title */}
            <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4">
                {/* Created Date */}
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="h-4 w-4" />
                    <span>Created {createdDate}</span>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-slate-400" />
                    <div className="flex items-center gap-2 flex-wrap">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30 hover:bg-blue-600/30 transition-colors cursor-pointer"
                            >
                                {tag}
                            </span>
                        ))}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsTagModalOpen(true)}
                            className="h-7 px-2 text-slate-400 hover:text-white hover:bg-slate-800/50"
                        >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Tag
                        </Button>
                    </div>
                </div>
            </div>

            {isTagModalOpen && <TagModal isOpen={true} onSave={() => setIsTagModalOpen(false)} onClose={() => setIsTagModalOpen(false)} />}
        </div>
    );
};

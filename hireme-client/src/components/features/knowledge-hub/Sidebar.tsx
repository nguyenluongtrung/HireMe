import { useState } from "react";
import { Search, FolderPlus, ChevronRight, ChevronDown, FileText, Folder, StickyNote } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface Note {
    id: string;
    title: string;
    preview: string;
    tags?: string[];
    createdAt: string;
}

interface FolderItem {
    id: string;
    name: string;
    count: number;
    icon?: any;
}

interface SidebarProps {
    selectedNoteId: string | null;
    onSelectNote: (id: string) => void;
    collapsed: boolean;
    onToggleCollapse: () => void;
}

export const Sidebar = ({ selectedNoteId, onSelectNote, collapsed }: SidebarProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["all"]));

    // Mock data - replace with actual data from API
    const folders: FolderItem[] = [
        { id: "all", name: "All Notes", count: 12, icon: StickyNote },
        { id: "interview", name: "Interview Prep", count: 4, icon: Folder },
        { id: "company", name: "Company Research", count: 3, icon: Folder },
        { id: "career", name: "Career Strategy", count: 2, icon: Folder },
    ];

    const recentNotes: Note[] = [
        {
            id: "1",
            title: "Salary Negotiation Tips",
            preview: "Research on market rate for Senior PM roles in the tech industry...",
            tags: ["negotiation"],
            createdAt: "2h ago",
        },
        {
            id: "2",
            title: "Google Interview Prep",
            preview: "Situation: Led a team of 5 designers... Task: Redesign the core flow...",
            tags: ["interview"],
            createdAt: "1d ago",
        },
        {
            id: "3",
            title: "Networking Contacts 2024",
            preview: "List of people to reach out to after the conference...",
            tags: ["networking"],
            createdAt: "1w ago",
        },
    ];

    const toggleFolder = (folderId: string) => {
        const newExpanded = new Set(expandedFolders);
        if (newExpanded.has(folderId)) {
            newExpanded.delete(folderId);
        } else {
            newExpanded.add(folderId);
        }
        setExpandedFolders(newExpanded);
    };

    return (
        <div
            className={cn(
                "bg-[#0F1629] border-r border-slate-800/50 flex flex-col transition-all duration-300",
                collapsed ? "w-0 overflow-hidden" : "w-[280px]"
            )}
        >
            {/* Header */}
            <div className="p-4 border-b border-slate-800/50">
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-[#0B1120] border-slate-700/50 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 h-9"
                    />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white h-9 gap-2 shadow-lg shadow-blue-900/20">
                    <FolderPlus className="h-4 w-4" />
                    New Folder
                </Button>
            </div>

            {/* Folders */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-2">
                    {folders.map((folder) => {
                        const isExpanded = expandedFolders.has(folder.id);
                        const Icon = folder.icon;

                        return (
                            <div key={folder.id} className="mb-1">
                                <button
                                    onClick={() => toggleFolder(folder.id)}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors text-slate-300 hover:text-white group"
                                >
                                    {isExpanded ? (
                                        <ChevronDown className="h-4 w-4 text-slate-500" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4 text-slate-500" />
                                    )}
                                    <Icon className="h-4 w-4 text-blue-400" />
                                    <span className="flex-1 text-left text-sm font-medium">{folder.name}</span>
                                    <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-full">
                                        {folder.count}
                                    </span>
                                </button>

                                {/* Notes under folder */}
                                {isExpanded && folder.id === "all" && (
                                    <div className="ml-6 mt-1 space-y-1">
                                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                                            Recent Notes
                                        </div>
                                        {recentNotes.map((note) => (
                                            <button
                                                key={note.id}
                                                onClick={() => onSelectNote(note.id)}
                                                className={cn(
                                                    "w-full text-left px-3 py-2 rounded-lg transition-all duration-200 group",
                                                    selectedNoteId === note.id
                                                        ? "bg-blue-600/20 border border-blue-500/50"
                                                        : "hover:bg-slate-800/30 border border-transparent"
                                                )}
                                            >
                                                <div className="flex items-start gap-2">
                                                    <FileText
                                                        className={cn(
                                                            "h-4 w-4 mt-0.5 flex-shrink-0",
                                                            selectedNoteId === note.id ? "text-blue-400" : "text-slate-500"
                                                        )}
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <div
                                                            className={cn(
                                                                "text-sm font-medium truncate",
                                                                selectedNoteId === note.id ? "text-white" : "text-slate-300"
                                                            )}
                                                        >
                                                            {note.title}
                                                        </div>
                                                        <div className="text-xs text-slate-500 truncate mt-0.5">
                                                            {note.preview}
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            {note.tags?.map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="text-xs text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                            <span className="text-xs text-slate-600">{note.createdAt}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

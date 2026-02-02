import { useState } from "react";
import { Search, FolderPlus, ChevronRight, ChevronDown, FileText, Folder, MoreHorizontal, FilePlus, Trash, Pencil } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateFolderModal } from "../../modals/CreateFolderModal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { cn } from "@/lib/utils";

import useKnowledgeResourceForm from "@/hooks/knowledge-hub/useKnowledgeResourceForm";
import useKnowledgeItemForm from "@/hooks/knowledge-hub/useKnowledgeItemForm";
import useKnowledgeResourceList from "@/hooks/knowledge-hub/useKnowledgeResourceList";

import { KnowledgeItemType } from "@/contants/enums";
import { EditFolderModal } from "@/components/modals/EditFolderModal";

import { KnowledgeResource } from "@/interfaces/knowledge-item";

interface SidebarProps {
    selectedNoteId: number | null;
    onSelectNote: (id: number) => void;
    collapsed: boolean;
    onToggleCollapse: () => void;
}

export const Sidebar = ({ selectedNoteId, onSelectNote, collapsed }: SidebarProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["all"]));

    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
    const [isEditFolderModalOpen, setIsEditFolderModalOpen] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState<KnowledgeResource | null>(null);

    const { data: knowledgeResources } = useKnowledgeResourceList({
        page: 1,
        limit: 30,
        searchDebounce: searchQuery,
    });

    const { handleCreateKnowledgeResource, handleDeleteKnowledgeResource, handleUpdateKnowledgeResource } = useKnowledgeResourceForm();
    const { handleCreateKnowledgeItem } = useKnowledgeItemForm();

    const handleCreateFolder = (folderName: string) => {
        handleCreateKnowledgeResource({ title: folderName, type: KnowledgeItemType.FOLDER });
    };

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
                        placeholder="Tìm kiếm ghi chú..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-[#0B1120] border-slate-700/50 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 h-9"
                    />
                </div>
                <Button
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white h-9 gap-2 shadow-lg shadow-blue-900/20"
                    onClick={() => setIsCreateFolderModalOpen(true)}
                >
                    <FolderPlus className="h-4 w-4" />
                    Tạo thư mục
                </Button>
            </div>

            {/* Folders */}
            <div className="flex-1 max-h-[calc(100vh-135px)] overflow-y-auto">
                <div className="p-2">
                    {knowledgeResources?.data.length ? knowledgeResources?.data?.map((resource) => {
                        const isExpanded = expandedFolders.has(String(resource.id));

                        return (
                            <div key={resource.id} className="mb-1">
                                <div className="relative group/item">
                                    <button
                                        onClick={() => toggleFolder(String(resource.id))}
                                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors text-slate-300 hover:text-white hover:cursor-pointer group pr-8"
                                    >
                                        {isExpanded ? (
                                            <ChevronDown className="h-4 w-4 text-slate-500" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4 text-slate-500" />
                                        )}
                                        <Folder className="h-4 w-4 text-blue-400" />
                                        <span className="flex-1 text-left text-sm font-medium max-w-full truncate">{resource.title}</span>
                                        <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-full">
                                            {resource.items.length}
                                        </span>
                                    </button>

                                    <div className="absolute right-0.5 top-1/2 -translate-y-1/2 transition-opacity">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-6 w-6 p-0 hover:bg-slate-700/50 rounded-md text-slate-400 hover:text-white"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-64 p-1.5 bg-[#0F1629] border-slate-800 shadow-xl" align="start" side="bottom">
                                                <div className="flex flex-col gap-1">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleCreateKnowledgeItem({ // Assuming this works or at least triggers logic
                                                                title: "New Note",
                                                                type: KnowledgeItemType.FILE,
                                                                // @ts-expect-error - Assuming relation field or need to clarify
                                                                knowledgeResourceId: resource.id
                                                            });
                                                        }}
                                                        className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded-md transition-colors text-left hover:cursor-pointer"
                                                    >
                                                        <div className="bg-blue-600/20 p-1.5 rounded-lg">
                                                            <FilePlus className="h-4 w-4 text-blue-500" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-sm text-slate-200">Thêm file mới</div>
                                                            <div className="text-[10px] text-slate-500">Tạo một file mới trong thư mục này</div>
                                                        </div>
                                                    </button>

                                                    <div className="h-[1px] bg-slate-800/50 my-0.5" />

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedFolder(resource);
                                                            setIsEditFolderModalOpen(true);
                                                        }}
                                                        className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded-md transition-colors text-left group/delete hover:cursor-pointer"
                                                    >
                                                        <div className="bg-primary/10 p-1.5 rounded-lg group-hover/delete:bg-primary/20 transition-colors">
                                                            <Pencil className="h-4 w-4 text-slate-200" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-sm text-primary">Cập nhật thư mục</div>
                                                            <div className="text-[10px] text-slate-500">Cập nhật tên thư mục</div>
                                                        </div>
                                                    </button>

                                                    <div className="h-[1px] bg-slate-800/50 my-0.5" />

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteKnowledgeResource(resource.id);
                                                        }}
                                                        className="flex items-center gap-3 p-2 hover:bg-red-500/10 rounded-md transition-colors text-left group/delete hover:cursor-pointer"
                                                    >
                                                        <div className="bg-red-500/10 p-1.5 rounded-lg group-hover/delete:bg-red-500/20 transition-colors">
                                                            <Trash className="h-4 w-4 text-red-500" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-sm text-red-500">Xoá thư mục</div>
                                                            <div className="text-[10px] text-slate-500">Xoá tất cả files liên quan</div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                {/* Notes under resource */}
                                {isExpanded && (
                                    <div className="ml-6 mt-1 space-y-1">
                                        {resource.items.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => onSelectNote(item.id)}
                                                className={cn(
                                                    "w-full text-left px-3 py-2 rounded-lg transition-all duration-200 hover:cursor-pointer group",
                                                    selectedNoteId == item.id
                                                        ? "bg-blue-600/20 border border-blue-500/50"
                                                        : "hover:bg-slate-800/30 border border-transparent"
                                                )}
                                            >
                                                <div className="flex items-start gap-2">
                                                    <FileText
                                                        className={cn(
                                                            "h-4 w-4 mt-0.5 flex-shrink-0",
                                                            selectedNoteId === item.id ? "text-blue-400" : "text-slate-500"
                                                        )}
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <div
                                                            className={cn(
                                                                "text-sm font-medium truncate",
                                                                selectedNoteId === item.id ? "text-white" : "text-slate-300"
                                                            )}
                                                        >
                                                            {item.title}
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }) : <div>
                        <p className="px-3 py-2 text-sm text-slate-500 text-center">Không có thư mục</p>
                    </div>}
                </div>
            </div>

            {isCreateFolderModalOpen && (
                <CreateFolderModal
                    isOpen={isCreateFolderModalOpen}
                    onClose={() => setIsCreateFolderModalOpen(false)}
                    onConfirm={handleCreateFolder}
                />
            )}

            {isEditFolderModalOpen && (
                <EditFolderModal
                    isOpen={isEditFolderModalOpen}
                    onClose={() => setIsEditFolderModalOpen(false)}
                    onConfirm={(folderName) => {
                        if (selectedFolder) {
                            handleUpdateKnowledgeResource(selectedFolder.id, {
                                title: folderName,
                            });
                        }
                    }}
                    folderName={selectedFolder?.title || ""}
                />
            )}
        </div>
    );
};

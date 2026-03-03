"use client";

import { useState } from "react";

import { NoteHeader } from "./NoteHeader";
import { TipTapEditor } from "./TipTapEditor";
import { Button } from "@/components/ui/button";

import useKnowledgeItemForm from "@/hooks/knowledge-hub/useKnowledgeItemForm";

import { KnowledgeItem } from "@/interfaces/knowledge-item";

interface NoteEditorProps {
    noteId: number | null;
}

export const NoteEditor = ({ noteId }: NoteEditorProps) => {
    const [mode, setMode] = useState<"edit" | "preview">("edit");
    const [knowledgeItem, setKnowledgeItem] = useState<KnowledgeItem>()
    const [hasChanges, setHasChanges] = useState(false);

    const { handleUpdateKnowledgeItem } = useKnowledgeItemForm({
        knowledgeItemId: noteId || 0,
        onGettingDetailSuccess: (data) => {
            setKnowledgeItem(data)
        }
    });

    if (!noteId) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <h2 className="text-2xl font-bold text-white mb-2">No Note Selected</h2>
                    <p className="text-slate-400">Select a note from the sidebar or create a new one</p>
                </div>
            </div>
        );
    }

    if (!knowledgeItem) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-2xl font-bold text-white mb-2">Note Not Found</h2>
                    <p className="text-slate-400">The note you are looking for does not exist</p>
                </div>
            </div>
        );
    }

    const handleSave = () => {
        handleUpdateKnowledgeItem(knowledgeItem.id || 0, knowledgeItem);
        setHasChanges(false);
    };

    const handleEditorChange = (content: string) => {
        setKnowledgeItem((prev) => ({
            ...prev,
            content
        }))
        setHasChanges(true);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Top Bar with Edit/Preview Toggle and Save Button */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800/50 bg-[#0B1120]">
                {/* Edit/Preview Tabs */}
                <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-1">
                    <button
                        onClick={() => setMode("edit")}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${mode === "edit"
                            ? "bg-slate-800 text-white shadow-sm"
                            : "text-slate-400 hover:text-slate-300"
                            }`}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setMode("preview")}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${mode === "preview"
                            ? "bg-slate-800 text-white shadow-sm"
                            : "text-slate-400 hover:text-slate-300"
                            }`}
                    >
                        Preview
                    </button>
                </div>

                {/* Save Button */}
                <Button
                    onClick={handleSave}
                    disabled={!hasChanges}
                    className={`${hasChanges
                        ? "bg-blue-600 hover:bg-blue-500 text-white"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                        } h-9 px-6 shadow-lg`}
                >
                    Save Changes
                </Button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto">
                <div className="w-full mx-auto p-6">
                    {/* Header */}
                    <NoteHeader
                        key={knowledgeItem.id}
                        title={knowledgeItem?.title || ''}
                        createdDate={
                            knowledgeItem?.createdAt
                                ? new Date(knowledgeItem.createdAt).toLocaleDateString('en-GB')
                                : ''
                        }
                        tags={knowledgeItem?.tags || []}
                        mode={mode}
                        setKnowledgeItem={setKnowledgeItem}
                        setHasChanges={setHasChanges}
                    />

                    {mode === "edit" ? (
                        <>
                            {/* TipTap Editor */}
                            <TipTapEditor
                                key={knowledgeItem.id}
                                content={knowledgeItem?.content || ''}
                                onChange={handleEditorChange}
                                placeholder="Type '/' for commands or start typing..."
                            />
                        </>
                    ) : (
                        <>
                            {/* Preview Mode */}
                            <div className="prose prose-invert prose-slate max-w-none">
                                {/* Main content */}
                                <div
                                    className="text-slate-300 leading-relaxed mb-6"
                                    dangerouslySetInnerHTML={{ __html: knowledgeItem?.content || '' }}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

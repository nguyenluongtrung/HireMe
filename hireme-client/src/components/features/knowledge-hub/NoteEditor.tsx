"use client";

import { useState } from "react";

import { NoteHeader } from "./NoteHeader";
import { AIInsightCard } from "./AIInsightCard";
import { TipTapEditor } from "./TipTapEditor";
import { Button } from "@/components/ui/button";

interface NoteEditorProps {
    noteId: string | null;
}

// Mock note data - replace with actual API call
const mockNotes: Record<string, any> = {
    "1": {
        title: "Salary Negotiation Tips",
        createdDate: "Oct 24, 2023",
        tags: ["negotiation"],
        content: `<p>Preparing for the final round with <strong>TechCorp Inc</strong>. Need to be firm but polite about the base salary expectations.</p>`,
        htmlContent: `<p>Preparing for the final round with <strong>TechCorp Inc</strong>. Need to be firm but polite about the base salary expectations.</p>

<h2>Key Talking Points</h2>
<ul>
<li>Highlight the <strong style="color: #facc15">30% revenue growth</strong> achieved in the previous role.</li>
<li>Mention the competing offer from a mid-size startup to emphasize market demand.</li>
<li>Ask about equity vesting schedule acceleration and potential for performance-based bonuses.</li>
</ul>`,
        sections: [
            {
                title: "AI Insight: Market Rate Analysis",
                type: "ai-insight",
                content:
                    "Based on your experience level and the location (San Francisco), the market rate is typically 15-20% higher than their initial offer range.",
            },
        ],
    },
};

export const NoteEditor = ({ noteId }: NoteEditorProps) => {
    const [mode, setMode] = useState<"edit" | "preview">("edit");
    const [editorContent, setEditorContent] = useState("");
    const [hasChanges, setHasChanges] = useState(false);

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

    const note = mockNotes[noteId];

    if (!note) {
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

    // Initialize editor content if not set
    if (!editorContent && note.htmlContent) {
        setEditorContent(note.htmlContent);
    }

    const handleSave = () => {
        // TODO: Implement save logic
        console.log("Saving content:", editorContent);
        setHasChanges(false);
    };

    const handleEditorChange = (content: string) => {
        setEditorContent(content);
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
                    <NoteHeader title={note.title} createdDate={note.createdDate} tags={note.tags} />

                    {/* Last edited timestamp */}
                    <div className="text-sm text-slate-500 mb-6">
                        Last edited: 2 mins ago
                    </div>

                    {mode === "edit" ? (
                        <>
                            {/* TipTap Editor */}
                            <TipTapEditor
                                content={editorContent}
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
                                    dangerouslySetInnerHTML={{ __html: editorContent }}
                                />

                                {/* AI Insight Section */}
                                {note.sections?.map((section: any, index: number) => {
                                    if (section.type === "ai-insight") {
                                        return (
                                            <AIInsightCard
                                                key={index}
                                                title={section.title}
                                                content={section.content}
                                                actionLabel="Apply Suggestion"
                                            />
                                        );
                                    }

                                    return null;
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

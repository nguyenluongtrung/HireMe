"use client";

import { Suspense, useState } from "react";

import { Sidebar } from "@/components/features/knowledge-hub/Sidebar";
import { NoteEditor } from "@/components/features/knowledge-hub/NoteEditor";

export default function KnowledgeHubPage() {
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>("1");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans flex overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                selectedNoteId={selectedNoteId}
                onSelectNote={setSelectedNoteId}
                collapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <Suspense fallback={<div>Loading...</div>}>
                    <NoteEditor noteId={selectedNoteId} />
                </Suspense>
            </div>
        </div>
    );
}

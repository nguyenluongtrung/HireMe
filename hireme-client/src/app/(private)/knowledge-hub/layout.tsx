"use client";

import { Suspense } from "react";
import { Sidebar } from "@/components/features/knowledge-hub/Sidebar";
import { useParams, useRouter } from "next/navigation";

export default function KnowledgeHubLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const params = useParams();
  const itemId = params?.["item-id"] ? Number(params["item-id"]) : null;

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans flex overflow-hidden">
      {/* Knowledge Hub Sidebar */}
      <Suspense fallback={<div className="w-[280px] bg-[#0F1629] border-r border-slate-800/50 animate-pulse" />}>
        <Sidebar
          selectedNoteId={itemId}
          collapsed={false}
          onSelectNote={(selectedItemId: number, resourceId: number) => {
            router.push(`/knowledge-hub/${resourceId}/${selectedItemId}`);
          }}
          onToggleCollapse={() => { }}
        />
      </Suspense>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-slate-500 text-sm">Loading...</div>
          </div>
        }>
          {children}
        </Suspense>
      </div>
    </div>
  );
}

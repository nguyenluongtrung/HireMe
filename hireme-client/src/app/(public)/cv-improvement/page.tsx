"use client";

import {
  History,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CVUploader } from "@/components/features/cv-improvement/CVUploader";
import { CVEnhancer } from "@/components/features/cv-improvement/CVEnhancer";

export default function CVImprovement() {
  return (
    <div className="min-h-full bg-[#0B1120] text-slate-300 p-6 md:p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Resume Analysis</h1>
          <p className="text-slate-400">
            AI-powered feedback on structure, grammar, and tone for your latest upload.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white gap-2">
            <History className="h-4 w-4" />
            History
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
            <FileText className="h-4 w-4" />
            Manual Edit
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Preview & Upload (4 cols) */}
        <CVUploader />

        {/* Right Column: Analysis & Feedback (8 cols) */}
        <CVEnhancer />
      </div>
    </div>
  );
}

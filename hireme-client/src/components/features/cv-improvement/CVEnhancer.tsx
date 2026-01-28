'use client'

import {
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Wand2,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export const CVEnhancer = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="lg:col-span-8 space-y-6">

      {/* Score Card */}
      <div className="bg-[#1e293b] rounded-xl p-6 border border-slate-700/50 flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Radial Score (SVG) */}
        <div className="relative h-32 w-32 shrink-0">
          <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              className="text-slate-700"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
            {/* Progress Circle (78%) */}
            <circle
              className="text-blue-500"
              strokeWidth="8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - 0.78)}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-white">78</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold">Điểm</span>
          </div>
        </div>

        <div className="flex-1 space-y-4 w-full">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Tốt nhưng cần cải thiện về cấu trúc</h3>
            <p className="text-sm text-slate-400">
              CV của bạn có nội dung mạnh mẽ nhưng cấu trúc và khả năng đọc được của ATS có thể cải thiện để vượt qua các bộ lọc tự động.
            </p>
          </div>

          {/* ATS Progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Wand2 className="h-3.5 w-3.5 text-blue-400" /> Độ tương thích với ATS
              </span>
              <span className="text-blue-400">Cao (85%)</span>
            </div>
            <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[85%] rounded-full" />
            </div>
            <p className="text-[10px] text-slate-500">Dựa trên các phân tích của hệ thống ATS.</p>
          </div>
        </div>
      </div>

      {/* Visualization Tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        {['Overview', 'Structure', 'Grammar', 'Skills', 'Tone'].map((tab) => {
          const isActive = activeTab === tab.toLowerCase();
          // Mock counts
          const count = tab === 'Structure' ? 2 : tab === 'Grammar' ? 3 : 0;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
                      ${isActive
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                  : 'bg-transparent text-slate-400 hover:bg-slate-800'
                }
                   `}
            >
              {tab}
              {count > 0 && (
                <span className={`
                         text-[10px] px-1.5 py-0.5 rounded-full 
                         ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}
                      `}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Priority Fixes</h3>

      <div className="space-y-4">
        {/* Card 1: Missing LinkedIn */}
        <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-5 flex gap-4">
          <div className="shrink-0 h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div className="space-y-3 flex-1">
            <div>
              <h4 className="text-base font-semibold text-white mb-1">Missing LinkedIn URL</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your header contact information is incomplete. Recruiters often verify profiles on LinkedIn.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button size="sm" className="bg-red-600 hover:bg-red-500 text-white border-0 gap-2 h-8 text-xs">
                <ExternalLink className="h-3.5 w-3.5" />
                Add Link
              </Button>
              <button className="text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Passive Voice */}
        <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-5 flex gap-4">
          <div className="shrink-0 h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="space-y-3 flex-1">
            <div>
              <h4 className="text-base font-semibold text-white mb-1">Passive Voice Detected</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                In &quot;Project Manager&quot; role: &quot;Was responsible for leading the team&quot; is passive. Use strong action verbs.
              </p>
            </div>

            <div className="bg-[#0B1120] rounded-lg p-3 border border-slate-800 flex items-center gap-3 text-sm">
              <span className="text-red-400 line-through">Was responsible for leading</span>
              <ChevronRight className="h-3 w-3 text-slate-600" />
              <span className="text-emerald-400 font-medium">Spearheaded</span>
            </div>

            <div className="flex items-center gap-4">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white border-0 gap-2 h-8 text-xs">
                <Wand2 className="h-3 w-3" />
                Apply AI Fix
              </Button>
            </div>
          </div>
        </div>

        {/* Card 3: Positive Feedback (Keywords) */}
        <div className="bg-[#1e293b] border border-emerald-900/30 rounded-xl p-5 flex gap-4">
          <div className="shrink-0 h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div className="space-y-1 flex-1">
            <h4 className="text-base font-semibold text-white mb-1">Strong Technical Keywords</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Great job including &quot;Python&quot;, &quot;React&quot;, and &quot;Data Analysis&quot;. These match 90% of job descriptions in your target role.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

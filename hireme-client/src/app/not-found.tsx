"use client";

import Link from "next/link";
import { Search, FileText, Briefcase, HelpCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">

      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

      {/* 404 Visual */}
      <div className="relative z-10 mb-8 text-center">
        <h1 className="!text-[150px] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-slate-800 drop-shadow-2xl select-none">
          404
        </h1>
        {/* Decorative elements simulating the 'broken' or 'floating' look could go here */}
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-2xl font-bold text-white tracking-tight">
            Ố là la! Trang bạn tìm hiện không tồn tại
          </h2>
          <p className="text-slate-400 text-lg">
            Có vẻ như liên kết đã hỏng hoặc trang đã được di chuyển.
            <br className="hidden md:block" />
            Đừng lo lắng, hãy cho chúng tôi giúp bạn tìm lại trang.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <Search size={18} />
          </div>
          <Input
            type="text"
            placeholder="Search for tools, tips, or pages..."
            className="w-full pl-10 h-11 bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500 focus-visible:ring-blue-500 rounded-lg"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="h-11 px-8 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg shadow-lg shadow-blue-900/20 w-full sm:w-auto">
            <Link href="/">
              Trở lại Trang Chủ
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="h-11 px-8 bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg w-full sm:w-auto">
            Liên hệ Hỗ trợ
          </Button>
        </div>

        {/* Quick Links */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-400 font-medium">
          <Link href="/cv-improvement" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <FileText size={16} />
            Nâng cấp CV
          </Link>
          <Link href="/job-tracker" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <Briefcase size={16} />
            Theo dõi việc Làm
          </Link>
          <Link href="/help" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <HelpCircle size={16} />
            Trung Tâm Hỗ trợ
          </Link>
        </div>
      </div>
    </div>
  );
}

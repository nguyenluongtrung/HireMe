"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { FileQuestion, Home, ArrowLeft } from "lucide-react";

import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50 animate-pulse" />
          <div className="relative bg-white p-6 rounded-full border border-gray-100 shadow-sm">
            <FileQuestion size={64} className="text-primary" />
          </div>
        </div>
        
        <h1 className="text-8xl font-bold text-gray-900 tracking-tighter mb-4">
          4<span className="text-primary">0</span>4
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
          Ối! Trang này không tồn tại
        </h2>
        
        <p className="text-gray-500 max-w-md mb-8">
          Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không truy cập được.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="gap-2 shadow-md">
            <Link href="/">
              <Home size={18} />
              Về trang chủ
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} />
            Quay lại
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}

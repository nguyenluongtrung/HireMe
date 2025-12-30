'use client'
import { useRouter } from "next/navigation";

import { CVEnhancer } from "@/components/features/cv-improvement/CVEnhancer";
import { CVUploader } from "@/components/features/cv-improvement/CVUploader";
import { Button } from "@/components/ui/button";

import { pageRouters } from "@/contants/routers";

export default function CVImprovement() {
  const router = useRouter();
  
  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Nâng cấp CV
          </h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Tối ưu hóa hồ sơ của bạn với AI để tăng cơ hội trúng tuyển
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => router.push(pageRouters.CV_HISTORY.href)}
          className="shrink-0"
        >
          Danh sách CV của tôi
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="h-full">
          <CVUploader />
        </div>
        <div className="h-full">
          <CVEnhancer />
        </div>
      </div>
    </div>
  );
}

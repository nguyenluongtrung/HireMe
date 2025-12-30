import { Sparkles, Bot, Zap, ArrowRight } from "lucide-react";

export const CVEnhancer = () => {
  return (
    <div className="h-full rounded-xl border border-gray-200 bg-white shadow-sm p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
        <Sparkles className="text-yellow-500 fill-yellow-500" size={20} />
        <h2 className="font-semibold text-gray-900">AI Nhận xét & Đánh giá</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 opacity-60">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 animate-pulse" />
          <div className="relative bg-white p-4 rounded-full border border-gray-100 shadow-sm">
            <Bot size={48} className="text-primary" />
          </div>
        </div>

        <div className="max-w-xs space-y-2">
          <h3 className="font-medium text-gray-900">Chưa có nội dung để phân tích</h3>
          <p className="text-sm text-gray-500">
            Vui lòng tải lên CV của bạn ở mục bên trái để AI có thể bắt đầu phân tích và đưa ra gợi ý cải thiện.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
           <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-left">
             <div className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-1">
               <Zap size={12} className="text-yellow-500" />
               Đánh giá chi tiết
             </div>
             <div className="h-1.5 w-3/4 bg-gray-200 rounded-full" />
           </div>
           <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-left">
             <div className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-1">
               <ArrowRight size={12} className="text-green-500" />
               Gợi ý sửa đổi
             </div>
             <div className="h-1.5 w-1/2 bg-gray-200 rounded-full" />
           </div>
        </div>
      </div>
    </div>
  );
};

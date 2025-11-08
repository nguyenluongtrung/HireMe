import { Eye, Trash2, FileText, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const HistoryTable = () => {
  // Mock data for display
  const historyData = [
    {
      id: 1,
      date: "01/05/2024",
      title: "CV Kỹ Sư Phần Mềm - Senior",
      score: 85,
      status: "Đã phân tích",
    },
    {
      id: 2,
      date: "15/04/2024",
      title: "CV Quản Lý Dự Án",
      score: 72,
      status: "Đã phân tích",
    },
    {
      id: 3,
      date: "10/03/2024",
      title: "CV Fullstack Developer",
      score: 90,
      status: "Đã phân tích",
    },
     {
      id: 4,
      date: "05/02/2024",
      title: "CV Thực Tập Sinh",
      score: 60,
      status: "Cần cải thiện",
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
            <tr>
              <th className="py-4 px-6">Tên CV</th>
              <th className="py-4 px-6">Ngày tạo</th>
              <th className="py-4 px-6">Điểm số</th>
              <th className="py-4 px-6">Trạng thái</th>
              <th className="py-4 px-6 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {historyData.map((item) => (
              <tr 
                key={item.id} 
                className="group hover:bg-gray-50/50 transition-colors duration-200"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <FileText size={20} />
                    </div>
                    <span className="font-semibold text-gray-900">{item.title}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={16} />
                    <span>{item.date}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                   <div className="flex items-center gap-2">
                    <div className="w-full max-w-[80px] h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.score >= 80 ? 'bg-green-500' : item.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <span className="font-medium text-gray-700">{item.score}/100</span>
                   </div>
                </td>
                 <td className="py-4 px-6">
                   <Badge variant={item.status === "Đã phân tích" ? "default" : "secondary"}>
                      {item.status}
                   </Badge>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50">
                      <Eye size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
       {/* Empty State / Pagination Placeholder */}
       {historyData.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <p>Chưa có CV nào được lưu.</p>
          </div>
       )}
       
       <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
          <span>Hiển thị 4 trên 4 kết quả</span>
          <div className="flex gap-2">
             <Button variant="outline" size="sm" disabled>Trước</Button>
             <Button variant="outline" size="sm" disabled>Sau</Button>
          </div>
       </div>
    </div>
  );
};

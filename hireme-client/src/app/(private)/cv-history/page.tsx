import { HistoryTable } from "@/components/features/cv-history/HistoryTable";

export default function CVHistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
       <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          Lịch sử CV
        </h1>
        <p className="text-gray-500 mt-1">
          Quản lý và xem lại các CV bạn đã tải lên và được phân tích
        </p>
      </div>
      <HistoryTable />
    </div>
  );
}
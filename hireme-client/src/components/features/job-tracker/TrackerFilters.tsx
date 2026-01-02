import { Search, Plus, Filter, Calendar } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const TrackerFilters = () => {
    return (
        <div className="bg-[#1e293b] p-3 md:p-4 rounded-xl border border-slate-700/50 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                    placeholder="Tìm kiếm theo công ty hoặc vị trí..."
                    className="pl-9 bg-[#0B1120] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 h-10 w-full"
                />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Filters */}
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="bg-[#0B1120] border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 h-10 gap-2">
                        Trạng thái: Tất cả
                        <Filter className="h-3.5 w-3.5 opacity-70" />
                    </Button>
                    <Button variant="outline" className="bg-[#0B1120] border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 h-10 gap-2 hidden sm:flex">
                        Ngày: 30 ngày qua
                        <Calendar className="h-3.5 w-3.5 opacity-70" />
                    </Button>
                </div>

                {/* Add Button */}
                <Button className="bg-blue-600 hover:bg-blue-500 text-white h-10 gap-2 ml-auto shadow-lg shadow-blue-900/20">
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Ứng Tuyển Mới</span>
                    <span className="sm:hidden">Thêm</span>
                </Button>
            </div>
        </div>
    );
};

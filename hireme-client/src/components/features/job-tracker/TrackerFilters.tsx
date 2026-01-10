import { useEffect, useState } from "react";
import { Search, Plus, Filter, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApplicationModal } from "./ApplicationModal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { ModalMode } from "@/contants/enums";

import useApplicationForm from "@/hooks/applications/useApplicationForm";

import { cn } from "@/lib/utils";

export const TrackerFilters = ({ date, setDate, setSearchInput }: { date: Date | undefined, setDate: (date: Date | undefined) => void, setSearchInput: (search: string) => void }) => {
    const [openApplicationCreationModal, setOpenApplicationCreationModal] = useState(false);

    const { handleCreateApplication } = useApplicationForm();

    return (
        <>
            <div className="bg-[#1e293b] p-3 md:p-4 rounded-xl border border-slate-700/50 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-[1000]" />
                    <Input
                        placeholder="Tìm kiếm theo công ty hoặc vị trí..."
                        className="pl-9 bg-[#0B1120] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 h-10 w-full"
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    {/* Filters */}
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="bg-[#0B1120] border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 h-10 gap-2">
                            Trạng thái: Tất cả
                            <Filter className="h-3.5 w-3.5 opacity-70" />
                        </Button>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className={cn("bg-[#0B1120] border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 h-10 gap-2 hidden sm:flex justify-start font-normal", !date && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-3.5 w-3.5 opacity-70" />
                                    {date ? format(date, "yyyy-MM-dd") : "Chọn ngày"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 z-[60] bg-[#1e293b] border-slate-700 text-slate-100 pointer-events-auto" align="end">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Add Button */}
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white h-10 gap-2 ml-auto shadow-lg shadow-blue-900/20" onClick={() => setOpenApplicationCreationModal(true)}>
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">Ứng Tuyển Mới</span>
                        <span className="sm:hidden">Thêm</span>
                    </Button>
                </div>
            </div>

            {openApplicationCreationModal &&
                <ApplicationModal
                    isOpen={openApplicationCreationModal}
                    mode={ModalMode.CREATE}
                    onSave={(data) => handleCreateApplication(data)}
                    onClose={() => setOpenApplicationCreationModal(false)}
                />
            }
        </>
    );
};

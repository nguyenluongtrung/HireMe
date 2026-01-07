import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteApplicationModal } from "./DeleteApplicationModal";
import { ApplicationModal } from "./ApplicationModal";

import useApplicationList from "@/hooks/applications/useApplicationList";
import useApplicationForm from "@/hooks/applications/useApplicationForm";

import { cn, getRandomColor } from "@/lib/utils";
import { formatDate } from "@/lib/date";

import { Application } from "@/interfaces/application";

import { ModalMode } from "@/contants/enums";

export const ApplicationsTable = ({ searchDebounce, date }: { searchDebounce: string, date: Date | undefined }) => {
    const [page, setPage] = useState(1);

    const { data: applicationList, isLoading } = useApplicationList({ page, limit: 5, searchDebounce, date });
    const { handleDeleteApplication, handleUpdateApplication } = useApplicationForm();

    const [selectedApplicationToDelete, setSelectedApplicationToDelete] = useState<Application | null>(null);
    const [selectedApplicationToUpdate, setSelectedApplicationToUpdate] = useState<Application | null>(null);

    const getStatusConfig = (status: string) => {
        const normalizedStatus = status.toLowerCase();
        if (normalizedStatus.includes("interview")) {
            return { label: "Phỏng Vấn", color: "text-purple-400 border-purple-400/20 bg-purple-400/10" };
        }
        if (normalizedStatus.includes("rejected")) {
            return { label: "Bị Từ Chối", color: "text-red-400 border-red-400/20 bg-red-400/10" };
        }
        if (normalizedStatus.includes("offer")) {
            return { label: "Đề Nghị", color: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10" };
        }
        return { label: "Đã Nộp", color: "text-blue-400 border-blue-400/20 bg-blue-400/10" };
    };

    const handleDeleteClick = (app: Application) => {
        setSelectedApplicationToDelete(app);
    };

    const handleConfirmDelete = () => {
        handleDeleteApplication(selectedApplicationToDelete?.id || 0);
        setSelectedApplicationToDelete(null);
    };

    const handleUpdateClick = (app: Application) => {
        setSelectedApplicationToUpdate(app);
    };

    const handleConfirmUpdate = (data: Partial<Application>) => {
        handleUpdateApplication(selectedApplicationToUpdate?.id || 0, data);
        setSelectedApplicationToUpdate(null);
    };

    if (isLoading) {
        return <div className="p-8 text-center text-slate-400">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="bg-[#1e293b] rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-[#0f172a]/50 text-xs uppercase font-semibold text-slate-500">
                        <tr>
                            <th className="px-6 py-4">Công ty</th>
                            <th className="px-6 py-4">Vị trí</th>
                            <th className="px-6 py-4">Ngày Ứng Tuyển</th>
                            <th className="px-6 py-4">Trạng Thái</th>
                            <th className="px-6 py-4">Ghi Chú</th>
                            <th className="px-6 py-4 text-right">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        {applicationList && applicationList.data.length > 0 ? (
                            applicationList.data.map((app) => {
                                const statusConfig = getStatusConfig(app.status);
                                return (
                                    <tr
                                        key={app.id}
                                        className="hover:bg-slate-800/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={cn(
                                                        "h-10 w-10 rounded-lg flex items-center justify-center font-bold text-lg shrink-0",
                                                        getRandomColor(app.companyName)
                                                    )}
                                                >
                                                    {app.companyName.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-white max-w-[200px] truncate">
                                                        {app.companyName}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-200">
                                                {app.position}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {formatDate(app.dateApplied || app.createdAt)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "rounded-full px-2.5 py-0.5 text-xs font-medium border",
                                                    statusConfig.color
                                                )}
                                            >
                                                {statusConfig.label}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 max-w-[200px] truncate">
                                            {app.notes || "-"}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end items-center gap-1">
                                                <Button size="icon" variant="ghost" className="h-6 w-6 text-orange-400 bg-orange-400/10 hover:bg-orange-400/20" title="Chỉnh sửa" onClick={() => handleUpdateClick(app)}>
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-6 w-6 text-red-400 bg-red-400/10 hover:bg-red-400/20"
                                                    title="Xóa"
                                                    onClick={() => handleDeleteClick(app)}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                    Chưa có dữ liệu ứng tuyển nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            {applicationList && (
                <div className="px-6 py-4 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <div>
                        Hiển thị <span className="text-white font-medium">{(applicationList.page - 1) * applicationList.limit + 1}</span> đến <span className="text-white font-medium">{Math.min(applicationList.page * applicationList.limit, applicationList.totalItems)}</span> của <span className="text-white font-medium">{applicationList.totalItems}</span> kết quả
                    </div>

                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-slate-700 bg-slate-800 text-slate-400 hover:text-white disabled:opacity-50"
                            disabled={applicationList.page <= 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                        >
                            &lt;
                        </Button>
                        <Button variant="default" size="icon" className="h-8 w-8 bg-blue-600 text-white hover:bg-blue-500">
                            {applicationList.page}
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-slate-700 bg-slate-800 text-slate-400 hover:text-white disabled:opacity-50"
                            disabled={applicationList.page >= applicationList.totalPages}
                            onClick={() => setPage(p => p + 1)}
                        >
                            &gt;
                        </Button>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {selectedApplicationToDelete && (
                <DeleteApplicationModal
                    isOpen={true}
                    onClose={() => setSelectedApplicationToDelete(null)}
                    onConfirm={handleConfirmDelete}
                    applicationName={selectedApplicationToDelete.position}
                    companyName={selectedApplicationToDelete.companyName}
                />
            )}

            {selectedApplicationToUpdate && (
                <ApplicationModal
                    isOpen={true}
                    mode={ModalMode.UPDATE}
                    initialData={selectedApplicationToUpdate}
                    onSave={(data) => handleConfirmUpdate(data)}
                    onClose={() => setSelectedApplicationToUpdate(null)}
                />
            )}
        </div>
    );
};

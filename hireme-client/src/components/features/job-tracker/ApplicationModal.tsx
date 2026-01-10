import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Briefcase, Calendar as CalendarIcon, Flag, X } from "lucide-react";
import { format } from "date-fns";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";

import { Application } from "@/interfaces/application";

import { ApplicationStatus, ModalMode } from "@/contants/enums";

import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const applicationSchema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position is required"),
    status: z.string(),
    dateApplied: z.date().optional(),
    notes: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface ApplicationModalProps {
    isOpen: boolean;
    mode?: ModalMode;
    onClose: () => void;
    onSave: (data: ApplicationFormValues) => void;
    initialData?: Application | null;
}

export const ApplicationModal = ({ isOpen, mode, onClose, onSave, initialData }: ApplicationModalProps) => {
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm<ApplicationFormValues>({
        resolver: zodResolver(applicationSchema),
        defaultValues: {
            companyName: "",
            position: "",
            status: "Applied",
            dateApplied: new Date(),
            notes: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                companyName: initialData.companyName,
                position: initialData.position,
                status: initialData.status,
                dateApplied: initialData.dateApplied ? new Date(initialData.dateApplied) : undefined,
                notes: initialData.notes || "",
            });
        } else {
            reset({
                companyName: "",
                position: "",
                status: "Applied",
                dateApplied: new Date(),
                notes: "",
            })
        }
    }, [initialData, isOpen, reset]);

    const onSubmit = (data: ApplicationFormValues) => {
        onSave(data);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0f172a] border-slate-700/50 text-slate-100 sm:max-w-[600px] p-0 overflow-hidden gap-0" showCloseButton={false}>
                <DialogHeader className="p-6 pb-4 border-b border-slate-700/50 bg-[#0f172a] space-y-1">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="!text-[32px] font-semibold text-white">{mode === ModalMode.CREATE ? "Thêm" : "Chỉnh sửa"} đơn ứng tuyển</DialogTitle>
                        <DialogClose className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                            <X className="h-4 w-4" />
                        </DialogClose>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 bg-[#0f172a]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Company Name */}
                        <div className="space-y-2">
                            <Label htmlFor="companyName" className="text-xs font-medium text-slate-400">Tên công ty</Label>
                            <div className="relative group">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                <Input
                                    id="companyName"
                                    placeholder="e.g. Google"
                                    className="pl-10 bg-[#1e293b] border-slate-700 text-slate-200 placeholder:text-slate-600 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 h-11"
                                    {...register("companyName")}
                                />
                            </div>
                            {errors.companyName && <p className="text-red-400 text-xs">{errors.companyName.message}</p>}
                        </div>

                        {/* Position */}
                        <div className="space-y-2">
                            <Label htmlFor="position" className="text-xs font-medium text-slate-400">Vị trí ứng tuyển</Label>
                            <div className="relative group">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                <Input
                                    id="position"
                                    placeholder="e.g. Senior Product Designer"
                                    className="pl-10 bg-[#1e293b] border-slate-700 text-slate-200 placeholder:text-slate-600 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 h-11"
                                    {...register("position")}
                                />
                            </div>
                            {errors.position && <p className="text-red-400 text-xs">{errors.position.message}</p>}
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-xs font-medium text-slate-400">Trạng thái</Label>
                            <div className="relative group">
                                <Flag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                <Controller
                                    control={control}
                                    name="status"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="pl-10 !h-11 w-full bg-[#1e293b] border-slate-700 text-slate-200 focus:ring-blue-500/20 focus:border-blue-500 focus:ring-1">
                                                <SelectValue placeholder="Chọn trạng thái" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1e293b] border-slate-700 text-slate-200">
                                                <SelectItem value={ApplicationStatus.PENDING} className="focus:bg-slate-800 focus:text-slate-100 cursor-pointer">Hoãn</SelectItem>
                                                <SelectItem value={ApplicationStatus.APPLIED} className="focus:bg-slate-800 focus:text-slate-100 cursor-pointer">Đã nộp</SelectItem>
                                                <SelectItem value={ApplicationStatus.INTERVIEWED} className="focus:bg-slate-800 focus:text-slate-100 cursor-pointer">Đã phỏng vấn</SelectItem>
                                                <SelectItem value={ApplicationStatus.ACCEPTED} className="focus:bg-slate-800 focus:text-slate-100 cursor-pointer">Đã chấp nhận</SelectItem>
                                                <SelectItem value={ApplicationStatus.REJECTED} className="focus:bg-slate-800 focus:text-slate-100 cursor-pointer">Bị từ chối</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                            </div>
                        </div>

                        {/* Date Applied */}
                        <div className="space-y-2">
                            <Label htmlFor="dateApplied" className="text-xs font-medium text-slate-400">Ngày nộp đơn</Label>
                            <div className="relative group">
                                <Controller
                                    control={control}
                                    name="dateApplied"
                                    render={({ field }) => (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start !pl-10 h-11 bg-[#1e293b] border-slate-700 text-slate-200",
                                                        !field.value && "text-slate-500"
                                                    )}
                                                >
                                                    <CalendarIcon className="absolute left-3 h-4 w-4 text-slate-500" />
                                                    {field.value ? format(field.value, "yyyy-MM-dd") : "Select date"}
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent className="w-auto p-0 z-[60] bg-[#1e293b] border-slate-700 text-slate-100 pointer-events-auto" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-xs font-medium text-slate-400">Ghi chú</Label>
                        <textarea
                            id="notes"
                            className="flex h-[120px] resize-none w-full rounded-md border border-slate-700 bg-[#1e293b] px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Miêu tả công việc..."
                            {...register("notes")}
                        />
                    </div>
                </form>

                <DialogFooter className="p-6 pt-2 bg-[#0f172a] border-t border-slate-700/50 flex sm:justify-end gap-3">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                        Huỷ
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
                    >
                        Lưu
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

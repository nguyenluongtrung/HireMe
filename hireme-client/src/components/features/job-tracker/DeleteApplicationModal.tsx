import { Trash2 } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    applicationName: string;
    companyName: string;
}

export const DeleteApplicationModal = ({ isOpen, onClose, onConfirm, applicationName, companyName }: DeleteApplicationModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0f172a] border-slate-700/50 text-slate-100 sm:max-w-[420px] p-6 flex flex-col items-center text-center gap-6" showCloseButton={false}>
                {/* Icon Container */}
                <div className="h-14 w-14 rounded-full bg-red-500/10 flex items-center justify-center">
                    <div className="h-9 w-9 rounded-md bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/20">
                        <Trash2 className="h-5 w-5 text-white" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-white">Xoá đơn ứng tuyển này</h2>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Bạn có chắc chắn muốn xoá đơn ứng tuyển <span className="text-white font-medium">{applicationName} tại {companyName}</span>? Hành động này không thể khôi phục.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 w-full mt-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white h-11"
                    >
                        Huỷ
                    </Button>
                    <Button
                        onClick={onConfirm}
                        className="flex-1 bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20 h-11 gap-2"
                    >
                        <Trash2 className="h-4 w-4" />
                        Xoá
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

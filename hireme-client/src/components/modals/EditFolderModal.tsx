
import React from "react";
import { useForm } from "react-hook-form";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (folderName: string) => void;
    folderName: string;
}

export const EditFolderModal = ({ isOpen, onClose, onConfirm, folderName }: EditFolderModalProps) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<{
        title: string;
    }>({
        defaultValues: {
            title: folderName,
        },
    })

    const handleCreate = (data: { title: string }) => {
        if (data.title.trim()) {
            onConfirm(data.title);
            reset();
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#1A2333] border-slate-700 text-white sm:max-w-md">
                <form onSubmit={handleSubmit(handleCreate)}>
                    <DialogHeader>
                        <DialogTitle className="!text-lg !font-semibold">Cập nhật thư mục</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-slate-300">
                                Tên thư mục
                            </Label>
                            <Input
                                id="name"
                                placeholder="Nhập tên thư mục..."
                                {...register("title")}
                                maxLength={255}
                                required
                                className="bg-[#0B1120] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        </div>
                    </div>
                    <DialogFooter className="flex gap-2 sm:justify-end">
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            className="text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={!watch('title')?.trim()}
                            className="bg-blue-600 hover:bg-blue-500 text-white"
                        >
                            Cập nhật
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

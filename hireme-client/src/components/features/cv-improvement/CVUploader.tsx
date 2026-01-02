"use client";

import { Upload, X, FileText, CloudUpload, CheckCircle, AlertCircle, MoreVertical } from "lucide-react";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { renderAsync } from "docx-preview";

import { Button } from "@/components/ui/button";

import { ALLOWED_CV_TYPES, MAX_FILE_SIZE } from "@/contants";

export const CVUploader = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadFileError, setUploadFileError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const docxContainerRef = useRef<HTMLDivElement | null>(null);

  // Handle file select
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset previous state
    setUploadFileError(null);
    setPreviewUrl(null);

    // Validate file type
    if (!ALLOWED_CV_TYPES.includes(file.type)) {
      setUploadFileError(
        "Định dạng file không hợp lệ. Hãy chọn PDF, DOC hoặc DOCX."
      );
      e.target.value = "";
      return;
    }
    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      setUploadFileError("Kích thước file quá 10MB.");
      return;
    }
    // Create preview URL
    if (file.type.includes("word")) {
      const arrayBuffer = await file.arrayBuffer();
      // store ArrayBuffer temporarily for rendering later
      (file as any)._arrayBuffer = arrayBuffer;
      setPreviewUrl("docx-preview"); // just a placeholder string
    } else {
      setPreviewUrl(URL.createObjectURL(file));
    }
    setSelectedFile(file);
  };

  const [isDragOver, setIsDragOver] = useState(false);

  // Handle drag events for visual feedback
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const onDropFile = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const fakeEvent = {
      target: { files: [file] },
    } as unknown as ChangeEvent<HTMLInputElement>;

    handleFileChange(fakeEvent);
  };

  const renderPreview = () => {
    if (!selectedFile || !previewUrl) return null;

    if (selectedFile.type === "application/pdf") {
      return (
        <iframe
          src={`${previewUrl}#toolbar=0&navpanes=0`}
          className="w-full h-full min-h-[500px] border border-gray-200 rounded-lg shadow-sm"
          title="PDF Preview"
        />
      );
    }

    // DOC or DOCX
    if (
      selectedFile.type === "application/msword" ||
      selectedFile.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return (
        <div
          ref={docxContainerRef}
          id="docx-preview"
          className="w-full h-full min-h-[500px] overflow-auto border border-gray-200 rounded-lg shadow-sm bg-white p-4"
        ></div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <FileText size={48} className="mb-2 text-gray-400" />
        <p className="text-sm">Không thể xem trước tệp này.</p>
      </div>
    );
  };

  // render DOCX after div exists
  useEffect(() => {
    if (
      selectedFile &&
      selectedFile.type.includes("word") &&
      docxContainerRef.current &&
      (selectedFile as any)._arrayBuffer
    ) {
      docxContainerRef.current.innerHTML = ""; // clear old preview
      renderAsync((selectedFile as any)._arrayBuffer, docxContainerRef.current);
    }
  }, [selectedFile]);

  return (
    <div className="lg:col-span-4 space-y-6">
      {/* PDF Preview Card */}
      <div className="bg-[#1e293b] rounded-xl p-4 border border-slate-700/50 flex flex-col items-center justify-center min-h-[400px] relative">
        {/* Mock Page visual */}
        <div className="w-[80%] h-[350px] bg-slate-200 rounded shadow-lg flex flex-col p-4 space-y-3 opacity-90 transition-transform hover:scale-[1.02] cursor-pointer">
          <div className="w-1/3 h-4 bg-slate-300 rounded mb-4" />
          <div className="w-full h-2 bg-slate-300 rounded" />
          <div className="w-full h-2 bg-slate-300 rounded" />
          <div className="w-2/3 h-2 bg-slate-300 rounded" />

          <div className="w-full h-px bg-slate-300 my-4" />

          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="w-1/3 h-24 bg-slate-300 rounded" />
              <div className="flex-1 space-y-2">
                <div className="w-full h-2 bg-slate-300 rounded" />
                <div className="w-full h-2 bg-slate-300 rounded" />
                <div className="w-5/6 h-2 bg-slate-300 rounded" />
              </div>
            </div>
          </div>
        </div>
        <span className="absolute bottom-6 text-xs text-slate-500 font-medium">Trang 1 của 2</span>
      </div>

      {/* Current File Info */}
      <div className="bg-[#1e293b] rounded-xl p-4 border border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">John_Doe_CV_2024.pdf</p>
            <p className="text-xs text-slate-500">2.4 MB • Uploaded just now</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      {/* Upload Area */}
      <div className="border border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-800/30 transition-colors cursor-pointer group">
        <div className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-slate-700 transition-colors">
          <Upload className="h-5 w-5 text-slate-400 group-hover:text-blue-400" />
        </div>
        <p className="text-sm font-medium text-white mb-1">Tải lên tệp mới</p>
        <p className="text-xs text-slate-500">Kéo thả hoặc nhấp để chọn tệp</p>
      </div>
    </div>
  );
};

"use client";

import { Upload, X, FileText, CloudUpload, CheckCircle, AlertCircle } from "lucide-react";
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
    <div className="w-full h-full flex flex-col gap-4">
      {!previewUrl ? (
        <div
          className={`
            relative w-full h-full rounded-xl border-2 border-dashed transition-all duration-200 ease-in-out
            flex flex-col items-center justify-center gap-6 p-8
            ${
              isDragOver
                ? "border-primary bg-primary/5 scale-[1.01]"
                : "border-gray-300 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-400"
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={onDropFile}
        >
          <div className="bg-white p-4 rounded-full shadow-sm border border-gray-100">
             <CloudUpload size={48} className={`text-primary ${isDragOver ? 'animate-bounce' : ''}`} />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Tải CV của bạn lên
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              Kéo thả tệp vào đây hoặc nhấn vào nút bên dưới để chọn tệp từ máy tính
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Hỗ trợ: PDF, DOC, DOCX (Tối đa 10MB)
            </p>
          </div>

          <Button
            size="lg"
            className="shadow-md hover:shadow-lg transition-all"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Chọn CV từ máy tính
          </Button>

          {uploadFileError && (
             <div className="absolute bottom-8 flex items-center gap-2 text-red-500 bg-red-50 px-4 py-2 rounded-lg text-sm border border-red-100 animate-in fade-in slide-in-from-bottom-2">
               <AlertCircle size={16} />
               {uploadFileError}
             </div>
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 truncate max-w-[200px] md:max-w-xs">
                    {selectedFile?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile?.size ? (selectedFile.size / 1024 / 1024).toFixed(2) : 0)} MB
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPreviewUrl(null);
                    setSelectedFile(null);
                  }}
                  className="text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200"
                >
                  <X size={16} className="mr-2" />
                  Hủy
                </Button>
                <Button 
                  size="sm"
                  className="bg-primary hover:bg-primary/90 shadow-sm"
                >
                  Nâng cấp ngay
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
              {renderPreview()}
            </div>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        accept={ALLOWED_CV_TYPES.join(",")}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

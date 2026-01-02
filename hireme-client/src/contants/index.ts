import { Download, FileSignature, Upload, Wand2 } from "lucide-react";

export const JOB_SEEKING_STEPS = [
  {
      icon: FileSignature,
      title: "Đăng ký & tạo tài khoản",
      desc: "Người dùng đăng ký nhanh bằng email để bắt đầu quá trình cải thiện CV.",
      iconColor: "text-purple-400",
      bgFrom: "from-purple-500/10",
    },
    {
      icon: Upload,
      title: "Tải CV lên hệ thống",
      desc: "Chỉ cần tải lên file CV hiện tại (PDF, DOCX), hệ thống sẽ tự động đọc.",
      iconColor: "text-pink-400",
      bgFrom: "from-pink-500/10",
    },
    {
      icon: Wand2,
      title: "Phân tích & tối ưu AI",
      desc: "Hệ thống AI tự động phân tích CV, gợi ý chỉnh sửa và bổ sung điểm mạnh.",
      iconColor: "text-emerald-400",
      bgFrom: "from-emerald-500/10",
    },
    {
      icon: Download,
      title: "Xem & tải CV đã tối ưu",
      desc: "Xem bản CV được cải thiện, tùy chỉnh thêm và tải xuống phiên bản hoàn thiện.",
      iconColor: "text-blue-400",
      bgFrom: "from-blue-500/10",
    },
];

export const STEP_COLOR_PAIRS = [
  { bg: "bg-purple-100", text: "text-purple-900" },
  { bg: "bg-pink-100", text: "text-pink-900" },
  { bg: "bg-green-100", text: "text-green-900" },
  { bg: "bg-yellow-100", text: "text-yellow-900" },
  { bg: "bg-sky-100", text: "text-sky-900" },
];

export const TOAST_DURATION = 3000;

export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/jpg",
];

export const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

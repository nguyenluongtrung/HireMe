import { GiArchiveRegister } from "react-icons/gi";
import {
  MdOutlineRecommend,
  MdOutlineUploadFile,
} from "react-icons/md";
import { TbAnalyze, TbFileCheck } from "react-icons/tb";

export const JOB_SEEKING_STEPS = [
  {
    icon: GiArchiveRegister,
    title: "Đăng ký & tạo tài khoản",
    description:
      "Người dùng đăng ký nhanh bằng email để bắt đầu quá trình cải thiện CV.",
  },
  {
    icon: MdOutlineUploadFile,
    title: "Tải CV lên hệ thống",
    description:
      "Chỉ cần tải lên file CV hiện tại (PDF, DOCX), hệ thống sẽ tự động đọc và xử lý nội dung.",
  },
  {
    icon: TbAnalyze,
    title: "Phân tích & tối ưu CV bằng AI",
    description:
      "Hệ thống AI tự động phân tích CV hiện có, gợi ý chỉnh sửa, bổ sung điểm mạnh và định dạng lại để CV trở nên ấn tượng và chuyên nghiệp hơn.",
  },
  {
    icon: MdOutlineRecommend,
    title: "Gợi ý cải thiện chi tiết",
    description:
      "AI đề xuất chỉnh sửa câu từ, bổ sung kỹ năng, cải thiện định dạng và tăng khả năng gây ấn tượng với nhà tuyển dụng.",
  },
  {
    icon: TbFileCheck,
    title: "Xem & tải CV đã tối ưu",
    description:
      "Người dùng xem bản CV được cải thiện, tùy chỉnh thêm nếu cần và tải xuống phiên bản hoàn thiện.",
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

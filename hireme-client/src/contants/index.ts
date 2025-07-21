import { GiArchiveRegister } from "react-icons/gi";
import { MdOutlineRecommend, MdSpatialTracking, MdTipsAndUpdates } from "react-icons/md";
import { TbAnalyze } from "react-icons/tb";

export const JOB_SEEKING_STEPS = [
  {
    icon: GiArchiveRegister,
    title: "Đăng ký & tạo hồ sơ",
    description:
      "Người dùng nhanh chóng đăng ký tài khoản bằng email hoặc mạng xã hội",
  },
  {
    icon: TbAnalyze,
    title: "Phân tích & tối ưu CV bằng AI",
    description:
      "Hệ thống AI tự động phân tích CV hiện có, gợi ý chỉnh sửa, bổ sung điểm mạnh và định dạng lại để CV trở nên ấn tượng và chuyên nghiệp hơn.",
  },
  {
    icon: MdOutlineRecommend,
    title: "Gợi ý công việc phù hợp",
    description: "Dựa trên hồ sơ và mong muốn của người dùng, HireMe đề xuất danh sách việc làm phù hợp nhất, tiết kiệm thời gian tìm kiếm thủ công.",
  },
  {
    icon: MdSpatialTracking,
    title: "Theo dõi quá trình ứng tuyển",
    description:
      "HireMe cung cấp giao diện trực quan để người dùng quản lý danh sách công việc đã ứng tuyển, trạng thái hồ sơ và lịch sử phỏng vấn.",
  },
  {
    icon: MdTipsAndUpdates,
    title: "Nhận tư vấn nghề nghiệp & cập nhật xu hướng",
    description:
      "Ngoài các công cụ chính, người dùng còn được cập nhật tin tức thị trường lao động, nhận lời khuyên phát triển kỹ năng và định hướng nghề nghiệp phù hợp.",
  },
];

export const STEP_COLOR_PAIRS = [
  { bg: "bg-purple-100", text: "text-purple-900" },
  { bg: "bg-pink-100", text: "text-pink-900" },
  { bg: "bg-green-100", text: "text-green-900" },
  { bg: "bg-yellow-100", text: "text-yellow-900" },
  { bg: "bg-sky-100", text: "text-sky-900" },
];

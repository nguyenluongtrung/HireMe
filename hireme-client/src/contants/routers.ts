import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Settings,
  Bot
} from "lucide-react";

export const pageRouters = {
  HOME: {
    name: "Trang chủ",
    href: "/",
  },
  CV_IMPROVEMENT: {
    name: "Nâng cấp CV",
    href: "/cv-improvement",
  },
  INTERVIEW_PRACTICE: {
    name: "Luyện phỏng vấn",
    href: "/interview-practice",
  },
  CV_HISTORY: {
    name: "CV của tôi",
    href: "/cv-history",
  },
};

export const MAIN_MENU = [
  {
    name: "Trang chủ",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Cải thiện CV",
    href: "/cv-improvement",
    icon: FileText,
  },
  {
    name: "CV của tôi",
    href: "/cv-history",
    icon: FileText,
  },
  {
    name: "Theo dõi việc làm",
    href: "/job-tracker",
    icon: Briefcase,
  },
  {
    name: "Phân tích AI",
    href: "/ai-analysis",
    icon: Bot,
  },
  {
    name: "Cài đặt",
    href: "/settings",
    icon: Settings,
  },
];

export const apiEndpoints = {
  AUTH: {
    LOGIN: "/auth/login/",
    REGISTER: "/auth/register/",
  },
  SYSTEM: {
    USER_PROFILE: "/auth/me",
    PRESIGNED_URL: "/media/images/upload/presigned-url",
  },
};

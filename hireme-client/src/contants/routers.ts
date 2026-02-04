import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Settings,
  Bot,
  Book,
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
  KNOWLEDGE_HUB: {
    name: "Kho kiến thức",
    href: "/knowledge-hub",
  },
};

export const MAIN_MENU = [
  {
    name: "Trang chủ",
    href: "/",
    icon: LayoutDashboard,
    isPublic: true,
  },
  {
    name: "Cải thiện CV",
    href: "/cv-improvement",
    icon: FileText,
    isPublic: false,
  },
  {
    name: "CV của tôi",
    href: "/cv-history",
    icon: FileText,
    isPublic: false,
  },
  {
    name: "Theo dõi việc làm",
    href: "/job-tracker",
    icon: Briefcase,
    isPublic: false,
  },
  {
    name: "Phân tích AI",
    href: "/ai-analysis",
    icon: Bot,
    isPublic: false,
  },
  {
    name: "Kho kiến thức",
    href: "/knowledge-hub",
    icon: Book,
    isPublic: false,
  },
  {
    name: "Cài đặt",
    href: "/settings",
    icon: Settings,
    isPublic: false,
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
    APPLICATIONS: "/applications",
    APPICATION_DETAIL: (id: number) => `/applications/${id}`,
    APPLICATION_STATISTICS: "/applications/statistics",
    KNOWLEDGE_HUB_ITEMS: "/knowledge-hub/items",
    KNOWLEDGE_HUB_RESOURCES: "/knowledge-hub/items/resources",
    KNOWLEDGE_HUB_ITEM_DETAIL: (id: number) => `/knowledge-hub/items/${id}`,
    KNOWLEDGE_HUB_RESOURCE_DETAIL: (id: number) =>
      `/knowledge-hub/items/resources/${id}`,
  },
};

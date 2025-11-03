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
};

export const apiEndpoints = {
  AUTH: {
    LOGIN: "/auth/login/",
    REGISTER: "/auth/register/",
  },
  SYSTEM: {
    USER_PROFILE: "/auth/me",
  },
};

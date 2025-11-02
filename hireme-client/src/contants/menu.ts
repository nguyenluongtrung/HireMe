import { MenuItem } from "@/interfaces/menu";

import { pageRouters } from "./routers";

export const MOBILE_MENU_SECTIONS = (): MenuItem[] => [
  {
    ...pageRouters.HOME,
    name: pageRouters.HOME.name,
    iconUrl: (active: boolean) => {
      return active ? "/icons/home-active.svg" : "/icons/home.svg";
    },
    current: false,
    href: pageRouters.HOME.href as string,
  },
  {
    ...pageRouters.CV_IMPROVEMENT,
    name: pageRouters.CV_IMPROVEMENT.name,
    iconUrl: (active: boolean) => {
      return active ? "/icons/resume-active.svg" : "/icons/resume.svg";
    },
    current: false,
    href: pageRouters.CV_IMPROVEMENT.href as string,
  },
  {
    ...pageRouters.INTERVIEW_PRACTICE,
    name: pageRouters.INTERVIEW_PRACTICE.name,
    iconUrl: (active: boolean) => {
      return active ? "/icons/interview-active.svg" : "/icons/interview.svg";
    },
    current: false,
    href: pageRouters.INTERVIEW_PRACTICE.href as string,
  },
];

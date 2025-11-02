export interface MenuItem {
  name: string;
  href: string;
  iconUrl?: (active: boolean) => string;
  current: boolean;
  children?: MenuItem[];
  showHeader?: boolean;
}

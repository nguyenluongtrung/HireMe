"use client";

import { useMemo, useContext } from "react";
import lodash from "lodash";
import { usePathname } from "next/navigation";
import Link from "next/link";

import ImageRound from "@/components/ui/round-image";

import { GlobalStateContext } from "@/providers/GlobalStateProvider";

import { MenuItem } from "@/interfaces/menu";

import { MOBILE_MENU_SECTIONS } from "@/contants/menu";

import { updateMenuItemCurrent } from "@/lib/utils";

type Props = {
  className?: string;
};

const Sidebar = ({ className }: Props) => {
  const pathname = usePathname();
  const { setOpenHamburgerMenu } = useContext(GlobalStateContext);

  const menuSections = useMemo(() => {
    const menuSectionsClone: MenuItem[] = lodash.cloneDeep(
      MOBILE_MENU_SECTIONS()
    );

    return updateMenuItemCurrent(menuSectionsClone, pathname);
  }, [pathname]);

  const handleClose = () => setOpenHamburgerMenu(false);
console.log(menuSections)
  return (
    <aside
      className={`w-full flex flex-col bg-[#FDFDFD] !rounded-tr-[50px] px-5 py-[14px] ${className}`}
    >
      <nav>
        <div className="flex flex-col gap-3 w-full">
          <ul role="list" className={`list-none w-full`}>
            {menuSections.map((menuSection, index) => (
              <li key={index}>
                <Link
                  href={menuSection.href}
                  prefetch={false}
                  onClick={handleClose}
                  className={`group flex items-center w-full gap-4 py-[14px] px-[6px] leading-6 rounded-[6px] transition-all ${
                    menuSection.current
                      ? "font-medium text-primary bg-blue-100"
                      : "hover:bg-blue-50"
                  }`}
                >
                  {menuSection.iconUrl ? (
                    <ImageRound
                      className="w-[25px] h-[25px]"
                      src={menuSection.iconUrl(menuSection.current)}
                      name={`Icon ${menuSection.name} menu`}
                    />
                  ) : null}
                  <p
                    className={`flex-1 font-medium text-left text-sm ${
                      menuSection.current
                        ? "font-medium text-primary"
                        : "text-[#5C5C5C]"
                    }`}
                  >
                    {menuSection.name}
                  </p>
                </Link>
                {menuSection.children?.length ? (
                  <ul className="pl-[47px]">
                    {menuSection.children.map((child, index) => {
                      return (
                        <li key={child.name}>
                          <Link
                            href={child.href}
                            prefetch={false}
                            onClick={handleClose}
                            className={`group flex items-center w-full gap-5 py-[10px] px-[6px] leading-6 rounded-[6px] transition-all ${
                              menuSection.children &&
                              menuSection.children?.length - 1 == index &&
                              "mb-[10px]"
                            } ${
                              child.current
                                ? "font-medium text-primary bg-blue-100"
                                : "hover:bg-blue-50"
                            }`}
                          >
                            <div
                              className={`h-[1px] rounded-[20px] w-[18px] bg-[#B6C9C8]`}
                            ></div>
                            <p
                              className={`flex-1 font-medium text-left text-sm ${
                                child.current
                                  ? "font-medium text-primary"
                                  : "text-[#5C5C5C]"
                              }`}
                            >
                              {child.name}
                            </p>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <></>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

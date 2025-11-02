"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { LoginModal } from "@/components/modals/LoginModal";
import { RegisterModal } from "@/components/modals/RegisterModal";
import { ForgotPasswordModal } from "@/components/modals/ForgotPasswordModal";
import { Button } from "@/components/ui/button";

import { useSessionCache } from "@/providers/SessionCacheProvider";
import { GlobalStateContext } from "@/providers/GlobalStateProvider";

import { useLogout } from "@/hooks/auth/logout/useLogout";

export default function Header() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);

  const { data: session } = useSessionCache();
  const { openHamburgerMenu, setOpenHamburgerMenu } =
    useContext(GlobalStateContext);
  const { handleSignOut } = useLogout();

  return (
    <header className="bg-white text-black p-4 flex justify-between items-center shadow-md">
      <div className="md:hidden">
        <div className="w-[24px] flex items-center justify-center">
          <Image
            className="hover:cursor-pointer"
            src={`/icons/${openHamburgerMenu ? "close-menu" : "hamburger"}.svg`}
            width={24}
            height={openHamburgerMenu ? 24 : 9}
            alt="Hamburger icon"
            onClick={() => setOpenHamburgerMenu((prev) => !prev)}
          />
        </div>
      </div>
      <h5 className="text-2xl font-bold">
        <span className="text-primary">Hire</span>Me
      </h5>
      <nav className="hidden md:block">
        <ul className="flex space-x-4">
          <Link href="/">
            <li className="hover:cursor-pointer hover:text-blue-500">
              Trang chủ
            </li>
          </Link>
          <li className="hover:cursor-pointer hover:text-blue-500">
            Nâng cấp CV
          </li>
          <li className="hover:cursor-pointer hover:text-blue-500">
            Luyện phỏng vấn
          </li>
          <li
            className="hover:cursor-pointer hover:text-blue-500"
            onClick={() =>
              session ? handleSignOut() : setOpenLoginModal(true)
            }
          >
            {session ? "Đăng xuất" : "Đăng nhập"}
          </li>
        </ul>
      </nav>
      <div className="md:hidden">
        {session ? (
          <Popover>
            <PopoverTrigger asChild>
              {/* the trigger (your icon) */}
              <button className="md:hidden focus:outline-none hover:cursor-pointer">
                <Avatar className="w-8 h-8">
                  {/* AvatarImage: user's profile picture if available */}
                  <AvatarImage
                    src="/images/user-avatar.jpg"
                    alt="User avatar"
                  />
                  {/* AvatarFallback: shown if no image */}
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                    {session.user.name
                      ? session.user.name.charAt(0).toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              className="w-36 !p-1 bg-white border-gray-100 !shadow-lg hover:cursor-pointer"
            >
              <div className="flex flex-col space-y-1">
                <Button
                  variant="ghost"
                  className="justify-start w-full font-normal hover:cursor-pointer hover:bg-gray-200"
                >
                  Hồ sơ của tôi
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start w-full font-normal hover:cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSignOut()}
                >
                  Đăng xuất
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <p
            className="hover:cursor-pointer hover:text-blue-500"
            onClick={() => setOpenLoginModal(true)}
          >
            Đăng nhập
          </p>
        )}
      </div>

      {openLoginModal && (
        <LoginModal
          open={openLoginModal}
          onClose={() => setOpenLoginModal(false)}
          onRegister={() => {
            setOpenLoginModal(false);
            setOpenRegisterModal(true);
          }}
          onForgotPassword={() => {
            setOpenLoginModal(false);
            setOpenForgotPasswordModal(true);
          }}
        />
      )}

      {openRegisterModal && (
        <RegisterModal
          open={openRegisterModal}
          onClose={() => setOpenRegisterModal(false)}
          onLogin={() => {
            setOpenRegisterModal(false);
            setOpenLoginModal(true);
          }}
          onForgotPassword={() => {
            setOpenRegisterModal(false);
            setOpenForgotPasswordModal(true);
          }}
        />
      )}

      {openForgotPasswordModal && (
        <ForgotPasswordModal
          open={openForgotPasswordModal}
          onClose={() => setOpenForgotPasswordModal(false)}
        />
      )}
    </header>
  );
}

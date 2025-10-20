"use client";

import Link from "next/link";
import { useState } from "react";

import { LoginModal } from "@/components/modals/LoginModal";
import { RegisterModal } from "@/components/modals/RegisterModal";
import { ForgotPasswordModal } from "@/components/modals/ForgotPasswordModal";

export default function Header() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);

  return (
    <header className="bg-white text-black p-4 flex justify-between items-center shadow-md">
      <h5 className="text-2xl font-bold">
        <span className="text-primary">Hire</span>Me
      </h5>
      <nav className="mt-2">
        <ul className="flex space-x-4">
          <Link href="/">
            <li className="hover:cursor-pointer hover:text-blue-500">
              Trang chủ
            </li>
          </Link>
          <li className="hover:cursor-pointer hover:text-blue-500">Nâng cấp CV</li>
          <li className="hover:cursor-pointer hover:text-blue-500">
            Luyện phỏng vấn
          </li>
          <li
            className="hover:cursor-pointer hover:text-blue-500"
            onClick={() => setOpenLoginModal(true)}
          >
            Đăng nhập
          </li>
        </ul>
      </nav>

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

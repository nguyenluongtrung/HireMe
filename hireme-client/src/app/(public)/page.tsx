"use client";

import { useState } from "react";

import { JobSeekingStep } from "@/components/features/home/JobSeekingStep";
import { ForgotPasswordModal } from "@/components/modals/ForgotPasswordModal";
import { LoginModal } from "@/components/modals/LoginModal";
import { RegisterModal } from "@/components/modals/RegisterModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { JOB_SEEKING_STEPS } from "@/contants";

export default function Home() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);

  return (
    <>
      {/* Hero section */}
      <section className="text-center mt-10">
        <h1 className="font-bold">
          HireMe -{" "}
          <span className="text-primary">
            Ứng dụng AI để nâng tầm CV của bạn
          </span>
        </h1>
        <p className="text-lg mt-4 text-gray-700">
          <span className="text-secondary bg-blue-100 p-1 rounded-md line-through">
            Khác biệt với cách tạo CV thủ công
          </span>
          , HireMe giúp bạn chủ động chinh phục cơ hội nhờ sức mạnh{" "}
          <Badge className="text-lg">AI</Badge>.
        </p>
        <div className="flex gap-3 justify-center mt-8">
          <Button
            className="text-white hover:cursor-pointer hover:bg-blue-700"
            onClick={() => setOpenRegisterModal(true)}
          >
            Bắt đầu trải nghiệm
          </Button>
          <Button variant={'gray'}>
            Tìm hiểu thêm
          </Button>
        </div>
      </section>
      {/* Job seeking steps section */}
      <section className="bg-gray-50 py-10">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Tìm việc dễ dàng với 5 bước cùng HireMe
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 px-4">
          {/* Job Seeking Steps */}
          {JOB_SEEKING_STEPS.map((step, index) => (
            <JobSeekingStep
              key={index}
              index={index}
              step={step}
              onOpenLoginModal={() => setOpenLoginModal(true)}
            />
          ))}
        </div>
      </section>

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
    </>
  );
}

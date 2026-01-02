"use client";

import { useState } from "react";

import { ForgotPasswordModal } from "@/components/modals/ForgotPasswordModal";
import { LoginModal } from "@/components/modals/LoginModal";
import { RegisterModal } from "@/components/modals/RegisterModal";
import { Button } from "@/components/ui/button";
import { JOB_SEEKING_STEPS } from "@/contants";
import { JobSeekingStep } from "@/components/features/home/JobSeekingStep";

export default function Home() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);

  return (
    <div className="min-h-full bg-[#0B1120] text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">

      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        {/* Hero Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-tight max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-700 delay-100">
          HireMe - <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Ứng dụng AI</span> để <br className="hidden md:block" />
          nâng tầm <br className="hidden md:block" />
          CV của bạn
        </h1>

        {/* Hero Subheadline */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <span className="line-through decoration-slate-600 text-slate-600 mr-2 bg-white/70 p-1 rounded-sm">Khác biệt với cách tạo CV thủ công</span>,
          HireMe giúp bạn chủ động chinh phục cơ hội nhờ sức mạnh <span className="text-white font-semibold bg-blue-600/20 px-1 rounded">AI</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Button
            size="lg"
            className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 rounded-full w-full sm:w-auto transition-all hover:scale-105"
            onClick={() => setOpenRegisterModal(true)}
          >
            Bắt đầu trải nghiệm
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8 text-base border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white rounded-full w-full sm:w-auto"
          >
            Tìm hiểu thêm
          </Button>
        </div>

        {/* Steps Section */}
        <div className="mt-32 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          {/* Section Title */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-px bg-gradient-to-l from-slate-700 to-transparent w-full max-w-[200px]" />
            <h2 className="text-2xl md:text-3xl font-bold whitespace-nowrap">Tìm việc dễ dàng với 5 bước</h2>
            <div className="h-px bg-gradient-to-r from-slate-700 to-transparent w-full max-w-[200px]" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {JOB_SEEKING_STEPS.map((step, idx) => (
              <JobSeekingStep key={idx} step={step} onOpenLoginModal={() => setOpenLoginModal(true)} />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
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
    </div>
  );
}

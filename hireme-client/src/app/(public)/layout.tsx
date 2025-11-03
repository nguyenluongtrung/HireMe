"use client";

import { useContext } from "react";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import { GlobalStateContext } from "@/providers/GlobalStateProvider";
import Sidebar from "@/components/layout/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { openHamburgerMenu } = useContext(GlobalStateContext);

  return (
    <div className="flex min-h-screen w-full flex-col relative">
      <Header />
      {openHamburgerMenu && (
        <div className="h-[calc(100vh_-_180px)] flex-grow bg-white overflow-y-auto no-scrollbar md:hidden">
          <Sidebar className="!no-scrollbar" />
        </div>
      )}
      <main
        className={`flex-grow flex flex-col gap-10 bg-white overflow-y-auto no-scrollbar lg:custom-scrollbar ${
          openHamburgerMenu ? "hidden md:block" : ""
        }`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ToastContainer } from "react-toastify";

import AppProvider from "@/providers/app-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HireMe",
  description: "A job-seeking platform that goes beyond traditional listings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>{children}</AppProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

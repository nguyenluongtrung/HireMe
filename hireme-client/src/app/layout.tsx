import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ToastProvider } from "@/providers/ToastProvider";
import { LoadingProvider } from "@/providers/LoadingProvider";
import { SessionCacheProvider } from "@/providers/SessionCacheProvider";
import QueryProvider from "@/providers/QueryProvider";
import { GlobalStateProvider } from "@/providers/GlobalStateProvider";
import { AuthProvider } from "@/providers/AuthProvider";

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
        <AuthProvider>
          <SessionCacheProvider>
            <GlobalStateProvider>
              <QueryProvider>
                <LoadingProvider>
                  <ToastProvider> {children}</ToastProvider>
                </LoadingProvider>
              </QueryProvider>
            </GlobalStateProvider>
          </SessionCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

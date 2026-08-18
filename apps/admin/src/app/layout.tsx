import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Trang Quản trị SyStore",
    template: "%s | Quản trị SyStore",
  },
  description: "Hệ thống quản trị cửa hàng thời trang SyStore.",
  icons: {
    icon: [{ url: "/logo-systore.svg", type: "image/svg+xml" }],
    shortcut: "/logo-systore.svg",
    apple: "/logo-systore.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
       {children}
      </body>
    </html>
    </ClerkProvider>
  );
}

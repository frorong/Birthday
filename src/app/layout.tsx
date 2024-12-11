import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "산타가 연말 선물을 준비했어요!",
  description: "지금 바로 산타가 보낸 선물 확인하기",
  openGraph: {
    title: "산타가 연말 선물을 준비했어요!",
    description: "지금 바로 산타가 보낸 선물 확인하기",
    type: "website",
    images: [
      {
        url: "https://toss-im-mn12ads1gdd8fd6f.vercel.app/open-graph.png", // 절대 URL로 변경
        width: 1200,
        height: 630,
        alt: "산타의 선물",
      },
    ],
    siteName: "산타의 선물",
  },
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
        {children}
      </body>
    </html>
  );
}

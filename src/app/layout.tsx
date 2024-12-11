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
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["토스", "선물", "산타", "크리스마스"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#000000" }],
  metadataBase: new URL("https://toss-im-mn12ads1gdd8fd6f.vercel.app"),
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  applicationName: "토스 산타 선물",
  openGraph: {
    title: "산타가 연말 선물을 준비했어요!",
    description: "지금 바로 산타가 보낸 선물 확인하기",
    url: "https://toss-im-mn12ads1gdd8fd6f.vercel.app/",
    siteName: "toss.im",
    images: [
      {
        url: "/open-graph.png",
        width: 1200,
        height: 630,
        alt: "산타의 선물",
      },
    ],
    locale: "ko",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "산타가 연말 선물을 준비했어요!",
    description: "지금 바로 산타가 보낸 선물 확인하기",
    images: ["/open-graph.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

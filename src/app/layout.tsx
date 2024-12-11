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
        url: "https://toss-im-mn12ads1gdd8fd6f.vercel.app/open-graph.png",
        width: 1200,
        height: 630,
        alt: "산타의 선물",
      },
    ],
    siteName: "산타의 선물",
  },
  twitter: {
    card: "summary_large_image",
    title: "산타가 연말 선물을 준비했어요!",
    description: "지금 바로 산타가 보낸 선물 확인하기",
    images: ["https://toss-im-mn12ads1gdd8fd6f.vercel.app/open-graph.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://toss-im-mn12ads1gdd8fd6f.vercel.app"
        />
        <meta property="og:title" content="산타가 연말 선물을 준비했어요!" />
        <meta
          property="og:description"
          content="지금 바로 산타가 보낸 선물 확인하기"
        />
        <meta
          property="og:image"
          content="https://toss-im-mn12ads1gdd8fd6f.vercel.app/open-graph.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="산타가 연말 선물을 준비했어요!" />
        <meta
          name="twitter:description"
          content="지금 바로 산타가 보낸 선물 확인하기"
        />
        <meta
          name="twitter:image"
          content="https://toss-im-mn12ads1gdd8fd6f.vercel.app/open-graph.png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

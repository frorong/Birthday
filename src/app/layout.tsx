import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Birthday",
  description: "당신의 생일을 축하합니다!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

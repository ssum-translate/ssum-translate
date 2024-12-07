import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "남자어, 여자어 번역기",
  description: "남녀 간의 언어적·심리적 차이를 번역하고 해석해드릴게요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

import { ReactNode } from "react";
import type { Metadata } from "next";
import "@/styles/reset.css"
import ReactQueryProviders from "@/hooks/useReactQuery";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProviders>{children}</ReactQueryProviders>
        </body>
    </html>
  );
}

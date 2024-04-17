import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CIS Supply Chain Management V4",
  description: "CSCM V4 - CIS Supply Chain Management V4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            shimmer: true,
            logoPlacement: "inside",
            logoImageUrl: "logo_5.png",
          },
          elements: {
            footer: "hidden",
          },
          variables: {
            colorText: "#000",
          },
        }}
      >
        <body className={inter.className}>
        <AntdRegistry>{children}</AntdRegistry>
          <Toaster position="bottom-left" />
        </body>
      </ClerkProvider>
    </html>
  );
}

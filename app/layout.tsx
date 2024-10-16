import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { Toaster } from "@/components/ui/toaster";
import { DeviceIdProvider } from "@/components/DeviceIdProvider/DeviceIdProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-600`}>
        <DeviceIdProvider>
          <Header />
          <div className="w-full h-[calc(100vh-82px)] mt-[82px]">{children}</div>
          <Toaster />
        </DeviceIdProvider>
      </body>
    </html>
  );
}

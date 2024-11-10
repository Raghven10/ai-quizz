import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SessionProvider} from 'next-auth/react';
import Header from "@/components/ui/header";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Quizz",
  description: "AI quizz app",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
     
      <body className={cn(
        "min-h-screen w-full bg-white text-black flex flex-col flex-col-1",
        inter.className,
        {"debug-screens": process.env.NODE_ENV === "development"}
      )}>
          {/* <Header /> */}
          <div className="flex flex-row flex-col-1 max-h-screen y-overflow-hidden">
            {/* <Sidebar /> */}
            {children}
          </div>
      </body>
      </SessionProvider>
    </html>
  );
}

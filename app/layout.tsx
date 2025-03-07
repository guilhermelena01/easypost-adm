"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSideBar";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const path = usePathname()
  const isAuthPage = path.includes("auth")

  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <SidebarProvider>
            {!isAuthPage &&
              <>
                <SidebarTrigger />
                <AppSidebar>
                </AppSidebar>
              </>
            }
            <main className={`flex w-full overflow-hidden ${isAuthPage ? "" : "justify-center items-center"}`}>
              {children}
              <ToastContainer />
            </main>
          </SidebarProvider>
        </AppProvider>
      </body>
    </html >
  );
}

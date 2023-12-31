import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "./Redux/ReduxProvider";
import SessionProvider from "@/components/ui/Authentication/session-provider";
import { getServerSession } from "next-auth";
import { Navbar } from "@/components/ui/Layout/navbar";
const inter = Inter({ subsets: ["latin"] });
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/ui/Layout/side-bar";
import { Toaster } from "@/components/ui/toaster";
import { DialogProvider } from "@/lib/contexts/dialog-provider-context";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head />
      <body className={cn("overflow-y-hidden", inter.className)}>
        <DialogProvider>
          <SessionProvider session={session}>
            <ReduxProvider>
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                <Navbar />
                <div className="grid lg:grid-cols-5">
                  <Sidebar />
                  <div className="col-span-4 overflow-y-auto">
                    <div className="px-4 py-6 lg:px-8 container">{children}</div>
                  </div>
                </div>
                <Toaster />
              </ThemeProvider>
            </ReduxProvider>
          </SessionProvider>
        </DialogProvider>
      </body>
    </html>
  );
}

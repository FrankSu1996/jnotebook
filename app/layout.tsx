import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "./Redux/ReduxProvider";
import SessionProvider from "@/components/ui/Authentication/session-provider";
import { getServerSession } from "next-auth";
import { Navbar } from "@/components/ui/Layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ReduxProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
              <Navbar />
              <div className="container">{children}</div>
            </ThemeProvider>
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

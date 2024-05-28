import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/layout/Header";
import SideDrawer from "@/components/layout/SideDrawer";
import { Separator } from "@/components/ui/separator";
import MagicProvider from "@/components/providers/MagicProvider";

const chakra_petch = Chakra_Petch({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

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
      <body className={chakra_petch.className}>
        <MagicProvider>
          <Header />
          <div className="flex">
            <div className="h-full w-3/5 md:w-2/5 lg:w-1/5 rounded-none p-6 hidden lg:block">
              <SideDrawer />
            </div>
            <Separator
              orientation="vertical"
              className="min-h-[calc(100vh-4rem)] hidden lg:block w-[0.5px]"
            />
            {children}
          </div>
        </MagicProvider>

        <Analytics />
      </body>
    </html>
  );
}

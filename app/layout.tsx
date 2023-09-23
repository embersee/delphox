import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthProvider from "@/lib/auth/Provider";
import TrpcProvider from "@/lib/trpc/Provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/utils/ThemeProvider";
import { TailwindIndicator } from "@/components/utils/TailwindIndicator";
import Background from "@/components/layouts/Background";
import { Mask } from "@/components/layouts/Mask";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextAuthProvider>
          <TrpcProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Toaster />
              <Background />
              <Mask />
              <TailwindIndicator />
            </ThemeProvider>
          </TrpcProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

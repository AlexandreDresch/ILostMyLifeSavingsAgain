import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import RootProviders from "@/components/providers/root-providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "I Lost My Life Savings Again",
  description:
    "Track and manage your life savings effectively with our intuitive app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          style={{
            background: `linear-gradient(135deg, 
            hsl(var(--background) / 0.6) 0%,
            hsl(var(--background) / 0.3) 20%,
            hsl(var(--background) / 0.1) 40%,
            transparent 60%
          ), 
          hsl(var(--background))`,
          }}
        >
          <Toaster richColors position="bottom-right" />
          <RootProviders>{children}</RootProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}

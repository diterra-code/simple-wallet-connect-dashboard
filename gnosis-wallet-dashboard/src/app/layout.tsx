import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Gnosis Chain Wallet Dashboard - Bread Cooperative",
  description: "View your Gnosis Chain wallet stats with Bread Cooperative styling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-paper-main text-text-standard min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "../globals.css";
import { cn } from "@/lib/utils";
import Navbar from "./_components/Navbar";

export const metadata: Metadata = {
  title: "Api Management",
  description: "An api management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

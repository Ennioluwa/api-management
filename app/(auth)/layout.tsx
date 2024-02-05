import type { Metadata } from "next";
import "../globals.css";
import Container from "./_components/Container";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}

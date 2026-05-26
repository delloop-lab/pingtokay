import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PingOkay — Daily family check-ins",
  description:
    "A simple daily wellbeing check-in for elderly parents and carers living apart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

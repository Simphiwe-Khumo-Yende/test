import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auth Signal Lab | Cybersecurity Training",
  description: "A safe, ephemeral authentication telemetry demo for security lectures.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOF or Not",
  description: "WIP Mystery Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

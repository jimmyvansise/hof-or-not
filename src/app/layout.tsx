import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOF or Not",
  description: "Who should make the NFL HOF???",
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

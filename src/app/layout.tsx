/* eslint-disable @next/next/no-page-custom-font */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOF or Not",
  description: "You Decide Who Earns a Spot in the Hall Of Fame",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fonts go here, and also in tailwind.config.ts
  return (
    <>
    <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" />
    </head>
    <html lang="en">
      
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
    </>
  );
}

/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import Provider from "../utils/provider";

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
    <Provider>
        <html lang="en">
          <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" />
          </head>
          <body
            className={`antialiased`}
          >
            {children}
          </body>
        </html>
    </Provider>
  );
}

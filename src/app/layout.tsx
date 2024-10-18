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

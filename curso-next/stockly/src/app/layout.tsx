import type { Metadata } from "next";
/* 
The local font is how we would use a font we downloaded and inserted into our app, we simply download this font, place it
inside of our app, and use with this library, like we did on the comment below of the geitSans

import localFont from 'next/font/local' */
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "./_components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  display: "auto",
});

// const geistSans = localFont({
// 	src: './fonts/GeistVF.woff',
// 	variable: '--font-geist-sans',
// 	weight: '100 900',
/* }) */

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// Esse layout, que está na raiz da pasta app, ele será aplicado para todas as pastas e sub pastas do app

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-full gap-8">
          <SideBar />
          {children}
        </div>
      </body>
    </html>
  );
}

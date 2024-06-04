import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const poppins = Poppins({ weight:["300", "400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProTech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}

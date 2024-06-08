import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ToastifyProvider from "@/providers/ToastifyProvider";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import ProgressbarProvider from "@/providers/ProgressbarProvider";

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

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
      <body className={poppins.className}>
        <ProgressbarProvider>
          <ReactQueryProvider>
            <ToastifyProvider>{children}</ToastifyProvider>
          </ReactQueryProvider>
        </ProgressbarProvider>
      </body>
    </html>
  );
}

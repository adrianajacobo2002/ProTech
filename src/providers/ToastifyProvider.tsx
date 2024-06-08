"use client";

import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

export default function ToastifyProvider({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <ToastContainer hideProgressBar limit={2} />
    </>
  );
}

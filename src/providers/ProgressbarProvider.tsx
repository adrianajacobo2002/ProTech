"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { PropsWithChildren } from "react";

export default function ProgressbarProvider({ children }: PropsWithChildren) {
  return (
    <>
      <ProgressBar color="#BAF266" height="5px" />
      {children}
    </>
  );
}

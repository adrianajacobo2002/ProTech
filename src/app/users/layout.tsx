"use client";
import { PropsWithChildren } from "react";
import NavBar from "@/layouts/AdminNavbar";
import { Box } from "@mui/material";

export default function UsersLayout({ children }: PropsWithChildren) {
  return (
    <Box
      component="main"
      bgcolor="var(--white)"
      className="main"
      style={{ paddingTop: 100, paddingLeft: 100, paddingRight: 35 }}
    >
      <NavBar />
      {children}
    </Box>
  );
}

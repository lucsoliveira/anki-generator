"use client";
import { Navbar } from "./partials/NavBar";
import { DashboardLayoutStyle } from "./styles";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayoutStyle>
      <Navbar />
      <main>{children}</main>
    </DashboardLayoutStyle>
  );
}

"use client";
import ResponsiveDrawer from "./components/drawer";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return <ResponsiveDrawer>{children}</ResponsiveDrawer>;
}

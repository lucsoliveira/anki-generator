"use client";

import { ResponsiveDrawer } from "@/shared/layouts";
import AudioFile from "@mui/icons-material/AudioFile";
import HomeIcon from "@mui/icons-material/Home";

export default function Home({ children }: { children: React.ReactNode }) {
  const navItems = [
    {
      label: "Home",
      icon: <HomeIcon />,
      path: "/dashboard",
    },
    {
      label: "Frases",
      icon: <AudioFile />,
      path: "/dashboard/phrases",
    },
  ];
  return <ResponsiveDrawer navItems={navItems}>{children}</ResponsiveDrawer>;
}

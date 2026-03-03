"use client";

import localFont from "next/font/local";
import StyledComponentsRegistry from "./lib/registry";
// import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

import AudioFile from "@mui/icons-material/AudioFile";
import HomeIcon from "@mui/icons-material/Home";
import { ResponsiveDrawer } from "@/shared/layouts";
import { AuthBox } from "./components/AuthBox";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    {
      label: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      label: "Frases",
      icon: <AudioFile />,
      path: "/phrases",
    },
  ];

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StyledComponentsRegistry>
          <ResponsiveDrawer
            navItems={navItems}
            rightToolbarAction={<AuthBox />}
          >
            {children}
          </ResponsiveDrawer>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

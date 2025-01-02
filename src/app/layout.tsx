"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Components
import Sidebar, { SidebarItem } from "./components/sidenav/Sidebar";
import { Folder, HelpCircleIcon, LogOutIcon, SettingsIcon } from "lucide-react";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Root Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-3 `}
      >
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <Sidebar>
              <SidebarItem icon={<Folder />} text="System" />
              <SidebarItem icon={<SettingsIcon />} text="System Code" />
              <SidebarItem icon={<HelpCircleIcon />} text="Properties" />
              <SidebarItem icon={<HelpCircleIcon />} text="Menus" />
              <SidebarItem icon={<LogOutIcon />} text="API List" />
              <SidebarItem icon={<Folder />} text="Competition" />
              <SidebarItem icon={<Folder />} text="Users & Group" />
            </Sidebar>

            {/* Main Content */}
            <div className="md:w-3/4">
              {children}
            </div>
          </div>
      </body>
    </html>
  );
}

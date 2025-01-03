"use client";

import Image from "next/image";
import { createContext, useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { RiMenuUnfold3Line } from "react-icons/ri";
import { SidebarContextType, SidebarItemProps, SidebarProps } from "@/types/sidenav.type";


// Define the context and types

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const Sidebar = ({ children }: SidebarProps) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <>
      {!expanded && (
        <button
        onClick={() => setExpanded((curr) => !curr)}
        className="text-[#101828] hover:bg-gray-100 rounded-lg z-10 absolute top-5 left-4 mx-2 sm:mx-8"
      >
        <RiMenuUnfold3Line className="w-6 h-5" />
      </button>
      
      )}
      <div
        className="flex flex-col p-3 bg-[#101828] md:w-1/4"
        style={{
          borderRadius: "24px",
          height: "100vh",
          display: expanded ? "block" : "none",
          width: "auto",
        }}
      >
        <nav className="h-full flex flex-col bg-[#101828] shadow-sm">
          <div className="p-7 pb-2 flex justify-between items-center">
            <Image
              src="/image/logo.png"
              className={`overflow-hidden transition-all ${
                expanded ? "w-22" : "w-0"
              }`}
              alt="Sidebar Logo"
              width={100}
              height={50}
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="text-white"
            >
              {expanded ? (
                <MdMenuOpen className="w-5 h-6" />
              ) : (
                <RiMenuUnfold3Line className="w-5 h-6" />
              )}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            {/* Mobile responsiveness */}
            <ul
              className={`flex-1 px-2 mt-12 transition-all ease-in-out duration-300 ${
                expanded ? "block" : "hidden"
              }`}
            >
              {children}
            </ul>
          </SidebarContext.Provider>
        </nav>
      </div>
    </>
  );
};

export const SidebarItem = ({ icon, text, active }: SidebarItemProps) => {
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium cursor-pointer
        transition-colors group
        rounded-[16px]
        w-full
        h-[48px]
        ${text === "Menus" && "bg-[#9FF443]"}
        ${text === "System" && "text-[#FFFFFF]"}
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-[#9FF443] text-gray-600"
        }
      `}
    >
      {icon}
      <span className={`overflow-hidden transition-all w-52 ml-3`}>{text}</span>
    </li>
  );
};

export default Sidebar;

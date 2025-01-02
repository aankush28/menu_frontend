import { ReactNode } from "react";

export interface SidebarContextType {
    expanded: boolean;
  }
  export interface SidebarItemProps {
    icon: ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
  }
  export interface SidebarProps {
    children: ReactNode;
  }
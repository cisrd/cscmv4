"use client";

import React from "react";
import SidebarFooter from "../sidebar/sidebar-footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, BellIcon, Menu, Sun, SunMoon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import CommonBreadcrumbs from "./breadcrumbs";
import { useTheme } from "next-themes";
import { UserButton } from "@clerk/nextjs";

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarVisible: boolean;
}

const Header = ({ toggleSidebar, sidebarVisible }: HeaderProps) => {
  return (
    <div className="flex items-center h-14 pl-2 justify-between">
      <div className="flex items-center">
        <div onClick={toggleSidebar} className="cursor-pointer hidden md:block">
          {sidebarVisible ? (
            <ArrowLeft className="transform hover:scale-110 transition-transform duration-300 ease-in-out font-extrabold" />
          ) : (
            <Menu className="transform hover:scale-110 transition-transform duration-300 ease-in-out font-extrabold" />
          )}
        </div>
        <CommonBreadcrumbs
          homeElement={"Home"}
          separator={<span> {"/"} </span>}
          activeClasses="text-black font-normal"
          containerClasses="flex py-3"
          listClasses="hover:underline mx-2 font-bold"
          capitalizeLinks
        />
      </div>
      <div className="flex items-center gap-1 pr-1">
        <Button
          size="icon"
          className="hover:bg-sidebar-background bg-transparent text-gray-600"
        >
          <BellIcon className="h-6 w-6 border-0" fill="rgb(179 180 183)" />
        </Button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Header;

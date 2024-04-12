"use client";

import SidebarHeader from "./sidebar-header";
import SidebarItems from "./sidebar-items";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = () => {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-10 p-2 
          flex flex-col justify-between"
    >
      <div className="flex flex-col space-y-5 w-full max-h-screen">
        <SidebarHeader />
        <ScrollArea className="h-[87%] pr-3">
          <SidebarItems />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;

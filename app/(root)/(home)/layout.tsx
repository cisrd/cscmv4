"use client";

import Header from "@/components/interface/header";
import Sidebar from "@/components/sidebar/sidebar";
import { ReactNode, useState } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <main className="flex h-screen w-full bg-gray-200 overflow-x-hidden">
      <div
        className={`shrink-0 hidden md:block ${
          sidebarVisible
            ? "w-64 transition-width duration-300 ease-out`}"
            : "w-0 transition-width duration-300 ease-in-out`}"
        }`}
      >
        {sidebarVisible && <Sidebar />}
      </div>
      <div className=" flex flex-col w-full pl-1">
        <nav>
          <Header
            toggleSidebar={toggleSidebar}
            sidebarVisible={sidebarVisible}
          />
        </nav>
        {children}
      </div>
    </main>
  );
};

export default HomeLayout;

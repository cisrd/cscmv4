"use client";

import Header from "@/components/interface/header";
import Sidebar from "@/components/sidebar/sidebar";
import { interfaceStore } from "@/store/interface";
import { ReactNode, useState } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  const { IsSidebarVisible, updateInterface } = interfaceStore(
    (state: any) => ({
      IsSidebarVisible: state.interfaceZustand.IsSidebarVisible,
      updateInterface: state.updateInterface,
    })
  );

  const updateInterfaceZustand = interfaceStore(
    (state: any) => state.updateInterface
  );

  return (
    <main className="flex h-screen w-full bg-gray-200 overflow-x-hidden">
      <div
        className={`shrink-0 hidden md:block ${
          IsSidebarVisible
            ? "w-64 transition-width duration-300 ease-out`}"
            : "w-0 transition-width duration-300 ease-in-out`}"
        }`}
      >
        {IsSidebarVisible && <Sidebar />}
      </div>
      <div className=" flex flex-col w-full pl-1">
        <nav>
          <Header />
        </nav>
        {children}
      </div>
    </main>
  );
};

export default HomeLayout;

"use client";

import SidebarItemsList from "./items";
import { itemsMenu } from "./sidebar-menu-data";
import React from "react";

const SidebarItems = () => {
  return (
    <div className="flex flex-col space-y-2">
      {itemsMenu.map((item) => (
        <SidebarItemsList key={item.path} item={item} />
      ))}
    </div>
  );
};

export default SidebarItems;

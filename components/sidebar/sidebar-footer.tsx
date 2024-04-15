"user client";

import React from "react";

const SidebarFooter = () => {
  return (
    <div className="flex items-center justify-between gap-2 border rounded-[1px] p-2 cursor-pointer hover:bg-sidebar-background">
      <div
        className="avatar rounded-full min-h-10 min-w-10 bg-sidebar-bgLogo text-white font-[700] 
        flex items-center justify-center"
      >
        <p>AW</p>
      </div>
    </div>
  );
};

export default SidebarFooter;

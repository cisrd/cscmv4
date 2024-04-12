import Image from "next/image";
import React from "react";

const SidebarHeader = () => {
  return (
    <div className="ml-3 mr-3 mt-3">
      <Image
        src="/logo_5.png"
        alt="Logo"
        height={40}
        width={180}
        className="w-fit"
      />
    </div>
  );
};

export default SidebarHeader;

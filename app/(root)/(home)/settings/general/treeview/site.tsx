"use client";

import { Pencil } from "lucide-react";
import { TTreeview } from "@prisma/client";

interface SiteWidgetProps {
  key: string;
  treeview: TTreeview;
  selectedBool: boolean;
  onSelectSite: () => void;
}

const SiteWidget: React.FC<SiteWidgetProps> = ({
  treeview,
  selectedBool,
  onSelectSite,
}) => {
  return (
    <div
      className={`group flex items-center justify-between border rounded-[8px] p-2 
    cursor-pointer min-h-[50px] text-sidebar-active font-semibold mt-3 mr-3 relative hover:bg-sidebar-background
    ${selectedBool ? "bg-sidebar-background" : "bg-slate-100 "}
    `}
      onClick={onSelectSite}
    >
      <p>{treeview.name}</p>
      <Pencil className="hidden group-hover:block h-5 w-5 text-gray-600 ml-5" />
    </div>
  );
};

export default SiteWidget;

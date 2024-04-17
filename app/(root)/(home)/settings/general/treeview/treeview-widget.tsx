"use client";

import { Pencil } from "lucide-react";
import { TTreeview } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface TreeviewWidgetProps {
  key: string;
  treeview: TTreeview;
  selectedBool: boolean;
  onSelectTreeview: () => void;
}

const TreeviewWidget: React.FC<TreeviewWidgetProps> = ({
  treeview,
  selectedBool,
  onSelectTreeview,
}) => {
  return (
    <div
      className={`group flex items-center justify-between border rounded-[4px] p-2 
    cursor-pointer min-h-[40px] text-sidebar-active font-semibold mt-3 mr-3 relative hover:bg-sidebar-background
    ${selectedBool ? "bg-sidebar-background" : "bg-slate-100 "}
    `}
      onClick={onSelectTreeview}
    >
      <p className="text-[14px] truncate">{treeview.name}</p>
      <Button type="submit" className="icon-button">
        <Pencil
          height={15}
          width={15}
          className="hidden group-hover:block  text-gray-900 ml-5"
        />
      </Button>
    </div>
  );
};

export default TreeviewWidget;

"use client";

import { Pencil } from "lucide-react";
import { TTreeview } from "./types";
import { Button } from "@/components/ui/button";
import { treeviewStore } from "@/store/settings";

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
  const treeviewZustand = treeviewStore((state: any) => state.treeviewZustand);
  const updateTreeview = treeviewStore((state: any) => state.updateTreeview);

  return (
    <div
      className={`group flex items-center justify-between border rounded-[4px] p-2 
    cursor-pointer  text-sidebar-active font-semibold mt-3 mr-3 relative hover:bg-sidebar-background
    ${
      selectedBool
        ? "bg-sidebar-background min-h-[55px]"
        : "bg-slate-100 min-h-[40px]"
    }
    `}
      onClick={onSelectTreeview}
    >
      <p className="text-[14px] truncate">{treeview.name}</p>
      <Button
        onClick={() => {
          updateTreeview({
            isSheetOpen: true,
            treeviewData: treeview,
          });
        }}
        variant="ghost"
        className="flex items-center justify-center p-2 h-full group transition duration-150 ease-in-out 
                 hover:bg-gray-100  active:bg-gray-300 
                 rounded outline-none w-10 "
        aria-label="Edit"
      >
        <Pencil
          className="hidden group-hover:block w-4 h-4 text-gray-600"
          size={16}
        />
      </Button>
    </div>
  );
};

export default TreeviewWidget;

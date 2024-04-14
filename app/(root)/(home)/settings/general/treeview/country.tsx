"use client";

import { Pencil } from "lucide-react";
import { ICoountry } from "./treeview-data";

interface CountryWidgetProps {
  country: ICoountry;
  onSelectCountry: () => void;
}

const CountryWidget: React.FC<CountryWidgetProps> = ({
  country,
  onSelectCountry,
}) => {
  return (
    <div
      className={`group flex items-center justify-between border rounded-[8px] p-2 
    cursor-pointer min-h-[50px] text-sidebar-active font-semibold mt-3 mr-3 relative hover:bg-sidebar-background
    ${country.selected ? "bg-sidebar-background" : "bg-slate-100 "}
    `}
      onClick={onSelectCountry}
    >
      <p>
        {country.name} ({country.project?.length})
      </p>
      <Pencil className="hidden group-hover:block h-5 w-5 text-gray-600 ml-5" />
    </div>
  );
};

export default CountryWidget;

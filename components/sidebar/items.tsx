"use client";

import React, { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LucideIcon } from "lucide-react";
import SubMenuItem from "./submenu-item";

interface ISidebarItem {
  name: string;
  icon: LucideIcon;
  path: string;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
  items?: ISubSubItem[];
}

interface ISubSubItem {
  name: string;
  path: string;
}

const SidebarItemsList = ({ item }: { item: ISidebarItem }) => {
  const { name, icon: Icon, items, path } = item;
  const [expanded, setExpanded] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    if (items && items.length > 0) {
      return setExpanded(!expanded);
    }
    router.push(path);
  };

  const isActive = useMemo(() => {
    if (items && items.length > 0) {
      if (items.find((item) => item.path === pathname)) {
        setExpanded(true);
        return true;
      }
      for (const subItem of items) {
        if (subItem.items && subItem.items.length > 0) {
          if (
            subItem.items.find((subSubItem) => subSubItem.path === pathname)
          ) {
            setExpanded(true);
            return true;
          }
        }
      }
    }

    return path === pathname;
  }, [path, pathname, items]);

  return (
    <>
      <div
        className={`flex items-center py-2 px-1 
    rounded-lg hover:bg-sidebar-background cursor-pointer
    hover:text-sidebar-active justify-between
    ${isActive && "text-sidebar-active bg-sidebar-background"}`}
        onClick={onClick}
      >
        <div className="flex items-center space-x-3 pl-2">
          <Icon size={20} />
          <p className="text-sm font-semibold">{name}</p>
        </div>

        {items && items.length > 0 && (
          <ChevronDown
            size={18}
            className={expanded ? "rotate-180 duration-200" : ""}
          />
        )}
      </div>

      {expanded && items && items.length > 0 && (
        <div className="flex flex-col space-y-3 ml-7 mt-2 mb-1">
          {items.map((item) => (
            <SubMenuItem key={item.path} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default SidebarItemsList;

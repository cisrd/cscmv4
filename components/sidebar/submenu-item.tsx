"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

interface ISubItem {
  name: string;
  path: string;
  items?: ISubSubItem[];
}

interface ISubSubItem {
  name: string;
  path: string;
}

const SubMenuItem = ({ item }: { item: ISubItem }) => {
  const { name, path, items } = item;

  const [expanded, setExpanded] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

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
    }

    return path === pathname;
  }, [path, pathname, items]);

  return (
    <>
      <div
        className={`text-sm hover:text-sidebar-active 
    hover:font-semibold cursor-pointer 
    ${isActive && "text-sidebar-active font-semibold"}
    `}
        onClick={onClick}
      >
        <div className="flex items-center justify-between space-x-2 ">
          {name}
          {items && items.length > 0 && (
            <ChevronDown
              size={18}
              className={expanded ? "rotate-180 duration-200" : ""}
            />
          )}
        </div>
      </div>

      {expanded && items && items.length > 0 && (
        <div className="flex flex-col space-y-2 ml-3 mt-2">
          {items.map((item) => (
            <SubMenuItem key={item.path} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default SubMenuItem;

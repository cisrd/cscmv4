"use client";

import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react'

interface ISubSubItem {
    name: string;
    path: string;
}

const SubSubMenuItem = ({item}:{item:ISubSubItem}) => {

    const {name, path} = item;
    const pathname = usePathname();

    const router = useRouter();

    const onClick = () => {
        router.push(path);
    } 

    const isActive = useMemo(() => {
        return path === pathname;
    },[path,pathname])

  return (
    <div
    className={`text-sm hover:text-sidebar-active 
    hover:font-semibold cursor-pointer
    ${isActive && "text-sidebar-active font-semibold"}
    `}
    onClick={onClick}
    >
        {name}
    </div>
  )
}

export default SubSubMenuItem
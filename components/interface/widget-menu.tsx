"use client";

import { LucideIcon, User } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

interface IWidgetMenu {
    title: string;
    icon: LucideIcon;
    path: string;
  }

const WidgetMenu = ({widgetMenu}:{widgetMenu:IWidgetMenu}) => {

    const {title, icon:Icon, path} = widgetMenu;

    return (
        <Link href={path}>
            <div className='flex flex-col items-center justify-center gap-6 border rounded-[8px] 
            p-2 cursor-pointer hover:bg-sidebar-background '>
                <Icon size={100} />
                <p className='text-1xl font-medium'>{title}</p>
            </div>
        </Link>
  )
}

export default WidgetMenu
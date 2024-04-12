import {
    Blocks,
    CircleGauge,
    CircleHelp,
    LayoutDashboard,
    LucideIcon,
    Pickaxe,
    Settings,
    ShoppingBasket,
  } from "lucide-react";

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
  
  export const itemsMenu: ISidebarItem[] = [
    {
      name: "Workspace",
      path: "/",
      icon: LayoutDashboard,
      items: [
        {
          name: "Dasboard",
          path: "/",
        },
        {
          name: "Product Management",
          path: "/workspace/product",
        },
        {
          name: "Supplier Management",
          path: "/workspace/supplier",
        },
        {
          name: "Delivery Schedule",
          path: "/workspace/delivery-schedule",
        },
      ],
    },
    {
      name: "Purchasing",
      path: "/purchase",
      icon: ShoppingBasket,
      items: [
        {
          name: "Purchase Requisition",
          path: "/purchasing/purchase-requisition",
        },
        {
          name: "Product Referencing",
          path: "/purchasing/product-referencing",
        },
        {
          name: "Request for Quotation",
          path: "/purchasing/request-quotation",
        },
        {
          name: "Purchase Order",
          path: "/purchasing/purchase-order",
        },
        {
          name: "Packing List",
          path: "/purchasing/packing-list",
        },
        {
          name: "Receipt Note",
          path: "/purchasing/receipt-note",
        },
        {
          name: "Product Return",
          path: "/purchasing/product-return",
        },
      ],
    },
    {
      name: "Stock Management",
      path: "/stock",
      icon: Blocks,
      items: [
        {
          name: "Requisition",
          path: "/stock/requisition",
        },
        {
          name: "Consumption",
          path: "/stock/Consumption",
        },
        {
          name: "External Requisition",
          path: "/stock/external-requisition",
        },
        {
          name: "Delivery Note",
          path: "/stock/delivery-note",
        },
        {
          name: "Goods Inwards",
          path: "/stock/goods-inwards",
        },
      ],
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
      items: [
        {
          name: "General",
          path: "/settings/general",
        },
        {
          name: "Product",
          path: "/settings/product",
          items: [
            {
              name: "Product List",
              path: "/settings/product/product-list",
            },
            {
              name: "Famillies",
              path: "/settings/product/famillies",
            },
            {
              name: "Unit",
              path: "/settings/product/unit-management",
            },
            {
              name: "Characteristics",
              path: "/settings/product/Characteristics",
            },
          ],
        },
        {
          name: "Supplier",
          path: "/settings/supplier",
          items: [
            {
              name: "Supplier List",
              path: "/settings/supplier/supplier-list",
            },
            {
              name: "Supplier Assigment",
              path: "/settings/supplier/supplier-assigment",
            },
            {
              name: "Delivery Report Settings",
              path: "/settings/supplier/delivery-report-setings",
            },
          ],
        },
        {
          name: "Performance",
          path: "/settings/performance",
        },
        {
          name: "Import",
          path: "/settings/import",
        },
        {
          name: "Packing List",
          path: "/settings/packing-list",
        },
        {
          name: "User Management",
          path: "/settings/user-management",
          items: [
            {
              name: "User",
              path: "/settings/user-management/users",
            },
            {
              name: "Users Groups",
              path: "/settings/user-management/users-groups",
            },
            {
              name: "Roles",
              path: "/settings/user-management/roles",
            },
            {
              name: "Permission",
              path: "/settings/user-management/permission",
            },
          ],
        },
      ],
    },
    {
      name: "Reporting",
      path: "/reporting",
      icon: CircleGauge,
    },
    {
      name: "Tools",
      path: "/tools",
      icon: Pickaxe,
    },
    {
      name: "Help",
      path: "/help",
      icon: CircleHelp,
    },
  ];
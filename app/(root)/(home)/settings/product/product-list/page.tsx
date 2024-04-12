"use client";

import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
} from "mantine-react-table";
import { Button } from "@/components/ui/button";
import { Box, Download, Plus } from "lucide-react";
import { Menu, Stack } from "@mantine/core";
import axios from "axios";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import SheetUi from "@/app/(root)/_components/ui/sheet-ui";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { mkConfig, generateCsv, download } from "export-to-csv";
import ProductListDetails from "./page-details";
import SheetTriggerButton from "./sheet-trigger-button";

export interface IProducts {
  total: string;
  data: IData[];
}

export interface IData {
  Id: number;
  Code: string;
  ProductName: string;
  Translation: string;
  Family: string;
  Sfamily: string;
  Category: string;
  Unit: string;
  CountRelated: number;
  ProductType: string;
  Status: string;
  Created: string;
  Updated: string;
}

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const ProductList = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [data, setData] = useState<IData[]>([]);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setLoading(true);
      } else {
        setIsRefetching(true);
      }

      const url = "/api/product/";
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = (await response.data.data) as IProducts;
        setData(response.data.data);
        setRowCount(parseInt(json.total));
      } catch (error) {
        setIsError(true);
        setLoading(false);
        setIsRefetching(false);
        return;
      }
      setIsError(false);
      setLoading(false);
      setIsRefetching(false);
    };
    fetchData();
  }, [data.length]);

  const columns = useMemo<MRT_ColumnDef<IData>[]>(
    () => [
      {
        accessorKey: "Id",
        header: "Id",
        enableColumnActions: false,
      },
      {
        accessorKey: "Code",
        header: "Code",
        size: 50,
        enableClickToCopy: true,
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        // mantineTableFooterCellProps: {
        //   className: "bg-gray-200 border-t-1 border-b-1",
        // },
        enableColumnFilterModes: false,
      },
      {
        accessorKey: "ProductName",
        header: "Product Name",
        enableClickToCopy: true,
        // Cell: ({ renderedCellValue, row }) => (
        //   <td className="text-[11px] font-normal">
        //     {row.original.ProductName}
        //   </td>
        // ),
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        enableColumnFilterModes: false,
      },
      {
        accessorKey: "Family",
        header: "Family",
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        enableColumnFilterModes: false,
      },
      {
        accessorKey: "Sfamily",
        header: "Sub-family",
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        enableColumnFilterModes: false,
      },
      {
        accessorKey: "Category",
        header: "Category",
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        enableColumnFilterModes: true,
      },
      {
        accessorKey: "Unit",
        header: "Unit",
        size: 50,
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        enableColumnFilterModes: false,
      },
      {
        accessorKey: "CountRelated",
        header: "Nb Related",
        size: 50,
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        enableColumnFilterModes: false,
      },
      {
        accessorFn: (row) =>
          `${moment(row.Created, "YYYYMMDDHHmmssSSS").format(
            "YYYY-MM-DD HH:mm:ss"
          )}`,
        id: "Created",
        accessorKey: "Created",
        header: "Created at",
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        enableColumnFilterModes: false,
      },
      {
        accessorFn: (row) =>
          `${moment(row.Updated, "YYYYMMDDHHmmssSSS").format(
            "YYYY-MM-DD HH:mm:ss"
          )}`,
        accessorKey: "Updated",
        header: "Updated at",
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        enableColumnFilterModes: false,
      },
    ],
    []
  );

  const handleExportRows = (rows: MRT_Row<IData>[]) => {
    const rowData = rows.map((row) => row.original);
    const csvData = rowData.map((item: IData) => ({
      ...item,
    }));
    const csv = generateCsv(csvConfig)(csvData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csvData = data.map((item: IData) => ({
      ...item,
    }));
    const csv = generateCsv(csvConfig)(csvData);
    download(csvConfig)(csv);
  };

  const table = useMantineReactTable({
    columns,
    data,
    enableExpandAll: false,
    // mantineExpandButtonProps: ({ row, table }) => ({
    //   style: { display: row.original.CountRelated == 0 ? "none" : "block" },
    // }),
    renderDetailPanel: ({ row }) => {
      if (row.getIsExpanded()) {
        return <ProductListDetails idProduct={row.original.Id} />;
      }
      //return null;
    },
    state: { isLoading: isLoading },
    enableRowSelection: false,
    enableColumnOrdering: false,
    enableColumnActions: false,
    enableColumnDragging: false,
    enableColumnFilterModes: false,
    mantineTableBodyRowProps: {
      height: "0px",
    },
    mantineTableProps: {
      className: "",
      highlightOnHover: true,
      withColumnBorders: false,
      //withRowBorders: true,
      //withTableBorder: true,
    },
    enableGlobalFilter: true,
    enablePinning: true,
    enableRowActions: true,
    displayColumnDefOptions: {
      "mrt-row-actions": {
        mantineTableHeadCellProps: { className: "bg-gray-200" },
        header: "",
        size: 10,
      },
    },

    enableDensityToggle: false,
    enableToolbarInternalActions: true,
    enableFullScreenToggle: true,
    enableRowNumbers: false,
    enableBottomToolbar: true,
    mantineSearchTextInputProps: {
      placeholder: "Search Product",
    },
    enableStickyHeader: true,
    mantineTableContainerProps: { sx: { maxHeight: "700px" } },
    positionGlobalFilter: "right",
    initialState: {
      columnVisibility: { Id: false },
      pagination: { pageSize: 30, pageIndex: 0 },
      showColumnFilters: false,
      density: "xs",
      showGlobalFilter: true,
    },
    renderRowActionMenuItems: ({ row, table }) => (
      <>
        <Menu.Item icon={<IconEdit size={20} />} w={"150px"} onClick={() => {}}>
          Edit
        </Menu.Item>
        <Menu.Item icon={<IconTrash size={20} />} w={"150px"}>
          Delete
        </Menu.Item>
      </>
    ),
    renderTopToolbar: ({ table }) => {
      return (
        <div className="flex pl-2 pr-2 pt-4 mb-3 justify-between">
          <div className="flex">
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
            <MRT_ToggleFullScreenButton table={table} />
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleExportData}
              className=""
              disabled={table.getPrePaginationRowModel().rows.length === 0}
              variant="secondary"
            >
              <Download className="mr-3 h-4 w-4" />
              Export All Data
            </Button>
            <Button
              onClick={() =>
                handleExportRows(table.getPrePaginationRowModel().rows)
              }
              className=""
              disabled={table.getPrePaginationRowModel().rows.length === 0}
              variant="secondary"
            >
              <Download className="mr-3 h-4 w-4" />
              Export Page Rows
            </Button>
            <SheetUi
              title="New Item"
              description="Here to cerate a new product"
              buttonTrigger={<SheetTriggerButton />}
              onSave={() => console.log("Changes saved!")}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-left">
                    Code
                  </Label>
                  <Input
                    name="code"
                    type="text"
                    //value={code}
                    readOnly={true}
                    //onChange={(e) => setCode(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Name
                  </Label>
                  <Input
                    name="name"
                    type="text"
                    //value={name}
                    //onChange={(e) => setName(e.target.value)}
                    className="col-span-3 uppercase"
                  />
                </div>
              </div>
            </SheetUi>
          </div>
        </div>
      );
    },
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 bg-white p-3 rounded-s-sm">
        <div className=" w-full h-full">
          <MantineReactTable table={table} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;

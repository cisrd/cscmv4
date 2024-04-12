"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { TSupplier, TCountry } from "@prisma/client";
import {
  MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_Row,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { Menu } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SheetTriggerButton from "../../product/product-list/sheet-trigger-button";
import SheetUi from "@/app/(root)/_components/ui/sheet-ui";
import FileUpload from "@/app/(root)/_components/ui/file-upload-ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import FormSupplier from "./form";
import { saveSupplier } from "./action";
import { supplierStore } from "@/store/supplier";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const SupplierList = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [data, setData] = useState<TSupplier[]>([]);
  const [dataCountry, setDataCountry] = useState<TCountry[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [checked, setChecked] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const supplier = supplierStore((state: any) => state.supplier);
  const updateSupplier = supplierStore((state: any) => state.updateSupplier);

  const fetchData = async () => {
    if (!data.length) {
      setLoading(true);
    } else {
      setIsRefetching(true);
    }

    const url = "/api/settings/supplier";
    try {
      console.log("Fetching data...");
      const response = await axios.get(url);

      const jsonData = await response.data;
      console.log("Fetched data:", jsonData);
      setData(jsonData.supplier);
      setDataCountry(jsonData.country);
      setRowCount(jsonData.supplier.length);
      console.log("Data count:", jsonData.supplier.length);
    } catch (error) {
      setIsError(true);
      setLoading(false);
      setIsRefetching(false);
      console.error("Error fetching data:", error);
      return;
    }
    setIsError(false);
    setLoading(false);
    setIsRefetching(false);
  };

  useEffect(() => {
    fetchData();
    updateSupplier({
      isSheetOpen: false,
      allSupplier: data,
    });
  }, [data.length]);

  const columns = useMemo<MRT_ColumnDef<TSupplier>[]>(
    () => [
      {
        accessorKey: "Id",
        header: "Id",
        enableColumnActions: false,
      },
      {
        accessorKey: "code",
        header: "Code",
        size: 50,
        enableClickToCopy: true,
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        enableColumnFilterModes: false,
      },
      {
        accessorKey: "name",
        header: "Supplier Name",
        enableClickToCopy: true,
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        enableColumnFilterModes: false,
      },
      {
        accessorKey: "address",
        header: "Address",
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        enableColumnFilterModes: false,
      },
      {
        accessorKey: "email",
        header: "Email",
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        enableColumnFilterModes: false,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        enableColumnFilterModes: true,
      },
    ],
    []
  );

  const handleExportRows = (rows: MRT_Row<TSupplier>[]) => {
    const rowData = rows.map((row) => row.original);
    const csvData = rowData.map((item: TSupplier) => ({
      ...item,
    }));
    const csv = generateCsv(csvConfig)(csvData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csvData = data.map((item: TSupplier) => ({
      ...item,
    }));
    const csv = generateCsv(csvConfig)(csvData);
    download(csvConfig)(csv);
  };

  const table = useMantineReactTable({
    columns,
    data,
    enableExpandAll: false,
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
      placeholder: "Search Supplier...",
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
              title="New Supplier"
              description=""
              buttonTrigger={<SheetTriggerButton />}
              footer
              IsOpen={supplier.isSheetOpen}
            >
              <FormSupplier dataCountry={dataCountry} fetchData={fetchData} />
            </SheetUi>
          </div>
        </div>
      );
    },
  });

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-1 bg-white p-3 rounded-s-sm">
        <div className="w-full h-full">
          <MantineReactTable table={table} />
        </div>
      </div>
    </div>
  );
};

export default SupplierList;

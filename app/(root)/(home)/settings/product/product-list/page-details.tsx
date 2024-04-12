"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
} from "mantine-react-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Menu } from "@mantine/core";
import {
  IconEdit,
  IconSend,
  IconTrash,
  IconUserCircle,
} from "@tabler/icons-react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SheetUi from "@/app/(root)/_components/ui/sheet-ui";
import SheetTriggerButton from "./sheet-trigger-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/app/(root)/_components/ui/file-upload-ui";
import { ScrollArea } from "@/components/ui/scroll-area";
import TableProductCharacteristics from "@/app/(root)/_components/ui/table-product-characteristic";

export interface IProductDetails {
  total: string;
  data: IData[];
}

export interface IData {
  Id: number;
  Idr: number;
  Code: string;
  suffix: string;
  Unit: string;
  conversion: number;
  weight: number;
  Status: string;
  nb_attachment: number;
}

const ProductListDetails = ({ idProduct }: { idProduct?: number }) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [data, setData] = useState<IData[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setLoading(true);
      } else {
        setIsRefetching(true);
      }

      const url = "/api/product/" + idProduct;
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = (await response.data.data) as IProductDetails;
        setData(response.data.data);
        setRowCount(parseInt(json.total));
      } catch (error) {
        setIsError(true);
        return;
      }
      setIsError(false);
      setLoading(false);
      setIsRefetching(false);
    };
    fetchData();
  }, [data.length, idProduct]);

  const columns = useMemo<MRT_ColumnDef<IData>[]>(
    () => [
      {
        accessorKey: "Idr",
        header: "Idr",
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
        enableColumnFilterModes: false,
      },
      {
        accessorKey: "suffix",
        header: "Related Name",
        enableClickToCopy: true,
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        enableColumnFilterModes: false,
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
        accessorKey: "conversion",
        header: "Conversion",
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        enableColumnFilterModes: false,
      },
      {
        accessorKey: "weight",
        header: "Weight",
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        enableColumnFilterModes: false,
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableExpandAll: false,
    state: { isLoading: isLoading },
    enableRowSelection: false,
    enableColumnOrdering: false,
    enableColumnActions: false,
    enableColumnDragging: true,
    enableColumnFilterModes: false,
    enableGlobalFilter: true,
    enablePinning: false,
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
      placeholder: "Search Related Item",
    },
    mantineTableContainerProps: { sx: { maxHeight: "400px" } },
    positionGlobalFilter: "right",
    initialState: {
      columnVisibility: { Idr: false },
      pagination: { pageSize: 15, pageIndex: 0 },
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
        <div className="flex pl-2 pr-2 pt-4 mb-3 justify-between ">
          <div className="flex">
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </div>
          <SheetUi
            title="New Related Item"
            description=""
            buttonTrigger={<SheetTriggerButton />}
          >
            <ScrollArea className="w-[350px] h-[93%] pb-5 pr-3">
              <div className="flex flex-col pt-4 items-center gap-y-3 pb-8">
                {/* Suffix */}
                <div className="grid grid-cols-1 items-center gap-2">
                  <Label htmlFor="" className="text-left">
                    Suffix
                  </Label>
                  <Input
                    name="suffix"
                    type="text"
                    //value={code}
                    //onChange={(e) => setCode(e.target.value)}
                    className="uppercase w-[325px] focus:ring-0 focus-visible:ring-1"
                  />
                </div>
                {/* Sub-Family  */}
                <div className="grid grid-cols-1 items-center gap-2 pt-2">
                  <Label htmlFor="subfamily" className="text-left">
                    Sub-family
                  </Label>
                  <Select>
                    <SelectTrigger className="w-[325px]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className="uppercase w-[325px]">
                      <SelectItem value="Bof">Bof</SelectItem>
                      <SelectItem value="Butchery">Butchery</SelectItem>
                      <SelectItem value="Dry Food">Dry Food</SelectItem>
                      <SelectItem value="Dish & See Food">
                        Dish & See Food
                      </SelectItem>
                      <SelectItem value="Frozen">Frozen</SelectItem>
                      <SelectItem value="Preserve">Preserve</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Category  */}
                <div className="grid grid-cols-1 items-center gap-2 pt-2">
                  <Label htmlFor="category" className="text-left">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="w-[325px]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className="uppercase w-[325px]">
                      <SelectItem value="Beef">Beef</SelectItem>
                      <SelectItem value="Pork">Pork</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Unit  */}
                <div className="grid grid-cols-1 items-center gap-2 pt-2">
                  <Label htmlFor="unit" className="text-left">
                    Unit
                  </Label>
                  <Select>
                    <SelectTrigger className="w-[325px]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className="uppercase w-[325px]">
                      <SelectItem value="KG">KG</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Conversion  */}
                <div className="grid grid-cols-1 items-center gap-2 pt-2">
                  <Label htmlFor="" className="text-left">
                    Conversion
                  </Label>
                  <Input
                    name="conversion"
                    type="number"
                    //value={code}
                    //onChange={(e) => setCode(e.target.value)}
                    className="uppercase w-[325px]"
                  />
                </div>
                {/* Weight  */}
                <div className="grid grid-cols-1 items-center gap-2 pt-2">
                  <Label htmlFor="" className="text-left">
                    Weight
                  </Label>
                  <Input
                    name="weight"
                    type="number"
                    //value={code}
                    //onChange={(e) => setCode(e.target.value)}
                    className="uppercase w-[325px]"
                  />
                </div>
                {/* Switch Status  */}
                <div className="grid grid-cols-1 items-center gap-2 pt-2">
                  <div className="flex justify-between w-[325px]">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="status"
                        checked={checked}
                        onCheckedChange={setChecked}
                        className={`${
                          checked ? "bg-emerald-500" : "bg-emerald-500"
                        }`}
                      />
                      <Label htmlFor="Status">Status</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="stock-management" />
                      <Label htmlFor="stock-management">Stock Management</Label>
                    </div>
                  </div>
                </div>
                {/* Long Description  */}
                <div className="grid grid-cols-1 items-center gap-2 pt-2">
                  <Label htmlFor="" className="text-left">
                    Long Description
                  </Label>
                  <Textarea
                    className="w-[325px] h-[200px]"
                    placeholder="Type your message here."
                  />
                </div>
                {/* Characteristics  */}
                <div className="grid grid-cols-1 items-center gap-2 pt-2">
                  <Label htmlFor="" className="text-left">
                    Characteristics
                  </Label>
                  <TableProductCharacteristics />
                </div>
                {/* Upload Area  */}
                <div className="grid grid-cols-1 items-center gap-2 pt-2">
                  <Label htmlFor="" className="text-left">
                    Upload File
                  </Label>
                  <div className="w-[325px]">
                    <FileUpload />
                  </div>
                </div>
              </div>
            </ScrollArea>
          </SheetUi>
        </div>
      );
    },
  });

  return (
    <div className=" w-full h-full">
      <MantineReactTable table={table} />
    </div>
  );
};

export default ProductListDetails;

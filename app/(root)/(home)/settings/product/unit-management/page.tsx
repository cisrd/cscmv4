"use client";

import { useMemo, useState } from "react";
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
import SheetUnit from "./sheet";
import { v4 as uuidv4 } from "uuid";

interface IUnit {
  Id: number;
  Code: string;
  Name: string;
}

const data: IUnit[] = [
  {
    Id: 1,
    Code: "001",
    Name: "L",
  },
  {
    Id: 2,
    Code: "002",
    Name: "UNIT",
  },
  {
    Id: 2,
    Code: "003",
    Name: "KG",
  },
  {
    Id: 4,
    Code: "004",
    Name: "PACKET",
  },
  {
    Id: 5,
    Code: "005",
    Name: "CARTON",
  },
  {
    Id: 6,
    Code: "006",
    Name: "TRAY",
  },
  {
    Id: 7,
    Code: "007",
    Name: "BUCKET",
  },
];

const getNextCode = (data: IUnit[]): string => {
  let maxCodeNumber = 0;
  for (const item of data) {
    const codeNumber = parseInt(item.Code, 10);
    if (codeNumber > maxCodeNumber) {
      maxCodeNumber = codeNumber;
    }
  }
  const nextCodeNumber = maxCodeNumber + 1;
  const nextCode = nextCodeNumber.toString().padStart(3, "0");
  return nextCode;
};

const UnitList = () => {
  const nextCode = useMemo(() => getNextCode(data), []);
  const [sheetUnitProps, setSheetUnitProps] = useState<{
    Uuid?: string;
    Id: number;
    Name: string;
    Code: string;
    IsOpen: boolean;
  }>({ Uuid: uuidv4(), Id: 0, Name: "", Code: "", IsOpen: true });

  const columns = useMemo<MRT_ColumnDef<IUnit>[]>(
    () => [
      {
        accessorKey: "Id",
        header: "Id",
        enableColumnActions: false,
      },
      {
        accessorKey: "Code",
        header: "Code",
        mantineTableHeadCellProps: {
          className: "bg-gray-200 border-t-1 border-b-1",
        },
        // mantineTableBodyCellProps: {
        //   className: "bg-gray-200",
        // },
        enableColumnFilterModes: false,
      },
      {
        accessorFn: (originalRow) => originalRow.Name,
        id: "Name",
        header: "Name",
        mantineTableHeadCellProps: { className: "bg-gray-200" },
        enableColumnFilterModes: false,
      },
    ],
    []
  );

  const handleEdit = (value: IUnit) => {
    setSheetUnitProps({
      Uuid: uuidv4(),
      Id: value.Id,
      Name: value.Name,
      Code: value.Code,
      IsOpen: true,
    });
  };

  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: false,
    enableColumnOrdering: false,
    enableColumnActions: false,
    enableColumnDragging: false,
    enableColumnFilterModes: false,
    enableGlobalFilter: true,
    enablePinning: true,
    enableRowActions: true,
    displayColumnDefOptions: {
      "mrt-row-actions": {
        mantineTableHeadCellProps: { className: "bg-gray-200" },
        header: "Action",
        size: 10,
      },
    },
    enableDensityToggle: false,
    enableToolbarInternalActions: true,
    enableFullScreenToggle: false,
    enableRowNumbers: false,
    enableBottomToolbar: true,
    mantineSearchTextInputProps: {
      placeholder: "Search Unit",
    },
    positionGlobalFilter: "right",
    initialState: {
      columnVisibility: { Id: false },
      showColumnFilters: false,
      density: "xs",
      showGlobalFilter: true,
    },
    renderRowActionMenuItems: ({ row, table }) => (
      <>
        <Menu.Item
          icon={<IconEdit size={20} />}
          w={"150px"}
          onClick={() => handleEdit(row.original)}
        >
          Edit
        </Menu.Item>
        <Menu.Item icon={<IconTrash size={20} />} w={"150px"}>
          Delete
        </Menu.Item>
      </>
    ),
    renderTopToolbar: ({ table }) => {
      const handleCreated = () => {
        setSheetUnitProps({
          Uuid: uuidv4(),
          Id: 0,
          Name: "",
          Code: nextCode,
          IsOpen: true,
        });
      };

      return (
        <div className="flex pl-2 pr-2 pt-4 mb-3 justify-between">
          <div className="flex">
            <MRT_GlobalFilterTextInput table={table} />
            {/* <MRT_ToggleFiltersButton table={table} /> */}
          </div>
          <SheetUnit
            Uuid={sheetUnitProps.Uuid}
            Id={sheetUnitProps.Id}
            Name={sheetUnitProps.Name}
            Code={sheetUnitProps.Code}
            IsOpen={sheetUnitProps.IsOpen}
          />
          <Button
            className=""
            disabled={false}
            variant="create"
            onClick={handleCreated}
          >
            <Plus className="mr-3 h-4 w-4" />
            Create
          </Button>
        </div>
      );
    },
  });

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-1 bg-white p-3 rounded-s-sm">
        <div className=" w-full h-full">
          <MantineReactTable table={table} />
        </div>
      </div>
    </div>
  );
};

export default UnitList;

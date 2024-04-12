"use client";

import Header from "@/components/interface/header";
import "@progress/kendo-theme-default/dist/all.css";
import supplier_list from "../../../../../data/sample/workspace/supplier-management.json";
import { data } from "./Sample/data";
import { NumericFormat } from "react-number-format";
import { cn } from "@/lib/utils";
import {
  GridColumn,
  GridHeaderCellProps,
  GridCellProps,
  GridCustomCellProps,
} from "@progress/kendo-react-grid";
import dynamic from "next/dynamic";

const SupplierManagement = () => {
  const CellSettingsString = (props: any) => {
    return (
      <td className="text-[11px] pl-1 pt-3 font-semibold">
        {props.dataItem[props.field]}
      </td>
    );
  };

  const ColumnHeaderBasic = (props: any) => {
    return (
      <div className="text-center text-[12px] whitespace-normal">
        {props.title}
      </div>
    );
  };

  const Grid: any = dynamic(
    () =>
      import("@progress/kendo-react-grid").then((module) => module.Grid) as any,
    {
      ssr: false,
    }
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* <Header title="Supplier Management"/> */}
      <div className="flex flex-1 bg-white p-3 rounded-s-sm">
        <div className=" w-full h-full">
          <Grid
            style={{ height: "820px" }}
            data={data}
            //total={supplier_list.total}
          >
            <GridColumn
              field="Location"
              title="Location"
              headerCell={ColumnHeaderBasic}
              cell={CellSettingsString}
            />
            <GridColumn
              field="Code"
              title="Code"
              width={90}
              headerCell={ColumnHeaderBasic}
              cell={CellSettingsString}
            />
            <GridColumn
              field="SupplierName"
              title="Supplier Name"
              headerCell={ColumnHeaderBasic}
              cell={CellSettingsString}
            />
            <GridColumn
              field="Email"
              title="Email"
              headerCell={ColumnHeaderBasic}
              cell={CellSettingsString}
            />
            <GridColumn
              field="Phone"
              title="Phone"
              headerCell={ColumnHeaderBasic}
              cell={CellSettingsString}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default SupplierManagement;

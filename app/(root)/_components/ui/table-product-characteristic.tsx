"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableProductCharacteristics = () => {
  return (
    <Table>
      {/* <TableCaption>Characteristics</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead className="text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium text-xs">QUALITY</TableCell>
          <TableCell className="text-right">
            <Input
              name="quality"
              type="text"
              value={"BCH_БЕКЧАРДЖ СЫР ШВЕЙЦАРСКИЙ ЭДАМ"}
              className="uppercase text-xs h-8"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-xs">PACKING FORMAT</TableCell>
          <TableCell className="text-right">
            <Input
              name="quality"
              type="text"
              value={""}
              className="uppercase text-xs h-8"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-xs">BRAND</TableCell>
          <TableCell className="text-right">
            <Input
              name="quality"
              type="text"
              value={""}
              className="uppercase text-xs h-8"
            />
          </TableCell>
        </TableRow>
        <TableRow className="h-9">
          <TableCell className="font-medium text-xs">ORIGIN</TableCell>
          <TableCell className="text-right">
            <Input
              name="quality"
              type="text"
              value={""}
              className="uppercase text-xs h-8"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TableProductCharacteristics;

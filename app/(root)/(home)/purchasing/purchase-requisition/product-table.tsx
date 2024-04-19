import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const ProductTable = () => {
  return (
    <div
      className="flex w-full md:flex-nowrap justify-between
   bg-gray-100 p-2 rounded-md"
    >
      {/* <ScrollArea className="m-2 h-[65%] w-full relative rounded-md borde"> */}
      <Table className=" border rounded-tl-[4px] rounded-tr-[4px]">
        <TableHeader className=" text-[13px] bg-sidebar-headerCard">
          <TableRow>
            <TableHead className="text-left text-white">Code</TableHead>
            <TableHead className="text-left text-white">
              Product Description
            </TableHead>
            <TableHead className="text-left text-white">Unit</TableHead>
            <TableHead className="text-right text-white">
              Last Pruchase Price
            </TableHead>
            <TableHead className="text-right text-white">
              Stock on Hand
            </TableHead>
            <TableHead className="text-right text-white">
              Incoming Stock
            </TableHead>
            <TableHead className="text-center text-white">Alert</TableHead>
            <TableHead className="text-right text-white">Nb Day(s)</TableHead>
            <TableHead className="text-right text-white">
              Suggested Qty
            </TableHead>
            <TableHead className="text-right text-white">
              Qty Requested
            </TableHead>
            <TableHead className="text-right text-white">
              Total Amount
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* <ScrollArea className="max-h-[400px] relative"> */}
          <TableRow className="text-[12px] hover:cursor-pointer h-[20px]">
            <TableCell className="font-medium">000075-0007</TableCell>
            <TableCell>
              AIR FRESHENER AIR FRESHENER 500ML/ОСВЕЖИТЕЛЬ ВОЗДУХА 500ML
            </TableCell>
            <TableCell>UNIT</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-center">Ok</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow className="text-[12px] hover:cursor-pointer">
            <TableCell className="font-medium">000075-0020</TableCell>
            <TableCell>
              AIR FRESHENER BCH_БЕКЧАРДЖ ОСВЕЖИТЕЛЬ ВОЗДУХА 300ML
            </TableCell>
            <TableCell>UNIT</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-center">Short/Order urgently</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow className="text-[12px] hover:cursor-pointer">
            <TableCell className="font-medium">000075-0020</TableCell>
            <TableCell>
              AIR FRESHENER BCH_БЕКЧАРДЖ ОСВЕЖИТЕЛЬ ВОЗДУХА 300ML
            </TableCell>
            <TableCell>UNIT</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-center">Short/Order urgently</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow className="text-[12px] hover:cursor-pointer">
            <TableCell className="font-medium">000075-0020</TableCell>
            <TableCell>
              AIR FRESHENER BCH_БЕКЧАРДЖ ОСВЕЖИТЕЛЬ ВОЗДУХА 300ML
            </TableCell>
            <TableCell>UNIT</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-center">Short/Order urgently</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow className="text-[12px] hover:cursor-pointer">
            <TableCell className="font-medium">000075-0020</TableCell>
            <TableCell>
              AIR FRESHENER BCH_БЕКЧАРДЖ ОСВЕЖИТЕЛЬ ВОЗДУХА 300ML
            </TableCell>
            <TableCell>UNIT</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-center">Short/Order urgently</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow className="text-[12px] hover:cursor-pointer">
            <TableCell className="font-medium">000075-0020</TableCell>
            <TableCell>
              AIR FRESHENER BCH_БЕКЧАРДЖ ОСВЕЖИТЕЛЬ ВОЗДУХА 300ML
            </TableCell>
            <TableCell>UNIT</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-center">Short/Order urgently</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow className="text-[12px] hover:cursor-pointer">
            <TableCell className="font-medium">000075-0020</TableCell>
            <TableCell>
              AIR FRESHENER BCH_БЕКЧАРДЖ ОСВЕЖИТЕЛЬ ВОЗДУХА 300ML
            </TableCell>
            <TableCell>UNIT</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-center">Short/Order urgently</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow className="text-[12px] hover:cursor-pointer">
            <TableCell className="font-medium">000075-0020</TableCell>
            <TableCell>
              AIR FRESHENER BCH_БЕКЧАРДЖ ОСВЕЖИТЕЛЬ ВОЗДУХА 300ML
            </TableCell>
            <TableCell>UNIT</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-center">Short/Order urgently</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow className="text-[12px] hover:cursor-pointer">
            <TableCell className="font-medium">000075-0020</TableCell>
            <TableCell>
              AIR FRESHENER BCH_БЕКЧАРДЖ ОСВЕЖИТЕЛЬ ВОЗДУХА 300ML
            </TableCell>
            <TableCell>UNIT</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-center">Short/Order urgently</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow className="text-[12px] hover:cursor-pointer">
            <TableCell className="font-medium">000075-0020</TableCell>
            <TableCell>
              AIR FRESHENER BCH_БЕКЧАРДЖ ОСВЕЖИТЕЛЬ ВОЗДУХА 300ML
            </TableCell>
            <TableCell>UNIT</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-center">Short/Order urgently</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow className="text-[12px] hover:cursor-pointer">
            <TableCell className="font-medium">000075-0020</TableCell>
            <TableCell>
              AIR FRESHENER BCH_БЕКЧАРДЖ ОСВЕЖИТЕЛЬ ВОЗДУХА 300ML
            </TableCell>
            <TableCell>UNIT</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-center">Short/Order urgently</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow className="text-[12px] hover:cursor-pointer">
            <TableCell className="font-medium">000075-0020</TableCell>
            <TableCell>
              AIR FRESHENER BCH_БЕКЧАРДЖ ОСВЕЖИТЕЛЬ ВОЗДУХА 300ML
            </TableCell>
            <TableCell>UNIT</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-center">Short/Order urgently</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          {/* </ScrollArea> */}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {/* </ScrollArea> */}
    </div>
  );
};

export default ProductTable;

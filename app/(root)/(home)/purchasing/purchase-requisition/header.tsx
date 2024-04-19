// components/Header.tsx

import { Button } from "@/components/ui/button";
import React from "react";

type HeaderProps = {
  documentNumber: string;
  status: string;
  requestDate: string;
  startDate: string;
  requiredDate: string;
  endDate: string;
  deliveryDate: string;
  securityStockDay: number;
  nbDays: number;
};

const HeaderSection: React.FC<HeaderProps> = ({
  documentNumber,
  status,
  requestDate,
  startDate,
  requiredDate,
  endDate,
  deliveryDate,
  securityStockDay,
  nbDays,
}) => {
  return (
    <div
      className="flex w-full max-h-[235px] md:flex-nowrap justify-between
     bg-gray-100 p-2 rounded-md"
    >
      {/* Left */}
      <div className="flex gap-x-2">
        {/* Document and status */}
        <div className="flex flex-col max-w-[400px] gap-y-2 justify-between ">
          <div className="flex flex-col w-[200px]    text-xs text-center">
            <div className=" bg-sidebar-headerCard text-white p-1 border rounded-t-[6px]">
              Document #
            </div>
            <div className="bg-gray-200 p-2 text-base font-semibold border rounded-b-[6px]">
              {documentNumber}
            </div>
          </div>
          <div className="flex flex-col w-[200px]   text-center">
            <div className="bg-gray-200 p-2 text-[11px] font-semibold border rounded-[6px]">
              KAZAKHMYS STRUCTURE {">"} KZM STRUCTURE {">"} MAINSTORE STRUCTURE
            </div>
          </div>
          <div className="flex flex-col w-[200px]   text-xs text-center text-white">
            <div className=" bg-sidebar-headerCard p-1 border rounded-t-[6px]">
              Status
            </div>
            <div className="bg-gray-200 p-2 text-xs font-semibold border rounded-b-[6px]">
              <div className="bg-green-700 p-1">{status}</div>
            </div>
          </div>
        </div>

        {/* Menday */}
        <div className="w-[180px] h-[50%] bg-gray-200 border rounded-b-[6px] pb-2">
          <div className=" bg-sidebar-headerCard text-center items-center text-white p-1 text-xs rounded-t-[6px]">
            Manday Information
          </div>
          <div className="flex flex-col text-[10px] p-1 font-semibold gap-y-2">
            <div className="flex justify-between">
              <div>Average Menday </div>
              <div>{startDate}</div>
            </div>
            <div className="flex justify-between ">
              <div>Forecast Menday </div>
              <div>{endDate}</div>
            </div>
            <div className="flex items-center justify-center text-lg">
              <div>24%</div>
            </div>
          </div>
        </div>

        {/* Performance Table */}
      </div>

      {/* Right */}
      <div className="flex flex-col max-w-[400px] gap-y-2 justify-between">
        <div className="flex  text-xs text-center gap-x-2">
          <div className="w-[180px] bg-gray-200 border rounded-b-[6px]">
            <div className=" bg-sidebar-headerCard text-white p-1 text-xs border rounded-t-[6px]">
              Purchase Information
            </div>
            <div className="flex flex-col text-[10px] p-1 font-semibold ">
              <div className="flex justify-between">
                <div>Requested Date: </div>
                <div>{requestDate}</div>
              </div>
              <div className="flex justify-between">
                <div>Required Date: </div>
                <div>{requiredDate}</div>
              </div>
              <div className="flex justify-between">
                <div>Date of Next Delivery:</div>
                <div>{deliveryDate}</div>
              </div>
            </div>
          </div>
          <div className="w-[180px] bg-gray-200 border rounded-b-[6px]">
            <div className=" bg-sidebar-headerCard text-white p-1 text-xs rounded-t-[6px]">
              Consumption Information
            </div>
            <div className="flex flex-col text-[10px] p-1 font-semibold ">
              <div className="flex justify-between">
                <div>Start Date: </div>
                <div>{startDate}</div>
              </div>
              <div className="flex justify-between ">
                <div>End Date: </div>
                <div>{endDate}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[100%]   text-xs text-center">
          <div className=" bg-sidebar-headerCard text-white p-1 border rounded-t-[6px]">
            Security Stock Day
          </div>
          <div className="bg-gray-200 p-2 text-normal font-semibold border rounded-b-[6px]">
            Nb Days: {securityStockDay}
          </div>
        </div>
        <div className="flex items-center justify-between text-center gap-x-2">
          <Button variant={"primary"}>Edit PR</Button>
          <Button variant={"primary"}>Import from Excel</Button>
          <Button variant={"primary"}>Add Product</Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;

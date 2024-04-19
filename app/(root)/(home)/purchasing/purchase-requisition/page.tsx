import React from "react";
import HeaderSection from "./header";
import ProductTable from "./product-table";

const PurchaseRequisition = () => {
  const documentInfo = {
    documentNumber: "PR/1588/000150",
    status: "NEW",
    requestDate: "19/04/2024",
    startDate: "19/03/2024",
    requiredDate: "18/04/2024",
    endDate: "18/04/2024",
    deliveryDate: "26/04/2024",
    securityStockDay: 4,
    nbDays: 4,
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-1 bg-white p-3 rounded-s-sm">
        <div className="flex flex-col w-full space-y-2">
          <HeaderSection {...documentInfo} />
          <ProductTable />
        </div>
      </div>
    </div>
  );
};

export default PurchaseRequisition;

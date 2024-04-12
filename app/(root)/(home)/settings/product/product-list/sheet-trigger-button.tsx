import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { supplierStore } from "@/store/supplier";
import { Plus } from "lucide-react";
import React from "react";

const SheetTriggerButton = () => {
  const updateSupplier = supplierStore((state: any) => state.updateSupplier);

  return (
    <SheetTrigger asChild>
      <Button
        onClick={() => {
          updateSupplier({
            isSheetOpen: true,
          });
        }}
        className=""
        disabled={false}
        variant="create"
      >
        <Plus className="mr-3 h-4 w-4" />
        Create
      </Button>
    </SheetTrigger>
  );
};

export default SheetTriggerButton;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode, useEffect, useState } from "react";

const SheetUi = ({
  title,
  description,
  buttonTrigger,
  children,
  footer,
  IsOpen,
}: {
  title: string;
  description: string;
  buttonTrigger: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  IsOpen: boolean;
}) => {
  const [isopen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(IsOpen);
  }, [IsOpen]);

  return (
    <Sheet open={isopen} onOpenChange={setIsOpen}>
      {buttonTrigger}
      <SheetContent className="w-[500px]">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}

        {footer}
      </SheetContent>
    </Sheet>
  );
};

export default SheetUi;

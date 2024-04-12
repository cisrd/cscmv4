"use client";

import React, { useEffect, useState } from "react";
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
import { SaveData } from "./actions";
import SubmitButton from "./submit-button";

const SheetUnit = ({
  Uuid,
  Id,
  Code,
  Name,
  IsOpen,
}: {
  Uuid?: string;
  Id?: number;
  Code?: string;
  Name?: string;
  IsOpen?: boolean;
}) => {
  const [uuid, setUuid] = useState("");
  const [id, setId] = useState(0);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [isopen, setIsOpen] = useState(false);
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    if (Id !== undefined) {
      setId(Id);
    }
    if (Code !== undefined) {
      setCode(Code);
    }
    if (Name !== undefined) {
      setName(Name);
    }
    if (IsOpen) {
      setIsOpen(IsOpen);
    }
    if (Uuid !== undefined) {
      setUuid(Uuid);
    }
  }, [Code, Name, IsOpen, Uuid, Id]);

  return (
    <Sheet open={isopen && Code != ""} onOpenChange={setIsOpen}>
      <SheetContent>
        <form action={SaveData}>
          <SheetHeader>
            <SheetTitle>{id === 0 ? "Create Unit" : "Update Unit"}</SheetTitle>
            <SheetDescription>
              Unit code cannot be changed, it&apos;s generated automatrically.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <Input
                name="code"
                type="text"
                value={code}
                readOnly={true}
                onChange={(e) => setCode(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Name
              </Label>
              <Input
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3 uppercase"
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <SubmitButton type="submit" />
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default SheetUnit;

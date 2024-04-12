"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FileUpload from "@/app/(root)/_components/ui/file-upload-ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useState } from "react";
import { TCountry } from "@prisma/client";
import { CalendarDays, RotateCcw } from "lucide-react";
import { getLastSupplierCode, saveSupplier } from "./action";
import toast from "react-hot-toast";
import { supplierStore } from "@/store/supplier";
import { debounce } from "lodash";
import { useUser } from "@clerk/nextjs";

const FormSupplier = ({
  dataCountry,
  fetchData,
}: {
  dataCountry: TCountry[];
  fetchData: () => void;
}) => {
  const [activated, setactivated] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusIsCashPurchase, setstatusIsCashPurchase] = useState(true);
  const [dateStart, setDateStart] = useState<Date>();
  const [dateEnd, setDateEnd] = useState<Date>();
  const [startDatePopoverOpen, setStartDatePopoverOpen] = useState(false);
  const [endDatePopoverOpen, setEndDatePopoverOpen] = useState(false);

  const updateSupplier = supplierStore((state: any) => state.updateSupplier);

  const { user } = useUser();

  const clientAction = async (formData: FormData) => {
    if (submitting) return;

    setSubmitting(true);

    const resCode = await getLastSupplierCode();

    const newSupplier = {
      code: resCode,
      startDate: dateStart,
      endDate: dateEnd,
      name: formData.get("name"),
      email: formData.get("email"),
      status: activated,
      statusIsCashPurchase: statusIsCashPurchase,
      phone: formData.get("phone"),
      country: formData.get("country"),
      address: formData.get("address"),
      comment: formData.get("comment"),
      createdBy: user?.fullName,
    };

    const response = await saveSupplier(newSupplier);

    if (response?.error) {
      toast.error(response.error);
      setSubmitting(false);
    } else {
      toast.success("Supplier have been created with successfully!");
      setSubmitting(false);
      updateSupplier({
        isSheetOpen: false,
      });
      fetchData();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(debounce(clientAction, 500), []);

  return (
    <ScrollArea className="w-[350px] h-[99%] pb-5 pr-3">
      <form
        // action={clientAction}
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          debouncedSubmit(new FormData(e.currentTarget)); // Assuming you want to use FormData
        }}
      >
        <div className="flex flex-col pt-4 items-center gap-y-3 pb-8">
          {/* Switch Status  */}
          <div className="grid grid-cols-1 items-center gap-2 pt-2">
            <div className="flex justify-between w-[325px]">
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={activated}
                  onCheckedChange={setactivated}
                />
                <Label htmlFor="Status">Activate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="stock-management" />
                <Label htmlFor="stock-management">Allow Cash Purchase</Label>
              </div>
            </div>
          </div>
          {/* Period Date */}
          <div className="grid grid-cols-1 items-center gap-2">
            <Label htmlFor="" className="text-left">
              Referencing Period
            </Label>
            <div className="flex items-center justify-between gap-x-8">
              <Popover
                open={startDatePopoverOpen}
                onOpenChange={setStartDatePopoverOpen}
              >
                <PopoverTrigger
                  asChild
                  onClick={() => setStartDatePopoverOpen(true)}
                >
                  <Button
                    variant={"outline"}
                    disabled={!activated}
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !dateStart && "text-muted-foreground"
                    )}
                  >
                    <CalendarDays className="mr-1 h-4 w-4" />
                    {dateStart ? (
                      format(dateStart, "dd/MM/yyyy")
                    ) : (
                      <span>Start Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateStart}
                    onSelect={(date) => {
                      setDateStart(date);
                      setStartDatePopoverOpen(false); // Close the popover
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover
                open={endDatePopoverOpen}
                onOpenChange={setEndDatePopoverOpen}
              >
                <PopoverTrigger
                  asChild
                  onClick={() => setEndDatePopoverOpen(true)}
                >
                  <Button
                    variant={"outline"}
                    disabled={!activated}
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !dateStart && "text-muted-foreground"
                    )}
                  >
                    <CalendarDays className="mr-1 h-4 w-4" />
                    {dateEnd ? (
                      format(dateEnd, "dd/MM/yyyy")
                    ) : (
                      <span>End Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateEnd}
                    onSelect={(date) => {
                      setDateEnd(date);
                      setEndDatePopoverOpen(false); // Close the popover
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {/* Supplier Name */}
          <div className="grid grid-cols-1 items-center gap-2">
            <Label htmlFor="" className="text-left">
              Supplier Name
            </Label>
            <Input
              disabled={!activated}
              name="name"
              type="text"
              //value={code}
              //onChange={(e) => setCode(e.target.value)}
              className="uppercase w-[325px] focus:ring-0 focus-visible:ring-1"
            />
          </div>
          {/* Email */}
          <div className="grid grid-cols-1 items-center gap-2">
            <Label htmlFor="" className="text-left">
              Email
            </Label>
            <Input
              name="email"
              type="text"
              disabled={!activated}
              //value={code}
              //onChange={(e) => setCode(e.target.value)}
              className="w-[325px] focus:ring-0 focus-visible:ring-1"
            />
          </div>
          {/* Phone */}
          <div className="grid grid-cols-1 items-center gap-2">
            <Label htmlFor="" className="text-left">
              Phone Numer
            </Label>
            <Input
              name="phone"
              type="text"
              disabled={!activated}
              //value={code}
              //onChange={(e) => setCode(e.target.value)}
              className="w-[325px] focus:ring-0 focus-visible:ring-1"
            />
          </div>
          {/* Country  */}
          <div className="grid grid-cols-1 items-center gap-2 pt-2">
            <Label htmlFor="category" className="text-left">
              Country
            </Label>
            <Select name="country">
              <SelectTrigger className="w-[325px]">
                <SelectValue placeholder="Select Country..." />
              </SelectTrigger>
              <SelectContent className="uppercase w-[325px]">
                {dataCountry.map((country) => (
                  <SelectItem key={country.id} value={country.id.toString()}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Address  */}
          <div className="grid grid-cols-1 items-center gap-2 pt-2">
            <Label htmlFor="" className="text-left">
              Address
            </Label>
            <Textarea
              name="address"
              disabled={!activated}
              className="w-[325px] h-[200px]"
              placeholder="Type your message here."
            />
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
          {/* Comment  */}
          <div className="grid grid-cols-1 items-center gap-2 pt-2">
            <Label htmlFor="" className="text-left">
              Comment
            </Label>
            <Textarea
              name="comment"
              disabled={!activated}
              className="w-[325px] h-[200px]"
              placeholder="Type your message here."
            />
          </div>
        </div>
        <div className="flex justify-end gap-x-3">
          <Button disabled={submitting} type="submit" variant={"create"}>
            {submitting && (
              <span className="flex items-center">
                <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </span>
            )}
            {!submitting && "Save changes"}
          </Button>
        </div>
      </form>
    </ScrollArea>
  );
};

export default FormSupplier;

import React, { ChangeEvent } from "react";
import { Drawer } from "antd";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { treeviewStore } from "@/store/settings";
import { Button } from "@/components/ui/button";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  type?: "input" | "textarea";
  props?: any;
  placeholder?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = "input",
  placeholder,
  className,
}) => (
  <div className="flex flex-col items-start gap-y-2 pb-4">
    <Label htmlFor={id}>{label}</Label>
    {type === "input" ? (
      <Input
        id={id}
        name={id}
        value={value}
        onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void}
        placeholder={placeholder}
        className={className}
      />
    ) : (
      <Textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void}
        placeholder={placeholder}
        className={className}
      />
    )}
  </div>
);

const FormTreeview = () => {
  const { treeviewData, isSheetOpen, updateTreeview } = treeviewStore(
    (state: any) => ({
      treeviewData: state.treeviewZustand.treeviewData,
      isSheetOpen: state.treeviewZustand.isSheetOpen,
      updateTreeview: state.updateTreeview,
    })
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    field: string
  ) => {
    updateTreeview({
      treeviewData: {
        ...treeviewData,
        [field]: e.target.value,
      },
    });
  };

  return (
    <Drawer
      title="Edit Treeview"
      onClose={() => updateTreeview({ isSheetOpen: false })}
      width={400}
      open={isSheetOpen}
      footer={
        <div className="flex justify-end gap-x-3">
          <Button type="submit" variant="create">
            Save changes
          </Button>
        </div>
      }
    >
      <FormField
        id="name-input"
        label="Name"
        value={treeviewData.name || ""}
        onChange={(e) => handleInputChange(e, "name")}
      />
      <FormField
        id="code-input"
        label="Code"
        value={treeviewData.code || ""}
        onChange={(e) => handleInputChange(e, "code")}
      />
      <FormField
        id="companyName-input"
        label="Company Name"
        value={treeviewData.companyName || ""}
        onChange={(e) => handleInputChange(e, "companyName")}
      />
      <FormField
        id="email-input"
        label="Email"
        value={treeviewData.email || ""}
        onChange={(e) => handleInputChange(e, "email")}
      />
      <FormField
        id="phone-input"
        label="Phone"
        value={treeviewData.phone || ""}
        onChange={(e) => handleInputChange(e, "phone")}
      />
      <FormField
        id="address-input"
        label="Address"
        value={treeviewData.address || ""}
        type="textarea"
        placeholder="Type your text here..."
        className="h-[200px]"
        onChange={(e) => handleInputChange(e, "address")}
      />
      <FormField
        id="poFooter-input"
        label="Purchase Order Footer"
        value={treeviewData.poFooter || ""}
        type="textarea"
        placeholder="Type your text here..."
        className="h-[200px]"
        onChange={(e) => handleInputChange(e, "poFooter")}
      />
      <FormField
        id="poEmailBody-input"
        label="Purchase Order Email Body"
        value={treeviewData.poEmailBody || ""}
        type="textarea"
        placeholder="Type your text here..."
        className="h-[200px]"
        onChange={(e) => handleInputChange(e, "poEmailBody")}
      />

      <FormField
        id="poCcEmail-input"
        label="PO Cc Email"
        value={treeviewData.poCcEmail || ""}
        onChange={(e) => handleInputChange(e, "poCcEmail")}
      />

      {/* Status Switch */}
      <div className="flex flex-col items-end gap-y-1 pb-8">
        <div className="flex items-center space-x-2">
          <Switch id="status" />
          <Label htmlFor="status">Activate</Label>
        </div>
      </div>

      <div className="flex flex-col items-end gap-y-1 pb-8">
        <div className="flex items-center space-x-2">
          <Switch id="status" />
          <Label htmlFor="status">Activate</Label>
        </div>
      </div>
    </Drawer>
  );
};

export default FormTreeview;

import React, { ChangeEvent, FormEvent } from "react";
import { Drawer } from "antd";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { treeviewStore } from "@/store/settings";
import { Button } from "@/components/ui/button";
import FormField from "./form-field";
import { updateTreeviewAction } from "./action";
import toast from "react-hot-toast";

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

  const handleSwitchChange = (checked: boolean, field: string) => {
    updateTreeview({
      treeviewData: {
        ...treeviewData,
        [field]: checked,
      },
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await updateTreeviewAction(treeviewData);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Treeview have been saved with successfully!");
      updateTreeview({ isSheetOpen: false });
    }
  };

  return (
    <Drawer
      title="Edit Country Information"
      onClose={() => updateTreeview({ isSheetOpen: false })}
      width={400}
      open={isSheetOpen}
      footer={
        <div className="flex justify-end gap-x-3">
          <Button form="treeviewForm" type="submit" variant="create">
            Save Changes
          </Button>
        </div>
      }
    >
      <form id="treeviewForm" onSubmit={handleSubmit}>
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
        <div className="flex flex-col items-end gap-y-1 pb-0">
          <div className="flex items-center space-x-2">
            <Switch
              id="status"
              checked={treeviewData.isActivated}
              onCheckedChange={(e) => handleSwitchChange(e, "isActivated")}
            />
            <Label htmlFor="status">Activate</Label>
          </div>
        </div>
      </form>
    </Drawer>
  );
};

export default FormTreeview;

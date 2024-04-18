"use client";

import React, { ChangeEvent, useCallback, useState } from "react";
import { Drawer } from "antd";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { treeviewStore } from "@/store/settings";
import { Button } from "@/components/ui/button";
import FormField from "./form-field";
import { updateTreeviewAction } from "./action";
import toast from "react-hot-toast";
import { IState } from "./types";
import { RotateCcw } from "lucide-react";
import { debounce } from "lodash";

interface dataProps {
  treeviewStateData: IState;
  fetchData: () => void;
}

const FormTreeview: React.FC<dataProps> = ({
  treeviewStateData,
  fetchData,
}) => {
  const { treeviewData, isSheetOpen, updateTreeview } = treeviewStore(
    (state: any) => ({
      treeviewData: state.treeviewZustand.treeviewData,
      isSheetOpen: state.treeviewZustand.isSheetOpen,
      updateTreeview: state.updateTreeview,
    })
  );

  const [submitting, setSubmitting] = useState(false);

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

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);

    console.log(treeviewData);

    const response = await updateTreeviewAction(treeviewData);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Treeview have been saved with successfully!");
      updateTreeview({ isSheetOpen: false });
      fetchData();
    }
    setSubmitting(false);
  }

  const debouncedSubmit = useCallback(debounce(handleSubmit, 500), [handleSubmit]);

  return (
    <Drawer
      title="Edit Country Information"
      onClose={() => updateTreeview({ isSheetOpen: false })}
      width={400}
      open={isSheetOpen}
      footer={
        <div className="flex justify-end gap-x-3">
          <Button
            form="treeviewForm"
            type="submit"
            variant="create"
            disabled={submitting}
          >
            {submitting && (
              <span className="flex items-center">
                <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </span>
            )}
            {!submitting && "Save Changes"}
          </Button>
        </div>
      }
    >
      <form
        id="treeviewForm"
        //action={handleSubmit}
        onSubmit={(e) => {
          e.preventDefault();
          debouncedSubmit(new FormData(e.currentTarget)); 
        }}
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

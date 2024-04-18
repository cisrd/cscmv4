"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TreeviewWidget from "./treeview-widget";
import {
  FormInputNewTreeview,
  HeaderTreeview,
  ButtonNew,
} from "./ui-component";
import { TTreeview } from "./types";
import toast from "react-hot-toast";
import { saveTreeviewName } from "./action";

interface SubstoreViewProps {
  isNewSubstore: boolean;
  selectedSubstore: any;
  treeviewStateData: any;
  selectedSite: any;
  treeviewState: any;
  setTreeviewState: (state: any) => void;
  setSelectedSite: (state: any) => void;
  handleSelectSubstore: (id: number) => void;
  fetchData: () => void;
}

const SubstoreView: React.FC<SubstoreViewProps> = ({
  isNewSubstore,
  selectedSubstore,
  selectedSite,
  treeviewState,
  treeviewStateData,
  setSelectedSite,
  setTreeviewState,
  handleSelectSubstore,
  fetchData,
}) => {
  const actionSaveSubstore = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const substoreName = formData.get("substore");
    const parentIDString = formData.get("parentID");
    const parentID = parentIDString
      ? parseInt(parentIDString as string)
      : undefined;

    const newData = {
      name: typeof substoreName === "string" ? substoreName : undefined,
      parentID: parentIDString ? parseInt(parentIDString as string) : undefined,
    };

    try {
      const response = await saveTreeviewName(newData, 4);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Sub-store created successfully!");
        if (treeviewStateData.selectedCountry) {
          const newSubstore = response.data;

          setSelectedSite((prevState: any) => {
            if (!prevState) return prevState;

            if (!newSubstore) return prevState;

            return {
              ...prevState,
              children: prevState.children
                ? [...prevState.children, newSubstore]
                : [newSubstore],
            };
          });
        }

        setTreeviewState({ ...treeviewState, isNewSubstore: false });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    } finally {
      fetchData();
    }
  };

  return (
    <div
      className={`col-span-1 pl-2 border-r-2 border-gray-300 overflow-hidden ${
        !selectedSite && "hidden"
      }`}
    >
      <div className="items-center justify-between p-1 border-b border-gray-200 mr-3 font-semibold">
        {isNewSubstore ? (
          <FormInputNewTreeview
            inputName="substore"
            placeholder="Sub-store name..."
            onSubmit={actionSaveSubstore}
            onCancel={() =>
              setTreeviewState((prev: any) => ({
                ...prev,
                isNewSubstore: false,
              }))
            }
            parentID={selectedSite?.id}
          />
        ) : (
          <>
            <div className="flex items-center justify-between font-semibold">
              <HeaderTreeview
                title="Sub-Store"
                count={selectedSite?.children?.length || 0}
              />
              <ButtonNew
                onAddClick={() =>
                  setTreeviewState((prev: any) => ({
                    ...prev,
                    isNewSubstore: true,
                  }))
                }
              />
            </div>
          </>
        )}
      </div>
      <ScrollArea className="h-[88%] pb-5 pr-1">
        {selectedSite &&
          selectedSite.children &&
          selectedSite.children.map((substore: TTreeview) => (
            <TreeviewWidget
              key={substore.id.toString()}
              treeview={substore}
              selectedBool={selectedSubstore?.id === substore.id}
              onSelectTreeview={() => handleSelectSubstore(substore.id)}
            />
          ))}
      </ScrollArea>
    </div>
  );
};

export default SubstoreView;

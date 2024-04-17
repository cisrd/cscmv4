import React from "react";
import {
  FormInputNewTreeview,
  HeaderTreeview,
  ButtonNew,
} from "./ui-component";
import TreeviewWidget from "./treeview-widget";
import { TTreeview } from "@prisma/client";
import { saveTreeviewName } from "./action";
import toast from "react-hot-toast";

interface StorageViewProps {
  isNewStorage: boolean;
  selectedSubstore: any;
  treeviewState: any;
  setTreeviewState: (state: any) => void;
  setSelectedSubstore: (state: any) => void;
  handleSelectStorage: (id: number) => void;
  fetchData: () => void;
}

const StorageView: React.FC<StorageViewProps> = ({
  isNewStorage,
  selectedSubstore,
  treeviewState,
  setSelectedSubstore,
  setTreeviewState,
  handleSelectStorage,
  fetchData,
}) => {
  const actionSaveStorage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const storageName = formData.get("storage");
    const parentIDString = formData.get("parentID");
    const parentID = parentIDString
      ? parseInt(parentIDString as string)
      : undefined;

    const newData = {
      name: typeof storageName === "string" ? storageName : undefined,
      parentID: parentIDString ? parseInt(parentIDString as string) : undefined,
    };

    try {
      const response = await saveTreeviewName(newData, 6);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Storage created with successfully!");
        setSelectedSubstore((prevState: any) => {
          if (!prevState || !response.data) return prevState; // Maintain the current state if null or response is faulty
          const newStorage = { ...response.data, children: [] };
          const updatedChildren = prevState.children
            ? [...prevState.children, newStorage]
            : [newStorage];
          return { ...prevState, children: updatedChildren }; // Explicit structured update
        });
        setTreeviewState({ ...treeviewState, isNewStorage: false });
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
      className={`flex-1 pl-2 border-r-2 border-gray-300 overflow-hidden ${
        !selectedSubstore && "hidden"
      }`}
    >
      <div className="items-center justify-between p-1 border-b border-gray-200 mr-3 font-semibold">
        {isNewStorage ? (
          <FormInputNewTreeview
            inputName="storage"
            placeholder="Storage name..."
            onSubmit={actionSaveStorage}
            onCancel={() =>
              setTreeviewState((prev: any) => ({
                ...prev,
                isNewStorage: false,
              }))
            }
            parentID={selectedSubstore?.id}
          />
        ) : (
          <>
            <div className="flex items-center justify-between font-semibold">
              <HeaderTreeview
                title="Storage"
                count={
                  selectedSubstore?.children?.filter(
                    (storage: TTreeview) => storage.level === 6
                  ).length || 0
                }
              />
              <ButtonNew
                onAddClick={() =>
                  setTreeviewState((prev: any) => ({
                    ...prev,
                    isNewStorage: true,
                  }))
                }
              />
            </div>
          </>
        )}
      </div>
      {selectedSubstore &&
        selectedSubstore.children &&
        selectedSubstore.children
          .filter((storage: TTreeview) => storage.level === 6)
          .map((storage: any) => (
            <TreeviewWidget
              key={storage.id.toString()}
              treeview={storage}
              selectedBool={selectedSubstore?.id === storage.id}
              onSelectTreeview={() => handleSelectStorage(storage.id)}
            />
          ))}
    </div>
  );
};

export default StorageView;

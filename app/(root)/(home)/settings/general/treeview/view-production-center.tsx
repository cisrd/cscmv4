import React from "react";
import {
  FormInputNewTreeview,
  HeaderTreeview,
  ButtonNew,
} from "./ui-component";
import TreeviewWidget from "./treeview-widget";
import { saveTreeviewName } from "./action";
import toast from "react-hot-toast";

interface ProductionCenterViewProps {
  isNewProductionCenter: boolean;
  selectedSubstore: any;
  treeviewState: any;
  treeviewStateData: any;
  setTreeviewState: (state: any) => void;
  setSelectedSubstore: (state: any) => void;
  handleSelectProductionCenter: (id: number) => void;
  fetchData: () => void;
}

const ProductionCenterView: React.FC<ProductionCenterViewProps> = ({
  isNewProductionCenter,
  selectedSubstore,
  treeviewState,
  setTreeviewState,
  treeviewStateData,
  setSelectedSubstore,
  handleSelectProductionCenter,
  fetchData,
}) => {
  const actionSaveProductionCenter = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const productionCenterName = formData.get("production-center");
    const parentIDString = formData.get("parentID");
    const parentID = parentIDString
      ? parseInt(parentIDString as string)
      : undefined;

    const newData = {
      name:
        typeof productionCenterName === "string"
          ? productionCenterName
          : undefined,
      parentID: parentIDString ? parseInt(parentIDString as string) : undefined,
    };

    try {
      const response = await saveTreeviewName(newData, 5);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Production Center created with successfully!");
        if (treeviewStateData.selectedCountry) {
          const newProductionCenter = response.data;

          setSelectedSubstore((prevState: any) => {
            if (!prevState) return prevState;

            if (!newProductionCenter) return prevState;

            return {
              ...prevState,
              children: prevState.children
                ? [...prevState.children, newProductionCenter]
                : [newProductionCenter],
            };
          });
        }

        setTreeviewState({ ...treeviewState, isNewProductionCenter: false });
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
        {isNewProductionCenter ? (
          <FormInputNewTreeview
            inputName="production-center"
            placeholder="Production Center name..."
            onSubmit={actionSaveProductionCenter}
            onCancel={() =>
              setTreeviewState((prev: any) => ({
                ...prev,
                isNewProductionCenter: false,
              }))
            }
            parentID={selectedSubstore?.id}
          />
        ) : (
          <>
            <div className="flex items-center justify-between font-semibold">
              <HeaderTreeview
                title="Production Center"
                count={
                  selectedSubstore?.children?.filter(
                    (pc: any) => pc.level === 5
                  ).length || 0
                }
              />
              <ButtonNew
                onAddClick={() =>
                  setTreeviewState((prev: any) => ({
                    ...prev,
                    isNewProductionCenter: true,
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
          .filter((pc: any) => pc.level === 5)
          .map((productionCenter: any) => (
            <TreeviewWidget
              key={productionCenter.id.toString()}
              treeview={productionCenter}
              selectedBool={selectedSubstore?.id === productionCenter.id}
              onSelectTreeview={() =>
                handleSelectProductionCenter(productionCenter.id)
              }
            />
          ))}
    </div>
  );
};

export default ProductionCenterView;

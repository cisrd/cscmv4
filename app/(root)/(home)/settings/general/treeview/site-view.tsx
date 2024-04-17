import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TreeviewWidget from "./treeview-widget";
import {
  FormInputNewTreeview,
  HeaderTreeview,
  ButtonNew,
} from "./ui-component";
import { TTreeview } from "@prisma/client";
import toast from "react-hot-toast";
import { saveTreeviewName } from "./action";
import { IState } from "./types";

interface SiteViewProps {
  isNewSite: boolean;
  selectedSite: any;
  treeviewStateData: IState;
  treeviewState: any;
  selectedProject: any;
  setSelectedProject: (state: any) => void;
  setTreeviewState: (state: any) => void;
  handleSelectSite: (id: number) => void;
  fetchData: () => void;
}

const SiteView: React.FC<SiteViewProps> = ({
  isNewSite,
  selectedSite,
  selectedProject,
  treeviewState,
  treeviewStateData,
  setSelectedProject,
  setTreeviewState,
  handleSelectSite,
  fetchData,
}) => {
  const actionSaveSite = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const projectName = formData.get("site");
    const parentIDString = formData.get("parentID");
    const parentID = parentIDString
      ? parseInt(parentIDString as string)
      : undefined;

    const newData = {
      name: typeof projectName === "string" ? projectName : undefined,
      parentID: parentIDString ? parseInt(parentIDString as string) : undefined,
    };

    try {
      const response = await saveTreeviewName(newData, 3);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Site created successfully!");
        if (treeviewStateData.selectedCountry) {
          setSelectedProject((prevState: any) => {
            if (!prevState) return prevState;

            const newSite = response.data;

            if (!newSite) return prevState;

            return {
              ...prevState,
              children: prevState.children
                ? [...prevState.children, newSite]
                : [newSite],
            };
          });
        }
        setTreeviewState({ ...treeviewState, isNewSite: false });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message); // Safe to access `message`
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
        !selectedProject && "hidden"
      }`}
    >
      <div className="items-center justify-between p-1 border-b border-gray-200 mr-3 font-semibold">
        {isNewSite ? (
          <FormInputNewTreeview
            inputName="site"
            placeholder="Site name..."
            onSubmit={actionSaveSite}
            onCancel={() =>
              setTreeviewState((prev: any) => ({ ...prev, isNewSite: false }))
            }
            parentID={selectedProject?.id}
          />
        ) : (
          <>
            <div className="flex items-center justify-between font-semibold">
              <HeaderTreeview
                title="Site"
                count={selectedProject?.children?.length || 0}
              />
              <ButtonNew
                onAddClick={() =>
                  setTreeviewState((prev: SiteViewProps) => ({
                    ...prev,
                    isNewSite: true,
                  }))
                }
              />
            </div>
          </>
        )}
      </div>
      <ScrollArea className="h-[88%] pb-5 pr-1">
        {selectedProject &&
          selectedProject.children &&
          selectedProject.children.map((site: TTreeview) => (
            <TreeviewWidget
              key={site.id.toString()} // Assume each site has a unique ID
              treeview={site}
              selectedBool={selectedSite?.id === site.id}
              onSelectTreeview={() => handleSelectSite(site.id)}
            />
          ))}
      </ScrollArea>
    </div>
  );
};

export default SiteView;

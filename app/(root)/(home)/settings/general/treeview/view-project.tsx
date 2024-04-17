import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TreeviewWidget from "./treeview-widget";
import {
  FormInputNewTreeview,
  HeaderTreeview,
  ButtonNew,
} from "./ui-component";
import { IState, TTreeview } from "./types";
import { saveTreeviewName } from "./action";
import toast from "react-hot-toast";

interface TreeviewStateData {
  dataTreeview: TTreeview[];
}

interface ProjectViewProps {
  isNewProject: boolean;
  selectedProject: any; // You might want to specify a more specific type
  treeviewStateData: IState; // Ideally, this should have a specific type
  treeviewState: any;
  setTreeviewState: (state: any) => void;
  handleSelectProject: (id: number) => void;
  setTreeviewStateData: (state: any) => void;
}

interface TreeViewState {
  isNewCountry: boolean;
  isNewProject: boolean;
  isNewSite: boolean; // Example additional property
  // Add other properties as needed
}

const ProjectView: React.FC<ProjectViewProps> = ({
  isNewProject,
  selectedProject,
  treeviewStateData,
  treeviewState,
  setTreeviewStateData,
  setTreeviewState,
  handleSelectProject,
}) => {
  const actionSaveProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const projectName = formData.get("project");
    const parentIDString = formData.get("parentID");
    const parentID = parentIDString
      ? parseInt(parentIDString as string)
      : undefined;

    const newData = {
      name: typeof projectName === "string" ? projectName : undefined,
      parentID: parentIDString ? parseInt(parentIDString as string) : undefined,
    };

    try {
      const response = await saveTreeviewName(newData, 2);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Project has been created with successfully!");

        setTreeviewStateData((prevState: any) => {
          if (!prevState || !response.data) return prevState;
          const updatedData = prevState.dataTreeview.map(
            (country: TTreeview) => {
              if (country.id === parentID) {
                const newProjects = [
                  ...(country.children || []),
                  response.data,
                ];
                console.log(newProjects);
                return { ...country, children: newProjects };
              }
              return country;
            }
          );
          return { ...prevState, dataTreeview: updatedData };
        });
        setTreeviewState({ ...treeviewState, isNewProject: false });
        // if (!prevState || !response.data) return prevState;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message); // Safe to access `message`
      } else {
        console.log("An unexpected error occurred");
      }
    } finally {
    }
  };

  return (
    <div
      className={`col-span-1 pl-2 border-r-2 border-gray-300 overflow-hidden ${
        !treeviewStateData.selectedCountry && "hidden"
      }`}
    >
      <div className="items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
        {isNewProject ? (
          <FormInputNewTreeview
            inputName="project"
            placeholder="Project name..."
            onSubmit={actionSaveProject}
            onCancel={() =>
              setTreeviewState((prev: TreeViewState) => ({
                ...prev,
                isNewProject: false,
              }))
            }
            parentID={treeviewStateData.selectedCountry?.id}
          />
        ) : (
          <>
            <div className="flex items-center justify-between font-semibold">
              <HeaderTreeview
                title="Project"
                count={treeviewStateData.selectedCountry?.children?.length || 0}
              />
              <ButtonNew
                onAddClick={() =>
                  setTreeviewState((prev: TreeViewState) => ({
                    ...prev,
                    isNewProject: true,
                  }))
                }
              />
            </div>
          </>
        )}
      </div>
      <ScrollArea className=" h-[88%] pb-5 pr-1">
        {treeviewStateData.selectedCountry &&
          treeviewStateData.selectedCountry.children &&
          treeviewStateData.selectedCountry.children.map(
            (project: TTreeview) => (
              <TreeviewWidget
                key={project.name}
                treeview={project}
                selectedBool={selectedProject?.id === project.id}
                onSelectTreeview={() => handleSelectProject(project.id)}
              />
            )
          )}
      </ScrollArea>
    </div>
  );
};

export default ProjectView;

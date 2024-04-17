"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";
import { saveTreeviewName } from "./action";
import toast from "react-hot-toast";
import TreeviewWidget from "./treeview-widget";
import { IState, initialState } from "./types";
import {
  ButtonNew,
  FormInputNewCountry,
  FormInputNewTreeview,
  HeaderTreeview,
} from "./ui-component";
import CountryView from "./country-view";

interface TTreeview {
  id: number;
  name: string;
  parentId: number | null;
  isFm: boolean;
  level: number | null;
  adresse: string | null;
  projectCode: string | null;
  codeAnalytic: string | null;
  createdBy: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  updatedBy: string | null;
  children?: TTreeview[];
  parent?: TTreeview;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const TreeView = () => {
  const [treeviewState, setTreeviewState] = useState({
    isLoading: false,
    idCountry: 0,
    savingCountry: false,
    savingProject: false,
    savingSite: false,
    isNewCountry: false,
    isNewProject: false,
    isNewSite: false,
    isNewSubstore: false,
    isNewStorage: false,
    isNewProductionCenter: false,
  });

  const [treeviewStateData, setTreeviewStateData] =
    useState<IState>(initialState);

  const [selectedProject, setSelectedProject] = useState<TTreeview | null>(
    null
  );
  const [selectedSite, setSelectedSite] = useState<TTreeview | null>(null);
  const [selectedSubstore, setSelectedSubstore] = useState<TTreeview | null>(
    null
  );
  const [selectedStorage, setSelectedStorage] = useState<TTreeview | null>(
    null
  );
  const [selectedProductionCenter, setSelectedProductionCenter] =
    useState<TTreeview | null>(null);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.get<TTreeview[]>(
        "/api/settings/general/treeview"
      );
      setTreeviewStateData({
        ...treeviewStateData,
        dataTreeview: response.data,
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

  const handleSelectCountry = (selectedId: number) => {
    const selected = treeviewStateData.dataTreeview.find(
      (project) => project.id === selectedId
    ) as TTreeview;
    setSelectedProject(null);
    setSelectedSite(null);
    setSelectedSubstore(null);
    setTreeviewStateData({ ...treeviewStateData, selectedCountry: selected });
  };

  const handleSelectProject = (selectedId: number) => {
    const selected = treeviewStateData.selectedCountry?.children?.find(
      (project) => project.id === selectedId
    ) as TTreeview;
    setSelectedSite(null);
    setSelectedSubstore(null);
    setSelectedProject(selected);
  };

  const handleSelectSite = (selectedId: number) => {
    const selected = selectedProject?.children?.find(
      (site) => site.id === selectedId
    ) as TTreeview;
    setSelectedSubstore(null);
    setSelectedSite(selected);
  };

  const handleSelectSubstore = (selectedId: number) => {
    const selected = selectedSite?.children?.find(
      (substore) => substore.id === selectedId
    ) as TTreeview;
    setSelectedSubstore(selected);
  };

  const handleSelectProductionCenter = (selectedId: number) => {
    fetchData();
    const selected = selectedSubstore?.children?.find(
      (productionCenter) => productionCenter.id === selectedId
    ) as TTreeview;
    setSelectedProductionCenter(selectedSubstore);
  };

  const actionSaveCountry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newCountry = {
      name: formData.get("country"),
    };

    const response = await saveTreeviewName(newCountry, 1);

    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Country have been created with successfully!");
      setTreeviewState({ ...treeviewState, isNewCountry: false });
      fetchData();
    }
  };

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

        setTreeviewStateData((prevState) => {
          if (!prevState || !response.data) return prevState;
          const updatedData = prevState.dataTreeview.map((country) => {
            if (country.id === parentID) {
              const newProjects = [...(country.children || []), response.data];
              console.log(newProjects);
              return { ...country, children: newProjects };
            }
            return country;
          });
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
          setSelectedProject((prevState) => {
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

          setSelectedSite((prevState) => {
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

          setSelectedSubstore((prevState) => {
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
        setSelectedSubstore((prevState) => {
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
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-1 bg-white p-3 rounded-s-sm">
        <div className="h-screen w-full grid grid-cols-5">
          {/* Country View */}
          <CountryView
            isNewCountry={treeviewState.isNewCountry}
            isLoading={treeviewState.isLoading}
            treeviewStateData={treeviewStateData}
            setTreeviewState={setTreeviewState}
            handleSelectCountry={handleSelectCountry}
            variants={variants} // Make sure to define these animations
            treeviewState={treeviewState}
            fetchData={fetchData}
          />
          {/* End Country View */}

          {/* Project View */}
          <div
            className={`col-span-1 pl-2 border-r-2 border-gray-300 overflow-hidden ${
              !treeviewStateData.selectedCountry && "hidden"
            }`}
          >
            <div className="items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
              {treeviewState.isNewProject ? (
                <FormInputNewTreeview
                  inputName="project"
                  placeholder="Project name..."
                  onSubmit={actionSaveProject}
                  onCancel={() =>
                    setTreeviewState({ ...treeviewState, isNewProject: false })
                  }
                  parentID={treeviewStateData.selectedCountry?.id}
                />
              ) : (
                <>
                  <div className="flex items-center justify-between font-semibold">
                    <HeaderTreeview
                      title="Project"
                      count={
                        treeviewStateData.selectedCountry?.children?.length || 0
                      }
                    />
                    <ButtonNew
                      onAddClick={() =>
                        setTreeviewState({
                          ...treeviewState,
                          isNewProject: true,
                        })
                      }
                    />
                  </div>
                </>
              )}
            </div>

            <ScrollArea className=" h-[88%] pb-5 pr-1">
              {treeviewStateData.selectedCountry &&
                treeviewStateData.selectedCountry.children &&
                treeviewStateData.selectedCountry.children.length > 0 &&
                treeviewStateData.selectedCountry.children.map((project) => (
                  <TreeviewWidget
                    key={project.name}
                    treeview={project}
                    selectedBool={selectedProject?.id === project.id}
                    onSelectTreeview={() => handleSelectProject(project.id)}
                  />
                ))}
            </ScrollArea>
          </div>
          {/* End Project View */}

          {/* Site View */}
          <div
            className={`col-span-1 pl-2 border-r-2 border-gray-300 overflow-hidden ${
              !selectedProject && "hidden"
            }`}
          >
            <div className="items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
              {treeviewState.isNewSite ? (
                <FormInputNewTreeview
                  inputName="site"
                  placeholder="Site name..."
                  onSubmit={actionSaveSite}
                  onCancel={() =>
                    setTreeviewState({ ...treeviewState, isNewSite: false })
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
                        setTreeviewState({
                          ...treeviewState,
                          isNewSite: true,
                        })
                      }
                    />
                  </div>
                </>
              )}
            </div>

            <ScrollArea className=" h-[88%] pb-5 pr-1">
              {selectedProject &&
                selectedProject.children &&
                selectedProject.children.length > 0 &&
                selectedProject.children.map((site) => (
                  <TreeviewWidget
                    key={site.name}
                    treeview={site}
                    selectedBool={selectedSite?.id === site.id}
                    onSelectTreeview={() => handleSelectSite(site.id)}
                  />
                ))}
            </ScrollArea>
          </div>
          {/* End Site View */}

          {/* Substore View */}
          <div
            className={`col-span-1 pl-2 border-r-2 border-gray-300 overflow-hidden ${
              !selectedSite && "hidden"
            }`}
          >
            <div className="items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
              {treeviewState.isNewSubstore ? (
                <FormInputNewTreeview
                  inputName="substore"
                  placeholder="Sub-store name..."
                  onSubmit={actionSaveSubstore}
                  onCancel={() =>
                    setTreeviewState({ ...treeviewState, isNewSubstore: false })
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
                        setTreeviewState({
                          ...treeviewState,
                          isNewSubstore: true,
                        })
                      }
                    />
                  </div>
                </>
              )}
            </div>
            <ScrollArea className=" h-[88%] pb-5 pr-1">
              {selectedSite &&
                selectedSite.children &&
                selectedSite.children.length > 0 &&
                selectedSite.children.map((substore) => (
                  <TreeviewWidget
                    key={substore.name}
                    treeview={substore}
                    selectedBool={selectedSubstore?.id === substore.id}
                    onSelectTreeview={() => handleSelectSubstore(substore.id)}
                  />
                ))}
            </ScrollArea>
          </div>
          {/* End Substore View */}

          {/* Production Center View */}
          <div className="flex flex-col h-screen">
            <div
              className={`flex-1 pl-2 border-r-2 border-gray-300 overflow-hidden ${
                !selectedSubstore && "hidden"
              }`}
            >
              <div className="items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
                {treeviewState.isNewProductionCenter ? (
                  <FormInputNewTreeview
                    inputName="production-center"
                    placeholder="Production Center name..."
                    onSubmit={actionSaveProductionCenter}
                    onCancel={() =>
                      setTreeviewState({
                        ...treeviewState,
                        isNewProductionCenter: false,
                      })
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
                            (productionCenter) => productionCenter.level === 5
                          ).length || 0
                        }
                      />
                      <ButtonNew
                        onAddClick={() =>
                          setTreeviewState({
                            ...treeviewState,
                            isNewProductionCenter: true,
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </div>
              {selectedSubstore &&
                selectedSubstore.children &&
                selectedSubstore.children.length > 0 &&
                selectedSubstore.children
                  .filter((productionCenter) => productionCenter.level === 5)
                  .map((productionCenter) => (
                    <TreeviewWidget
                      key={productionCenter.name}
                      treeview={productionCenter}
                      selectedBool={
                        selectedSubstore?.id === productionCenter.id
                      }
                      onSelectTreeview={() =>
                        handleSelectProductionCenter(productionCenter.id)
                      }
                    />
                  ))}
            </div>
            {/* End Production Center View */}

            {/* Storage View */}
            <div
              className={`flex-1 pl-2 border-r-2 border-gray-300 overflow-hidden ${
                !selectedSubstore && "hidden"
              }`}
            >
              <div className=" items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
                {treeviewState.isNewStorage ? (
                  <FormInputNewTreeview
                    inputName="storage"
                    placeholder="Storage name..."
                    onSubmit={actionSaveStorage}
                    onCancel={() =>
                      setTreeviewState({
                        ...treeviewState,
                        isNewStorage: false,
                      })
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
                            (productionCenter) => productionCenter.level === 6
                          ).length || 0
                        }
                      />
                      <ButtonNew
                        onAddClick={() =>
                          setTreeviewState({
                            ...treeviewState,
                            isNewStorage: true,
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </div>
              {selectedSubstore &&
                selectedSubstore.children &&
                selectedSubstore.children.length > 0 &&
                selectedSubstore.children
                  .filter((storage) => storage.level === 6)
                  .map((storage) => (
                    <TreeviewWidget
                      key={storage.name}
                      treeview={storage}
                      selectedBool={selectedSubstore?.id === storage.id}
                      onSelectTreeview={() =>
                        handleSelectProductionCenter(storage.id)
                      }
                    />
                  ))}
            </div>
          </div>
          {/* End Storage View */}
        </div>
      </div>
    </div>
  );
};

export default TreeView;

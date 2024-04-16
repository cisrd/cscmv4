"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";
import { Input } from "@/components/ui/input";
import { Check, SquareX } from "lucide-react";
import { saveTreeviewName } from "./action";
import toast from "react-hot-toast";
import TreeviewWidget from "./treeview-widget";

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

interface IState {
  dataTreeview: TTreeview[];
  selectedCountry: TTreeview | null;
  selectedProject: TTreeview | null;
  selectedSite: TTreeview | null;
  selectedSubstore: TTreeview | null;
  selectedStorage: TTreeview | null;
  selectedProductionCenter: TTreeview | null;
}

const initialState: IState = {
  dataTreeview: [],
  selectedCountry: null,
  selectedProject: null,
  selectedSite: null,
  selectedSubstore: null,
  selectedStorage: null,
  selectedProductionCenter: null,
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const TreeView = () => {

  const [treeviewState, setTreeviewState] = useState({
    isLoading: false,
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

  const [treeviewStateData, setTreeviewStateData] = useState<IState>(initialState);

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
      setTreeviewStateData({...treeviewStateData, dataTreeview: response.data });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

  const handleSelectCountry = (selectedId: number) => {
    const selected = treeviewStateData.dataTreeview.find(
      (project) => project.id === selectedId
    ) as TTreeview;
    setSelectedProject(null);
    setSelectedSite(null);
    setSelectedSubstore(null);
    setTreeviewStateData({...treeviewStateData, selectedCountry: selected });
  };

  const handleSelectProject = (selectedId: number) => {
    console.log();
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
    console.log(selected);
    setSelectedSubstore(selected);
  };

  const handleSelectProductionCenter = (selectedId: number) => {
    //console.log(selectedId);
    const selected = selectedSubstore?.children?.find(
      (productionCenter) => productionCenter.id === selectedId
    ) as TTreeview;
    setSelectedProductionCenter(selectedSubstore);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

  const actionSaveCountry = async (formData: FormData) => {

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

  const actionSaveProject = async (formData: FormData) => {

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
        toast.success("Project created successfully!");
        if (treeviewStateData.selectedCountry) {
          
          setTreeviewStateData(prevState => {
            if (!prevState.selectedCountry) return prevState;

            const newProject = response.data; 

            if (!newProject) return prevState;
    
            return {
              ...prevState,
              selectedCountry: {
                ...prevState.selectedCountry,
                children: prevState.selectedCountry.children
                  ? [...prevState.selectedCountry.children, newProject]
                  : [newProject]
              }
            };
          });
        }
        setTreeviewState({ ...treeviewState, isNewProject: false });
        console.log(treeviewStateData.selectedCountry)
        console.log(treeviewStateData.dataTreeview)
        fetchData();
        //handleSelectCountry(treeviewStateData.selectedCountry?.parentId)
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

  const actionSaveSite = async (formData: FormData) => {

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

  const actionSaveSubstore = async (formData: FormData) => {

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

  const actionSaveProductionCenter = async (formData: FormData) => {

    const productionCenterName = formData.get("production-center");
    const parentIDString = formData.get("parentID");
    const parentID = parentIDString
      ? parseInt(parentIDString as string)
      : undefined;

    const newData = {
      name: typeof productionCenterName === "string" ? productionCenterName : undefined,
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

          setSelectedSite((prevState) => {
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

  const actionSaveStorage = async (formData: FormData) => {

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
        if (treeviewStateData.selectedCountry) {
          const newStorage = response.data;

          setSelectedSite((prevState) => {
            if (!prevState) return prevState;

            if (!newStorage) return prevState;

            return {
              ...prevState,
              children: prevState.children
                ? [...prevState.children, newStorage]
                : [newStorage],
            };
          });
        }

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
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 1 }}
            className="col-span-1 border-r-2 border-gray-300 overflow-hidden"
          >
            <div className="items-center justify-between p-1 border-b border-gray-200 mr-3 font-semibold">
              {treeviewState.isNewCountry ? (
                <form action={actionSaveCountry}>
                  <div className="flex  space-x-2 items-center justify-end w-full">
                    <Input
                      name="country"
                      type="text"
                      placeholder="Country name..."
                      className="w-full h-[30px] focus:ring-0 focus-visible:ring-1 capitalize"
                    />
                    <div className="ml-auto flex items-center">
                      <button type="submit" className="icon-button">
                        <Check
                          height={25}
                          width={25}
                          className="cursor-pointer justify-end hover:bg-sidebar-background mr-1"
                        />
                      </button>
                      <SquareX
                        height={25}
                        width={25}
                        onClick={() =>
                          setTreeviewState({
                            ...treeviewState,
                            isNewCountry: false,
                          })
                        }
                        className="cursor-pointer hover:bg-sidebar-background"
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-between font-semibold">
                    <p>Country ({treeviewStateData.dataTreeview?.length || 0})</p>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setTreeviewState({
                          ...treeviewState,
                          isNewCountry: true,
                        })
                      }
                    >
                      New
                    </Button>
                  </div>
                </>
              )}
            </div>
            {treeviewState.isLoading && (
              <div className="flex items-center justify-center mt-5 mb-2">
                <BeatLoader color="#253A79" />
              </div>
            )}
            <ScrollArea className=" h-[88%] pb-5 pr-1">
              {treeviewStateData.dataTreeview &&
                treeviewStateData.dataTreeview.length > 0 &&
                treeviewStateData.dataTreeview.map((data) => (
                  <TreeviewWidget
                    key={data.name}
                    treeview={data}
                    selectedBool={
                      treeviewStateData.selectedCountry?.id === data.id ? true : false
                    }
                    onSelectTreeview={() => handleSelectCountry(data.id)}
                  />
                ))}
            </ScrollArea>
          </motion.div>
          {/* End Country View */}

          {/* Project View */}
          <div
            className={`col-span-1 pl-2 border-r-2 border-gray-300 overflow-hidden ${
              !treeviewStateData.selectedCountry && "hidden"
            }`}
          >
            <div className="items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
              {treeviewState.isNewProject ? (
                <form action={actionSaveProject}>
                  <input
                    type="hidden"
                    name="parentID"
                    value={treeviewStateData.selectedCountry?.id}
                  ></input>
                  <div className="flex  space-x-2 items-center justify-end w-full">
                    <Input
                      name="project"
                      type="text"
                      placeholder="Project name..."
                      className="w-full h-[30px] focus:ring-0 focus-visible:ring-1 capitalize"
                    />
                    <div className="ml-auto flex items-center">
                      <button type="submit" className="icon-button">
                        <Check
                          height={25}
                          width={25}
                          className="cursor-pointer justify-end hover:bg-sidebar-background mr-1"
                        />
                      </button>
                      <SquareX
                        height={25}
                        width={25}
                        onClick={() =>
                          setTreeviewState({
                            ...treeviewState,
                            isNewProject: false,
                          })
                        }
                        className="cursor-pointer hover:bg-sidebar-background"
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-between font-semibold">
                    <p>Project ({treeviewStateData.selectedCountry?.children?.length || 0})</p>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setTreeviewState({
                          ...treeviewState,
                          isNewProject: true,
                        })
                      }
                    >
                      New
                    </Button>
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
                <form action={actionSaveSite}>
                  <input
                    type="hidden"
                    name="parentID"
                    value={selectedProject?.id}
                  ></input>
                  <div className="flex  space-x-2 items-center justify-end w-full">
                    <Input
                      name="site"
                      type="text"
                      placeholder="Site name..."
                      className="w-full h-[30px] focus:ring-0 focus-visible:ring-1 capitalize"
                    />
                    <div className="ml-auto flex items-center">
                      <button type="submit" className="icon-button">
                        <Check
                          height={25}
                          width={25}
                          className="cursor-pointer justify-end hover:bg-sidebar-background mr-1"
                        />
                      </button>
                      <SquareX
                        height={25}
                        width={25}
                        onClick={() =>
                          setTreeviewState({
                            ...treeviewState,
                            isNewSite: false,
                          })
                        }
                        className="cursor-pointer hover:bg-sidebar-background"
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-between font-semibold">
                    <p>Site ({selectedProject?.children?.length || 0})</p>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setTreeviewState({ ...treeviewState, isNewSite: true })
                      }
                    >
                      New
                    </Button>
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
                <form action={actionSaveSubstore}>
                  <input
                    type="hidden"
                    name="parentID"
                    value={selectedSite?.id}
                  ></input>
                  <div className="flex  space-x-2 items-center justify-end w-full">
                    <Input
                      name="substore"
                      type="text"
                      placeholder="Sub-store name..."
                      className="w-full h-[30px] focus:ring-0 focus-visible:ring-1 capitalize"
                    />
                    <div className="ml-auto flex items-center">
                      <button type="submit" className="icon-button">
                        <Check
                          height={25}
                          width={25}
                          className="cursor-pointer justify-end hover:bg-sidebar-background mr-1"
                        />
                      </button>
                      <SquareX
                        height={25}
                        width={25}
                        onClick={() =>
                          setTreeviewState({
                            ...treeviewState,
                            isNewSubstore: false,
                          })
                        }
                        className="cursor-pointer hover:bg-sidebar-background"
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-between font-semibold">
                    <p>Sub-Store ({selectedSite?.children?.length || 0})</p>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setTreeviewState({
                          ...treeviewState,
                          isNewSubstore: true,
                        })
                      }
                    >
                      New
                    </Button>
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
                  <form action={actionSaveProductionCenter}>
                    <input
                      type="hidden"
                      name="parentID"
                      value={selectedSubstore?.id}
                    ></input>
                    <div className="flex  space-x-2 items-center justify-end w-full">
                      <Input
                        name="production-center"
                        type="text"
                        placeholder="Production Center name..."
                        className="w-full h-[30px] focus:ring-0 focus-visible:ring-1 capitalize"
                      />
                      <div className="ml-auto flex items-center">
                        <button type="submit" className="icon-button">
                          <Check
                            height={25}
                            width={25}
                            className="cursor-pointer justify-end hover:bg-sidebar-background mr-1"
                          />
                        </button>
                        <SquareX
                          height={25}
                          width={25}
                          onClick={() =>
                            setTreeviewState({
                              ...treeviewState,
                              isNewProductionCenter: false,
                            })
                          }
                          className="cursor-pointer hover:bg-sidebar-background"
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex items-center justify-between font-semibold">
                      <p>
                        Production Center (
                        {selectedSubstore?.children?.filter(
                          (productionCenter) => productionCenter.level === 5
                        ).length || 0}
                        )
                      </p>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setTreeviewState({
                            ...treeviewState,
                            isNewProductionCenter: true,
                          })
                        }
                      >
                        New
                      </Button>
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
                  <form action={actionSaveStorage}>
                    <input
                      type="hidden"
                      name="parentID"
                      value={selectedSubstore?.id}
                    ></input>
                    <div className="flex  space-x-2 items-center justify-end w-full">
                      <Input
                        name="storage"
                        type="text"
                        placeholder="Storage name..."
                        className="w-full h-[30px] focus:ring-0 focus-visible:ring-1 capitalize"
                      />
                      <div className="ml-auto flex items-center">
                        <button type="submit" className="icon-button">
                          <Check
                            height={25}
                            width={25}
                            className="cursor-pointer justify-end hover:bg-sidebar-background mr-1"
                          />
                        </button>
                        <SquareX
                          height={25}
                          width={25}
                          onClick={() =>
                            setTreeviewState({
                              ...treeviewState,
                              isNewStorage: false,
                            })
                          }
                          className="cursor-pointer hover:bg-sidebar-background"
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex items-center justify-between font-semibold">
                      <p>
                        Storage (
                        {selectedSubstore?.children?.filter(
                          (productionCenter) => productionCenter.level === 6
                        ).length || 0}
                        )
                      </p>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setTreeviewState({
                            ...treeviewState,
                            isNewStorage: true,
                          })
                        }
                      >
                        New
                      </Button>
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

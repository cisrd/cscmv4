"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import CountryWidget from "./country";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";
import { Input } from "@/components/ui/input";
import { Check, SquareX } from "lucide-react";
import { saveCountryName } from "./action";
import toast from "react-hot-toast";
import ProjectWidget from "./project";
import SiteWidget from "./site";
import SubstoreWidget from "./substore";
import ProductionCenterWidget from "./production-center";
import StorageWidget from "./storage";

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
  const [dataTreeview, setDataTreeview] = useState<TTreeview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savingCountry, setSavingCountry] = useState(false);
  const [isNewCountry, setIsNewCountry] = useState(false);
  const [isNewProject, setIsNewProject] = useState(false);
  const [isNewSite, setIsNewSite] = useState(false);
  const [isNewSubstore, setIsNewSubstore] = useState(false);
  const [isNewStorage, setIsNewStorage] = useState(false);
  const [isNewProductionCenter, setIsNewProductionCenter] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<TTreeview | null>(
    null
  );
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

  const fetchData = async () => {
    const url = "/api/settings/general/treeview";
    try {
      const response = await axios.get(url);
      const jsonData = await response.data;
      setDataTreeview(jsonData);
    } catch (error) {
      setIsLoading(false);
      return;
    }
  };

  const handleSelectCountry = (selectedId: number) => {
    const selected = dataTreeview.find(
      (project) => project.id === selectedId
    ) as TTreeview;
    setSelectedProject(null);
    setSelectedSite(null);
    setSelectedSubstore(null);
    setSelectedCountry(selected);
  };

  const handleSelectProject = (selectedId: number) => {
    const selected = selectedCountry?.children?.find(
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
    setSavingCountry(true);

    const newCountry = {
      name: formData.get("country"),
    };

    const response = await saveCountryName(newCountry);

    if (response?.error) {
      toast.error(response.error);
      setSavingCountry(false);
    } else {
      toast.success("Supplier have been created with successfully!");
      setSavingCountry(false);
      setIsNewCountry(false);
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
              {isNewCountry ? (
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
                        onClick={() => setIsNewCountry(false)}
                        className="cursor-pointer hover:bg-sidebar-background"
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-between font-semibold">
                    <p>Country ({dataTreeview?.length || 0})</p>
                    <Button
                      variant="outline"
                      onClick={() => setIsNewCountry(true)}
                    >
                      New
                    </Button>
                  </div>
                </>
              )}
            </div>
            {isLoading && (
              <div className="flex items-center justify-center mt-5 mb-2">
                <BeatLoader color="#253A79" />
              </div>
            )}
            <ScrollArea className=" h-[88%] pb-5 pr-1">
              {dataTreeview &&
                dataTreeview.length > 0 &&
                dataTreeview.map((data) => (
                  <CountryWidget
                    key={data.name}
                    treeview={data}
                    selectedBool={
                      selectedCountry?.id === data.id ? true : false
                    }
                    onSelectCountry={() => handleSelectCountry(data.id)}
                  />
                ))}
            </ScrollArea>
          </motion.div>
          {/* End Country View */}

          {/* Project View */}
          <div
            className={`col-span-1 pl-2 border-r-2 border-gray-300 overflow-hidden ${
              !selectedCountry && "hidden"
            }`}
          >
            <div className="flex items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
              <p>Project ({selectedCountry?.children?.length || 0})</p>
              <Button variant={"outline"}>New</Button>
            </div>

            <ScrollArea className=" h-[88%] pb-5 pr-1">
              {selectedCountry &&
                selectedCountry.children &&
                selectedCountry.children.length > 0 &&
                selectedCountry.children.map((project) => (
                  <ProjectWidget
                    key={project.name}
                    treeview={project}
                    selectedBool={selectedProject?.id === project.id}
                    onSelectProject={() => handleSelectProject(project.id)}
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
            <div className="flex items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
              <p>Site ({selectedProject?.children?.length || 0})</p>
              <Button variant={"outline"}>New</Button>
            </div>
            <ScrollArea className=" h-[88%] pb-5 pr-1">
              {selectedProject &&
                selectedProject.children &&
                selectedProject.children.length > 0 &&
                selectedProject.children.map((site) => (
                  <SiteWidget
                    key={site.name}
                    treeview={site}
                    selectedBool={selectedSite?.id === site.id}
                    onSelectSite={() => handleSelectSite(site.id)}
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
            <div className="flex items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
              <p>Substore ({selectedSite?.children?.length || 0})</p>
              <Button variant={"outline"}>New</Button>
            </div>
            <ScrollArea className=" h-[88%] pb-5 pr-1">
              {selectedSite &&
                selectedSite.children &&
                selectedSite.children.length > 0 &&
                selectedSite.children.map((substore) => (
                  <SubstoreWidget
                    key={substore.name}
                    treeview={substore}
                    selectedBool={selectedSubstore?.id === substore.id}
                    onSelectSubstore={() => handleSelectSubstore(substore.id)}
                  />
                ))}
            </ScrollArea>
          </div>
          {/* End Substore View */}

          {/* Productioo Center View */}

          <div className="flex flex-col h-screen">
            <div
              className={`flex-1 pl-2 border-r-2 border-gray-300 overflow-hidden ${
                !selectedSubstore && "hidden"
              }`}
            >
              <div className="flex items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
                <p>
                  Produdction Center (
                  {selectedProductionCenter?.children?.length || 0})
                </p>
                <Button variant={"outline"}>New</Button>
              </div>
              {selectedSubstore &&
                selectedSubstore.children &&
                selectedSubstore.children.length > 0 &&
                selectedSubstore.children
                  .filter((productionCenter) => productionCenter.level === 5)
                  .map((productionCenter) => (
                    <ProductionCenterWidget
                      key={productionCenter.name}
                      treeview={productionCenter}
                      selectedBool={
                        selectedSubstore?.id === productionCenter.id
                      }
                      onSelectProductionCenter={() =>
                        handleSelectProductionCenter(productionCenter.id)
                      }
                    />
                  ))}
            </div>

            <div
              className={`flex-1 pl-2 border-r-2 border-gray-300 overflow-hidden ${
                !selectedSubstore && "hidden"
              }`}
            >
              <div className="flex items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
                <p>
                  Storage ({selectedProductionCenter?.children?.length || 0})
                </p>
                <Button variant={"outline"}>New</Button>
              </div>
              {selectedSubstore &&
                selectedSubstore.children &&
                selectedSubstore.children.length > 0 &&
                selectedSubstore.children
                  .filter((storage) => storage.level === 6)
                  .map((storage) => (
                    <StorageWidget
                      key={storage.name}
                      treeview={storage}
                      selectedBool={selectedSubstore?.id === storage.id}
                      onSelectStorage={() =>
                        handleSelectProductionCenter(storage.id)
                      }
                    />
                  ))}
            </div>
          </div>

          {/* End Productioo Center View */}
        </div>
      </div>
    </div>
  );
};

export default TreeView;

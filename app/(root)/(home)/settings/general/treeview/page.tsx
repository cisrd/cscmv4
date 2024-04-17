"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IState, initialState } from "./types";
import CountryView from "./view-country";
import ProjectView from "./view-project";
import SiteView from "./view-site";
import SubstoreView from "./view-substore";
import ProductionCenterView from "./view-production-center";
import StorageView from "./view-storage";
import { treeviewStore } from "@/store/settings";

import { Button, Drawer, Input, Space } from "antd";
import { Label } from "@/components/ui/label";
import FormTreeview from "./form";

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

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const treeviewZustand = treeviewStore((state: any) => state.treeviewZustand);
  const updateTreeview = treeviewStore((state: any) => state.updateTreeview);

  return (
    
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-1 bg-white p-3 rounded-s-sm">
        <div className="h-screen w-full grid grid-cols-5">
          {/* Country View */}
          <FormTreeview/>
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
          <ProjectView
            isNewProject={treeviewState.isNewProject}
            selectedProject={selectedProject}
            treeviewStateData={treeviewStateData}
            treeviewState={treeviewState}
            setTreeviewStateData={setTreeviewStateData}
            setTreeviewState={setTreeviewState}
            handleSelectProject={handleSelectProject}
          />
          {/* End Project View */}

          {/* Site View */}
          <SiteView
            isNewSite={treeviewState.isNewSite}
            selectedSite={selectedSite}
            treeviewStateData={treeviewStateData}
            setSelectedProject={setSelectedProject}
            treeviewState={treeviewState}
            selectedProject={selectedProject}
            setTreeviewState={setTreeviewState}
            handleSelectSite={handleSelectSite}
            fetchData={fetchData}
          />
          {/* End Site View */}

          {/* Substore View */}
          <SubstoreView
            isNewSubstore={treeviewState.isNewSubstore}
            selectedSubstore={selectedSubstore}
            treeviewStateData={treeviewStateData}
            setSelectedSite={setSelectedSite}
            treeviewState={treeviewState}
            selectedSite={selectedSite}
            setTreeviewState={setTreeviewState}
            handleSelectSubstore={handleSelectSubstore}
            fetchData={fetchData}
          />
          {/* End Substore View */}

          <div className="flex flex-col h-screen">
            {/* Production Center View */}
            <ProductionCenterView
              isNewProductionCenter={treeviewState.isNewProductionCenter}
              selectedSubstore={selectedSubstore}
              fetchData={fetchData}
              treeviewStateData={treeviewStateData}
              setSelectedSubstore={setSelectedSubstore}
              treeviewState={treeviewState}
              setTreeviewState={setTreeviewState}
              handleSelectProductionCenter={handleSelectProductionCenter}
            />
            {/* End Production Center View */}

            {/* Storage View */}
            <StorageView
              isNewStorage={treeviewState.isNewStorage}
              selectedSubstore={selectedSubstore}
              fetchData={fetchData}
              setSelectedSubstore={setSelectedSubstore}
              treeviewState={treeviewState}
              setTreeviewState={setTreeviewState}
              handleSelectStorage={handleSelectProductionCenter}
            />
            {/* End Storage View */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeView;

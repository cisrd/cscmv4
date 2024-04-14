"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ICoountry, itemsCountry } from "./treeview-data";
import CountryWidget from "./country";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";
import { Input } from "@/components/ui/input";
import { Check, SquareX } from "lucide-react";
import { saveCountryName } from "./action";
import toast from "react-hot-toast";

interface TTreeview {
  id: number;
  name: string;
  parentId: number | null;
  isFm: boolean;
  adresse: string;
  projectCode: string;
  codeAnalytic: string;
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
  const [selectedCountry, setSelectedCountry] = useState<TTreeview | null>(
    null
  );

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
    const selected = dataTreeview.find(country => country.id === selectedId) as TTreeview;
    setSelectedCountry(selected);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

  const actionSaveCountry = async (formData : FormData) => {
    setSavingCountry(true)

    const newCountry = {
      name : formData.get("country"),
    }

    const response = await saveCountryName(newCountry)

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
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 1 }}
            className="col-span-1 border-r-2 border-gray-300 overflow-hidden"
          >
            <div className="flex items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
            {isNewCountry ? (
              <form action={actionSaveCountry}>
              <div className="flex flex-1 justify-between pb-2">

                <Input
                  name="country"
                  type="text"
                  placeholder="Country name..."
                  className="w-full h-[30px] focus:ring-0 focus-visible:ring-1 capitalize"
                />
                <div className="flex items-center justify-between ml-2">      
                   <button type="submit" className="icon-button">          
                  <Check 
                  height={25} width={25} 
                  className="cursor-pointer hover:bg-sidebar-background mr-1"
                  />
                  </button>
                  <SquareX height={25} width={25} 
                  onClick={() => setIsNewCountry(false)} 
                  className="cursor-pointer hover:bg-sidebar-background"
                  />
                  </div>
                  
              </div>
              </form>
            ) : (
              <>
                <p>Country ({dataTreeview?.length || 0})</p>
                <Button 
                variant="outline"
                onClick={() => setIsNewCountry(true)} 
                >New</Button>
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
                    selectedBool={selectedCountry?.id === data.id ? true : false}
                    onSelectCountry={() => handleSelectCountry(data.id)}
                  />
                ))}
            </ScrollArea>
          </motion.div>

          <div
            className={`col-span-1 pl-2 border-r-2 border-gray-300 overflow-hidden ${
              !selectedCountry && "hidden"
            }`}
          >
            <div className="flex items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
            <p>Project ({selectedCountry?.children?.length || 0})</p>
              <Button variant={"outline"}>New</Button>
            </div>

            <li className="p-2">No projects found for this country.</li>
          </div>
          <div className="col-span-1 border-r-2 border-gray-300 overflow-auto  hidden">
            site
          </div>
          <div className="col-span-1 border-r-2 border-gray-300 overflow-auto  hidden">
            substore
          </div>
          <div className="col-span-1 overflow-auto  hidden">Store</div>
        </div>
      </div>
    </div>
  );
};

export default TreeView;

"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ICoountry, itemsCountry } from "./treeview-data";
import CountryWidget from "./country";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";

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
  const [selectedCountry, setSelectedCountry] = useState<ICoountry | null>(
    null
  );

  const fetchData = async () => {
    const url = "/api/settings/general/treeview";
    try {
      const response = await axios.get(url);
      const jsonData = await response.data;
      console.log(jsonData);
      setDataTreeview(jsonData);
    } catch (error) {
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

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
              <p>Country ({dataTreeview?.length || 0}) </p>
              <Button variant={"outline"}>New</Button>
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
                    //onSelectCountry={() => handleSelectCountry(data.name)}
                  />
                ))}
            </ScrollArea>
          </motion.div>

          <div
            className={`col-span-1 border-r-2 border-gray-300 overflow-hidden ${
              !selectedCountry && "hidden"
            }`}
          >
            <div className="flex items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
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

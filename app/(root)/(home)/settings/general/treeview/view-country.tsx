"use client";

import toast from "react-hot-toast";
import {
  ButtonNew,
  FormInputNewCountry,
  HeaderTreeview,
  Loader,
} from "./ui-component";
import { motion } from "framer-motion";
import { saveTreeviewName } from "./action";
import { ScrollArea } from "@/components/ui/scroll-area";
import TreeviewWidget from "./treeview-widget";
import { IState, TTreeview, initialState } from "./types";
import { useEffect, useState } from "react";
import axios from "axios";

interface CountryViewProps {
  isNewCountry: boolean;
  isLoading: boolean;
  handleSelectCountry: (id: number) => void;
  variants: any;
  treeviewState: any;
  setTreeviewState: (state: any) => void;
  treeviewStateData: IState;
  fetchData: () => void;
}

const CountryView: React.FC<CountryViewProps> = ({
  isNewCountry,
  isLoading,
  handleSelectCountry,
  variants,
  treeviewState,
  setTreeviewState,
  treeviewStateData,
  fetchData,
}) => {
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
      toast.success("Country has been created successfully!");
      setTreeviewState({ ...treeviewState, isNewCountry: false });
      fetchData();
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 1 }}
      className="col-span-1 border-r-2 border-gray-300 overflow-hidden"
    >
      <div className="items-center justify-between p-1 border-b border-gray-200 mr-2 font-semibold">
        {isNewCountry ? (
          <FormInputNewCountry
            inputName="country"
            placeholder="Country name..."
            onSubmit={actionSaveCountry}
            onCancel={() =>
              setTreeviewState({ ...treeviewState, isNewCountry: false })
            }
          />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <HeaderTreeview
                title="Country"
                count={treeviewStateData.dataTreeview?.length || 0}
              />
              <ButtonNew
                onAddClick={() =>
                  setTreeviewState({ ...treeviewState, isNewCountry: true })
                }
              />
            </div>
          </>
        )}
      </div>
      {isLoading && <Loader />}
      <ScrollArea className="h-[88%] pb-5 pr-1">
        {treeviewStateData.dataTreeview &&
          treeviewStateData.dataTreeview.length > 0 &&
          treeviewStateData.dataTreeview.map((data) => (
            <TreeviewWidget
              key={data.name}
              treeview={data}
              selectedBool={treeviewStateData.selectedCountry?.id === data.id}
              onSelectTreeview={() => handleSelectCountry(data.id)}
            />
          ))}
      </ScrollArea>
    </motion.div>
  );
};

export default CountryView;

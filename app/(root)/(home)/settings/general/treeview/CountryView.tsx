"use client";

import React from "react";
import TreeviewWidget from "./treeview-widget";
import { CountryViewProps } from "./types"; // Assuming you exported interfaces to types.ts
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Check, SquareX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import BeatLoader from "react-spinners/BeatLoader";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const CountryView: React.FC<CountryViewProps> = ({
  dataTreeview,
  selectedCountry,
  onSelectCountry,
  isNewCountry,
  setIsNewCountry,
  actionSaveCountry,
}) => {
  return (
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
  );
};

export default CountryView;

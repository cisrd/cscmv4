import React from "react";
import TreeviewWidget from "./treeview-widget";
import { CountryViewProps } from "./types"; // Assuming you exported interfaces to types.ts
import { Input } from "@/components/ui/input";
import { Check, SquareX } from "lucide-react";
import { Button } from "@/components/ui/button";

const CountryView: React.FC<CountryViewProps> = ({
  dataTreeview,
  selectedCountry,
  onSelectCountry,
  isNewCountry,
  setIsNewCountry,
  actionSaveCountry,
}) => {
  return (
    <div className="country-view">
      <div className="items-center justify-between p-1 border-b border-gray-200 mr-3 font-semibold">
        {isNewCountry ? (
          <form onSubmit={actionSaveCountry}>
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
          <div className="header-content">
            <p>Country ({dataTreeview?.length || 0})</p>
            <Button variant="outline" onClick={() => setIsNewCountry(true)}>
              New
            </Button>
          </div>
        )}
      </div>
      <div className="list">
        {dataTreeview.map((data) => (
          <TreeviewWidget
            key={data.name}
            treeview={data}
            selectedBool={selectedCountry?.id === data.id}
            onSelectTreeview={() => onSelectCountry(data.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryView;

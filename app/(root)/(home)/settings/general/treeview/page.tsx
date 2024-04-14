"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ICoountry, itemsCountry } from "./treeview-data";
import CountryWidget from "./country";
import { ScrollArea } from "@/components/ui/scroll-area";

const TreeView = () => {
  const [countries, setCountries] = useState<ICoountry[]>(itemsCountry);
  const [selectedCountry, setSelectedCountry] = useState<ICoountry | null>(
    null
  );

  const handleSelectCountry = (selectedId: string) => {
    const updatedCountries = countries.map((country) =>
      country.name === selectedId
        ? { ...country, selected: true }
        : { ...country, selected: false }
    );
    setCountries(updatedCountries);
    setSelectedCountry(
      updatedCountries.find((country) => country.name === selectedId) || null
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-1 bg-white p-3 rounded-s-sm">
        <div className="h-screen w-full grid grid-cols-5">
          <div className="col-span-1 border-r-2 border-gray-300 overflow-hidden">
            <div className="flex items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
              <p>Country ({countries.length}) </p>
              <Button variant={"outline"}>New</Button>
            </div>
            <ScrollArea className=" h-[88%] pb-5 pr-1">
              {countries.map((country) => (
                <CountryWidget
                  key={country.name}
                  country={country}
                  onSelectCountry={() => handleSelectCountry(country.name)}
                />
              ))}
            </ScrollArea>
          </div>

          <div
            className={`col-span-1 border-r-2 border-gray-300 overflow-hidden ${
              !selectedCountry && "hidden"
            }`}
          >
            <div className="flex items-center justify-between p-1 border-b border-gray-00 mr-3 font-semibold">
              <p>Project ({selectedCountry?.project?.length}) </p>
              <Button variant={"outline"}>New</Button>
            </div>
            <ul>
              {selectedCountry?.project?.length ? (
                selectedCountry.project.map((project, index) => (
                  <li key={index} className="p-2 border-b border-gray-200">
                    <strong>{project.name}</strong>
                  </li>
                ))
              ) : (
                <li className="p-2">No projects found for this country.</li>
              )}
            </ul>
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

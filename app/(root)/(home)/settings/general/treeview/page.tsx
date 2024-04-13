import { Button } from '@/components/ui/button'
import React from 'react'
import { itemsCountry } from './treeview-data'
import CountryWidget, {} from "./country"

const TreeView = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-1 bg-white p-3 rounded-s-sm">
        <div className="h-screen w-full grid grid-cols-5">
            <div className="col-span-1 border-r-2 border-gray-300 overflow-auto">
              <div className='flex items-center justify-between p-1 border-b border-gray-300 mr-3 font-semibold'>
                <p>Country ({itemsCountry.length}) </p> 
                <Button variant={'outline'}>New</Button>
              </div>
              {itemsCountry.map(( country) => (
                <CountryWidget key={country.name} country={country} />
               ))}
            </div>
            <div className="col-span-1 border-r-2 border-gray-300 overflow-auto hidden">
                project
            </div>
            <div className="col-span-1 border-r-2 border-gray-300 overflow-auto  hidden">
                site
            </div>
            <div className="col-span-1 border-r-2 border-gray-300 overflow-auto  hidden">
                substore
            </div>
            <div className="col-span-1 overflow-auto  hidden">
                Store
            </div>
        </div>
      </div>
    </div>
  )
}

export default TreeView
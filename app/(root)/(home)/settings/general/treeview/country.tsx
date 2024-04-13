import { Pencil } from 'lucide-react';
import React from 'react'

interface ICoountry {
    name: string;
    project?: IProject[];
  }

  interface IProject {
    name: string;
  }
  

const CountryWidget = ({country} : {country : ICoountry} ) => {
  return (
<div className="group flex items-center justify-between border rounded-[8px] p-2 bg-slate-300 cursor-pointer min-h-[50px] text-gray-800 mt-3 mr-3 relative">
  <p>{country.name} ({country.project?.length})</p>
  <Pencil className="hidden group-hover:block h-5 w-5 text-gray-600 ml-5" />
</div>

  )
}

export default CountryWidget
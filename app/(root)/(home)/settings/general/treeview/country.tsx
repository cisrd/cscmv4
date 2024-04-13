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
    <div className={`flex flex-col justify-between border rounded-[8px] p-2 bg-slate-300 cursor-pointer
    hover:bg-sidebar-background min-h-[50px] text-gray-800 mt-3 mr-3`}>
    <p>{country.name} ({country.project?.length})</p>
    </div>
  )
}

export default CountryWidget
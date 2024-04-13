import React from 'react'

const TreeView = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-1 bg-white p-3 rounded-s-sm">
        <div className="h-screen w-full grid grid-cols-5">
            <div className="col-span-1 border-r-2 border-gray-300 overflow-auto">
              country
            </div>
            <div className="col-span-1 border-r-2 border-gray-300 overflow-auto">
                project
            </div>
            <div className="col-span-1 border-r-2 border-gray-300 overflow-auto">
                site
            </div>
            <div className="col-span-1 border-r-2 border-gray-300 overflow-auto">
                substore
            </div>
            <div className="col-span-1 overflow-auto">
                Store
            </div>
        </div>
      </div>
    </div>
  )
}

export default TreeView
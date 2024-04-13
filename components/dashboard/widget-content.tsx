"use client";



const WidgetContent = ({ status, number, bgColor } :{status:string,number:string, bgColor:string} ) => {
  return (
    <div className={`flex flex-col justify-between border rounded-[8px] p-2 bg-orange-300 cursor-pointer
    hover:bg-sidebar-background min-w-[90px] min-h-[110px] ${bgColor} text-white`}>
           <p className='text-[40px] font-bold'>{number}</p>
           <p className='text-[13px] font-medium'>{status}</p>
   </div>
  )
}

export default WidgetContent
"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

const PruchasingFoodBasketChart = () => {
  return (
        <div className="w-full pl-1 pr-4 pt-4">
            <Card className='border-red-200 h-full'>
            <CardHeader className='p-0 pt-2'>
                <CardTitle className='text-lg text-center pb-2'>
                Food Basket Evolution Chart
                </CardTitle>
                <CardContent className=''>
                </CardContent>
            </CardHeader>
            </Card>
        </div>
  )
}

export default PruchasingFoodBasketChart
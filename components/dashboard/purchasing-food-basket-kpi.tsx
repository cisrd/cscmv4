"use client";

import dynamic from 'next/dynamic';
import '@progress/kendo-theme-default/dist/all.css';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import {GridColumn,GridHeaderCellProps, GridCellProps,GridCustomCellProps} from "@progress/kendo-react-grid";
import products_food_basket from "./food_basket.json";
import React, { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import { NumericFormat } from 'react-number-format';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';



interface HeaderProps extends GridHeaderCellProps {
  children: any;
}
const PruchasingFoodBasketKpi = () => {

  const [isLoading, setLoading] = useState(true)

  const CellSettingsReference = (props: any) => {
    let value =props.dataItem[props.field];
    return (
      <td className= {cn('text-[11px] pl-1 pt-3 bg-gray-200 font-medium',)}>
        <NumericFormat value={value} decimalScale={2} allowLeadingZeros thousandSeparator="," className='bg-transparent'/>
      </td>

    );
  };

  const CellSettingsNumber = (props: any) => {
    let value =props.dataItem[props.field];
    return (
      <td className= {cn('text-[11px] pl-1 pt-3 bg-sky-100 font-bold')}>
        <NumericFormat value={value} decimalScale={2} allowLeadingZeros thousandSeparator="," className='bg-transparent'/>
      </td>

    );
  };

  const CellSettingsPercentage = (props: any) => {
    let value =props.dataItem[props.field];

    function  bgColor(val :any) {
      if (val > 0) {
        return'bg-red-500 text-white pl-1';
      } else if (val < 0) {
        return 'bg-green-500 text-white pl-1';
      } else {
          return 'bg-transparent';
      }
    };
    
    return (
      <td className= {cn('text-[11px] pl-1 pt-3 font-medium')}>
        <NumericFormat value={value} decimalScale={0} allowLeadingZeros thousandSeparator="," className={bgColor(value)} suffix={'%'}/>
      </td>

    );
  };

  const CellSettingsString = (props: any) => {
    return (
      <td className='text-[11px] pl-1 pt-3 font-semibold bg-gray-200'>
        {props.dataItem[props.field] }
      </td>

    );
  };

  const ColumnHeader = (props: HeaderProps) => {
    return (
      <div className='text-center text-[12px] whitespace-normal '>
        {props.title}
      </div>

    );
  };

  const ColumnHeaderBasic = (props: HeaderProps) => {
      return (
        <div className='text-center text-[12px] whitespace-normal'>
          {props.title}
        </div>

      );
  };

  const Grid : any = dynamic(
        () =>
          import("@progress/kendo-react-grid").then(
            (module) => module.Grid
          ) as any ,
        {
          ssr: false
        }
  );

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <>
        <div className="w-full pl-4 pr-4 pt-4">
            
            <Card className='border-red-200'>
            <CardHeader className='p-0 pt-2'>
                <CardTitle className='text-lg text-center pb-2'>
                  <div className='flex items-center pl-6 gap-5'>
                  <Button variant={'outline'} >View Details</Button>
                  <p>Food Basket KPI</p>
                  </div>
                    
                </CardTitle>
                <CardContent className='text-sx'>

                <div>{isLoading && <Skeleton className="w-[740px] h-[320px] rounded-2" />}</div>
                <Grid 
                    style={{ height: "250px" }} 
                    data={products_food_basket.data}
                    total={products_food_basket.total}
                >
                <GridColumn field="subfamily" title="Sub-Family" width={150} headerCell={ColumnHeaderBasic} cell={CellSettingsString}/>                  
                <GridColumn field="reference_price" title="Reference Period Average Price" width={90} headerCell={ColumnHeaderBasic} 
                  cell={CellSettingsReference}/>                              
                <GridColumn title="Average Price" headerCell={ColumnHeader}>
                  <GridColumn field="avgprice_m2" title="M-2" width={80} format='2' headerCell={ColumnHeaderBasic} cell={CellSettingsNumber} />                              
                  <GridColumn field="avgprice_m1" title="M-1" width={80} headerCell={ColumnHeaderBasic} cell={CellSettingsNumber}/>                              
                  <GridColumn field="avgprice_m" title="M" width={80} headerCell={ColumnHeaderBasic} cell={CellSettingsNumber}/>  
                </GridColumn>         
                <GridColumn title="Food Basket Evolution vs Reference Price" className='text-center' headerCell={ColumnHeader}>
                  <GridColumn field="percentage2" title="M-2" width={80} headerCell={ColumnHeaderBasic} cell={CellSettingsPercentage}/>                              
                  <GridColumn field="percentage" title="M-1" width={80} headerCell={ColumnHeaderBasic} cell={CellSettingsPercentage}/>                              
                  <GridColumn field="percentage" title="M" width={80} headerCell={ColumnHeaderBasic} cell={CellSettingsPercentage}/>  
                </GridColumn>       
                </Grid>
                </CardContent>
            </CardHeader>
            </Card>
        </div>
    </>
  )
}

export default PruchasingFoodBasketKpi
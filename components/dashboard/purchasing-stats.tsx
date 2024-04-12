import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import WidgetContent from './widget-content'

const PurchasingStats = () => {
  return (
    <div className='grid lg:grid-cols-4 gap-4 pl-4 pr-4'>
        <Card className='border-yellow-500'>
            <CardHeader className='p-0 pt-2'>
                <CardTitle className='text-lg text-center pb-2'>
                    Purchase Requisition
                </CardTitle>
                <CardContent className='grid grid-cols-3 gap-2 justify-between'>
                    <WidgetContent status='Saved' number='3' bgColor='bg-orange-300'></WidgetContent>
                    <WidgetContent status='Pending Approval' number='0' bgColor='bg-sidebar-bgLogo'></WidgetContent>
                    <WidgetContent status='Ready to Purchase' number='43' bgColor='bg-orange-300'></WidgetContent>
                    <WidgetContent status='Over Due' number='37' bgColor='bg-red-500'></WidgetContent>
                </CardContent>
            </CardHeader>
        </Card>
        <Card className='border-sky-500'>
            <CardHeader className='p-0 pt-2'>
                <CardTitle className='text-lg text-center pb-2'>
                Purchase Order Processor
                </CardTitle>
                <CardContent className='grid grid-cols-3 gap-2 justify-between'>
                    <WidgetContent status='Saved' number='11' bgColor='bg-orange-300'></WidgetContent>
                    <WidgetContent status='To be Reviewd' number='1' bgColor='bg-orange-300'></WidgetContent>
                    <WidgetContent status='To be Approved' number='6' bgColor='bg-orange-300'></WidgetContent>
                    <WidgetContent status='Ready to Submit' number='0' bgColor='bg-sidebar-bgLogo'></WidgetContent>
                    <WidgetContent status='Delayed Delivery' number='65' bgColor='bg-red-500'></WidgetContent>
                    <WidgetContent status='Pending Delivery' number='213' bgColor='bg-orange-300'></WidgetContent>
                </CardContent>
            </CardHeader>
        </Card>
        <Card className='border-orange-500'>
            <CardHeader className='p-0 pt-2'>
                <CardTitle className='text-lg text-center pb-2'>
                    Packing List
                </CardTitle>
                <CardContent className='grid grid-cols-3 gap-2 justify-between'>
                    <WidgetContent status='Save' number='0' bgColor='bg-sidebar-bgLogo'></WidgetContent>
                    <WidgetContent status='Submitted' number='1' bgColor='bg-orange-300'></WidgetContent>
                </CardContent>
        </CardHeader>
        </Card>
        <Card className='border-pink-500'>
            <CardHeader className='p-0 pt-2'>
                <CardTitle className='text-lg text-center pb-2'>
                    Receipt Note
                </CardTitle>
                <CardContent className='grid grid-cols-3 gap-2 justify-between'>
                    <WidgetContent status='To be Reviewed' number='0' bgColor='bg-sidebar-bgLogo'></WidgetContent>
                    <WidgetContent status='Pending Approval' number='0' bgColor='bg-sidebar-bgLogo'></WidgetContent>
                </CardContent>
        </CardHeader>
        </Card>
    </div>
  )
}

export default PurchasingStats